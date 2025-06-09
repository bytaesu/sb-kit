'use server';

import { AUTH_ERRORS } from '../constants';
import { serverSignUpSchema } from '../schemas/server-side';
import { getServerClient } from '../supabase/client-factory';
import { extractErrorMessage } from '../utils';
import type { ActionResult } from './action.types';

export async function signUpAction(
  email: string,
  password: string,
): Promise<ActionResult<{ userEmail: string }>> {
  try {
    // Validate the email and password using the schema
    const parsed = serverSignUpSchema.safeParse({ email, password });
    if (!parsed.success) {
      const errorMessage = AUTH_ERRORS.validationError;
      return { data: null, errorMessage: errorMessage };
    }

    // Attempt to sign up
    const supabase = await getServerClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { data: null, errorMessage: error.message };
    }

    if (!data.user?.email) {
      const errorMessage = AUTH_ERRORS.userEmailNotFound;
      return { data: null, errorMessage: errorMessage };
    }

    // Success
    return { data: { userEmail: data.user.email }, errorMessage: null };
  } catch (error) {
    // Return a generic error message if an unexpected error occurs
    return { data: null, errorMessage: extractErrorMessage(error) };
  }
}
