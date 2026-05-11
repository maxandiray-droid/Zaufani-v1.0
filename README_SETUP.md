# 🔐 Zaufani Rodzina - Configuration Admin & Base de Données

## ✅ Installation complétée

### Système de Base de Données Utilisateurs
- ✅ Classe `UserDatabase` créée (db.js)
- ✅ Authentification email/mot de passe
- ✅ Système d'inscription pour nouveaux utilisateurs
- ✅ Persistance en localStorage
- ✅ Gestion des rôles (user/admin)
- ✅ Tracking des donations par utilisateur

---

## 👑 Compte Admin Pré-créé

**Email:** `maxandiray@gmail.com`  
**Nom:** Maximilien d'Iray  
**Mot de passe initial:** `admin123` (À CHANGER AU PREMIER LOGIN!)

### Droits Admin
- ✅ **Accès au panel admin** - Interface dédiée avec tous les outils
- ✅ **Liste complète des membres** - Voir tous les utilisateurs, leurs emails et donations
- ✅ **Suppression de comptes** - Supprimer des utilisateurs directement
- ✅ **Lien d'invitation admin** - Générer un lien spécial pour inviter sans parrains
- ✅ **Suppression de posts** - Pouvoir supprimer les annonces/posts (prêt à implémenter)
- ✅ **Accès à la BD** - Voir la liste complète avec stats (dans le panel admin)
- ✅ **Droits de modification du code** - Via Claude Code

---

## 🚀 Comment se connecter

### 1. **En tant qu'Admin**
```
Email: maxandiray@gmail.com
Password: admin123
```
→ Dans le profil, vous verrez "🔐 Panel Admin" (menu option)

### 2. **Créer un nouvel utilisateur**
- Cliquez sur "✍️ Inscription"
- Remplissez les informations
- Cliquez sur "Créer un compte →"
- Vous pourrez vous connecter immédiatement

---

## 🎯 Features Implémentées

### Panel Admin
- **📊 Statistiques**
  - Nombre total d'utilisateurs
  - Nombre d'admins
  - Donations totales
  - Utilisateurs actifs

- **🔗 Lien d'Invitation Admin**
  - Lien unique partageable entre admins
  - Les invités via ce lien n'ont pas besoin de 2 parrains
  - Bouton de copie directe

- **👥 Gestion des Membres**
  - Liste de tous les utilisateurs
  - Email, nom, donations, rôle
  - Bouton 🗑️ pour supprimer un compte
  - Vue d'ensemble complète de la BD

### Système de Donations
- Chaque utilisateur a un historique de donations
- Les donations sont cumulées
- À 50€+ → Publicités désactivées automatiquement
- Badge "🎁 Bez reklam" dans le profil

---

## 📁 Structure des Fichiers

```
zaufani-rodzina.html     # App principale
db.js                    # Classe UserDatabase
README_SETUP.md           # Ce fichier
```

---

## 🔧 Configuration Avancée

### Migrer vers une vraie base de données

**Option 1: Supabase (Recommandé)**
```javascript
// Installer: npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://votre-project.supabase.co',
  'your-anon-key'
)
```

**Option 2: Firebase**
```javascript
const db = firebase.firestore();
// Adapter la classe UserDatabase pour Firestore
```

---

## 🛡️ Sécurité

### À faire avant production

1. **Hacher les mots de passe**
   - ❌ Actuellement: btoa() (encodage simple)
   - ✅ À faire: bcrypt ou argon2

2. **HTTPS obligatoire**
   - Les mots de passe doivent transiter en HTTPS

3. **Backend d'authentification**
   - Migrer de localStorage vers un serveur
   - Ne jamais stocker les hashs sur le client

4. **Rate limiting**
   - Limiter les tentatives de connexion
   - Limiter les créations de comptes

5. **2FA (Two-Factor Authentication)**
   - Ajouter OTP ou authenticator pour les admins
   - Email de confirmation pour les inscriptions

---

## 📝 Base de Données - Structure

```javascript
{
  id: "usr_1234567890_abcdef",
  email: "user@example.com",
  fullName: "Jean Dupont",
  password: "base64(password)",  // À sécuriser!
  role: "user" | "admin",
  createdAt: "2026-04-25T...",
  lastLogin: "2026-04-25T...",
  avatar: "👤",
  city: "Paris",
  profession: "Ingénieur",
  interests: ["Musique", "Voyage"],
  isActive: true,
  totalDonated: 0,
  hasNoAds: false,
  sponsorCount: 0,
  sponsors: [],
  invitationCode: "INV-XXXXX",
  posts: [],
  donations: [
    {
      id: "don_123",
      amount: 20,
      currency: "PLN",
      date: "2026-04-25T...",
      processed: true
    }
  ]
}
```

---

## 🧪 Tests Rapides

### Test 1: Créer un utilisateur
1. Cliquez "✍️ Inscription"
2. Entrez vos infos
3. Cliquez "Créer un compte"

### Test 2: Se connecter
1. Entrez vos identifiants
2. Cliquez "Zaloguj się →"
3. Vous devriez voir votre profil

### Test 3: Accéder au panel admin
1. Connectez-vous en tant qu'admin
2. Allez au profil (🔐 Konto)
3. Cliquez "🔐 Panel Admin"
4. Vous verrez tous les utilisateurs

### Test 4: Supprimer un utilisateur
1. Dans le panel admin
2. Cliquez le bouton 🗑️ d'un utilisateur
3. Confirmez
4. L'utilisateur est supprimé

---

## 🔄 Flux d'Invitation Admin

1. Admin ouvre le panel admin
2. Copie le "Lien d'Invitation Admin"
3. Partage ce lien
4. L'invité clique le lien
5. Il crée un compte (pas besoin de parrains)
6. Il se connecte automatiquement

---

## 🚨 Erreurs Fréquentes

**"Email already exists"**
→ Cet email est déjà utilisé, utilisez un autre

**"Les mots de passe ne correspondent pas"**
→ Vérifiez que les deux mots de passe sont identiques

**"Password must be at least 6 characters"**
→ Votre mot de passe est trop court

---

## 📞 Support

Pour toute question ou amélioratio, contactez:
- **Admin:** maxandiray@gmail.com
- **Code:** Via Claude Code

---

**Version:** 1.0  
**Date:** 2026-04-25  
**Statut:** ✅ Fonctionnel (mode démo localStorage)
