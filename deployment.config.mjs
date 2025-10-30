/**
 * Deployment Configuration
 * 
 * This file is used by middleware to determine the deployment type.
 * 
 * IMPORTANT: Change this value manually when switching deployments in development:
 * - Set to 'PATIENT' for patient deployment
 * - Set to 'ADMIN' for admin deployment
 * 
 * For production builds, this will be set automatically via build scripts.
 */

export const DEPLOYMENT_TYPE = process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE || 'PATIENT';

