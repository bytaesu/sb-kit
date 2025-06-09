'use server';

import { AUTH_ERRORS } from '../constants';
import { serverSetPasswordSchema } from '../schemas/server-side';
import { getServerClient } from '../supabase/client-factory';
import { extractErrorMessage } from '../utils';
import type { ActionStatusResult } from './action.types';

export async function setPasswordAction(
  password: string,
  newPassword: string,
): Promise<ActionStatusResult> {
  try {
    // Validate the password using the schema
    const parsed = serverSetPasswordSchema.safeParse({ password, newPassword });
    if (!parsed.success) {
      const errorMessage = AUTH_ERRORS.validationError;
      return { errorMessage: errorMessage };
    }

    // Update the user password
    const supabase = await getServerClient();
    const { data, error } = await supabase.auth.updateUser({
      password: parsed.data.newPassword,
    });

    if (error) {
      return { errorMessage: error.message };
    }

    if (!data.user) {
      const errorMessage = AUTH_ERRORS.userNotFound;
      return { errorMessage: errorMessage };
    }

    await supabase.auth.signOut({ scope: 'others' });

    // Success
    return { errorMessage: null };
  } catch (error) {
    // Return a error message if an unexpected error occurs
    return { errorMessage: extractErrorMessage(error) };
  }
}
