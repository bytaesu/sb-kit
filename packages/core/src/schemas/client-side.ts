/**
 * Client-side validation schemas for auth forms (e.g. SignInForm)
 * Built using settings from sbKitConfig (e.g. passwordPolicy)
 */
import { z } from 'zod';

import type { SbKitConfig } from '../sb-kit/sb-kit.types';

/**
 * Creates Zod validation schemas for client-side form validation.
 * Rules like password policy are dynamically built from the given sbKitConfig.
 */
export function createClientSideSchemas(config: SbKitConfig) {
  const emailSchema = z
    .string()
    .min(1, { message: 'Please enter your email.' })
    .email({ message: 'Enter a valid email address.' });

  const passwordSchema = config.passwordPolicy.reduce(
    (schema, { regexSource, message }) => schema.regex(new RegExp(regexSource), { message }),
    z.string().max(72, { message: 'Password can be up to 72 characters.' }),
  );

  return {
    signIn: z.object({
      email: emailSchema,
      password: z
        .string()
        .min(1, { message: 'Please enter your password.' })
        .max(72, { message: 'Password can be up to 72 characters.' }),
    }),
    signUp: z.object({
      email: emailSchema,
      password: passwordSchema,
    }),
    forgotPassword: z.object({
      email: emailSchema,
    }),
    setPassword: z
      .object({
        password: passwordSchema,
        newPassword: passwordSchema,
      })
      .refine((data) => data.password === data.newPassword, {
        message: `Passwords don't match. Try again.`,
        path: ['newPassword'],
      }),
    verifyOtp: z.object({
      email: emailSchema,
      token: z
        .string()
        .min(6, { message: 'Please enter a 6-digit number.' })
        .max(10, { message: 'Verification code can be up to 10 characters.' }),
    }),
  };
}
export type ClientSideSchemas = ReturnType<typeof createClientSideSchemas>;
