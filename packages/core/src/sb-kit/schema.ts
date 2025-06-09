import { z } from 'zod';
import { OAUTH_PROVIDERS } from '../oauth-provider';

const passwordRuleSchema = z.enum([
  'no-requirement',
  'letters-digits',
  'lowercase-uppercase-letters-digits',
  'lowercase-uppercase-letters-digits-symbols',
]);

const passwordPolicySchema = z.object({
  minLength: z.number().min(6, 'Minimum length must be at least 6'),
  passwordRule: passwordRuleSchema,
});

/**
 * Validates authRoutes object
 * Each route must start with a forward slash ("/")
 */
const authRoutesSchema = z.object({
  signIn: z.string().startsWith('/'),
  signUp: z.string().startsWith('/'),
  forgotPassword: z.string().startsWith('/'),
  setPassword: z.string().startsWith('/'),
  oauthCallback: z.string().startsWith('/'),
});

/**
 * Validates redirectPolicy object
 * - allowedHosts: must be valid host strings (with optional port)
 * - blockedPaths: each must start with "/"
 * - defaultPathAfterAuth: must start with "/"
 */
const redirectPolicySchema = z.object({
  allowedHosts: z.array(
    z.string().refine((val) => /^[a-zA-Z0-9.-]+(:\d+)?$/.test(val), {
      message: 'Invalid host format',
    }),
  ),
  blockedPaths: z.array(z.string().startsWith('/')),
  defaultPathAfterAuth: z.string().startsWith('/'),
});

/**
 * Validates OTP length.
 * Must be an integer between 6 and 10 (inclusive).
 */
export const emailOtpLengthSchema = z
  .union([z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10)])
  .optional();

/**
 * Validates OAuth providers object.
 * Each provider must include a `buttonText` string.
 */
export const oauthProvidersSchema = z
  .record(
    z.enum(OAUTH_PROVIDERS),
    z.object({
      buttonText: z.string(),
    }),
  )
  .optional();

/**
 * Validates routeGuardPolicy object
 * - onlyPublic and onlyPrivate: each path must start with a "/"
 */
const routeGuardPolicySchema = z.object({
  onlyPublic: z.array(z.string().startsWith('/')).optional(),
  onlyPrivate: z.array(z.string().startsWith('/')).optional(),
});

/**
 * Final schema for validating SbKitOptions input.
 * - All top-level fields are optional (via `.partial()`)
 * - Allows developers to override only specific parts of the default config
 */
export const sbKitOptionsSchema = z
  .object({
    authRoutes: authRoutesSchema,
    redirectPolicy: redirectPolicySchema,
    passwordPolicy: passwordPolicySchema,
    emailOtpLength: emailOtpLengthSchema,
    oauthProviders: oauthProvidersSchema,
    routeGuardPolicy: routeGuardPolicySchema.optional(),
  })
  .partial();

export type SbKitOptions = z.infer<typeof sbKitOptionsSchema>;
