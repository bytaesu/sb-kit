import { serverClient } from './client/server';
import { middlewareClient } from './client/middleware';
import { sbKitClient } from '@sb-kit/core';

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
