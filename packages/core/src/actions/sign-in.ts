'use server';

import { AUTH_ERRORS } from '../constants';
import { serverSignInSchema } from '../schemas/server-side';
import { getServerClient } from '../supabase/client-factory';
import { extractErrorMessage } from '../utils';
import type { ActionStatusResult } from './action.types';

export async function signInAction(email: string, password: string): Promise<ActionStatusResult> {
  try {
    // Validate the email and password using the schema
    const parsed = serverSignInSchema.safeParse({ email, password });
    if (!parsed.success) {
      const errorMessage = AUTH_ERRORS.validationError;
      return { errorMessage: errorMessage };
    }

    // Attempt to sign the user
    const supabase = await getServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { errorMessage: error.message };
    }

    // Success
    return { errorMessage: null };
  } catch (error) {
    // Return a error message if an unexpected error occurs
    return { errorMessage: extractErrorMessage(error) };
  }
}
