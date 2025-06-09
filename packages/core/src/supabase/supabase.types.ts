import type { SupabaseClient, AuthError, User } from '@supabase/supabase-js';
import type { NextRequest, NextResponse } from 'next/server';

export type ServerClientFactory = () => Promise<SupabaseClient>;

export type MiddlewareClientFactory = (req: NextRequest) => Promise<{
  supabaseResponse: NextResponse;
  user: User | null;
  error: AuthError | null;
}>;
