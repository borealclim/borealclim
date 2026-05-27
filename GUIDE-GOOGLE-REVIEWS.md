# Guide : Connecter les Vrais Avis Google

## 🎯 Objectif

Afficher automatiquement vos vrais avis Google sur votre site web, avec défilement automatique.

## ✅ Ce Qui a Été Fait

✅ Code JavaScript intégré pour récupérer les avis Google
✅ Animation de défilement automatique conservée
✅ Système de fallback (avis actuels si erreur)
✅ Filtrage automatique (seulement 4-5 étoiles)
✅ Mise à jour automatique du Schema.org pour le SEO

## 📋 Prérequis

1. **Avoir un profil Google Business Profile** (anciennement Google My Business)
2. **Avoir au moins quelques avis Google** (idéalement 5-10 avis)
3. **15-30 minutes** pour la configuration initiale

---

## 🚀 Étapes de Configuration

### Étape 1 : Créer une Clé API Google (GRATUIT)

#### 1.1 Aller sur Google Cloud Console

1. Allez sur : https://console.cloud.google.com/
2. Connectez-vous avec votre compte Google (celui de votre entreprise de préférence)
3. Acceptez les conditions si demandé

#### 1.2 Créer un Nouveau Projet

1. Cliquez sur le menu déroulant en haut (à côté de "Google Cloud")
2. Cliquez sur **"Nouveau projet"**
3. Nom du projet : `Boreal Clim Website`
4. Cliquez sur **"Créer"**
5. Attendez quelques secondes que le projet se crée

#### 1.3 Activer l'API Places

1. Dans le menu de gauche, allez dans **"API et services"** > **"Bibliothèque"**
2. Cherchez : `Places API`
3. Cliquez sur **"Places API"**
4. Cliquez sur le bouton **"ACTIVER"**
5. Attendez que l'API soit activée

#### 1.4 Créer une Clé API

1. Dans le menu de gauche, allez dans **"API et services"** > **"Identifiants"**
2. Cliquez sur **"+ CRÉER DES IDENTIFIANTS"** en haut
3. Choisissez **"Clé API"**
4. Une fenêtre s'ouvre avec votre clé API
5. **⚠️ IMPORTANT** : Copiez cette clé quelque part (vous en aurez besoin)
6. Cliquez sur **"RESTREINDRE LA CLÉ"** (très important pour la sécurité)

#### 1.5 Restreindre la Clé API (SÉCURITÉ)

**C'est CRUCIAL pour éviter que quelqu'un vole votre clé et génère des frais !**

1. Dans "Restrictions applicatives", choisissez **"Références HTTP (sites web)"**
2. Cliquez sur **"Ajouter un élément"**
3. Ajoutez vos domaines autorisés :
   - `https://www.borealclim.fr/*`
   - `http://localhost/*` (pour tester en local)
   - Si vous avez un autre domaine, ajoutez-le aussi

4. Dans "Restrictions d'API", choisissez **"Restreindre la clé"**
5. Sélectionnez **"Places API"** dans la liste
6. Cliquez sur **"ENREGISTRER"**

---

### Étape 2 : Trouver votre Place ID Google

Le Place ID est l'identifiant unique de votre entreprise sur Google.

#### Méthode 1 : Utiliser l'outil officiel Google (RECOMMANDÉ)

1. Allez sur : https://developers.google.com/maps/documentation/places/web-service/place-id
2. Cliquez sur **"Place ID Finder"** ou cherchez "Find a Place ID"
3. Dans la barre de recherche, tapez : `Boreal Clim`
4. Sélectionnez votre entreprise dans les résultats
5. Le **Place ID** s'affiche (ressemble à : `ChIJxxxxxxxxxxxxx`)
6. Copiez-le

#### Méthode 2 : Via votre profil Google Business

1. Allez sur : https://business.google.com
2. Sélectionnez votre entreprise
3. Dans l'URL, vous trouverez un identifiant
4. Utilisez plutôt la Méthode 1 qui est plus simple

#### Méthode 3 : Recherche manuelle

1. Cherchez votre entreprise sur Google Maps
2. Cliquez sur votre entreprise
3. Regardez l'URL : `https://www.google.com/maps/place/...`
4. Utilisez plutôt la Méthode 1 qui est plus simple

---

### Étape 3 : Configurer le Site Web

#### 3.1 Ouvrir le fichier `index.html`

Cherchez ces lignes (vers le début du fichier, après les `<meta>` tags) :

```html
<!-- Google Reviews Configuration -->
<script>
    // Configuration pour les avis Google
    // IMPORTANT: Remplacez 'VOTRE_CLE_API_GOOGLE' par votre vraie clé API Google Places
    window.GOOGLE_CONFIG = {
        apiKey: 'VOTRE_CLE_API_GOOGLE', // À remplacer
        placeId: 'VOTRE_PLACE_ID_GOOGLE', // À remplacer (trouvé dans Google Business Profile)
        enableRealReviews: false // Mettre 'true' une fois la configuration faite
    };
</script>
```

#### 3.2 Remplacer les Valeurs

**AVANT :**
```javascript
window.GOOGLE_CONFIG = {
    apiKey: 'VOTRE_CLE_API_GOOGLE',
    placeId: 'VOTRE_PLACE_ID_GOOGLE',
    enableRealReviews: false
};
```

**APRÈS (exemple) :**
```javascript
window.GOOGLE_CONFIG = {
    apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Votre vraie clé API
    placeId: 'ChIJxxxxxxxxxxxxxxxxxxxxxx', // Votre vrai Place ID
    enableRealReviews: true // Activé !
};
```

#### 3.3 Sauvegarder le Fichier

Sauvegardez `index.html` et uploadez-le sur votre serveur web.

---

### Étape 4 : Tester

1. Ouvrez votre site : https://www.borealclim.fr
2. Ouvrez la console développeur :
   - **Chrome/Edge** : Appuyez sur `F12` ou `Ctrl+Shift+J`
   - **Firefox** : Appuyez sur `F12` ou `Ctrl+Shift+K`
3. Regardez les messages dans la console :

**✅ Si ça marche :**
```
Google Places API loaded, fetching reviews...
Reviews fetched successfully: {...}
Displayed 6 Google reviews
```

**❌ Si erreur :**
```
Error fetching Google reviews: PERMISSION_DENIED
```
→ Vérifiez les restrictions de votre clé API

```
⚠️ Clé API Google non configurée
```
→ Vous avez oublié de remplacer la clé API

---

## 💡 Comment Ça Marche

1. **Chargement de la page** → Le site vérifie si les avis Google sont activés
2. **Si activé** → Appel à l'API Google Places avec votre Place ID
3. **Récupération des avis** → L'API renvoie tous vos avis Google
4. **Filtrage** → Le code garde seulement les avis 4-5 étoiles
5. **Tri** → Les meilleurs avis (5 étoiles) sont affichés en premier
6. **Affichage** → Les avis remplacent les avis fictifs actuels
7. **Animation** → Le défilement automatique continue de fonctionner
8. **SEO** → Le rating moyen est mis à jour dans Schema.org

---

## 🎨 Personnalisation

### Nombre d'Avis Affichés

Par défaut : **6 avis**

Pour changer, éditez `script.js` ligne ~266 :
```javascript
.slice(0, 6); // Changer 6 par le nombre voulu
```

### Note Minimum

Par défaut : **4 étoiles minimum**

Pour changer, éditez `script.js` ligne ~264 :
```javascript
.filter(review => review.rating >= 4) // Changer 4 par 3 ou 5
```

### Longueur du Texte

Par défaut : **200 caractères maximum**

Pour changer, éditez `script.js` ligne ~289 :
```javascript
const shortText = text.length > 200 ? text.substring(0, 200) + '...' : text;
// Changer 200 par la longueur voulue
```

---

## 💰 Coûts et Quotas

### Quota Gratuit Google Places API

Google offre **GRATUITEMENT** :
- **$200 de crédit par mois**
- Équivalent à environ **100 000 requêtes/mois** pour Places API

### Estimation pour Boreal Clim

- **1 visiteur** = **1 requête**
- Si vous avez **1000 visiteurs/mois** = **1000 requêtes**
- Coût : **$0** (bien en dessous du quota gratuit)

**Même avec 10 000 visiteurs/mois, vous restez dans le quota gratuit !**

### Optimisation

Le code charge les avis **1 seule fois par visite**, pas à chaque page. C'est optimisé.

---

## 🔒 Sécurité

### ✅ Ce Qui Est Sécurisé

- ✅ Clé API restreinte par domaine (seulement borealclim.fr peut l'utiliser)
- ✅ Clé API restreinte à Places API uniquement
- ✅ Pas d'exposition de données sensibles
- ✅ Fallback en cas d'erreur (avis fictifs)

### ⚠️ Attention

**NE JAMAIS** :
- ❌ Partager votre clé API publiquement
- ❌ Mettre votre clé API sur GitHub sans restrictions
- ❌ Utiliser la même clé API pour plusieurs projets

**TOUJOURS** :
- ✅ Restreindre votre clé API par domaine ET par API
- ✅ Surveiller l'utilisation dans Google Cloud Console
- ✅ Créer une alerte si dépassement du quota gratuit

---

## 🛠️ Dépannage

### Problème : "Avis Google désactivés"

**Console :**
```
ℹ️ Avis Google désactivés
```

**Solution :**
- Vérifiez que `enableRealReviews: true` dans `index.html`

---

### Problème : "Clé API non configurée"

**Console :**
```
⚠️ Clé API Google non configurée
```

**Solution :**
- Remplacez `VOTRE_CLE_API_GOOGLE` par votre vraie clé API

---

### Problème : "Place ID non configuré"

**Console :**
```
⚠️ Place ID Google non configuré
```

**Solution :**
- Remplacez `VOTRE_PLACE_ID_GOOGLE` par votre vrai Place ID

---

### Problème : "PERMISSION_DENIED"

**Console :**
```
Error fetching Google reviews: PERMISSION_DENIED
```

**Causes possibles :**
1. Clé API pas activée pour Places API
2. Clé API restreinte au mauvais domaine
3. Clé API pas créée correctement

**Solutions :**
1. Vérifiez que Places API est bien activée dans Google Cloud Console
2. Vérifiez les restrictions de domaine de votre clé API
3. Re-créez une nouvelle clé API si nécessaire

---

### Problème : "REQUEST_DENIED"

**Console :**
```
Error fetching Google reviews: REQUEST_DENIED
```

**Causes possibles :**
1. La facturation n'est pas activée sur Google Cloud
2. L'API Places n'est pas activée

**Solution :**
1. Allez dans Google Cloud Console
2. Activez la facturation (ne vous inquiétez pas, c'est gratuit jusqu'à $200/mois)
3. Vérifiez que Places API est activée

---

### Problème : "INVALID_REQUEST"

**Console :**
```
Error fetching Google reviews: INVALID_REQUEST
```

**Cause :**
- Place ID incorrect

**Solution :**
- Vérifiez votre Place ID avec l'outil Google Place ID Finder

---

### Problème : Pas d'avis affichés

**Console :**
```
No reviews found, keeping existing ones
```

**Causes possibles :**
1. Votre entreprise n'a pas d'avis Google
2. Aucun avis ne correspond au filtre (4-5 étoiles)

**Solutions :**
1. Vérifiez sur Google Maps si votre entreprise a des avis
2. Demandez à vos clients de laisser des avis !
3. Réduisez le filtre à 3 étoiles minimum (voir Personnalisation)

---

## 📱 Test Rapide

### Vérifier que tout fonctionne

1. Ouvrez la console (F12)
2. Tapez :
```javascript
window.GOOGLE_CONFIG
```
3. Vous devriez voir :
```javascript
{
  apiKey: "AIzaSy...",
  placeId: "ChIJ...",
  enableRealReviews: true
}
```

---

## 🔄 Mise à Jour Automatique

Les avis sont récupérés **à chaque visite** d'un utilisateur. Donc si vous recevez de nouveaux avis Google, ils apparaîtront automatiquement sur le site !

**Aucune action manuelle nécessaire** 🎉

---

## 📊 Suivi de l'Utilisation

1. Allez sur Google Cloud Console : https://console.cloud.google.com/
2. Sélectionnez votre projet "Boreal Clim Website"
3. Menu de gauche : **"API et services"** > **"Tableau de bord"**
4. Vous verrez le nombre de requêtes par jour/mois

**Recommandation** : Vérifiez une fois par mois.

---

## ✅ Checklist Finale

### Avant l'Activation

- [ ] Clé API créée
- [ ] Places API activée
- [ ] Clé API restreinte (domaine + API)
- [ ] Place ID trouvé
- [ ] `index.html` modifié avec clé API et Place ID
- [ ] `enableRealReviews` mis à `true`
- [ ] Fichier uploadé sur le serveur

### Après l'Activation

- [ ] Page web chargée sans erreur
- [ ] Console affiche "Reviews fetched successfully"
- [ ] Avis Google visibles sur le site
- [ ] Animation de défilement fonctionne
- [ ] Test sur mobile

---

## 🎉 C'est Fait !

Une fois configuré, vos **vrais avis Google** s'afficheront automatiquement sur votre site avec l'animation de défilement !

Les nouveaux avis apparaîtront automatiquement sans aucune action de votre part.

---

## 💬 Support

### Besoin d'Aide ?

1. Vérifiez le **Dépannage** ci-dessus
2. Consultez les logs dans la console (F12)
3. Vérifiez votre configuration Google Cloud Console

### Ressources Utiles

- **Google Cloud Console** : https://console.cloud.google.com/
- **Place ID Finder** : https://developers.google.com/maps/documentation/places/web-service/place-id
- **Documentation Places API** : https://developers.google.com/maps/documentation/places/web-service/overview

---

**Dernière mise à jour : Octobre 2024**
