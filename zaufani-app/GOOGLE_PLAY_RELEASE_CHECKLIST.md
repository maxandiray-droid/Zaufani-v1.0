# 🚀 Zaufani Rodzina - Google Play Release Checklist

## Status: READY FOR SUBMISSION (APK generation pending)

---

## 📋 Phase 1: Preparation ✅ COMPLETE

- [x] App source code finalized (zaufani-rodzina.html)
- [x] Service Worker configured (sw.js)
- [x] Web Manifest created (manifest.json)
- [x] Icons and assets created:
  - [x] icon-192.png
  - [x] icon-512.png  
  - [x] apple-touch-icon.png
  - [x] screenshot-mobile-1.png
  - [x] screenshot-mobile-2.png
  - [x] screenshot-tablet.png
  - [x] feature-graphic-1024x500.png
- [x] Google Play listing content prepared
- [x] Cordova project created
- [x] Firebase configured

---

## 📦 Phase 2: APK Generation (NEXT STEP)

### Option A: Using Android Studio (Recommended)
1. Install [Android Studio](https://developer.android.com/studio)
2. Open project: `zaufani-app/`
3. Go to: Build → Generate Signed APK
4. Use existing keystore: `zaufani-signing-key.keystore`
5. Password: `temp123456`
6. Choose: "release" build variant
7. Click "Finish" → APK will be generated in `app/release/`

### Option B: Using EAS (Easiest for Web Apps)
1. Create account at [eas.expo.dev](https://eas.expo.dev)
2. Upload this project
3. Trigger build for Android
4. Download signed APK (5-10 minutes)

### Option C: Command Line (if Android SDK is installed)
```bash
cd zaufani-app
export ANDROID_HOME=/path/to/android/sdk
cordova build android --release
# APK will be in: platforms/android/app/build/outputs/apk/release/
```

---

## 🎯 Phase 3: Google Play Setup

### Create Google Play Account
1. Go to [play.google.com/console](https://play.google.com/console)
2. Sign in with Google account
3. Pay $25 developer registration fee
4. Accept agreements

### Create New App
1. Click "Create app"
2. **App name**: Zaufani Rodzina - Sieć Rodzinna
3. **Default language**: Polish (pl)
4. **App type**: Application
5. **Category**: Lifestyle

---

## 📱 Phase 4: App Listing (All Content Ready)

### Store Presence Section
- [x] **Title**: Zaufani Rodzina - Sieć Rodzinna (50 chars max) ✓
- [x] **Short description**: Sieć rodzinna do dzielenia się, kupowania i sprzedaży między sobą (80 chars) ✓

### Detailed App Description
- [x] **Full description** (4000 chars) - READY in GOOGLE_PLAY_LISTING.md ✓

### Visual Assets
- [x] **App icon**: 512x512 PNG → `assets/icon-512.png` ✓
- [x] **Feature graphic**: 1024x500 PNG → `assets/feature-graphic-1024x500.png` ✓
- [x] **Screenshots** (2-8):
  - Mobile (1080x1920): screenshot-mobile-1.png ✓
  - Mobile (1080x1920): screenshot-mobile-2.png ✓
  - Tablet (1280x720): screenshot-tablet.png ✓

### Categorization
- [x] **Category**: Lifestyle ✓
- [x] **Content rating**: 4+ (PEGI) ✓

### Contact Information
- [ ] **Developer email**: contact@zaufani.app (UPDATE THIS)
- [ ] **Developer website**: zaufani.app (UPDATE THIS)
- [ ] **Support email**: support@zaufani.app (UPDATE THIS)

### Legal
- [x] **Privacy policy URL**: See `privacy-policy.html` ✓
- [x] **Terms & conditions**: See `terms.html` ✓

---

## 🔒 Phase 5: Content Rating Questionnaire

1. **Violence**: No
2. **Sexual content**: No
3. **Profanity**: No
4. **Alcohol & tobacco**: No
5. **Gambling**: No
6. **Personal information**: Yes
   - Location data (family tracking - user opt-in)
   - User-generated content
   - Device/usage analytics
7. **Financial**: No
8. **Sensitive events**: No

---

## 📲 Phase 6: Store Listing Upload to Google Play

### Step-by-Step:
1. Log in to [Google Play Console](https://play.google.com/console)
2. Select your app "Zaufani Rodzina"
3. Go to **Store presence** → **Store listing**
4. Fill in:
   - App title ✓
   - Short description ✓
   - Full description (copy from GOOGLE_PLAY_LISTING.md) ✓
   - Graphics (upload PNG files from assets/) ✓
5. Go to **Releases** → **Create new release**
6. Upload APK (once generated - Step 2)
7. Set version code: `1`
8. Set version number: `1.0.0`
9. Add release notes (optional): "Initial release"
10. Review everything
11. Submit for review

---

## 📊 Phase 7: Upload & Review

### File Requirements
- **APK**: Signed Android Package
- **Min SDK**: 21 (Android 5.0)
- **Target SDK**: 34 (Android 14)  
- **Architecture**: arm64-v8a, armeabi-v7a

### Review Timeline
- **Google Play Review**: Usually 2-4 hours
- **Possible outcomes**:
  - ✅ Approved → App goes live immediately
  - ⚠️ Changes needed → You'll get feedback
  - ❌ Rejected → Will specify reason

### After Approval
- App appears on Google Play
- Users can search and download
- Monitor reviews and ratings
- Push updates via same console

---

## 🔑 Key Credentials

| Item | Value | Location |
|------|-------|----------|
| Package ID | com.zaufani.rodzina | manifest.json, config.xml |
| Keystore | zaufani-signing-key.keystore | Current directory |
| Keystore Password | temp123456 | Keep secure |
| Key Alias | zaufani | keystore |
| Signing Key Password | temp123456 | Keep secure |

**⚠️ IMPORTANT**: Keep `zaufani-signing-key.keystore` and passwords secure. You'll need them for all future app updates.

---

## 📝 Files Ready to Use

```
zaufani-app/                    (Cordova project)
├── www/
│   ├── index.html             (your app)
│   ├── manifest.json          (PWA manifest)
│   ├── sw.js                  (service worker)
│   └── assets/
│       ├── icon-512.png       ✓
│       ├── icon-192.png       ✓
│       ├── screenshot-*.png   ✓
│       └── feature-graphic-1024x500.png ✓
├── config.xml                 (Cordova config)
└── [will generate APK here]

zaufani-signing-key.keystore   (Android signing key) ✓
GOOGLE_PLAY_LISTING.md         (Complete listing content) ✓
GOOGLE_PLAY_RELEASE_CHECKLIST.md (This file) ✓
```

---

## 🎯 Next Steps (In Order)

1. **Generate APK** (choose Option A, B, or C above)
2. **Create Google Play Developer Account** ($25)
3. **Create app** in Play Console
4. **Upload assets** (icons, screenshots, graphics)
5. **Fill listing details** (copy from GOOGLE_PLAY_LISTING.md)
6. **Answer content rating** questions
7. **Upload APK** in release section
8. **Review & submit** for Google Play review
9. **Wait for approval** (usually 2-4 hours)
10. **Launch!** 🎉

---

## 💡 Tips

- Test APK on an Android device before submitting
- Take high-quality screenshots directly from app
- Use actual device names in feature graphic
- Reply quickly if Google asks for clarifications
- Monitor first week of reviews for feedback
- Plan updates based on user feedback

---

## 🆘 Troubleshooting

**Issue**: "Keystore not found"
- Ensure `zaufani-signing-key.keystore` is in current directory

**Issue**: "App not installable"
- Check that APK is signed correctly
- Verify target SDK >= 31 for Google Play 2024

**Issue**: "Missing privacy policy"
- Upload `privacy-policy.html` to your website

**Issue**: "Content rating rejection"
- Make sure to answer all questions in content rating form
- Resubmit form if rejected

---

Generated: May 5, 2026
Ready for production: ✅ Yes (pending APK generation)
