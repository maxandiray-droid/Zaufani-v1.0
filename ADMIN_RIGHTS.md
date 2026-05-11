# 🔐 Droits et Permissions Admin

## Vue d'ensemble

L'administrateur **Maximilien d'Iray** (maxandiray@gmail.com) a accès complet à:

---

## 1️⃣ Accès à la liste des membres

### Où?
Menu Profil (👤) → 🔐 Panel Admin → 👥 Liste des Membres

### Qu'est-ce qu'on voit?
- ✅ Nom complet de chaque utilisateur
- ✅ Email (adresse email)
- ✅ Montant total donné (💰)
- ✅ Rôle (User ou Admin)
- ✅ Statistiques globales (Total users, admins, donations)

### Exemple
```
👤 Jean Dupont
   jean@example.com
   💰 50€ • 👤 User

👤 Marie Dupont
   marie@example.com
   💰 100€ • 👑 Admin
```

---

## 2️⃣ Droit de suppression de compte

### Comment supprimer un utilisateur?

1. Ouvrir le Panel Admin
2. Trouver l'utilisateur dans la liste
3. Cliquer le bouton **🗑️** à droite
4. Confirmer la suppression

### Qu'est-ce qui se passe?
- ❌ Le compte est supprimé de la base de données
- ❌ Tous ses posts/annonces restent (pour le moment)
- ✅ L'utilisateur ne peut plus se connecter
- ✅ Les donations ne sont pas remboursées

⚠️ **Attention:** Cette action est irréversible!

---

## 3️⃣ Droit de "laisser passer" (Invitation Admin)

### À quoi ça sert?
Les personnes invitées par un admin n'ont **PAS besoin de 2 parrains**.

### Comment générer le lien?

1. Ouvrir le Panel Admin
2. Trouver la section "🔗 Lien d'Invitation Admin"
3. Cliquer "Copier le lien"
4. Partager le lien avec l'invité

### Exemple de lien
```
https://zaufani.app/?admin-invite=MTczMzE0NDc1ODUwNw==
```

### Ce que l'invité doit faire
1. Cliquer sur le lien
2. Cliquer "✍️ Inscription"
3. Créer son compte
4. Il n'aura pas besoin de parrains supplémentaires ✅

### Lien partagé entre admins
- ✅ Tous les admins partagent le **même lien**
- ✅ Chaque invité créé via ce lien est immédiatement accepté
- ✅ Pas de vérification de parrain nécessaire

---

## 4️⃣ Suppression de posts/annonces

### Statut: 🚧 En préparation

**Code à ajouter:**
```javascript
function adminDeletePost(postId, postTitle) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce post?')) {
    // Trouver et supprimer le post
    userDB.deletePost(postId);
    showToast('✅ Post supprimé');
  }
}
```

### Où sera le bouton?
- Dans chaque post (coin supérieur droit)
- Visible uniquement pour les admins
- Icône 🗑️

---

## 5️⃣ Accès à la base de données utilisateurs

### Données accessibles

**Via le Panel Admin:**
- ✅ Tous les noms et emails
- ✅ Total des donations par utilisateur
- ✅ Rôle de chaque personne
- ✅ Statistiques globales

**Via localStorage (pour développeurs):**
```javascript
// Dans la console du navigateur:
JSON.parse(localStorage.getItem('zaufani-users'))

// Affiche:
[
  {
    id: "usr_...",
    email: "maxandiray@gmail.com",
    fullName: "Maximilien d'Iray",
    totalDonated: 0,
    role: "admin",
    ...
  },
  ...
]
```

---

## 6️⃣ Droit de modification du code

### Comment?
- Via **Claude Code** (lancement avec `/ultrareview`)
- L'admin peut demander des changements à l'app
- Modifications possibles:
  - UI/UX
  - Nouvelles fonctionnalités
  - Configuration
  - Intégrations

---

**Dernière mise à jour:** 2026-04-25  
**Admin:** Maximilien d'Iray  
**Email:** maxandiray@gmail.com
