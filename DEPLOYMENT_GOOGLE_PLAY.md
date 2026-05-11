# 🚀 Guide de déploiement - Google Play

## Prérequis
- ✅ Android SDK installé
- ✅ Cordova installé: `npm install -g cordova`
- ✅ Compte Google Play Developer (29€/an)
- ✅ Clé de signature Android

## Étape 1: Générer une clé de signature (une seule fois)

```bash
cd zaufani-app
keytool -genkey -v -keystore zaufani.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias zaufani
```

Répondez aux questions:
- Mot de passe: [entrez un mot de passe fort]
- Nom: Zaufani
- Email: votre@email.com
- Organisation: Votre organisation
- Ville: Ville
- État: État
- Code pays: PL (ou votre pays)

Sauvegardez `zaufani.keystore` en sécurité!

## Étape 2: Mettre à jour la version

```bash
cd zaufani-app
# Éditer config.xml:
# <widget id="com.zaufani.rodzina" version="1.0.0">
```

## Étape 3: Construire l'APK de production

```bash
cd zaufani-app

# Nettoyer les anciennes builds
cordova clean

# Construire la version release
cordova build android --release
```

## Étape 4: Signer l'APK

```bash
cd zaufani-app/platforms/android/app/build/outputs/apk/release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore ../../../../../../../zaufani.keystore \
  app-release-unsigned.apk zaufani

# Répondez avec le mot de passe de la keystore
```

## Étape 5: Aligner l'APK

```bash
zipalign -v 4 app-release-unsigned.apk zaufani-rodzina-1.0.0.apk
```

## Étape 6: Vérifier l'APK

```bash
# Afficher les informations
aapt dump badging zaufani-rodzina-1.0.0.apk

# Vérifier la signature
jarsigner -verify -verbose zaufani-rodzina-1.0.0.apk
```

## Étape 7: Créer l'annonce Google Play

1. Accédez à [Google Play Console](https://play.google.com/console)
2. Créez une nouvelle application:
   - **Nom:** Zaufani — Rodzina
   - **Description:** Famille connectée, famille unie
   - **Catégorie:** Social
   - **Contenu:** Modéré

## Étape 8: Remplir les détails de l'app

### Informations sur l'app
- **Titre court:** Zaufani — Rodzina
- **Description courte:** Restez connecté avec votre famille
- **Description complète:**
```
Zaufani est une application de réseau social conçue pour garder 
votre famille connectée. Partagez des moments, des emplacements 
en temps réel, et restez en contact où que vous soyez.

Fonctionnalités:
✓ Partage en temps réel de votre position avec votre famille
✓ Fil d'actualité pour partager des moments
✓ Marché pour vendre ou acheter entre membres de la famille
✓ Messagerie instantanée
✓ Synchronisation multi-appareils
✓ Mode hors ligne - les changements se synchronisent au reconnect

Sécurité:
✓ Chiffrement des données
✓ Authentification sécurisée
✓ Mots de passe hashés
✓ Synchronisation Firebase
```

### Images requises

**Icône d'app (512x512px):**
- Créez une icône de 512x512px avec le logo Zaufani
- Sauvegardez en PNG

**Capture d'écran (minimum 2, max 8):**
1. Écran de connexion
2. Écran d'accueil avec fil d'actualité
3. Carte avec les locations de la famille
4. Écran du marché

**Bannière de présentation (1024x500px):**
- Image montrant les fonctionnalités principales

## Étape 9: Configurer le prix et la distribution

- **Prix:** Gratuit
- **Distribution:** Sélectionnez les pays où lancer (au minimum: Pologne)
- **Classification de contenu:** Complétez le questionnaire
- **Politique de confidentialité:** Liez vers votre politique

## Étape 10: Télécharger l'APK

1. Allez dans **Sortie > Production**
2. Cliquez sur **Créer une version**
3. Téléchargez `zaufani-rodzina-1.0.0.apk`
4. Remplissez les notes de version:
```
Version 1.0.0 - Lancement initial

Nouveautés:
✓ Partage en temps réel de localisation
✓ Fil d'actualité familial
✓ Marché de famille
✓ Messagerie instantanée
✓ Synchronisation multi-appareils
```

## Étape 11: Soumettre à l'examen

1. Complétez toutes les sections obligatoires
2. Acceptez les politiques Google Play
3. Cliquez sur **Soumettre à l'examen**

**Durée d'examen:** 24-48 heures généralement

## Étape 12: Surveiller le lancement

Une fois approuvé:
1. Allez dans **Sortie > Production**
2. Cliquez sur **Mettre à jour la sortie**
3. Sélectionnez votre version
4. Cliquez sur **Lancer**

## Conseils de sécurité

⚠️ **Ne partagez JAMAIS votre clé de signature!**
- Sauvegardez `zaufani.keystore` dans un endroit sûr
- Utilisez le même alias pour toutes les futures mises à jour
- Si vous perdez la clé, vous ne pourrez pas mettre à jour l'app

## Mise à jour future

Pour les versions futures:

```bash
# 1. Incrémenter la version dans config.xml (ex: 1.0.1)
# 2. Construire et signer:
cordova build android --release
cd platforms/android/app/build/outputs/apk/release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore zaufani.keystore app-release-unsigned.apk zaufani
zipalign -v 4 app-release-unsigned.apk zaufani-rodzina-1.0.1.apk

# 3. Télécharger la nouvelle version dans Google Play Console
```

## Vérifier la publication

```bash
# Vérifier que l'app est publiée
adb install -r zaufani-rodzina-1.0.0.apk

# Teste les principales fonctionnalités sur un appareil réel
```

## Support

Pour des problèmes:
- Google Play Console Help: https://support.google.com/googleplay/android-developer
- Cordova Documentation: https://cordova.apache.org/docs/en/latest/
- Firebase Documentation: https://firebase.google.com/docs

---
**Date:** 2026-05-05
**Version d'app:** 1.0.0
**État:** Prêt à publier
