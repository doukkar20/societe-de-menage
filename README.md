# ✨ ÉclatNet — Plateforme d'Entretien Résidentiel d'Élite

ÉclatNet est une plateforme web haut de gamme dédiée aux services de ménage et d'entretien résidentiel d'élite. Elle comprend un simulateur de devis interactif extrêmement précis et un assistant d'entretien intelligent alimenté par l'IA (Gemini).

---

## 🚀 Comment déployer votre site en ligne et créer un lien public

Pour obtenir un lien public fonctionnel de votre site web, vous avez deux options idéales :

### Option A : Déploiement Statique Gratuit sur GitHub Pages (Recommandé)
Cette méthode est entièrement gratuite, hébergée par GitHub et configurée automatiquement grâce au fichier de workflow que nous venons de créer.

#### Étape 1 : Créer votre dépôt sur GitHub
1. Connectez-vous sur votre compte [GitHub](https://github.com).
2. Créez un nouveau dépôt public (ex: `eclatnet-prestige`).
3. Poussez votre code local vers ce dépôt :
   ```bash
   git init
   git add .
   git commit -m "Initial commit with GitHub Pages deploy workflow"
   git branch -M main
   git remote add origin https://github.com/VOTRE_PSEUDO/eclatnet-prestige.git
   git push -u origin main
   ```

#### Étape 2 : Activer le déploiement sur GitHub
1. Allez dans les **Settings** (Paramètres) de votre dépôt GitHub.
2. Dans le menu de gauche, cliquez sur **Actions** > **General**.
3. Faites défiler vers le bas jusqu'à **Workflow permissions** (Autorisations de flux de travail) et cochez **Read and write permissions** (Autorisations d'écriture et de lecture). Sauvegardez.
4. Dans le menu de gauche, cliquez sur **Pages**.
5. Sous **Build and deployment** > **Source**, sélectionnez **Deploy from a branch**.
6. Sous **Branch**, sélectionnez la branche `gh-pages` (qui sera créée automatiquement après le premier build réussi) et le dossier `/ (root)`, puis sauvegardez.
7. Allez dans l'onglet **Actions** de votre dépôt pour suivre l'avancement du build. Une fois terminé, GitHub vous affichera votre lien live officiel : 
   `https://VOTRE_PSEUDO.github.io/eclatnet-prestige/`

*Note : Grâce à notre architecture robuste de fallback, même sans serveur distant actif, l'assistant chat et la génération de cahier des charges s'exécutent de façon autonome avec des conseils d'entretien d'expert pré-intégrés.*

---

### Option B : Déploiement Full-Stack avec IA active (Render / Cloud Run)
Si vous souhaitez que l'assistant virtuel passe de vrais appels en temps réel à l'API **Gemini**, vous pouvez déployer l'application complète (incluant le serveur Node.js/Express) sur un hébergement full-stack gratuit ou abordable.

#### Déploiement rapide sur Render.com (Gratuit & Simple) :
1. Créez un compte gratuit sur [Render](https://render.com).
2. Cliquez sur **New +** > **Web Service**.
3. Connectez votre dépôt GitHub `eclatnet-prestige`.
4. Configurez les paramètres suivants :
   - **Environment** : `Node`
   - **Build Command** : `npm run build`
   - **Start Command** : `npm start`
5. Dans l'onglet **Environment**, ajoutez votre variable d'environnement :
   - `GEMINI_API_KEY` : *Votre clef secrète Gemini API*
6. Cliquez sur **Deploy Web Service**. Render va créer un lien public gratuit supportant l'API complète en temps réel !

---

## 🛠️ Développement Local

Pour démarrer et peaufiner votre site en local :

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Créez un fichier `.env` à la racine et renseignez votre clef :
   ```env
   GEMINI_API_KEY=votre_clef_api_ici
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. Ouvrez votre navigateur sur `http://localhost:3000`.
