'use server';

import { getServerClient } from '../supabase/client-factory';
import { extractErrorMessage } from '../utils';
import type { ActionStatusResult } from './action.types';

export async function signOutAction(): Promise<ActionStatusResult> {
  try {
    // Attempt to sign out
    const supabase = await getServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { errorMessage: error.message };
    }

    // Success
    return { errorMessage: null };
  } catch (error) {
    // Handle unexpected errors and return a general error message
    return { errorMessage: extractErrorMessage(error) };
  }
}
