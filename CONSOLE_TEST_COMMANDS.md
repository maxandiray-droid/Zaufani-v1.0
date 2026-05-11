# 💻 CONSOLE TEST COMMANDS - Teste depuis DevTools

Si tu veux tester sans cliquer partout, tu peux utiliser ces commandes dans la console (F12 → Console)

---

## 🔧 SETUP - Exécute d'abord

### 1. Vérifie que Firebase est chargé
```javascript
console.log('Firebase:', typeof firebase);
console.log('useFirebase:', useFirebase);
console.log('firebaseDB:', firebaseDB);
```

**Attendu:**
```
Firebase: object
useFirebase: true
firebaseDB: [object Object]
```

### 2. Vérifie la base de données locale
```javascript
console.log('zaufaniDB:', zaufaniDB);
console.log('Users:', Object.keys(zaufaniDB.users).length);
console.log('Listings:', Object.keys(zaufaniDB.marketplace.listings).length);
```

### 3. Simule une inscription
```javascript
// D'abord, créer un utilisateur
const result = zaufaniDB_addUser('test@test.com', 'password123', 'Test User', 'user');
console.log('User created:', result);

// Ensuite, login simulé
userState.isAuthenticated = true;
userState.userId = result.userId;
userState.email = 'test@test.com';
userState.fullName = 'Test User';
console.log('Logged in as:', userState.fullName);
```

---

## 📦 TEST 1: Créer une Annonce

```javascript
// Crée une annonce
const listingId = createListing(
  'Test Listing',           // title
  'Testing real-time sync', // description
  99.50,                    // price
  'Items'                   // category
);

console.log('Listing created:', listingId);
```

**Attends 2 secondes, puis cherche dans la console:**
```javascript
// Vérifie que c'est sauvegardé
console.log('Listing exists:', getListing(listingId));
console.log('All listings:', getAllListings());
```

**Firebase Verification:**
```javascript
// Vérifie dans zaufaniDB que ça y est
console.log('Listings in DB:', Object.keys(zaufaniDB.marketplace.listings).length);
```

---

## 💬 TEST 2: Envoyer un Message

### Première, crée une conversation
```javascript
// Crée une transaction/conversation
const convId = createConversation(
  'tx-test',        // transactionId
  userState.userId, // participantA
  'user-other'      // participantB
);

console.log('Conversation created:', convId);
```

### Puis envoie un message
```javascript
// Envoie un message
const result = sendMessage(
  convId,
  userState.userId,
  'Hello, this is a test message!'
);

console.log('Message sent:', result);
```

**Vérifie:**
```javascript
const conv = getConversation(convId);
console.log('Conversation:', conv);
console.log('Messages:', conv.messages);
```

---

## 📍 TEST 3: Partager une Location

### Simule une position GPS
```javascript
// Simule une position (Paris)
const mockPosition = {
  coords: {
    latitude: 48.8566,
    longitude: 2.3522,
    accuracy: 15
  }
};

onLocationSuccess(mockPosition);
console.log('Location saved');
```

**Vérifie:**
```javascript
console.log('Locations:', zaufaniDB.locations);
console.log('My location:', zaufaniDB.locations[userState.userId]);
```

---

## 📴 TEST 4: Offline Queue

### Mets-toi offline et crée une annonce
```javascript
// Simule offline
navigator.onLine = false;
console.log('📴 Simulating offline');

// Crée une annonce
const listingId = createListing('Offline Item', 'Created offline', 50, 'Items');

// Regarde la queue
console.log('Offline queue:', offlineQueue);
```

### Puis remets online
```javascript
// Simule reconnexion
navigator.onLine = true;
console.log('🟢 Back online');

// Synche
processOfflineQueue();
```

**Vérifie:**
```javascript
console.log('Queue after sync:', offlineQueue);
```

---

## ✅ TEST 5: Validation

### Test email validation
```javascript
// Valid email
console.log('Valid email:', validateEmail('test@example.com'));

// Invalid email
console.log('Invalid email:', validateEmail('not-an-email'));

// Unique email
console.log('Email unique:', validateUniqueEmail('newemail@test.com'));
console.log('Email duplicate:', validateUniqueEmail('test@test.com')); // Should be false
```

### Test listing validation
```javascript
// Valid listing
const goodListing = {
  id: 'l1',
  sellerId: userState.userId,
  title: 'Test',
  description: 'Test desc',
  price: 50,
  category: 'Items'
};
console.log('Valid listing:', validateListing(goodListing));

// Invalid listing (missing price)
const badListing = { ...goodListing, price: 'not-a-number' };
console.log('Invalid listing:', validateListing(badListing));
```

---

## 🔍 DEBUG COMMANDS

### Voir l'état actuel
```javascript
console.table({
  'User Authenticated': userState.isAuthenticated,
  'User ID': userState.userId,
  'User Email': userState.email,
  'Total Users': Object.keys(zaufaniDB.users).length,
  'Total Listings': Object.keys(zaufaniDB.marketplace.listings).length,
  'Offline Queue': offlineQueue.length,
  'Firebase Ready': useFirebase,
  'Online Status': navigator.onLine
});
```

### Vider les données (pour tester fresh)
```javascript
// ⚠️ ATTENTION: Ceci supprime TOUT
localStorage.removeItem('zaufani-database');
localStorage.removeItem('zaufani-offline-queue');
location.reload();
```

### Voir localStorage size
```javascript
let totalSize = 0;
for (let key in localStorage) {
  totalSize += localStorage[key].length;
}
console.log('localStorage size:', (totalSize / 1024).toFixed(2) + ' KB');
```

---

## 📊 Firebase Real-Time Check

```javascript
// Écoute les changements Firebase
if (firebaseDB) {
  firebaseDB.ref('shared/marketplace/listings').on('value', snapshot => {
    console.log('📊 Firebase listings updated:');
    console.log(snapshot.val());
  });
}
```

---

## 🎯 QUICK TEST SEQUENCE

Copie/colle ceci pour faire un test complet:

```javascript
// 1. Vérifie Firebase
console.log('Firebase ready:', useFirebase);

// 2. Crée un user
const user = zaufaniDB_addUser('quick@test.com', 'pass123', 'Quick Test', 'user');
userState.isAuthenticated = true;
userState.userId = user.userId;
userState.fullName = 'Quick Test';

// 3. Crée une annonce
const listing = createListing('Quick Test', 'Testing', 25, 'Items');
console.log('✅ Listing created:', listing);

// 4. Regarde la DB
console.log('✅ Listings in DB:', Object.keys(zaufaniDB.marketplace.listings).length);

// 5. Simule offline
navigator.onLine = false;
createListing('Offline Item', 'Test offline', 99, 'Items');
console.log('✅ Queue length:', offlineQueue.length);

// 6. Remets online
navigator.onLine = true;
processOfflineQueue();
console.log('✅ All tests done!');
```

---

## 📲 Pour tester sur 2 ONGLETS

**Onglet A - Console:**
```javascript
// Crée une annonce
createListing('Multi-tab test', 'Should appear on tab B', 75, 'Items');
console.log('✅ Created on Tab A');
```

**Onglet B - Console (après 5 secondes):**
```javascript
// Vérifie si c'est arrivé
console.log('Listings on Tab B:', Object.keys(zaufaniDB.marketplace.listings).length);
console.log(zaufaniDB.marketplace.listings);
```

Si tu vois le listing ✅ **SYNC WORKS!**

---

**Prêt à tester!** 🚀
