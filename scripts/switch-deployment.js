#!/usr/bin/env node

/**
 * Deployment Switcher Script
 * 
 * This script switches between patient and admin deployments by:
 * 1. Copying the appropriate middleware file (middleware.patient.ts or middleware.admin.ts)
 * 2. Clearing the Next.js cache (.next directory)
 * 3. Setting the deployment type for client-side code
 * 
 * Usage:
 *   node scripts/switch-deployment.js patient
 *   node scripts/switch-deployment.js admin
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get deployment type from command line argument
const deploymentType = process.argv[2]?.toLowerCase();

if (!deploymentType || !['patient', 'admin'].includes(deploymentType)) {
  console.error('❌ Error: Invalid deployment type');
  console.error('Usage: node scripts/switch-deployment.js [patient|admin]');
  process.exit(1);
}

const rootDir = path.join(__dirname, '..');
const sourceMiddleware = path.join(rootDir, `middleware.${deploymentType}.ts`);
const targetMiddleware = path.join(rootDir, 'middleware.ts');
const nextDir = path.join(rootDir, '.next');

console.log(`\n🔄 Switching to ${deploymentType.toUpperCase()} deployment...\n`);

// Step 1: Check if source middleware exists
if (!fs.existsSync(sourceMiddleware)) {
  console.error(`❌ Error: Source middleware file not found: ${sourceMiddleware}`);
  process.exit(1);
}

// Step 2: Copy middleware file
try {
  console.log(`📄 Copying middleware.${deploymentType}.ts to middleware.ts...`);
  fs.copyFileSync(sourceMiddleware, targetMiddleware);
  console.log('✅ Middleware file copied successfully');
} catch (error) {
  console.error('❌ Error copying middleware file:', error.message);
  process.exit(1);
}

// Step 3: Clear Next.js cache
try {
  console.log('🗑️  Clearing Next.js cache (.next directory)...');
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('✅ Cache cleared successfully');
  } else {
    console.log('ℹ️  No cache to clear (.next directory does not exist)');
  }
} catch (error) {
  console.error('⚠️  Warning: Could not clear cache:', error.message);
  console.log('ℹ️  You may need to manually delete the .next directory');
}

// Step 4: Create/update deployment marker file for client-side code
try {
  const deploymentConfigPath = path.join(rootDir, 'deployment.config.json');
  const deploymentConfig = {
    type: deploymentType.toUpperCase(),
    timestamp: new Date().toISOString(),
  };
  
  console.log('📝 Creating deployment configuration...');
  fs.writeFileSync(deploymentConfigPath, JSON.stringify(deploymentConfig, null, 2));
  console.log('✅ Deployment configuration created');
} catch (error) {
  console.error('⚠️  Warning: Could not create deployment config:', error.message);
}

// Step 5: Success message
console.log('\n✅ Deployment switch complete!');
console.log(`\n🚀 You can now run: npm run dev`);
console.log(`\n📊 Active deployment: ${deploymentType.toUpperCase()}`);
console.log('\n' + '='.repeat(60) + '\n');

// Step 6: Show route information
if (deploymentType === 'patient') {
  console.log('📍 PATIENT DEPLOYMENT - Available Routes:');
  console.log('  ✅ /              (Homepage)');
  console.log('  ✅ /about         (About page)');
  console.log('  ✅ /services      (Services page)');
  console.log('  ✅ /gallery       (Gallery page)');
  console.log('  ✅ /contact       (Contact page)');
  console.log('  ✅ /booking       (Booking flow)');
  console.log('  ✅ /auth          (Authentication)');
  console.log('\n📍 BLOCKED Routes (will return 404):');
  console.log('  ❌ /dashboard');
  console.log('  ❌ /appointments');
  console.log('  ❌ /patients');
  console.log('  ❌ /providers');
  console.log('  ❌ /manage-services');
} else {
  console.log('📍 ADMIN DEPLOYMENT - Available Routes:');
  console.log('  ✅ /              (Redirects to /dashboard)');
  console.log('  ✅ /dashboard     (Admin dashboard)');
  console.log('  ✅ /appointments  (Appointments management)');
  console.log('  ✅ /patients      (Patients management)');
  console.log('  ✅ /providers     (Providers management)');
  console.log('  ✅ /manage-services (Services management)');
  console.log('  ✅ /auth/login    (Admin login)');
  console.log('\n📍 BLOCKED Routes (will return 404):');
  console.log('  ❌ /about');
  console.log('  ❌ /services');
  console.log('  ❌ /gallery');
  console.log('  ❌ /contact');
}

console.log('\n' + '='.repeat(60) + '\n');

