# 🚀 QUICK TEST GUIDE - 3 Tests Essentiels (10 minutes)

## ⚡ AVANT DE COMMENCER

**Ouvre 3 choses:**
1. Le navigateur avec l'app (ou 2 onglets)
2. DevTools (F12)
3. Firebase Console dans un autre onglet

---

## 📱 TEST 1: Single Device Persistence (2 minutes)

**Objectif:** Vérifier que les données persistent quand on rafraîchit

### Étapes:

1. **Ouvre l'app** dans ton navigateur
   - URL: `file:///C:/Users/Maxim/Documents/zaufani/zaufani-rodzina.html`
   - Ou si serveur local: `http://localhost:8000/zaufani-rodzina.html`

2. **Ouvre DevTools** (F12) → Console
   - Regarde les logs au démarrage
   - Tu dois voir: `✅ Firebase initialized successfully`
   - Ou: `ℹ️ Firebase not available, using localStorage`

3. **Enregistre-toi** (si pas déjà login)
   - Email: `test@example.com`
   - Password: `password123`
   - Expected: Console logs `📝 Registration attempt`

4. **Crée une annonce marketplace:**
   ```
   - Title: "Test Item 1"
   - Description: "Testing persistence"
   - Price: 99 PLN
   - Category: "Items"
   ```
   - Click "Créer l'annonce" (ou bouton similaire)
   - Expected in Console: `✅ Marketplace synced from Firebase` (ou localStorage if offline)

5. **Rafraîchis la page** (F5)
   - Expected: Ton annonce est **TOUJOURS VISIBLE**
   - Si visible ✅ → TEST RÉUSSI

### Console Logs à Chercher:
```
✅ Database loaded from localStorage
✅ Firebase initialized successfully
✅ Marketplace synced from Firebase (or localStorage)
```

### Si ça ne marche pas:
- Vérifie qu'il y a `zaufani-database` dans localStorage
  - F12 → Application → localStorage → cherche "zaufani-database"
- Vérifie qu'il n'y a pas d'erreurs rouge dans la console

---

## 🔄 TEST 2: Multi-Device Real-Time Sync (3 minutes)

**Objectif:** Vérifier que les changements synchent entre 2 onglets en temps réel

### Setup:

1. **Ouvre 2 onglets du navigateur**
   - Tab A: `zaufani-rodzina.html`
   - Tab B: `zaufani-rodzina.html` (nouveau tab)
   - Les 2 doivent montrer la même app

2. **Login sur les 2 tabs** (avec le même compte)
   - Tab A: Login test@example.com
   - Tab B: Login test@example.com
   - Les 2 doivent être connectés

### Étapes du Test:

3. **Sur Tab A:** Crée une deuxième annonce
   ```
   - Title: "Test Item 2"
   - Description: "Testing real-time sync"
   - Price: 49 PLN
   - Category: "Housing"
   ```

4. **Sur Tab A:** Regarde la console
   - Cherche: `✅ Marketplace synced from Firebase`
   - Ou si offline: `📋 [OFFLINE] Queued listing`

5. **Sur Tab B:** Attends **5 secondes**

6. **Sur Tab B:** Rafraîchis la page (F5) OU cherche l'annonce
   - Expected: "Test Item 2" apparaît dans le marketplace
   - Si visible ✅ → TEST RÉUSSI

### Firebase Console Verification:
1. Va sur https://console.firebase.google.com
2. Sélectionne projet: `zaufani-83295`
3. Go to: Realtime Database
4. Regarde: `shared/marketplace/listings/`
5. Tu dois voir: Les 2 annonces (Test Item 1 + Test Item 2)

### Si ça ne marche pas:
- Vérifie que les 2 tabs ont bien login avec le **même compte**
- Attends 10 secondes au lieu de 5 (Firebase peut être lent)
- Regarde s'il y a des erreurs Firebase en rouge dans la console
- Vérifie ta connexion internet

---

## 📴 TEST 3: Offline Mode & Queue (3 minutes)

**Objectif:** Vérifier que les données se sauvegardent offline et synchent quand reconnecté

### Setup:

1. **Ouvre l'app dans Tab A**
   - Assure-toi d'être login
   - Ouvre la console (F12)

2. **Mets-toi en mode OFFLINE:**
   - F12 → Network tab
   - En haut à gauche, cherche le dropdown (normalement "No throttling")
   - Change en "Offline"
   - OU: Menu → More tools → Network conditions → Uncheck "Online"

3. **Vérifie que tu es offline:**
   - La page ne devrait plus pouvoir charger les images externes
   - Tu vas voir des erreurs réseau dans la console

### Étapes du Test:

4. **En mode OFFLINE:** Crée une annonce
   ```
   - Title: "Offline Test Item"
   - Description: "Created while offline"
   - Price: 199 PLN
   - Category: "Services"
   ```

5. **Cherche dans la console:**
   - Logs attendus:
   ```
   📋 [OFFLINE] Queued listing: op-xxxxx
   ℹ️ Offline mode
   ```

6. **Vérifie localStorage:**
   - F12 → Application → localStorage
   - Cherche: `zaufani-offline-queue`
   - Tu dois voir: `[{"id":"op-xxxxx","type":"listing",...}]`

7. **Remets-toi ONLINE:**
   - F12 → Network → Change "Offline" en "No throttling"
   - Ou: Menu → Network conditions → Check "Online"

8. **Cherche dans la console:**
   - Logs attendus après reconnexion:
   ```
   🟢 [STATUS] Back online - starting sync...
   ⏳ [SYNC] Processing 1 offline operations...
   ✅ [SYNC] Synced listing: listing-xxxxx
   ```

9. **Rafraîchis la page** (F5)
   - Expected: "Offline Test Item" est visible
   - Si visible ✅ → TEST RÉUSSI

### Firebase Console Verification:
1. Va sur Firebase Console
2. Realtime Database → `shared/marketplace/listings/`
3. Tu dois voir: "Offline Test Item" avec timestamp récent

### Si ça ne marche pas:
- Vérifie que t'es **vraiment** offline (F12 → Network)
- Attends 5 secondes après reconnexion avant de rafraîchir
- Regarde s'il y a des erreurs Firebase en rouge
- Vérifie que le offline queue n'est pas vide dans localStorage

---

## ✅ RÉSUMÉ - Qu'est-ce qu'il faut voir

### Test 1: ✅ Annonces persistent après refresh
### Test 2: ✅ Annonce apparaît sur Tab B dans 5 sec
### Test 3: ✅ Annonce offline synche quand reconnecté

---

## 🔍 CONSOLE LOGS À CHERCHER

### Au démarrage:
```
✅ Firebase initialized successfully
✅ Database loaded from localStorage
```

### En créant une annonce:
```
✅ Marketplace synced from Firebase
```

### En mode offline:
```
📋 [OFFLINE] Queued listing
🔴 [STATUS] Offline mode
```

### En reconnectant:
```
🟢 [STATUS] Back online
⏳ [SYNC] Processing X offline operations
✅ [SYNC] Synced listing
```

---

## 🚨 COMMON ISSUES & FIXES

| Problème | Solution |
|----------|----------|
| Firebase ne se charge pas | Vérifie ta connexion internet |
| Annonce n'apparaît pas sur Tab B | Attends 10 sec, puis rafraîchis |
| Offline queue ne synche pas | Va online, attend 5 sec, regarde les logs |
| localStorage vide | Regarde si la taille max est pas dépassée |
| Console montre des erreurs CORS | C'est normal si Firebase bloqué, teste offline |

---

## 🎯 SUCCÈS = Tous les 3 tests passent

Si les 3 tests passent ✅, ton app est **PRÊTE POUR L'APK!**

Après, tu peux:
1. Générer l'APK avec Cordova
2. Tester l'APK sur Android
3. Soumettre à Google Play

---

**Tests à faire maintenant!** 🚀
