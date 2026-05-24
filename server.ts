import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization helper for Gemini SDK
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      console.warn("GEMINI_API_KEY is not defined. Using highly optimized server-side template/fallback engine.");
      return null;
    }
    try {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.error("Error creating GoogleGenAI client:", err);
      return null;
    }
  }
  return aiClient;
}

// REST API Endpoints

// 1. Core API Status
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  });
});

// 2. Generate custom cleaning plan / "Cahier des charges" (using Gemini)
app.post("/api/gemini/plan", async (req, res) => {
  const { squareMeters, frequency, roomsSelected, specialInstructions, petPresence, priorityAreas } = req.body;

  const prompt = `Génère un cahier des charges et un plan d'entretien ménager premium personnalisé pour une maison/appartement avec les détails suivants :
  - Superficie : ${squareMeters} m²
  - Fréquence recommandée : ${frequency}
  - Pièces prioritaires sélectionnées : ${roomsSelected?.join(", ") || "Toutes"}
  - Présence d'animaux : ${petPresence ? "Oui" : "Non"}
  - Zones ou exigences prioritaires : ${priorityAreas || "Aucune spécifiée"}
  - Instructions particulières : ${specialInstructions || "Aucune"}

  Le ton doit être extrêmement professionnel, chaleureux, rassurant et expert (haut de gamme). Réponds entièrement en français.
  Structure ton plan de nettoyage de manière claire et élégante à l'aide de Markdown, en créant les sections suivantes :
  1. 🌟 **Introduction exclusive** : Un mot d'accueil personnalisé saluant le projet de nettoyage.
  2. 📝 **Cahier des charges pièce par pièce** : Spécification des tâches précises à accomplir dans chaque zone phare choisie (${roomsSelected?.join(", ") || "zones de vie"}), en insistant sur notre approche qualité (méthode de micro-aspiration, désinfection des points de contact, traitement écologique de surface).
  3. ⏱️ **Estimation du temps nécessaire et recommandation de fréquence** : Analyse de la faisabilité et du nombre d'heures conseillé pour notre personnel de ménage d'élite.
  4. 🌿 **L'approche éco-responsable préconisée** : Quels produits doux et naturels (vinaigre de cidre bio infusé, bicarbonate de chaux, vapeur d'eau pure contractée) nous conseillons d'utiliser pour leurs surfaces spécifiques, surtout s'il y a des enfants ou des animaux (${petPresence ? "comme c'est le cas ici avec leur animal domestique" : ""}).
  5. Checklist interactive ou tableau des tâches prioritaires.`;

  const ai = getAI();
  if (!ai) {
    // Elegant fallbacks so the app has perfect high-end behavior even without keys
    const fallbackResponse = `### 🌟 Votre Plan d'Entretien Sur-Mesure ÉclatNet
*(Généré à partir de notre protocole d'excellence)*

Bienvenue dans votre programme personnalisé d'entretien d'élite. Suite aux détails transmis, nos experts en hôtellerie de maison ont conçu un plan adapté à votre demeure de **${squareMeters} m²**.

---

### 📝 Cahier des charges pièce par pièce

${roomsSelected && roomsSelected.length > 0 ? roomsSelected.map((room: string) => `#### 🧹 Nettoyage de Prestige : ${room}
- **Aspiration de précision** : Dépoussiérage méticuleux des plinthes, des angles et sous les meubles avec têtes d'aspiration douce en microfibres.
- **Désinfection des points de contact** : Interrupteurs, poignées de porte, rampes d'escalier traités avec notre désinfectant certifié bio.
- **Lavage des sols** : Passage d'un balai vapeur ou d'un applicateur plat légèrement humidifié selon le matériau (parquet ciré, carrelage en grès ou pierre naturelle).
- **Aération** : Ventilation forcée durant le nettoyage pour purifier l'air ambiant.`).join("\n\n") : `#### 🛋️ Sélection de zones de vie
- **Entretien général des chambres et salon** : Aspiration de précision, dépoussiérage des luminaires complexes et des objets d'art, polissage des bois précieux.
- **Zone Cuisine & Repas** : Lavage extérieur de l'électroménager, dégraissage doux des crédences, nettoyage des plans de travail et de l'évier.
- **Espaces Sanitaires** : Détartrage complet de la robinetterie en chrome, désinfection et polissage des céramiques, séchage sans trace.`}

---

### ⏱️ Estimation de temps & Proposition Executive

- **Volume estimé** : **3 heures à 4h30 par intervention**
- **Rythme proposé** : **Fréquence ${frequency === 'weekly' ? 'Hebdomadaire (Recommandé)' : frequency === 'biweekly' ? 'Toutes les deux semaines' : frequency === 'monthly' ? 'Mensuel' : 'Ponctuel'}**
- **Priorité définie** : ${priorityAreas || "Nettoyage général rigoureux"}
${petPresence ? "- 🐾 **Alerte poils d'animaux** : Utilisation d'extracteurs d'aspiration de classe hépatique pour une filtration moléculaire totale des allergènes." : ""}

---

### 🌿 L'Approche Éco-Responsable ÉclatNet
Pour votre demeure, nous préconisons :
1. **L'acide citrique naturel** pour la brillance éclatante de vos faïences.
2. **La microfibre de bambou activée** limitant par 5 la consommation d'eau pure.
3. **Le savon noir de Marseille liquide** pour nourrir en douceur les carreaux de sol.

*Note de l'assistant : Vous pouvez imprimer ce cahier des charges et le transmettre à votre majordome ou intervenant ÉclatNet pour garantir un service conforme à vos exigences.*`;

    return res.json({ text: fallbackResponse });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Tu es le Directeur de la Qualité et de la Relation Client d'ÉclatNet, une prestigieuse entreprise française de conciergerie et services de ménage de luxe à domicile. Tu t'exprimes avec un style littéraire soigné, poli, précis, et haut de gamme. Chaque plan généré doit ressembler à un menu de services d'un grand hôtel parisien.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Plan Error:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la génération de votre plan personnalisé.", details: error.message });
  }
});

// 3. Intelligent Cleaning, Stain & Organic Tips Assistant (Chat session using Gemini)
app.post("/api/gemini/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Format de messages invalide." });
  }

  const ai = getAI();
  if (!ai) {
    // Elegant fallbacks for dynamic conversation when key is offline
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    let responseText = "Bonjour ! Je suis l'expert ÉclatNet. Comment puis-je vous aider aujourd'hui dans l'organisation de votre ménage ou l'entretien d'une surface délicate ?";

    const query = lastUserMessage.toLowerCase();
    if (query.includes("tache") || query.includes("stain") || query.includes("enlever")) {
      responseText = `### 🍷 Guide d'urgence ÉclatNet : Traitement des taches rebelles

Pour détacher en toute sécurité sans agresser vos fibres précieuses :

1. **Sur du marbre ou de la pierre naturelle** (matières calcaires sensibles) :
   - Évitez absolument le citron ou le vinaigre.
   - Appliquez une pâte de **bicarbonate de soude** mélangée à un peu d'eau. Laissez agir sous film plastique pendant 2 heures, puis essuyez délicatement à la microfibre mouillée.

2. **Tache de vin rouge sur tapis ou canapé** :
   - Épongez immédiatement le surplus (ne frottez jamais pour éviter de fixer les tannins !).
   - Saupoudrez généreusement de **terre de Sommières** ou, à défaut, d'amidon (maïzena). Laissez sécher puis aspirez. 

3. **Chocolat ou graisse sur lin ou coton** :
   - Appliquez un peu de **savon de Marseille pur** à peine humide sur la tache. Laissez poser 10 minutes avant de passer en machine.

Avez-vous une autre matière ou un type de tache spécifique de prévue ? Je reste à votre service.`;
    } else if (query.includes("produit") || query.includes("bio") || query.includes("naturel") || query.includes("écologique")) {
      responseText = `### 🌿 Notre Recette Secrète d'Entretien Multi-Surfaces Éco-Lux

Dites adieu aux solvants chimiques ! Voici notre formule fétiche élaborée par nos gouvernants de maison :

- **450ml d'Eau déminéralisée** (évite tout dépôt calcaire sur vos verres ou miroirs)
- **45ml de Vinaigre blanc d'alcool** (désinfectant d'origine naturelle doux)
- **1 cuillère à café rase de Bicarbonate de soude** (stabilisant de pH alcalin)
- **6 gouttes d'Huile essentielle de pin sylvestre** ou de verveine (apporte une fraîcheur alpine raffinée)

*Préparation :* Mélangez doucement dans un flacon vaporisateur. Ce produit brille particulièrement sur les robinetteries, plans de travail, miroirs et vitres.

Souhaitez-vous d'autres recettes de produits ménagers maison raffinés ?`;
    } else if (query.includes("devis") || query.includes("tarif") || query.includes("prix")) {
      responseText = `### 💶 Tarification Transparentes & Éco-Avantages

Nos tarifs reflètent l'engagement, la formation de nos collaborateurs et leur couverture d'assurance de premier ordre :

- **Formule Confort (Hebdomadaire)** : à partir de **24,90 € HT / heure** *(soit seulement 12,45 € après crédit d'impôt de 50% en France)*.
- **Formule Prestige (Grand Nettoyage)** : sur devis, à partir de **29,90 € HT / heure**.
- **Nettoyage de Vitres Spécialisé** : tarifs au mètre carré vitré.

Vous pouvez utiliser notre **Calculateur de Devis** direct et interactif sur notre site pour obtenir un prix précis en temps réel !`;
    } else {
      responseText = `Merci pour votre question ! En tant qu'expert en entretien d'art et gouvernance de maison ÉclatNet, je vous conseille de toujours privilégier un dépoussiérage à sec avant toute application de liquide pour éviter l'effet "boue" de poussière microscopique.

Avez-vous une pièce en particulier (un salon en parquet, une cuisine laquée, un dressing) pour lequel vous désirez un conseil de nettoyage d'élite ?`;
    }

    return res.json({ text: responseText });
  }

  try {
    // Adapt standard history array to Gemini structure
    // gemini-3.5-flash uses contents array [ { role: "user" | "model", parts: [{ text: "..." }] } ]
    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: "Tu es un Conseiller Expert en Art de Vivre et d'Entretien Résidentiel d'ÉclatNet. Tu es titulaire d'un brevet d'excellence de gouvernance de maison. Tu donnes des astuces d'entretien et de nettoyage impeccables, fondées sur des méthodes professionnelles (mécanique de la tache, produits naturels comme vinaigre blanc, cristaux de soude, terre de sommières, savon noir, huiles essentielles, etc.) et tu expliques les bons gestes avec élégance, patience et courtoisie. Tu t'exprimes parfaitement en français.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'appel à l'assistant d'entretien ÉclatNet.", details: error.message });
  }
});

// Vite Integration inside Express Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Mount Vite middleware so it serves files under development
    app.use(vite.middlewares);
    console.log("Started Vite Server integrated with Express API endpoints (Development mode)");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production files from 'dist' directory");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
