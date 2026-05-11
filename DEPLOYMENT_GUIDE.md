# 🚀 Guide de Déploiement - Zaufani Rodzina

## Vue d'ensemble

Zaufani Rodzina est une **Progressive Web App (PWA)** qui fonctionne sur tous les appareils. Elle peut être distribuée de trois façons:

1. **Web directe** - Via un lien (meilleur support)
2. **Google Play Store** - APK généré depuis la PWA
3. **Apple App Store** - Via TestFlight et distribu Web Clip

---

## 📱 1. Google Play Store (Android)

### 1.1 Prérequis
- Compte Google Play Developer ($25 frais uniques)
- APK ou AAB généré depuis la PWA
- Assets marketing (icons, screenshots, descriptions)

### 1.2 Générer l'APK

**Option A: Utiliser PWA Builder (Recommandé)**
1. Aller à https://www.pwabuilder.com
2. Entrer: `https://zaufani-rodzina.web.app`
3. Cliquer "Build" → "Android"
4. Télécharger l'APK

**Option B: Utiliser Bubblewrap (CLI)**
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://zaufani-rodzina.web.app/manifest.json
bubblewrap build
```

### 1.3 Assets Marketing

**Icons requis:**
- 512x512 PNG (icon principal)
- 192x192 PNG (app icon)

**Screenshots (minimum 2):**
- Format: 1080x1920px (portrait)
- Montrer: Marketplace, Localisation, Messagerie

**Textes:**
- Titre: "Zaufani Rodzina - Sieć Rodzinna"
- Sous-titre: "Marketplace P2P familial avec partage de localisation"
- Description longue (4000 caractères max):

```
Zaufani Rodzina est votre serwis familial privé et sécurisé.

FONCTIONNALITÉS:
✓ Marketplace P2P - Acheter/vendre entre famille
✓ Partage de localisation Snapchat-style
✓ Messagerie intégrée avec notification
✓ Système d'avis et notation des vendeurs
✓ Fonctionne hors ligne
✓ Aucune publicité intrusive

CONFIDENTIALITÉ:
🔒 Vos données restent dans votre famille
🔐 Chiffrement end-to-end des messages
✓ Pas de tracking ni de vente de données

INSTALLATION:
L'app s'installe directement depuis le store
et fonctionne sur tous les appareils Android.
```

### 1.4 Processus de Soumission

1. **Créer un compte Google Play Developer**
   - https://play.google.com/console
   - Payer $25 (frais uniques)

2. **Créer une nouvelle app**
   - Nom: "Zaufani Rodzina"
   - Catégorie: "Lifestyle" ou "Productivity"
   - Contenu: "Teen" (peut contacter family members)

3. **Remplir les détails**
   - Descriptions, screenshots, icons
   - Prix: Gratuit
   - Région: Partout

4. **Politique de confidentialité**
   - URL: `https://zaufani-rodzina.web.app/privacy-policy.html`
   - (À créer avant soumission)

5. **Télécharger l'APK**
   - APK ou AAB généré

6. **Test et Lancement**
   - Phase de test (2-3 jours)
   - Vérification Google (~1-5 jours)
   - Lancement public

---

## 🍎 2. Apple App Store (iOS)

### 2.1 Alternative recommandée: TestFlight + Web Clip

Pour iOS, le chemin le plus rapide est:
1. **TestFlight** pour la distribution bêta
2. **Web App Clip** pour la version finale

### 2.2 TestFlight Setup

**Prérequis:**
- Compte Apple Developer ($99/an)
- Xcode installé (sur Mac)

**Étapes:**

1. **Créer un projet Xcode**
```bash
# Créer un simple wrapper iOS
# Option: Utiliser Capacitor pour PWA → native
npm install -g @ionic/cli
ionic start zaufani-ios
cd zaufani-ios
ionic capacitor add ios
```

2. **Configurer dans App Store Connect**
   - https://appstoreconnect.apple.com
   - Créer app: "Zaufani Rodzina"
   - Bundle ID: `com.zaufani.rodzina`
   - Plateforme: iOS 13.0+

3. **Créer TestFlight Build**
   - Ouvrir dans Xcode
   - Product → Archive
   - Distribute App → TestFlight
   - Envoyer pour review (~1h)

4. **Partager lien TestFlight**
   - App Store Connect → TestFlight
   - Ajouter users (email)
   - Générer lien d'invitation public:
   ```
   https://testflight.apple.com/join/[INVITE_CODE]
   ```

### 2.3 Distribuer le lien aux utilisateurs Apple

**Method 1: Email direct**
```
Sujet: Installez Zaufani Rodzina (bêta exclusive!)

Bonjour,

Vous pouvez tester l'app Zaufani avant le lancement public.

🔗 Lien: https://testflight.apple.com/join/[INVITE_CODE]

Étapes:
1. Ouvrez le lien depuis votre iPhone/iPad
2. Appuyez sur "Installer" ou "Réinstaller"
3. L'app apparaîtra dans Stocks ou TestFlight

Merci de tester et de nous envoyer vos avis!
```

**Method 2: Page de téléchargement**
- Utiliser `install.html` pour afficher le lien
- Détection automatique du device
- Les utilisateurs iOS verront: "Rejoindre TestFlight"

### 2.4 App Store Submission (Officiel)

Après TestFlight:

1. **Préparer pour App Store**
   - Finalize dans App Store Connect
   - Remplir détails de l'app
   - Ajouter screenshots, icons, description

2. **Soumission**
   - Cliquer "Submit for Review"
   - Apple review (~2-5 jours)
   - Lancement public

---

## 🌐 3. Déploiement Web (Recommandé)

Le déploiement web est le **plus rapide et flexible**:

### 3.1 Sur Firebase Hosting (Gratuit)

```bash
# Installation
npm install -g firebase-tools
firebase login
firebase init hosting

# Configure:
# - Public directory: . (zaufani folder)
# - Single page app: Yes

# Deploy
firebase deploy
```

Votre app est maintenant sur:
- https://zaufani-rodzina.web.app
- https://zaufani-rodzina.firebaseapp.com

### 3.2 Sur Vercel (Encore plus simple)

```bash
# Push sur GitHub
git push origin main

# Vercel détecte automatiquement
# Et déploie sur:
# https://zaufani-rodzina.vercel.app
```

### 3.3 Lien de Distribution

Créer un court lien pour partager:
- https://zaufani-rodzina.web.app (web)
- https://zaufani-rodzina.web.app/install.html (page d'installation)

---

## 📋 Checklist Pré-Lancement

### Code & Assets
- [ ] Manifest.json configuré avec icons et metadata
- [ ] Service Worker (sw.js) implémenté
- [ ] HTTPS activé (obligatoire pour PWA)
- [ ] Icons 192x192 et 512x512 (PNG)
- [ ] Screenshots pour stores (1080x1920 minimum 2)

### Sécurité
- [ ] Pas de données sensibles en localStorage (migration Firebase)
- [ ] Hachage des mots de passe
- [ ] HTTPS et CSP headers
- [ ] Politique de confidentialité
- [ ] Conditions d'utilisation

### Documentation
- [ ] README.md complet
- [ ] Politique de confidentialité (privacy-policy.html)
- [ ] Conditions d'utilisation (terms.html)
- [ ] FAQ

### Distribution
- [ ] Domain configuré (ou sous-domaine)
- [ ] Email de support
- [ ] Lien TestFlight pour iOS
- [ ] Page install.html complétée
- [ ] QR code généré

---

## 🔑 Variables d'Environnement & Secrets

Avant production:

```javascript
// A configurer dans Firebase/backend
const CONFIG = {
  PAYPAL_CLIENT_ID: 'VOTRE_ID_PAYPAL_PROD',
  FIREBASE_PROJECT: 'votre-firebase-project',
  GOOGLE_ADSENSE_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
  SUPPORT_EMAIL: 'support@zaufani-rodzina.com'
};
```

---

## 📞 Support & Contact

Après lancement, ajouter:

- Support email: support@zaufani-rodzina.com
- URL support: https://zaufani-rodzina.web.app/support
- Bug report form
- Feedback form

---

## 🎯 Timeline Recommandée

**Jour 1 (Aujourd'hui):**
- [ ] Configurer domaine web
- [ ] Déployer sur Firebase
- [ ] Générer APK/AAB
- [ ] Créer TestFlight build

**Jour 2-3:**
- [ ] Soumettre à Google Play
- [ ] Distribuer lien TestFlight

**Jour 4-7:**
- [ ] Review Google Play (~3-5 jours)
- [ ] Review App Store (~2-5 jours)

**Jour 8+:**
- [ ] Lancement public
- [ ] Marketing & notifications
- [ ] Monitoring et support

---

## 🚀 Quick Start Commands

```bash
# Firebase Deploy
firebase deploy

# PWA Builder (online)
# https://www.pwabuilder.com

# Capacitor (iOS/Android native)
ionic capacitor copy ios
ionic capacitor sync ios

# Testing locally
python -m http.server 8000
# Visitez: http://localhost:8000/zaufani-rodzina.html
```

---

## 📚 Ressources

- PWA Builder: https://www.pwabuilder.com
- Firebase Hosting: https://firebase.google.com/docs/hosting
- Google Play Console: https://play.google.com/console
- App Store Connect: https://appstoreconnect.apple.com
- Apple TestFlight: https://testflight.apple.com
- Capacitor: https://capacitorjs.com

---

**Version:** 1.0.0  
**Dernière mise à jour:** 2026-04-26  
**Maintenu par:** Zaufani Rodzina Team
