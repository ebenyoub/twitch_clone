# Twitch Clone

Un clone de l'interface Twitch réalisé avec React, permettant de consulter les streams en direct, de parcourir les catégories et de regarder des vidéos grâce à l'API Twitch.

## Fonctionnalités

- Authentification Twitch pour récupérer un jeton d'accès et interroger l'API.
- Affichage des jeux et catégories les plus populaires.
- Navigation et consultation des streams en cours par jeu ou par streamer.
- Lecteur vidéo intégré pour visualiser le direct directement sur le site.
- Architecture avec composants React et React Router (HashRouter pour le déploiement Pages).

## Stack Technique

- React.js
- React Router Dom
- Axios (Appels à l'API Twitch)
- react-twitch-embed-video

## Installation

Pour installer le projet localement, assurez-vous d'avoir Node.js. Vous aurez besoin d'utiliser les options de legacy peer deps dues à certaines dépendances React.

```bash
npm install --legacy-peer-deps
```

## Configuration

Dans le fichier de configuration de l'API (ex: `src/api.js`), il vous faudra peut-être mettre à jour le `client_id` si celui existant venait à expirer ou pour utiliser le vôtre depuis la console développeur de Twitch.

## Compilation et Lancement

Pour lancer l'application en mode développement :

```bash
npm start
```

Pour créer le build de production :

```bash
npm run build
```

## Déploiement

Le projet est configuré pour se déployer automatiquement sur GitHub Pages via une action GitHub (`deploy-pages.yml`) à chaque push sur la branche `dev`.
