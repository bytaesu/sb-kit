import type { SearchParams } from 'next/dist/server/request/search-params';
import { AUTH_ERRORS } from './constants';

type AuthErrorMessage = (typeof AUTH_ERRORS)[keyof typeof AUTH_ERRORS];

/**
 * Type guard to check whether a string is a known auth error message.
 */
const isAuthErrorMessage = (message: string): message is AuthErrorMessage => {
  return Object.values(AUTH_ERRORS).includes(message as AuthErrorMessage);
};

/**
 * Validates and returns a known auth error message from a search param.
 * If the value is not a string or not a predefined message, returns null.
 */
export const parseAuthError = (error: SearchParams[string]): AuthErrorMessage | null => {
  if (typeof error !== 'string') {
    return null;
  }

  const decoded = decodeURIComponent(error);
  return isAuthErrorMessage(decoded) ? decoded : null;
};
