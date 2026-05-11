# 👑 Guide Admin - Zaufani Rodzina

## Connexion Admin

### Méthode 1: Avec le lien d'invitation unique
Chaque admin a un lien d'invitation unique qui lui permet de:
- Se connecter directement au panel admin
- Inviter des utilisateurs sans besoin de 2ème parrain
- Accéder à la gestion complète de la plateforme

**Votre lien d'invitation unique:**
- Accessible dans le **Panel Admin** sous "Lien d'invitation unique (Admin)"
- À partager UNIQUEMENT entre admins
- Format: `?adminToken=XXXXX...`

### Méthode 2: Connexion directe
- Email: `maxandiray@gmail.com`
- Mot de passe: `admin123` (à changer en production!)

---

## 🎯 Droits Admin

### 1. 📋 Accès à la liste des membres
- **Où:** Panel Admin → "Tous les membres"
- **Visible:** Email, nom, avatar, dons totaux, rôle
- **Accès:** Admin uniquement

### 2. 🗑️ Suppression de comptes
- **Où:** Panel Admin → Bouton "Supprimer" sur chaque membre
- **Effet:** Supprime complètement l'utilisateur de la base de données
- **Confirmation:** Demande confirmation avant suppression

### 3. 🎁 "Laisser passer" (Invitation sans parrain)
- **Utilité:** Les utilisateurs invités par admin n'ont pas besoin de 2ème parrain
- **Comment:**
  1. Aller dans Panel Admin
  2. Partager le lien d'invitation unique avec le nouvel utilisateur
  3. L'utilisateur qui utilise ce lien sera automatiquement validé

### 4. 🗑️ Suppression de posts/annonces
- **Où:** Panel Admin → (À implémenter: interface de modération)
- **Accès:** Admin uniquement
- **Effet:** Supprime les posts, annonces et participations nuisibles

### 5. 💻 Modification du code
- Possible via **Claude Code** (vous avez déjà accès)
- Les modifications sont appliquées en temps réel

### 6. 🔐 Accès à la base de données
- **Stockage:** localStorage (JSON)
- **Clé:** `zaufani-database`
- **Accès:** Via le Panel Admin ou console navigateur
- **Sauvegarde:** Automatique à chaque modification

---

## 📊 Stats Admin

Le Panel Admin affiche:
- **Total utilisateurs**
- **Total membres**
- **Total admins**
- **Dons totaux**

---

## 🔑 Variables Admin

Votre profil admin a ces propriétés:
```json
{
  "id": "admin-xxxxx",
  "email": "maxandiray@gmail.com",
  "name": "Maximilien d'Iray",
  "role": "admin",
  "avatar": "👑",
  "totalDonated": 0,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

## 🛠️ Fonctions Admin Disponibles

### JavaScript (Console Navigateur)

```javascript
// Afficher tous les utilisateurs
getAllUsers()

// Obtenir un utilisateur par ID
getUserById('user-xxxxx')

// Trouver un utilisateur par email
findUserByEmail('email@example.com')

// Supprimer un utilisateur
deleteUser('user-xxxxx')

// Ajouter un nouvel utilisateur
addUser('email@example.com', 'Nom', 'passwordHash', 'member', false)

// Enregistrer une donation
recordDonation('user-xxxxx', 50)

// Obtenir le lien d'invitation admin
getAdminInvitationLink()

// Vérifier le token admin
verifyAdminToken('token-xxxxx')

// Stats admin
getAdminStats()
```

---

## ⚠️ Sécurité

### À faire (Production):
1. ✅ Hasher les mots de passe (SHA-256, bcrypt)
2. ✅ Utiliser Firebase ou une API backend
3. ✅ Implémenter l'authentification JWT
4. ✅ Ajouter HTTPS
5. ✅ Changer le mot de passe par défaut

### Notes:
- Le mot de passe est actuellement stocké en clair ⚠️
- localStorage n'est pas chiffré
- À migrer vers Firebase Database en production

---

## 📝 Créer un nouvel admin

```javascript
// Dans la console:
addUser('email@example.com', 'Nom Admin', 'hash_password', 'admin', false)
saveDatabase()
```

---

## 📚 Structure de la Base de Données

```json
{
  "users": {
    "admin-xxxxx": {
      "id": "admin-xxxxx",
      "email": "email@example.com",
      "name": "Nom",
      "role": "admin|member",
      "avatar": "🧑",
      "totalDonated": 0,
      "hasNoAds": false,
      "createdAt": "ISO8601",
      "invitedByAdmin": false
    }
  },
  "posts": {},
  "settings": {
    "adminInvitationToken": "token-xxxxx"
  }
}
```

---

## 🚀 Next Steps

1. **Activer Firebase** pour la persistance temps réel
2. **Ajouter l'interface de modération** pour les posts
3. **Implémenter les logs d'actions admin**
4. **Ajouter un système de notifications** pour les admins
5. **Créer un backup automatique** de la base de données

---

**Dernière mise à jour:** 2026-04-26
**Panel Admin:** Visible dans le profil (section "Administration")
