/**
 * Zod schemas for server-side validation in authentication workflows
 *
 * Unlike client-side schemas,
 * these do not depend on dynamic config and ensure consistent auth logic.
 */
import { z } from 'zod';

/** Valid email (non-empty string, RFC 5322 compliant) */
export const serverEmailSchema = z.string().min(1).email();

/** Valid password (1~72 characters) */
export const serverPasswordSchema = z.string().min(1).max(72);

/** Sign In: requires email and password */
export const serverSignInSchema = z.object({
  email: serverEmailSchema,
  password: serverPasswordSchema,
});

/** Sign Up: requires email and password */
export const serverSignUpSchema = z.object({
  email: serverEmailSchema,
  password: serverPasswordSchema,
});

/** Forgot password: email only */
export const serverForgotPasswordSchema = z.object({
  email: serverEmailSchema,
});

/** Set Password: password + confirmation match */
export const serverSetPasswordSchema = z
  .object({
    password: serverPasswordSchema,
    newPassword: serverPasswordSchema,
  })
  .refine((data) => data.password === data.newPassword);

/** Verify OTP: email + token (6~10 characters) */
export const serverVerifyOtpSchema = z.object({
  email: serverEmailSchema,
  token: z.string().min(6).max(10),
});
