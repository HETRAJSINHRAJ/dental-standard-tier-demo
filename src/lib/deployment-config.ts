/**
 * Deployment Configuration
 *
 * This file handles the configuration for different deployment types:
 * - PATIENT: Patient-facing booking system
 * - ADMIN: Admin management panel
 *
 * The deployment type is determined by the active middleware file:
 * - middleware.patient.ts → PATIENT deployment
 * - middleware.admin.ts → ADMIN deployment
 *
 * Use npm scripts to switch deployments:
 * - npm run dev:patient
 * - npm run dev:admin
 */

export type DeploymentType = 'PATIENT' | 'ADMIN';

/**
 * Get the current deployment type
 *
 * Reads from deployment.config.json created by the switch-deployment script.
 */
export function getDeploymentType(): DeploymentType {
  // Try to read from deployment config file (created by switch script)
  if (typeof window === 'undefined') {
    // Server-side: try to read the config file
    try {
      const fs = require('fs');
      const path = require('path');
      const configPath = path.join(process.cwd(), 'deployment.config.json');

      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        return config.type === 'ADMIN' ? 'ADMIN' : 'PATIENT';
      }
    } catch (error) {
      // Fallback to PATIENT if config file doesn't exist
    }
  }

  // Default to PATIENT deployment
  return 'PATIENT';
}

/**
 * Check if current deployment is patient-facing
 */
export function isPatientDeployment(): boolean {
  return getDeploymentType() === 'PATIENT';
}

/**
 * Check if current deployment is admin panel
 */
export function isAdminDeployment(): boolean {
  return getDeploymentType() === 'ADMIN';
}

/**
 * Patient-facing routes (allowed in PATIENT deployment)
 */
export const PATIENT_ROUTES = [
  '/',
  '/about',
  '/services',
  '/gallery',
  '/contact',
  '/booking',
  '/booking/provider',
  '/booking/datetime',
  '/booking/confirm',
  '/booking/success',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
];

/**
 * Admin routes (allowed in ADMIN deployment)
 * Admin routes are now at root level: /dashboard, /appointments, etc.
 */
export const ADMIN_ROUTES = [
  '/',
  '/dashboard',
  '/appointments',
  '/patients',
  '/providers',
  '/manage-services', // Admin services management (renamed to avoid conflict with patient /services)
  '/auth/login', // Admin also needs login
];

/**
 * Check if a route is allowed in the current deployment
 */
export function isRouteAllowed(pathname: string): boolean {
  const deploymentType = getDeploymentType();
  
  if (deploymentType === 'PATIENT') {
    // Check if route matches any patient route (including dynamic segments)
    return PATIENT_ROUTES.some(route => {
      if (route === pathname) return true;
      if (pathname.startsWith(route + '/')) return true;
      return false;
    });
  }
  
  if (deploymentType === 'ADMIN') {
    // Check if route matches any admin route (including dynamic segments)
    return ADMIN_ROUTES.some(route => {
      if (route === pathname) return true;
      if (pathname.startsWith(route + '/')) return true;
      return false;
    });
  }
  
  return false;
}

/**
 * Get the home URL for the current deployment
 */
export function getHomeUrl(): string {
  return isAdminDeployment() ? '/dashboard' : '/';
}

/**
 * Get the login redirect URL for the current deployment
 */
export function getLoginRedirectUrl(): string {
  return isAdminDeployment() ? '/dashboard' : '/';
}

/**
 * Get deployment-specific configuration
 */
export function getDeploymentConfig() {
  const deploymentType = getDeploymentType();
  
  return {
    type: deploymentType,
    isPatient: deploymentType === 'PATIENT',
    isAdmin: deploymentType === 'ADMIN',
    homeUrl: getHomeUrl(),
    loginRedirectUrl: getLoginRedirectUrl(),
    allowedRoutes: deploymentType === 'PATIENT' ? PATIENT_ROUTES : ADMIN_ROUTES,
  };
}

