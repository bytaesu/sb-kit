import { SearchParams } from 'next/dist/server/request/search-params';

import { SbKitConfig } from './sb-kit/sb-kit.types';

/**
 * Returns a safe redirect path by validating the given URL
 * against allowed hosts and blocked paths.
 *
 * @param redirectUrl - Target redirect URL (can be absolute or relative)
 * @param sbKitConfig - SbKit sbKitConfig used to enforce redirect policies
 * @returns A safe redirect path or the defaultPathAfterAuth if validation fails
 */
export function getSafeRedirectPath(redirectUrl: URL, sbKitConfig: SbKitConfig): string {
  const { defaultPathAfterAuth, allowedHosts, blockedPaths } = sbKitConfig.redirectPolicy;

  const hasAllowedProtocol = ['http:', 'https:'].includes(redirectUrl.protocol);

  // Check if the URL uses an allowed protocol but is from a disallowed host
  if (hasAllowedProtocol && !allowedHosts.includes(redirectUrl.host)) {
    return defaultPathAfterAuth;
  }

  // Check if the path starts with any blocked prefix
  const isBlocked = blockedPaths.some((blocked) => redirectUrl.pathname.startsWith(blocked));

  if (isBlocked) {
    return defaultPathAfterAuth;
  }

  // Return safe path including query and hash
  return redirectUrl.pathname + redirectUrl.search + redirectUrl.hash;
}

/**
 * Parses a redirect URL from a search param and validates it securely.
 *
 * @param redirectUrl - Raw redirect value from query/search params
 * @param urlBase - Base URL used to resolve relative URLs
 * @param sbKitConfig - SbKit sbKitConfig used to enforce redirect policies
 * @returns A safe redirect path or the defaultPathAfterAuth if validation fails
 */
export function getSafeRedirectPathFromParam(
  redirectUrl: SearchParams[string],
  urlBase: string | URL,
  sbKitConfig: SbKitConfig,
): string {
  if (typeof redirectUrl !== 'string') {
    return sbKitConfig.redirectPolicy.defaultPathAfterAuth;
  }

  try {
    const rawUrl = new URL(redirectUrl, urlBase);
    return getSafeRedirectPath(rawUrl, sbKitConfig);
  } catch {
    return sbKitConfig.redirectPolicy.defaultPathAfterAuth;
  }
}
