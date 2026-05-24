var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      console.warn("GEMINI_API_KEY is not defined. Using highly optimized server-side template/fallback engine.");
      return null;
    }
    try {
      aiClient = new import_genai.GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
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
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  });
});
app.post("/api/gemini/plan", async (req, res) => {
  const { squareMeters, frequency, roomsSelected, specialInstructions, petPresence, priorityAreas } = req.body;
  const prompt = `G\xE9n\xE8re un cahier des charges et un plan d'entretien m\xE9nager premium personnalis\xE9 pour une maison/appartement avec les d\xE9tails suivants :
  - Superficie : ${squareMeters} m\xB2
  - Fr\xE9quence recommand\xE9e : ${frequency}
  - Pi\xE8ces prioritaires s\xE9lectionn\xE9es : ${roomsSelected?.join(", ") || "Toutes"}
  - Pr\xE9sence d'animaux : ${petPresence ? "Oui" : "Non"}
  - Zones ou exigences prioritaires : ${priorityAreas || "Aucune sp\xE9cifi\xE9e"}
  - Instructions particuli\xE8res : ${specialInstructions || "Aucune"}

  Le ton doit \xEAtre extr\xEAmement professionnel, chaleureux, rassurant et expert (haut de gamme). R\xE9ponds enti\xE8rement en fran\xE7ais.
  Structure ton plan de nettoyage de mani\xE8re claire et \xE9l\xE9gante \xE0 l'aide de Markdown, en cr\xE9ant les sections suivantes :
  1. \u{1F31F} **Introduction exclusive** : Un mot d'accueil personnalis\xE9 saluant le projet de nettoyage.
  2. \u{1F4DD} **Cahier des charges pi\xE8ce par pi\xE8ce** : Sp\xE9cification des t\xE2ches pr\xE9cises \xE0 accomplir dans chaque zone phare choisie (${roomsSelected?.join(", ") || "zones de vie"}), en insistant sur notre approche qualit\xE9 (m\xE9thode de micro-aspiration, d\xE9sinfection des points de contact, traitement \xE9cologique de surface).
  3. \u23F1\uFE0F **Estimation du temps n\xE9cessaire et recommandation de fr\xE9quence** : Analyse de la faisabilit\xE9 et du nombre d'heures conseill\xE9 pour notre personnel de m\xE9nage d'\xE9lite.
  4. \u{1F33F} **L'approche \xE9co-responsable pr\xE9conis\xE9e** : Quels produits doux et naturels (vinaigre de cidre bio infus\xE9, bicarbonate de chaux, vapeur d'eau pure contract\xE9e) nous conseillons d'utiliser pour leurs surfaces sp\xE9cifiques, surtout s'il y a des enfants ou des animaux (${petPresence ? "comme c'est le cas ici avec leur animal domestique" : ""}).
  5. Checklist interactive ou tableau des t\xE2ches prioritaires.`;
  const ai = getAI();
  if (!ai) {
    const fallbackResponse = `### \u{1F31F} Votre Plan d'Entretien Sur-Mesure \xC9clatNet
*(G\xE9n\xE9r\xE9 \xE0 partir de notre protocole d'excellence)*

Bienvenue dans votre programme personnalis\xE9 d'entretien d'\xE9lite. Suite aux d\xE9tails transmis, nos experts en h\xF4tellerie de maison ont con\xE7u un plan adapt\xE9 \xE0 votre demeure de **${squareMeters} m\xB2**.

---

### \u{1F4DD} Cahier des charges pi\xE8ce par pi\xE8ce

${roomsSelected && roomsSelected.length > 0 ? roomsSelected.map((room) => `#### \u{1F9F9} Nettoyage de Prestige : ${room}
- **Aspiration de pr\xE9cision** : D\xE9poussi\xE9rage m\xE9ticuleux des plinthes, des angles et sous les meubles avec t\xEAtes d'aspiration douce en microfibres.
- **D\xE9sinfection des points de contact** : Interrupteurs, poign\xE9es de porte, rampes d'escalier trait\xE9s avec notre d\xE9sinfectant certifi\xE9 bio.
- **Lavage des sols** : Passage d'un balai vapeur ou d'un applicateur plat l\xE9g\xE8rement humidifi\xE9 selon le mat\xE9riau (parquet cir\xE9, carrelage en gr\xE8s ou pierre naturelle).
- **A\xE9ration** : Ventilation forc\xE9e durant le nettoyage pour purifier l'air ambiant.`).join("\n\n") : `#### \u{1F6CB}\uFE0F S\xE9lection de zones de vie
- **Entretien g\xE9n\xE9ral des chambres et salon** : Aspiration de pr\xE9cision, d\xE9poussi\xE9rage des luminaires complexes et des objets d'art, polissage des bois pr\xE9cieux.
- **Zone Cuisine & Repas** : Lavage ext\xE9rieur de l'\xE9lectrom\xE9nager, d\xE9graissage doux des cr\xE9dences, nettoyage des plans de travail et de l'\xE9vier.
- **Espaces Sanitaires** : D\xE9tartrage complet de la robinetterie en chrome, d\xE9sinfection et polissage des c\xE9ramiques, s\xE9chage sans trace.`}

---

### \u23F1\uFE0F Estimation de temps & Proposition Executive

- **Volume estim\xE9** : **3 heures \xE0 4h30 par intervention**
- **Rythme propos\xE9** : **Fr\xE9quence ${frequency === "weekly" ? "Hebdomadaire (Recommand\xE9)" : frequency === "biweekly" ? "Toutes les deux semaines" : frequency === "monthly" ? "Mensuel" : "Ponctuel"}**
- **Priorit\xE9 d\xE9finie** : ${priorityAreas || "Nettoyage g\xE9n\xE9ral rigoureux"}
${petPresence ? "- \u{1F43E} **Alerte poils d'animaux** : Utilisation d'extracteurs d'aspiration de classe h\xE9patique pour une filtration mol\xE9culaire totale des allerg\xE8nes." : ""}

---

### \u{1F33F} L'Approche \xC9co-Responsable \xC9clatNet
Pour votre demeure, nous pr\xE9conisons :
1. **L'acide citrique naturel** pour la brillance \xE9clatante de vos fa\xEFences.
2. **La microfibre de bambou activ\xE9e** limitant par 5 la consommation d'eau pure.
3. **Le savon noir de Marseille liquide** pour nourrir en douceur les carreaux de sol.

*Note de l'assistant : Vous pouvez imprimer ce cahier des charges et le transmettre \xE0 votre majordome ou intervenant \xC9clatNet pour garantir un service conforme \xE0 vos exigences.*`;
    return res.json({ text: fallbackResponse });
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Tu es le Directeur de la Qualit\xE9 et de la Relation Client d'\xC9clatNet, une prestigieuse entreprise fran\xE7aise de conciergerie et services de m\xE9nage de luxe \xE0 domicile. Tu t'exprimes avec un style litt\xE9raire soign\xE9, poli, pr\xE9cis, et haut de gamme. Chaque plan g\xE9n\xE9r\xE9 doit ressembler \xE0 un menu de services d'un grand h\xF4tel parisien.",
        temperature: 0.7
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Plan Error:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la g\xE9n\xE9ration de votre plan personnalis\xE9.", details: error.message });
  }
});
app.post("/api/gemini/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Format de messages invalide." });
  }
  const ai = getAI();
  if (!ai) {
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    let responseText = "Bonjour ! Je suis l'expert \xC9clatNet. Comment puis-je vous aider aujourd'hui dans l'organisation de votre m\xE9nage ou l'entretien d'une surface d\xE9licate ?";
    const query = lastUserMessage.toLowerCase();
    if (query.includes("tache") || query.includes("stain") || query.includes("enlever")) {
      responseText = `### \u{1F377} Guide d'urgence \xC9clatNet : Traitement des taches rebelles

Pour d\xE9tacher en toute s\xE9curit\xE9 sans agresser vos fibres pr\xE9cieuses :

1. **Sur du marbre ou de la pierre naturelle** (mati\xE8res calcaires sensibles) :
   - \xC9vitez absolument le citron ou le vinaigre.
   - Appliquez une p\xE2te de **bicarbonate de soude** m\xE9lang\xE9e \xE0 un peu d'eau. Laissez agir sous film plastique pendant 2 heures, puis essuyez d\xE9licatement \xE0 la microfibre mouill\xE9e.

2. **Tache de vin rouge sur tapis ou canap\xE9** :
   - \xC9pongez imm\xE9diatement le surplus (ne frottez jamais pour \xE9viter de fixer les tannins !).
   - Saupoudrez g\xE9n\xE9reusement de **terre de Sommi\xE8res** ou, \xE0 d\xE9faut, d'amidon (ma\xEFzena). Laissez s\xE9cher puis aspirez. 

3. **Chocolat ou graisse sur lin ou coton** :
   - Appliquez un peu de **savon de Marseille pur** \xE0 peine humide sur la tache. Laissez poser 10 minutes avant de passer en machine.

Avez-vous une autre mati\xE8re ou un type de tache sp\xE9cifique de pr\xE9vue ? Je reste \xE0 votre service.`;
    } else if (query.includes("produit") || query.includes("bio") || query.includes("naturel") || query.includes("\xE9cologique")) {
      responseText = `### \u{1F33F} Notre Recette Secr\xE8te d'Entretien Multi-Surfaces \xC9co-Lux

Dites adieu aux solvants chimiques ! Voici notre formule f\xE9tiche \xE9labor\xE9e par nos gouvernants de maison :

- **450ml d'Eau d\xE9min\xE9ralis\xE9e** (\xE9vite tout d\xE9p\xF4t calcaire sur vos verres ou miroirs)
- **45ml de Vinaigre blanc d'alcool** (d\xE9sinfectant d'origine naturelle doux)
- **1 cuill\xE8re \xE0 caf\xE9 rase de Bicarbonate de soude** (stabilisant de pH alcalin)
- **6 gouttes d'Huile essentielle de pin sylvestre** ou de verveine (apporte une fra\xEEcheur alpine raffin\xE9e)

*Pr\xE9paration :* M\xE9langez doucement dans un flacon vaporisateur. Ce produit brille particuli\xE8rement sur les robinetteries, plans de travail, miroirs et vitres.

Souhaitez-vous d'autres recettes de produits m\xE9nagers maison raffin\xE9s ?`;
    } else if (query.includes("devis") || query.includes("tarif") || query.includes("prix")) {
      responseText = `### \u{1F4B6} Tarification Transparentes & \xC9co-Avantages

Nos tarifs refl\xE8tent l'engagement, la formation de nos collaborateurs et leur couverture d'assurance de premier ordre :

- **Formule Confort (Hebdomadaire)** : \xE0 partir de **24,90 \u20AC HT / heure** *(soit seulement 12,45 \u20AC apr\xE8s cr\xE9dit d'imp\xF4t de 50% en France)*.
- **Formule Prestige (Grand Nettoyage)** : sur devis, \xE0 partir de **29,90 \u20AC HT / heure**.
- **Nettoyage de Vitres Sp\xE9cialis\xE9** : tarifs au m\xE8tre carr\xE9 vitr\xE9.

Vous pouvez utiliser notre **Calculateur de Devis** direct et interactif sur notre site pour obtenir un prix pr\xE9cis en temps r\xE9el !`;
    } else {
      responseText = `Merci pour votre question ! En tant qu'expert en entretien d'art et gouvernance de maison \xC9clatNet, je vous conseille de toujours privil\xE9gier un d\xE9poussi\xE9rage \xE0 sec avant toute application de liquide pour \xE9viter l'effet "boue" de poussi\xE8re microscopique.

Avez-vous une pi\xE8ce en particulier (un salon en parquet, une cuisine laqu\xE9e, un dressing) pour lequel vous d\xE9sirez un conseil de nettoyage d'\xE9lite ?`;
    }
    return res.json({ text: responseText });
  }
  try {
    const contents = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: "Tu es un Conseiller Expert en Art de Vivre et d'Entretien R\xE9sidentiel d'\xC9clatNet. Tu es titulaire d'un brevet d'excellence de gouvernance de maison. Tu donnes des astuces d'entretien et de nettoyage impeccables, fond\xE9es sur des m\xE9thodes professionnelles (m\xE9canique de la tache, produits naturels comme vinaigre blanc, cristaux de soude, terre de sommi\xE8res, savon noir, huiles essentielles, etc.) et tu expliques les bons gestes avec \xE9l\xE9gance, patience et courtoisie. Tu t'exprimes parfaitement en fran\xE7ais.",
        temperature: 0.7
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'appel \xE0 l'assistant d'entretien \xC9clatNet.", details: error.message });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Started Vite Server integrated with Express API endpoints (Development mode)");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
    console.log("Serving static production files from 'dist' directory");
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started and listening on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
