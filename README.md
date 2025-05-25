# Code-wallet

Code Wallet est une application de gestion de fragments de code avec une interface moderne de type "bento". Elle permet de centraliser et d'organiser vos snippets de code pour accélérer votre développement au quotidien.

## 🚀 Fonctionnalités

- ✨ Interface moderne avec design bento
- 📝 Gestion de fragments de code
- 🏷️ Système de tags
- 🌓 Mode sombre/clair
- 🔍 Recherche avancée
- ⌨️ Raccourcis clavier
- 🖱️ Glisser-déposer
- 🎨 Coloration syntaxique

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm (inclus avec Node.js)

## 🛠️ Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/steven200294/Code-wallet.git
cd Code-wallet
```

2. Installez les dépendances :
```bash
npm install
```

## 🚀 Démarrage

Pour lancer l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse indiquée dans votre terminal.

## 🏗️ Structure du Projet

```
my-new-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Barre de navigation et contrôles
│   │   ├── FragmentsPage.jsx  # Vue principale des snippets
│   │   ├── FormPage.jsx       # Formulaire d'ajout/édition
│   │   ├── TagsPage.jsx       # Gestion des tags
│   │   ├── InfoPage.jsx       # Informations sur l'application
│   │   └── CodeModal.jsx      # Modal d'affichage du code
│   ├── app.jsx               # Composant principal
│   └── index.css            # Styles globaux
├── package.json
└── README.md
```

## 🎯 Utilisation

1. **Ajouter un nouveau snippet** :
   - Cliquez sur le bouton "New" dans l'en-tête
   - Remplissez le formulaire avec votre code
   - Ajoutez des tags pour organiser vos snippets

2. **Rechercher des snippets** :
   - Utilisez la barre de recherche
   - Filtrez par tags
   - Naviguez dans la vue en grille

3. **Gérer les tags** :
   - Accédez à la page Tags
   - Créez, modifiez ou supprimez des tags
   - Visualisez les snippets associés

## ⌨️ Raccourcis Clavier

- `Ctrl + N` : Nouveau snippet
- `Ctrl + F` : Recherche
- `Ctrl + D` : Basculer le mode sombre
- `Échap` : Fermer les modales

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
