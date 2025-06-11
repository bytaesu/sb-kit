import { type NextRequest, NextResponse } from 'next/server';

import { sbKit } from './lib/supabase/sb-kit';

export async function middleware(request: NextRequest) {
  const routeGuardResponse = await sbKit.routeGuard(request);
  if (routeGuardResponse) return routeGuardResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
