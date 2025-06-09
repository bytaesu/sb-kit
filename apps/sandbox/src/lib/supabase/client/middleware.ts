import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Creates a Supabase client for use in middleware
 *
 * @param request - The Next.js request object from middleware
 * @returns `{ supabaseResponse, user, error }`
 */
export async function middlewareClient(request: NextRequest) {
  const supabaseResponse = NextResponse.next();

  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { supabaseResponse, user, error };
}
