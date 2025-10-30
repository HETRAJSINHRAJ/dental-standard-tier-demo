"use client";

export default function TestDeploymentPage() {
  const deploymentType = process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE;
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Deployment Test Page</h1>
      <div className="bg-card p-6 rounded-lg border">
        <p className="text-lg mb-2">
          <strong>Deployment Type:</strong> {deploymentType || 'NOT SET'}
        </p>
        <p className="text-sm text-muted-foreground">
          This page shows the current deployment configuration.
        </p>
      </div>
    </div>
  );
}

