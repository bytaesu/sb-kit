import type { NextRequest } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MiddlewareClientFactory, ServerClientFactory } from './supabase.types';

let serverClientFactory: ServerClientFactory | null = null;
let middlewareClientFactory: MiddlewareClientFactory | null = null;

/**
 * Sets the factory function for creating a server-side Supabase client.
 */
export function setServerClientFactory(fn: ServerClientFactory) {
  serverClientFactory = fn;
}

/**
 * Sets the factory function for creating a middleware Supabase client.
 */
export function setMiddlewareClientFactory(fn: MiddlewareClientFactory) {
  middlewareClientFactory = fn;
}

/**
 * Returns a server-side Supabase client.
 * Throws an error if the factory is not set.
 */
export function getServerClient(): Promise<SupabaseClient> {
  if (!serverClientFactory) {
    throw new Error('[sb-kit] serverClient is not provided.');
  }
  return serverClientFactory();
}

/**
 * Returns a middleware Supabase client using the given request.
 * Throws an error if the factory is not set.
 */
export function getMiddlewareClient(req: NextRequest): ReturnType<MiddlewareClientFactory> {
  if (!middlewareClientFactory) {
    throw new Error('[sb-kit] middlewareClient is not provided.');
  }
  return middlewareClientFactory(req);
}
