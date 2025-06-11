import { sbKitClient } from '@sb-kit/core';

import { middlewareClient } from './client/middleware';
import { serverClient } from './client/server';

export const sbKit = sbKitClient({
  supabaseClients: {
    server: serverClient,
    middleware: middlewareClient,
  },
  options: {
    oauthProviders: {
      github: {
        buttonText: 'Continue with GitHub',
      },
    },
  },
});
