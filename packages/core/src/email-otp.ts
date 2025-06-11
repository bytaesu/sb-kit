import type { EmailOtpType } from '@supabase/supabase-js';

import { getSafeRedirectPath } from './safe-redirect';
import type { SbKitConfig } from './sb-kit/sb-kit.types';

/**
 * Supported Email OTP Types
 */
export type AllowedEmailOtpTypes = Extract<EmailOtpType, 'signup' | 'recovery'>;

/**
 * Allowed OTP length
 */
export type AllowedEmailOtpLength = 6 | 7 | 8 | 9 | 10;

/**
 * Predefined messages for the email OTP verification page
 */
export const emailOtpMessageByType: Record<
  AllowedEmailOtpTypes,
  { message: (email: string) => string }
> = {
  signup: {
    message: (email) =>
      `If you don't have an account yet, we have sent a code to ${email}. Enter it below.`,
  },
  recovery: {
    message: (email) => `If you have an account, we have went a code to ${email}. Enter it below.`,
  },
};

/**
 * Resolves the redirect path after email OTP verification.
 */
export const resolveEmailOtpRedirectPath = (
  emailOtpType: AllowedEmailOtpTypes,
  redirectUrl: string | null,
  sbKitConfig: SbKitConfig,
): string => {
  switch (emailOtpType) {
    case 'signup':
      // Redirects to redirectUrl if present, otherwise to default path.
      return redirectUrl
        ? getSafeRedirectPath(new URL(redirectUrl, window.location.origin), sbKitConfig)
        : sbKitConfig.redirectPolicy.defaultPathAfterAuth;

    case 'recovery':
      // Redirects to the set-password route.
      return sbKitConfig.authRoutes.setPassword;

    default:
      // Fallback to the default path.
      return sbKitConfig.redirectPolicy.defaultPathAfterAuth;
  }
};
