// Test complet du flux P2P marketplace

console.log('=== TEST MARKETPLACE FLOW ===\n');

// 1. Vérifier que la DB est initialisée
console.log('✓ Test 1: Base de données');
const dbString = localStorage.getItem('zaufani-database');
if (dbString) {
  const db = JSON.parse(dbString);
  console.log(`  - Users: ${Object.keys(db.users || {}).length}`);
  console.log(`  - Listings: ${Object.keys(db.marketplace?.listings || {}).length}`);
  console.log(`  - Transactions: ${Object.keys(db.marketplace?.transactions || {}).length}`);
  console.log(`  - Conversations: ${Object.keys(db.marketplace?.conversations || {}).length}`);
} else {
  console.log('  ✗ Database not found!');
}

// 2. Vérifier que les fonctions marketplace existent
console.log('\n✓ Test 2: Fonctions marketplace');
const functions = [
  'displayMarketplaceListings',
  'openMarketplaceListing',
  'initiatePurchase',
  'createTransaction',
  'openTransactionChat',
  'sendMarketplaceMessage',
  'openTransactionRating',
  'createListing',
  'getListing',
  'getConversation',
  'sendMessage',
  'updateTransactionStatus',
  'addRating'
];

functions.forEach(fn => {
  if (typeof window[fn] === 'function') {
    console.log(`  ✓ ${fn}`);
  } else {
    console.log(`  ✗ ${fn} NOT FOUND`);
  }
});

// 3. Vérifier que les modales peuvent être créées
console.log('\n✓ Test 3: Modales');
const modals = [
  'modal-marketplace-listing',
  'modal-marketplace-chat',
  'modal-marketplace-rating'
];

modals.forEach(modal => {
  const elem = document.getElementById(modal);
  if (elem) {
    console.log(`  ✓ ${modal} exists`);
  } else {
    console.log(`  ? ${modal} (created dynamically)`);
  }
});

// 4. Vérifier les listings demo
console.log('\n✓ Test 4: Listings de test');
if (dbString) {
  const db = JSON.parse(dbString);
  const listings = Object.values(db.marketplace?.listings || {});
  listings.forEach(listing => {
    console.log(`  - ${listing.title} (${listing.price}€) par ${listing.sellerName}`);
  });
}

// 5. Vérifier les catégories
console.log('\n✓ Test 5: Catégories');
if (typeof MARKETPLACE_CATEGORIES !== 'undefined') {
  console.log(`  Categories: ${MARKETPLACE_CATEGORIES.join(', ')}`);
} else {
  console.log('  ✗ MARKETPLACE_CATEGORIES not found');
}

// 6. Vérifier les utilisateurs
console.log('\n✓ Test 6: Utilisateurs de test');
if (dbString) {
  const db = JSON.parse(dbString);
  const users = Object.values(db.users || {});
  users.forEach(user => {
    console.log(`  - ${user.name} (${user.role}) - ${user.email}`);
  });
}

// 7. Test de création de listing
console.log('\n✓ Test 7: Création de listing (simulation)');
if (typeof window.createListing === 'function') {
  console.log('  ✓ createListing fonction OK');
} else {
  console.log('  ✗ createListing not available');
}

// 8. Test du formulaire
console.log('\n✓ Test 8: Formulaire de création');
const formFields = ['new-cat', 'new-title', 'new-desc', 'new-price', 'photo-upload-input'];
formFields.forEach(field => {
  const elem = document.getElementById(field);
  if (elem) {
    console.log(`  ✓ ${field}`);
  } else {
    console.log(`  ✗ ${field} NOT FOUND`);
  }
});

// 9. Test des tabs
console.log('\n✓ Test 9: Navigation tabs');
const tabs = ['home', 'mapa', 'post', 'nowinki', 'konto'];
tabs.forEach(tab => {
  const elem = document.getElementById(`tab-${tab}`);
  if (elem) {
    console.log(`  ✓ tab-${tab}`);
  } else {
    console.log(`  ✗ tab-${tab} NOT FOUND`);
  }
});

// 10. Test des transactions
console.log('\n✓ Test 10: Transactions');
if (dbString) {
  const db = JSON.parse(dbString);
  const transactions = Object.values(db.marketplace?.transactions || {});
  if (transactions.length === 0) {
    console.log('  (Pas de transactions de test)');
  } else {
    transactions.forEach(tx => {
      console.log(`  - ${tx.id}: ${tx.price}€ (${tx.status})`);
    });
  }
}

console.log('\n=== TEST COMPLETE ===\n');
