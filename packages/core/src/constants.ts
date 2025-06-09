/**
 * Predefined authentication error messages
 */
export const AUTH_ERRORS = {
  validationError: 'Some of the data you entered is invalid. Please try again.',
  invalidRequest: 'Invalid request. Please try again.',
  userNotFound: 'We couldn’t find your account. Please try again.',
  userEmailNotFound: 'We couldn’t find an account with that email. Please try again.',
  signOutError: 'An error occurred while signing out. Please try again.',
  oauthCallbackMissing: 'Something went wrong. Please refresh the page and try again.',
  oauthError: 'For security reasons, we stopped the authentication flow. Please try again.',
} as const;

/**
 * Used for extracting predefined query parameters.
 * - e.g. SEARCH_PARAMS.errorMessage → 'error_message'
 */
export const SEARCH_PARAMS = {
  code: 'code',
  redirectUrl: 'redirect_url',
  errorMessage: 'error_message',
} as const;
