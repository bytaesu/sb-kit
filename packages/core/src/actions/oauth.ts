'use server';

import { headers } from 'next/headers';

import { AUTH_ERRORS, SEARCH_PARAMS } from '../constants';
import type { OAuthProvider } from '../oauth-provider';
import { getServerClient } from '../supabase/client-factory';
import { extractErrorMessage } from '../utils';
import type { ActionResult } from './action.types';

export async function OAuthAction(
  provider: OAuthProvider,
  redirectUrl: string | null,
  oauthCallbackRoute: string,
): Promise<ActionResult<string>> {
  try {
    // Extract origin from headers
    const headersList = await headers();
    const origin = headersList.get('origin');
    if (!origin) {
      return { data: null, errorMessage: AUTH_ERRORS.invalidRequest };
    }

    // Set site callback url
    const siteCallbackUrl = new URL(oauthCallbackRoute, origin);
    if (redirectUrl) {
      siteCallbackUrl.searchParams.set(SEARCH_PARAMS.redirectUrl, redirectUrl);
    }

    // Get supabase callback url
    const supabase = await getServerClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: siteCallbackUrl.toString(),
      },
    });

    if (error) {
      return { data: null, errorMessage: error.message };
    }

    if (!data.url) {
      return {
        data: null,
        errorMessage: AUTH_ERRORS.oauthCallbackMissing,
      };
    }

    // Success
    return { data: data.url, errorMessage: null };
  } catch (error) {
    // Return a error message if an unexpected error occurs
    return { data: null, errorMessage: extractErrorMessage(error) };
  }
}
