'use client';

import { useEffect, useState } from 'react';

import { SEARCH_PARAMS } from '../constants';

/**
 * Extracts and returns the `redirectUrl` query param (CSR only).
 *
 * Avoids `useSearchParams()` to fix this:
 * https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
 *
 * Didn’t feel like using <Suspense /> just for this.
 */
export function useRedirectUrl(): string | null {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrlParam = searchParams.get(SEARCH_PARAMS.redirectUrl);
    setRedirectUrl(redirectUrlParam);
  }, []);

  return redirectUrl;
}
