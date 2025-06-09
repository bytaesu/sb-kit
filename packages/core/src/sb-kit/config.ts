import type { AllowedEmailOtpLength } from '../email-otp';
import type { AuthRoutes, RedirectPolicy, SbKitConfig } from './sb-kit.types';
import { type SbKitOptions, sbKitOptionsSchema } from './schema';
import { type PasswordPolicy, passwordPolicy } from '../password-policy';

/**
 * Builds a validated SbKit configuration by merging user options with defaults.
 * Throws if the merged config contains invalid or unsafe values.
 */
export const createSbKitConfig = (options: SbKitOptions = {}): SbKitConfig => {
  const parsedOptions = validateOptions(options);

  const mergedRoutes = mergeAuthRoutes(parsedOptions.authRoutes);
  const mergedRedirectPolicy = mergeRedirectPolicy(parsedOptions.redirectPolicy);
  const routeGuardPolicy = mergeRouteGuardPolicy(parsedOptions.routeGuardPolicy);

  validateRedirectPolicy(mergedRedirectPolicy);
  validateRoutePolicyConflict(mergedRedirectPolicy, routeGuardPolicy);
  validateAuthRoutesConflict(mergedRoutes, routeGuardPolicy);

  return {
    authRoutes: mergedRoutes,
    redirectPolicy: mergedRedirectPolicy,
    routeGuardPolicy,
    passwordPolicy: parsedOptions.passwordPolicy
      ? passwordPolicy(parsedOptions.passwordPolicy)
      : DEFAULT_PASSWORD_POLICY,
    emailOtpLength: parsedOptions.emailOtpLength ?? DEFAULT_OTP_LENGTH,
    oauthProviders: parsedOptions.oauthProviders ?? {},
  };
};

/** Default authentication routes */
const DEFAULT_AUTH_ROUTES: AuthRoutes = {
  signIn: '/signin',
  signUp: '/signup',
  setPassword: '/set-password',
  forgotPassword: '/forgot-password',
  oauthCallback: '/api/auth/callback',
};

/** Default redirect policy after authentication */
const DEFAULT_REDIRECT_POLICY: RedirectPolicy = {
  allowedHosts: ['localhost:3000'],
  blockedPaths: ['/api/auth/callback'],
  defaultPathAfterAuth: '/',
};

/** Default password policy */
const DEFAULT_PASSWORD_POLICY: PasswordPolicy = passwordPolicy({
  minLength: 8,
  passwordRule: 'letters-digits',
});

/** Default OTP length for email-based authentication */
const DEFAULT_OTP_LENGTH: AllowedEmailOtpLength = 6;

/** Validate provided options against the schema */
function validateOptions(options: SbKitOptions): SbKitOptions {
  const result = sbKitOptionsSchema.safeParse(options);
  if (!result.success) {
    const messages = result.error.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join('\n  - ');
    throw new Error(`[sb-kit] Invalid SbKitOptions:\n  - ${messages}`);
  }
  return result.data;
}

/**
 * Prevent redirect to blocked paths:
 * defaultPathAfterAuth must not start with any user-defined blockedPaths
 */
function validateRedirectPolicy(policy: RedirectPolicy) {
  const { defaultPathAfterAuth, blockedPaths } = policy;
  if (blockedPaths.some((path) => defaultPathAfterAuth.startsWith(path))) {
    throw new Error(
      `[sb-kit] redirectPolicy.defaultPathAfterAuth (${defaultPathAfterAuth}) cannot start with a blocked path.`,
    );
  }
}

/**
 * Prevent infinite loop:
 * Logged-in users redirected to a public-only route will loop forever
 */
function validateRoutePolicyConflict(policy: RedirectPolicy, guard: { onlyPublic: string[] }) {
  if (guard.onlyPublic.includes(policy.defaultPathAfterAuth)) {
    throw new Error(
      `[sb-kit] redirectPolicy.defaultPathAfterAuth (${policy.defaultPathAfterAuth}) cannot be a public-only route.`,
    );
  }
}

/**
 * Prevent deadlock:
 * Unauthenticated users cannot access sign-in if it’s private
 */
function validateAuthRoutesConflict(routes: AuthRoutes, guard: { onlyPrivate: string[] }) {
  if (guard.onlyPrivate.includes(routes.signIn)) {
    throw new Error(
      `[sb-kit] authRoutes.signIn (${routes.signIn}) cannot be a private-only route.`,
    );
  }
}

/**
 * Merges user-defined auth route paths with default values.
 */
function mergeAuthRoutes(userRoutes?: Partial<AuthRoutes>): AuthRoutes {
  return { ...DEFAULT_AUTH_ROUTES, ...userRoutes };
}

/**
 * Merges user-defined redirect policy with default values.
 */
function mergeRedirectPolicy(userPolicy?: Partial<RedirectPolicy>): RedirectPolicy {
  return { ...DEFAULT_REDIRECT_POLICY, ...userPolicy };
}

/**
 * Merges user-defined route guard policy with default values.
 * Adds essential auth pages to onlyPublic / onlyPrivate routes.
 */
function mergeRouteGuardPolicy(userPolicy?: { onlyPublic?: string[]; onlyPrivate?: string[] }): {
  onlyPublic: string[];
  onlyPrivate: string[];
} {
  return {
    onlyPublic: [
      DEFAULT_AUTH_ROUTES.signIn,
      DEFAULT_AUTH_ROUTES.signUp,
      DEFAULT_AUTH_ROUTES.forgotPassword,
      // DEFAULT_AUTH_ROUTES.oauthCallback, => excluded to bypass middleware check
      ...(userPolicy?.onlyPublic ?? []),
    ],
    onlyPrivate: [DEFAULT_AUTH_ROUTES.setPassword, ...(userPolicy?.onlyPrivate ?? [])],
  };
}
