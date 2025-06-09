/**
 * Extract and return a meaningful error message from an unknown error object.
 */
export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (error != null && typeof error === 'object' && 'message' in error) {
    return String((error as { message?: unknown }).message);
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Delays execution for a specified amount of time asynchronously.
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
