'use server';

import { serverVerifyOtpSchema } from '../schemas/server-side';
import { AllowedEmailOtpTypes } from '../email-otp';
import { getServerClient } from '../supabase/client-factory';
import type { ActionStatusResult } from './action.types';
import { AUTH_ERRORS } from '../constants';
import { extractErrorMessage } from '../utils';

export async function verifyOtpAction(
  email: string,
  token: string,
  type: AllowedEmailOtpTypes,
): Promise<ActionStatusResult> {
  try {
    // Validate the email and token using the schema
    const parsed = serverVerifyOtpSchema.safeParse({ email, token });
    if (!parsed.success) {
      const errorMessage = AUTH_ERRORS.validationError;
      return { errorMessage: errorMessage };
    }

    // Attempt to verify OTP
    const supabase = await getServerClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email: parsed.data.email,
      token: parsed.data.token,
      type: type,
    });

    if (error) {
      return { errorMessage: error.message };
    }

    if (!data.user) {
      const errorMessage = AUTH_ERRORS.userNotFound;
      return { errorMessage: errorMessage };
    }

    // Success
    return { errorMessage: null };
  } catch (error) {
    // Return a generic error message if an unexpected error occurs
    return { errorMessage: extractErrorMessage(error) };
  }
}
