# 🎬 MovieStream

## Application de streaming de films avec Vue.js et Firebase

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)

Une application web moderne permettant aux utilisateurs de découvrir, rechercher et sauvegarder leurs films préférés. Construite avec Vue.js pour le frontend et Firebase pour l'authentification et le stockage des données.

## 🌟 Fonctionnalités

- 🎬 Parcourir les films populaires
- 🔍 Recherche de films
- 🏷️ Filtrage par genre
- 👤 Authentification utilisateur
- ❤️ Gestion des favoris
- 🎯 Recommandations personnalisées
- 📱 Interface responsive

## 🛠️ Technologies Utilisées

- Vue.js 3 (Composition API)
- Pinia pour la gestion d'état
- Firebase (Authentication & Firestore)
- TMDB API pour les données de films
- Vite comme outil de build

## 🚀 Installation

1. Cloner le repository
```bash
git clone https://github.com/FatoumataM-27/moviestream.git
cd moviestream
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
Créer un fichier `.env` à la racine du projet :
```env
VITE_TMDB_API_KEY=votre_clé_api_tmdb
```

4. Configurer Firebase
- Créer un projet sur Firebase Console
- Activer l'authentification par email/mot de passe
- Créer une base de données Firestore
- Mettre à jour la configuration dans `src/config/firebase.js`

5. Lancer l'application en développement
```bash
npm run dev
```

## 📁 Structure du Projet

```
src/
├── components/        # Composants réutilisables
├── config/           # Configuration (Firebase, API)
├── services/         # Services (TMDB, genres, etc.)
├── stores/           # Stores Pinia
├── views/            # Composants de pages
├── router/           # Configuration des routes
└── App.vue          # Composant racine
```

## 🌿 Branches

- `main` : Code de production
- `develop` : Branche de développement principale
- `feature/*` : Branches pour les nouvelles fonctionnalités
- `bugfix/*` : Branches pour les corrections de bugs
- `release/*` : Branches de préparation des releases

## 📝 Convention de Commits

Nous suivons la convention de commits suivante :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Changements de style
- `refactor:` Refactoring de code
- `test:` Tests
- `chore:` Tâches de maintenance

## 👥 Contribution

1. Créer une branche depuis `develop`
2. Implémenter les changements
3. Créer une Pull Request vers `develop`
4. Attendre la review et l'approbation

## 📄 Licence

MIT License
