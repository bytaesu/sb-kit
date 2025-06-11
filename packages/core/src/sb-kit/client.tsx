import type { NextRequest } from 'next/server';

import { callbackHandler } from '../callback-handler';
import { AuthWrapper, ForgotPassword, SetPassword, SignIn, SignUp } from '../components';
import { routeGuard } from '../route-guard';
import { setMiddlewareClientFactory, setServerClientFactory } from '../supabase/client-factory';
import { createSbKitConfig } from './config';
import type { SbKitClient, SbKitClientInit } from './sb-kit.types';

/**
 * Initializes and returns a SbKitClient instance.
 */
export function sbKitClient({ supabaseClients, options }: SbKitClientInit): SbKitClient {
  // Create configuration object based on provided options
  const sbKitConfig = createSbKitConfig(options);

  // Set up Supabase client factories
  setServerClientFactory(supabaseClients.server);
  setMiddlewareClientFactory(supabaseClients.middleware);

  return {
    // Server-side helpers
    routeGuard: (request: NextRequest) => routeGuard(request, sbKitConfig),
    callbackHandler: (request: Request) => callbackHandler(request, sbKitConfig),

    // React components configured with SbKit.
    components: {
      SignIn: (props) => <SignIn {...props} sbKitConfig={sbKitConfig} />,
      SignUp: () => <SignUp sbKitConfig={sbKitConfig} />,
      SetPassword: () => <SetPassword sbKitConfig={sbKitConfig} />,
      ForgotPassword: () => <ForgotPassword sbKitConfig={sbKitConfig} />,
      AuthWrapper: (props) => <AuthWrapper {...props} />,
    },
  };
}
