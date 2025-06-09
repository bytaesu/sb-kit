/**
 * Result type for server actions that return data.
 *
 * - Success: `{ data: T, errorMessage: null }`
 * - Failure: `{ data: null, errorMessage: string }`
 */
export type ActionResult<T> =
  | { data: T; errorMessage: null }
  | { data: null; errorMessage: string };

/**
 * Result type for server actions that do not return data,
 * and only indicate success or failure via `errorMessage`.
 *
 * - Success: `{ errorMessage: null }`
 * - Failure: `{ errorMessage: string }`
 */
export type ActionStatusResult = { errorMessage: null } | { errorMessage: string };
