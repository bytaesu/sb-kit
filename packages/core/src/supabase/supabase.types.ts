import type { NextRequest, NextResponse } from 'next/server';

import type { AuthError, SupabaseClient, User } from '@supabase/supabase-js';

export type ServerClientFactory = () => Promise<SupabaseClient>;

export type MiddlewareClientFactory = (req: NextRequest) => Promise<{
  supabaseResponse: NextResponse;
  user: User | null;
  error: AuthError | null;
}>;
