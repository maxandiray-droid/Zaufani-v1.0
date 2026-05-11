# 🧪 Zaufani Rodzina - Testing & Verification Guide

## Before You Start

This guide will help you verify that all 5 database phases are working correctly. You'll need:

- **2 Browser Tabs or Devices** (recommended: different browser tabs, or open on phone + computer)
- **Firebase Console Access** (to verify data sync)
- **Developer Console Open** (to check logs)

---

## 🔍 Phase 1: Database Unification Verification

### Test 1.1: User Registration (Email Validation)
**What to Test:** Email format validation and uniqueness check

1. Open the app in a fresh browser tab
2. Go to Registration screen
3. **Test Case A: Invalid Email Format**
   - Email: `not-an-email`
   - Expected: ❌ "Email invalide"
   - Check console: Should log `⚠️ [REGISTER] Invalid email format`

4. **Test Case B: Valid Email Format**
   - Email: `test@example.com`
   - Password: `password123`
   - Expected: ✅ "Compte créé!"
   - Check console: Should log `📝 Registration attempt:`

5. **Test Case C: Duplicate Email**
   - Try registering with same email again
   - Expected: ❌ "Email déjà utilisé"
   - Check console: Should log `⚠️ [REGISTER] Email already exists`

### Test 1.2: Admin Functions Migrated
**What to Test:** zaufaniDB_* functions work correctly

1. Login as an admin user
2. Open Admin Panel
3. Check for:
   - ✅ User statistics displayed
   - ✅ Sponsorship requests visible
   - ✅ User list shows all members
4. Check console for: `✅ Users synced from Firebase`

---

## 🟢 Phase 2: Real-Time Firebase Sync Verification

### Test 2.1: Location Synchronization
**What to Test:** Live location updates across devices

**Setup:**
- Have 2 browser tabs open, both logged in
- Tab A = "Device A", Tab B = "Device B"
- Enable location sharing on both

**Steps:**
1. On **Device A**: Enable location sharing
2. Check **Device B**: Wait 2-5 seconds
3. Expected on Device B: 👤 "Device A user" appears on map
4. Check console on Device B: `✅ Locations synced from Firebase`
5. Check Firebase Console → Realtime Database → `shared/locations/` → Should see user coordinates

### Test 2.2: Marketplace Listing Sync
**What to Test:** Creating a listing syncs to other devices

**Steps:**
1. On **Device A**: Create a new marketplace listing
   - Title: "Test Listing"
   - Description: "Testing real-time sync"
   - Price: 50 PLN
   - Category: "Items"
2. On **Device A**: Check console → `✅ Marketplace synced from Firebase`
3. On **Device B**: Wait 3-5 seconds
4. Expected: New listing appears in marketplace
5. Check Firebase Console → `shared/marketplace/listings/` → Should see listing

### Test 2.3: Message Synchronization
**What to Test:** Messages sync in real-time between devices

**Setup:**
- Both devices logged in as different users
- Create a marketplace listing on Device A
- Device B should see it and be able to message

**Steps:**
1. On **Device B**: Click "Message" on Device A's listing
2. On **Device B**: Send a test message: "Bonjour!"
3. On **Device A**: Wait 2-5 seconds
4. Expected on Device A: Message appears in conversation
5. On **Device A**: Send reply: "Salut!"
6. On **Device B**: Wait 2-5 seconds, see reply
7. Check Firebase Console → `shared/marketplace/messages/` → Both messages visible

### Test 2.4: News Sync
**What to Test:** News posts sync in real-time

**Steps:**
1. On **Device A**: Create new news item
   - Title: "Sync Test"
   - Description: "Testing real-time news sync"
   - Emoji: 📰
2. On **Device B**: Wait 3-5 seconds
3. Expected: New news appears in timeline on Device B
4. Check Firebase Console → `shared/news/` → Entry exists

---

## 🔌 Phase 3: Location Persistence Verification

### Test 3.1: Location Survives App Refresh
**What to Test:** Location persists across page reload

**Steps:**
1. On any device: Enable location sharing
2. Check map: Your location is visible
3. **Refresh the page** (Ctrl+R or Cmd+R)
4. Expected: Your location is still visible on map
5. Check localStorage: Open DevTools → Application → localStorage
6. Search for `zaufani-database` → Should contain `locations` object with your user

### Test 3.2: Family Members Stay Visible After Restart
**What to Test:** Other users' locations persist

**Steps:**
1. Have both Device A and Device B with location sharing enabled
2. Both should be visible on each other's maps
3. On **Device B**: Fully close and restart the app
4. Expected: Device A's location is still visible on Device B
5. Check localStorage for `zaufaniDB.locations` object

### Test 3.3: Location Accuracy Tracking
**What to Test:** GPS accuracy is recorded

**Steps:**
1. Open Developer Console → Network tab
2. Enable location sharing
3. Look for network request to `shared/locations/{userId}`
4. Check request payload → Should include:
   ```json
   {
     "lat": XX.XXXXX,
     "lng": XX.XXXXX,
     "accuracy": 25.5,
     "timestamp": "2026-05-05T10:30:00.000Z",
     "userName": "Your Name",
     "avatar": "🧑"
   }
   ```

---

## 📴 Phase 4: Offline Write Queue Verification

### Test 4.1: Create Listing While Offline
**What to Test:** Offline operations are queued

**Setup:**
- Disable internet (or use DevTools → Network → Offline)
- Be logged in

**Steps:**
1. With internet **OFF**, create a new listing
   - Title: "Offline Test Listing"
   - Price: 99 PLN
2. Check console: Should log `📋 [OFFLINE] Queued listing: op-xxxxx`
3. Check localStorage → `zaufani-offline-queue` → Should contain queue item
4. **Enable internet again**
5. Check console: Should log `⏳ [SYNC] Processing 1 offline operations...`
6. After 2-3 seconds: `✅ [SYNC] Synced listing`
7. Check Firebase Console → Listing should appear

### Test 4.2: Send Message While Offline
**What to Test:** Messages queue when offline

**Steps:**
1. Start a conversation (go online first if needed)
2. Disable internet
3. Send a message: "Testing offline queue"
4. Check console: `📋 [OFFLINE] Queued message`
5. Check localStorage → `zaufani-offline-queue` → Should have message
6. Enable internet
7. Check console: `✅ [SYNC] Synced message`
8. Check other device → Message appears

### Test 4.3: Multiple Offline Operations
**What to Test:** Multiple operations queue and process

**Steps:**
1. Go offline
2. Create 2 listings
3. Create 1 news item
4. Check localStorage → Should have 3 items in `zaufani-offline-queue`
5. Go online
6. Check console: `⏳ [SYNC] Processing 3 offline operations...`
7. Should see all 3 sync with `✅` messages
8. Check Firebase → All 3 should be there

### Test 4.4: Offline Persistence on Refresh
**What to Test:** Offline queue survives page reload

**Steps:**
1. Go offline
2. Create a listing
3. Check console: Operation queued
4. **Refresh the page** (still offline)
5. Expected: App still works, listing still in queue
6. Go online
7. Operation should sync automatically
8. Check console: `📋 [APP START] Found 1 pending offline operations`

---

## ✅ Phase 5: Data Validation Verification

### Test 5.1: Listing Validation
**What to Test:** Invalid listings are prevented

**Steps:**
1. Try to create a listing with:
   - **Missing Title**: Leave blank → Expected: Error message
   - **Invalid Price**: Enter "abc" → Expected: Error
   - **Invalid Category**: Select from dropdown (forced valid)
   - **Empty Description**: Leave blank → Expected: Error

### Test 5.2: User Validation
**What to Test:** Invalid users can't perform actions

**Steps:**
1. Open browser console and execute: `userState.userId = "invalid-id"`
2. Try to create a listing
3. Expected: Error in console → `⚠️ [VALIDATE] User validation failed`
4. Check console: `❌ Erreur utilisateur`

### Test 5.3: Email Uniqueness
**What to Test:** Can't create two accounts with same email

**Steps:**
1. Register: `john@example.com`
2. Try to register again: `john@example.com`
3. Expected: ❌ "Email déjà utilisé"
4. Try with different email: `john2@example.com`
5. Expected: ✅ Success

### Test 5.4: Message Validation
**What to Test:** Can't send messages with invalid data

**Steps:**
1. Open browser console and execute:
   ```javascript
   sendMessage('nonexistent-convo', 'invalid-sender', '')
   ```
2. Expected: Returns `false`, logs validation error
3. Should NOT appear in Firebase

### Test 5.5: Location Validation
**What to Test:** Invalid GPS coordinates rejected

**Steps:**
1. Open browser console and execute:
   ```javascript
   saveToOfflineQueue({
     type: 'location',
     data: { lat: 999, lng: 999, timestamp: Date.now() }
   });
   processOfflineQueue();
   ```
2. Expected: Validation fails, logged as error
3. Should NOT sync to Firebase

---

## 🚨 Error Handling Tests

### Test E.1: localStorage Quota Exceeded
**What to Test:** App handles full localStorage

**Steps:**
1. Open browser console
2. Fill localStorage:
   ```javascript
   for(let i = 0; i < 100; i++) {
     localStorage.setItem('test-' + i, 'x'.repeat(100000));
   }
   ```
3. Try to save app data
4. Check console: Should log `⚠️ localStorage quota exceeded`
5. App should still work with fallback

### Test E.2: Firebase Connection Loss
**What to Test:** App continues when Firebase unavailable

**Steps:**
1. Open DevTools → Network → Block `gstatic.com`
2. Try to create a listing
3. Expected: Works locally, queues for later
4. Check console: Firebase errors logged, but app continues
5. Unblock network
6. Operations should sync

### Test E.3: Invalid JSON in localStorage
**What to Test:** App handles corrupted data

**Steps:**
1. Open DevTools → Storage → localStorage
2. Find `zaufani-database`
3. Edit value: Delete a `}` to corrupt JSON
4. Refresh page
5. Expected: App detects corruption, uses Firebase data
6. Check console: `❌ Failed to parse localStorage`

---

## 📊 Browser DevTools Verification

### Console Logs to Look For

**On App Start (each log confirms a phase):**
```
✅ [SAVE] Data saved to localStorage           // Phase 3
✅ Data loaded from Firebase                    // Phase 2
✅ Posts synced from Firebase                   // Phase 2
✅ Marketplace synced from Firebase             // Phase 2
✅ News synced from Firebase                    // Phase 2
✅ Ratings synced from Firebase                 // Phase 2
✅ Users synced from Firebase                   // Phase 2
✅ Locations synced from Firebase               // Phase 3
✅ Conversations synced from Firebase           // Phase 2
🟢 [STATUS] Back online - starting sync...     // Phase 4
📋 [SYNC] Processing X offline operations      // Phase 4
```

### Firebase Console Verification

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Realtime Database
4. Navigate to `shared/`:
   - `locations/` → Should have user coordinates
   - `marketplace/listings/` → Should have listings
   - `marketplace/messages/` → Should have messages
   - `news/` → Should have news items
   - `users/` → Should have user objects

---

## ✨ Final Verification Checklist

Use this checklist to confirm all phases work:

### Phase 1: Database Unification
- [ ] Email validation works (invalid emails rejected)
- [ ] Duplicate email prevention works
- [ ] zaufaniDB_* functions used throughout
- [ ] No references to `userDB` in code
- [ ] db.js is deleted

### Phase 2: Real-Time Sync
- [ ] Locations sync within 5 seconds across devices
- [ ] Messages appear within 2 seconds on other device
- [ ] Listings appear within 5 seconds on other device
- [ ] News items sync in real-time
- [ ] Firebase console shows all data

### Phase 3: Location Persistence
- [ ] Location survives page refresh
- [ ] Family locations visible after app restart
- [ ] Accuracy and timestamp recorded
- [ ] zaufaniDB.locations populated

### Phase 4: Offline Queue
- [ ] Can create listings offline
- [ ] Can send messages offline
- [ ] Operations queue in localStorage
- [ ] All queued ops sync when online
- [ ] Queue survives page refresh

### Phase 5: Data Validation
- [ ] Email format validation works
- [ ] Duplicate email prevention works
- [ ] Listing validation prevents incomplete data
- [ ] Message validation works
- [ ] Location coordinates validated
- [ ] localStorage quota error handled

---

## 🎯 Success Criteria

**App is READY FOR DEPLOYMENT when:**

✅ All console logs appear on app start
✅ Can create listings and have them appear on another device within 5 seconds
✅ Can send messages and have them appear within 2 seconds
✅ Offline mode queues operations successfully
✅ All queued operations sync when reconnected
✅ Invalid data is rejected with proper error messages
✅ No console errors (only warnings for Firebase if offline)
✅ Firebase console shows all data being synced
✅ App works with 20+ users simultaneously

---

## 📞 Troubleshooting

### Issue: Locations not syncing
- Check browser location permissions
- Check console for GPS errors
- Verify Firebase has `shared/locations` path
- Check that both devices have location sharing enabled

### Issue: Messages not appearing
- Verify conversation exists on both devices
- Check Firebase `shared/marketplace/messages` path
- Confirm sender user ID is valid
- Check network connectivity

### Issue: Offline queue not processing
- Go online and refresh page
- Check `zaufani-offline-queue` in localStorage
- Verify Firebase is accessible (not blocked)
- Check browser console for error messages

### Issue: Data not persisting
- Check localStorage quota (DevTools → Application)
- Verify `zaufani-database` key exists
- Try clearing localStorage and re-registering
- Check browser privacy settings aren't blocking storage

---

**Testing completed on:** May 5, 2026
**Ready for:** Google Play Deployment
