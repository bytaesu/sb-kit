'use server';

import { AUTH_ERRORS } from '../constants';
import { serverForgotPasswordSchema } from '../schemas/server-side';
import { getServerClient } from '../supabase/client-factory';
import { extractErrorMessage } from '../utils';
import type { ActionResult } from './action.types';

export async function forgotPasswordAction(
  email: string,
): Promise<ActionResult<{ userEmail: string }>> {
  try {
    // Validate the email format using the schema
    const parsed = serverForgotPasswordSchema.safeParse({ email });
    if (!parsed.success) {
      const errorMessage = AUTH_ERRORS.validationError;
      return { data: null, errorMessage: errorMessage };
    }

    // Attempt to send a password reset email
    const supabase = await getServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email);

    if (error) {
      return { data: null, errorMessage: error.message };
    }

    // Success
    return { data: { userEmail: parsed.data.email }, errorMessage: null };
  } catch (error) {
    // Return a error message if an unexpected error occurs
    return { data: null, errorMessage: extractErrorMessage(error) };
  }
}
