import { NextRequest, NextResponse } from 'next/server';

import { SEARCH_PARAMS } from './constants';
import type { SbKitConfig } from './sb-kit/sb-kit.types';
import { getMiddlewareClient } from './supabase/client-factory';

/**
 * Route guard for Next.js Middleware based on authentication state.
 *
 * Supports prefix-based route policies:
 * - Redirects authenticated users away from `public-only` routes.
 * - Redirects unauthenticated users away from `private-only` routes.
 *
 * @param request - Incoming Next.js request
 * @param sbKitConfig - sb-kit auth configuration
 * @returns A NextResponse (redirect or pass-through)
 */
export async function routeGuard(request: NextRequest, sbKitConfig: SbKitConfig) {
  const { supabaseResponse, user, error: AuthError } = await getMiddlewareClient(request);
  const { redirectPolicy, routeGuardPolicy, authRoutes } = sbKitConfig;

  const onlyPublicRoutes = routeGuardPolicy?.onlyPublic ?? [];
  const onlyPrivateRoutes = routeGuardPolicy?.onlyPrivate ?? [];

  const pathname = request.nextUrl.pathname;

  // Redirect authenticated users away from public-only routes
  const isPublicOnlyPath = onlyPublicRoutes.some((route) => pathname.startsWith(route));
  if (isPublicOnlyPath && user) {
    const loggedInDefaultUrl = new URL(redirectPolicy.defaultPathAfterAuth, request.url);
    return NextResponse.redirect(loggedInDefaultUrl);
  }

  // Redirect unauthenticated users away from private-only routes
  const isPrivateOnlyPath = onlyPrivateRoutes.some((route) => pathname.startsWith(route));
  if (isPrivateOnlyPath && (!user || AuthError)) {
    const signInUrl = new URL(authRoutes.signIn, request.url);
    // Preserve the original destination to redirect the user back after authentication
    signInUrl.searchParams.set(SEARCH_PARAMS.redirectUrl, request.nextUrl.toString());
    return NextResponse.redirect(signInUrl);
  }

  // Allow access
  return supabaseResponse;
}
