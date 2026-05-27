# Boreal Clim - Site Web Statique

Site web statique pour Boreal Clim, entreprise spécialisée dans la climatisation et les pompes à chaleur en Île-de-France.

## Description

Ce site web combine le contenu de borealclim.fr avec le design moderne de climconcept77.fr, créant une expérience utilisateur professionnelle et attrayante.

## Structure du Projet

```
borealclim/
├── index.html      # Page principale avec tout le contenu
├── styles.css      # Styles avec design climconcept77
├── script.js       # Fonctionnalités JavaScript
└── README.md       # Documentation
```

## Caractéristiques

### Design
- **Palette de couleurs moderne** : Bleu primaire (#4C6FFC), jaune accent (#FFCD57), rouge secondaire (#F05C2B)
- **Typographie** : Lexend, Oswald, et Poppins pour une hiérarchie visuelle claire
- **Interface responsive** : Optimisée pour mobile, tablette et desktop
- **Animations fluides** : Transitions et effets au scroll

### Sections
1. **Hero** : Section d'accueil avec appel à l'action
2. **Services** : Installation, Dépannage, Entretien
3. **À Propos** : Présentation de l'entreprise avec statistiques
4. **Pourquoi Nous Choisir** : Points forts de Boreal Clim
5. **Contact** : Formulaire et informations de contact
6. **Footer** : Liens et informations complémentaires

### Fonctionnalités JavaScript
- Navigation mobile responsive avec menu hamburger
- Smooth scrolling pour les liens d'ancrage
- Animations au scroll avec Intersection Observer
- Mise en surbrillance automatique du menu selon la section
- Gestion du formulaire de contact
- Effets ripple sur les boutons

## Utilisation

### Ouvrir le site
Ouvrez simplement `index.html` dans votre navigateur web.

### Personnalisation

#### Modifier les couleurs
Les couleurs principales sont définies dans `styles.css` sous `:root` :
```css
--color-primary: #4C6FFC;
--color-secondary: #FFCD57;
--color-accent: #F05C2B;
```

#### Ajouter des images
1. Créez un dossier `images/`
2. Ajoutez vos images
3. Remplacez les placeholders dans `index.html`
4. Exemple : `<img src="images/logo.png" alt="Boreal Clim">`

#### Modifier le contenu
Éditez directement `index.html` pour modifier :
- Textes et descriptions
- Services proposés
- Informations de contact
- Numéros de téléphone et emails

#### Configurer le formulaire
Pour que le formulaire envoie réellement des emails, vous devez :
1. Utiliser un service backend (PHP, Node.js, etc.)
2. Ou intégrer un service tiers (FormSpree, Netlify Forms, etc.)
3. Modifier la fonction de soumission dans `script.js`

## Déploiement

Ce site statique peut être déployé sur :
- **GitHub Pages** : Gratuit et simple
- **Netlify** : Déploiement automatique avec formulaires
- **Vercel** : Performance optimale
- **Serveur web classique** : Upload via FTP

### Exemple avec GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [votre-repo]
git push -u origin main
```

Puis activez GitHub Pages dans les paramètres du repository.

## Optimisations Futures

- [ ] Ajouter de vraies images (logo, services, équipe)
- [ ] Configurer un backend pour le formulaire
- [ ] Ajouter Google Analytics
- [ ] Optimiser le SEO (meta tags, sitemap)
- [ ] Ajouter un système de chat en ligne
- [ ] Intégrer Google Maps pour la localisation
- [ ] Ajouter des témoignages clients
- [ ] Créer une galerie de réalisations

## Technologies Utilisées

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript Vanilla (ES6+)
- Google Fonts (Lexend, Oswald, Poppins)

## Compatibilité

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ✅ Mobile browsers

## Support

Pour toute question ou modification, contactez votre développeur web.

---

© 2025 Boreal Clim. Tous droits réservés.
