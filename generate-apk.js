#!/usr/bin/env node
const { Config, Fingerprint, AppBundle } = require('@bubblewrap/core');
const fs = require('fs');
const path = require('path');

async function generateAPK() {
  try {
    console.log('🔨 Generating Zaufani APK...\n');

    // Configuration
    const config = new Config(
      'com.zaufani.rodzina',       // packageId
      'localhost:8000',             // host
      '/zaufani-rodzina.html',      // startUrl
      './zaufani-signing-key.keystore', // signing key
      'zaufani',                    // key alias
      'temp123456',                 // key password
      'Zaufani Rodzina',            // appName
      1,                            // appVersion code
      '1.0.0',                      // appVersion
      'Zaufani',                    // launcherName
      null,                         // theme color (will use from manifest)
      null,                         // background color
      'https://zaufani.web.app/assets/icon-512.png', // icon
      null,                         // maskableIcon
      [], // shortcuts
      false, // preferRelatedApplications
      { text: 'Marketplace', url: '?tab=home' } // preferRelatedApplication
    );

    console.log(`✅ Config created: ${config.packageId}`);
    console.log(`📱 App: ${config.appName} v${config.appVersion}`);
    console.log(`🔑 Signing key: ${config.signingKeyPath}`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

generateAPK();
