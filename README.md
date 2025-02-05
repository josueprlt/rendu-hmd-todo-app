# Projet rendu-hmd-todo-app

## Prérequis
Assurez-vous d'avoir installé les outils suivants sur votre machine :
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation et lancement

### Frontend
1. Accédez au dossier du frontend :
   ```sh
   cd frontend
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```
3. Démarrez le serveur de développement :
   ```sh
   npm run dev
   ```

### Backend
1. Accédez au dossier du backend :
   ```sh
   cd backend
   ```
2. Installez les dépendances nécessaires :
   ```sh
   npm install @prisma/client
   ```
3. Démarrez le serveur backend :
   ```sh
   npm run start
   ```

## Technologies utilisées
- Frontend : React / Next.js
- Backend : Node.js / Prisma
- Base de données : SQL

## Bilan

### Fonctionnalités fonctionnelles
- Création d'un tâche
- Suppression d'un tâche

### Décisions
J'ai décidé d'utiliser votre projet que vous m'avez transmis.
Concernant la base de données, j'ai opté pour le service WAMP, qui me semblait le plus adapté à cette situation. J'aurais également pu mettre en place un conteneur Docker.

### Problèmes rencontrés
J'ai rencontré des difficultés lors de la mise en place du projet. N'ayant jamais utilisé Prisma auparavant, il m'a fallu du temps pour le faire fonctionner correctement.
Cette étape m'a pris beaucoup de temps, ce qui ne m'a pas permis d'implémenter la fonctionnalité de modification d'une tâche. J'ai rencontré un problème de requête que je n'ai pas eu le temps de résoudre.
Cependant, j'ai tout de même réussi à mettre en place la création et la suppression d'une tâche.