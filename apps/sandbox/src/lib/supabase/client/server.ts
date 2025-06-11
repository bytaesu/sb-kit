import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

/**
 * Creates a Supabase client for use in server-side
 *
 * @returns `Promise<SupabaseClient>`
 */
export async function serverClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        /* eslint-disable no-empty */
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {}
        /* eslint-enable no-empty */
      },
    },
  });
}
