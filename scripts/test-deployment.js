#!/usr/bin/env node

/**
 * Deployment Configuration Test Script
 * 
 * This script tests the deployment configuration to ensure routes
 * are properly isolated based on DEPLOYMENT_TYPE environment variable.
 * 
 * Usage:
 *   node scripts/test-deployment.js
 */

const http = require('http');

const DEPLOYMENT_TYPE = process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE || 'PATIENT';
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

console.log('\n🧪 Testing Deployment Configuration\n');
console.log(`Deployment Type: ${DEPLOYMENT_TYPE}`);
console.log(`Testing against: http://${HOST}:${PORT}\n`);

// Define test routes
const patientRoutes = [
  '/',
  '/about',
  '/services',
  '/gallery',
  '/contact',
  '/booking',
  '/auth/login',
  '/auth/signup',
];

const adminRoutes = [
  '/admin',
  '/admin/dashboard',
  '/admin/appointments',
  '/admin/patients',
  '/admin/providers',
  '/admin/services',
];

// Test a single route
function testRoute(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Deployment-Test-Script',
      },
    };

    const req = http.request(options, (res) => {
      resolve({
        path,
        statusCode: res.statusCode,
        success: res.statusCode < 400,
      });
    });

    req.on('error', (error) => {
      resolve({
        path,
        statusCode: 0,
        success: false,
        error: error.message,
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        path,
        statusCode: 0,
        success: false,
        error: 'Timeout',
      });
    });

    req.end();
  });
}

// Run tests
async function runTests() {
  let passed = 0;
  let failed = 0;

  if (DEPLOYMENT_TYPE === 'PATIENT') {
    console.log('📋 Testing Patient Deployment Routes\n');
    
    // Patient routes should work
    console.log('✅ Routes that SHOULD work:');
    for (const route of patientRoutes) {
      const result = await testRoute(route);
      if (result.success) {
        console.log(`  ✓ ${result.path} - ${result.statusCode}`);
        passed++;
      } else {
        console.log(`  ✗ ${result.path} - ${result.statusCode} (FAILED)`);
        failed++;
      }
    }

    // Admin routes should NOT work
    console.log('\n❌ Routes that should NOT work (should return 404):');
    for (const route of adminRoutes) {
      const result = await testRoute(route);
      if (result.statusCode === 404) {
        console.log(`  ✓ ${result.path} - 404 (correctly blocked)`);
        passed++;
      } else {
        console.log(`  ✗ ${result.path} - ${result.statusCode} (SHOULD BE 404)`);
        failed++;
      }
    }
  } else if (DEPLOYMENT_TYPE === 'ADMIN') {
    console.log('📋 Testing Admin Deployment Routes\n');
    
    // Admin routes should work
    console.log('✅ Routes that SHOULD work:');
    for (const route of adminRoutes) {
      const result = await testRoute(route);
      if (result.success) {
        console.log(`  ✓ ${result.path} - ${result.statusCode}`);
        passed++;
      } else {
        console.log(`  ✗ ${result.path} - ${result.statusCode} (FAILED)`);
        failed++;
      }
    }

    // Patient routes (except auth) should NOT work
    console.log('\n❌ Routes that should NOT work (should return 404):');
    const blockedRoutes = patientRoutes.filter(r => !r.startsWith('/auth'));
    for (const route of blockedRoutes) {
      const result = await testRoute(route);
      if (result.statusCode === 404) {
        console.log(`  ✓ ${result.path} - 404 (correctly blocked)`);
        passed++;
      } else {
        console.log(`  ✗ ${result.path} - ${result.statusCode} (SHOULD BE 404)`);
        failed++;
      }
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${passed + failed}`);
  console.log(`Passed: ${passed} ✓`);
  console.log(`Failed: ${failed} ✗`);
  console.log('='.repeat(50) + '\n');

  if (failed === 0) {
    console.log('🎉 All tests passed! Deployment configuration is correct.\n');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed. Please check your deployment configuration.\n');
    console.log('Troubleshooting:');
    console.log('1. Ensure NEXT_PUBLIC_DEPLOYMENT_TYPE is set correctly');
    console.log('2. Restart your development server');
    console.log('3. Check middleware.ts configuration');
    console.log('4. Verify deployment-config.ts settings\n');
    process.exit(1);
  }
}

// Check if server is running
async function checkServer() {
  try {
    const result = await testRoute('/');
    if (result.error) {
      console.log('❌ Error: Development server is not running!\n');
      console.log('Please start the server first:');
      console.log('  npm run dev\n');
      process.exit(1);
    }
  } catch (error) {
    console.log('❌ Error: Could not connect to server\n');
    process.exit(1);
  }
}

// Main execution
(async () => {
  await checkServer();
  await runTests();
})();

