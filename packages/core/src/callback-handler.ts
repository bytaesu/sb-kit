import { NextResponse } from 'next/server';

import { AUTH_ERRORS, SEARCH_PARAMS } from './constants';
import { getSafeRedirectPathFromParam } from './safe-redirect';
import { SbKitConfig } from './sb-kit/sb-kit.types';
import { getServerClient } from './supabase/client-factory';

/**
 * Handles OAuth callback.
 * Exchanges code for session and redirects securely to a validated path.
 */
export async function callbackHandler(request: Request, sbKitConfig: SbKitConfig) {
  const url = new URL(request.url);
  const codeParam = url.searchParams.get(SEARCH_PARAMS.code);
  const redirectUrlParam = url.searchParams.get(SEARCH_PARAMS.redirectUrl);
  const origin = getOrigin(request, url);

  const supabase = await getServerClient();

  if (codeParam) {
    const { error } = await supabase.auth.exchangeCodeForSession(codeParam);

    if (!error) {
      const safePath = getSafeRedirectPathFromParam(redirectUrlParam ?? '', origin, sbKitConfig);

      return NextResponse.redirect(new URL(safePath, origin));
    }
  }

  await supabase.auth.signOut();

  return redirectWithError(origin, sbKitConfig.authRoutes.signIn, redirectUrlParam);
}

/**
 * Constructs the origin considering proxy environments.
 */
function getOrigin(request: Request, fallbackUrl: URL): string {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const protocol = request.headers.get('x-forwarded-proto') ?? 'https';
  const isLocal = process.env.NODE_ENV === 'development';

  return isLocal || !forwardedHost ? fallbackUrl.origin : `${protocol}://${forwardedHost}`;
}

/**
 * Redirects to sign-in with an error message.
 */
function redirectWithError(origin: string, signInPath: string, redirectUrlParam: string | null) {
  const url = new URL(signInPath, origin);
  url.searchParams.set(SEARCH_PARAMS.errorMessage, AUTH_ERRORS.oauthError);

  if (redirectUrlParam) {
    url.searchParams.set(SEARCH_PARAMS.redirectUrl, redirectUrlParam);
  }

  return NextResponse.redirect(url);
}
