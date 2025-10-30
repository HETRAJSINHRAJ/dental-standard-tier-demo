import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_DEPLOYMENT_TYPE: process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE,
    NODE_ENV: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('DEPLOYMENT') || key.includes('NEXT_PUBLIC')),
  });
}

