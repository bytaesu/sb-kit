import { SearchParams } from 'next/dist/server/request/search-params';
import Link from 'next/link';

import { SeparatorWithText } from '@sb-kit/ui/components/base/separator';

import { parseAuthError } from '../../auth-error-parser';
import { OAuthProvider } from '../../oauth-provider';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import {
  AuthCard,
  AuthCardContent,
  AuthCardFooter,
  AuthCardHeader,
  AuthCardTitle,
} from '../auth-card';
import AuthErrorAlert from '../auth-error-alert';
import OAuthButton from '../oauth-button';
import SignInForm from './form';

export type SignInProps = {
  searchParams: Promise<SearchParams>;
  sbKitConfig: SbKitConfig;
};

const SignIn = async ({ searchParams, sbKitConfig }: SignInProps) => {
  const { error_message, redirect_url } = await searchParams;
  const errorMessage = parseAuthError(error_message);

  // Get all configured OAuth providers from sbKitConfig
  const configuredProviders = sbKitConfig.oauthProviders || {};
  const hasOAuthProviders = Object.keys(configuredProviders).length > 0;

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardTitle>Welcome back</AuthCardTitle>
        {errorMessage && <AuthErrorAlert errorMessage={errorMessage} />}
      </AuthCardHeader>

      <AuthCardContent>
        {hasOAuthProviders && (
          <>
            <div className="flex flex-col gap-2">
              {Object.entries(configuredProviders).map(([provider, config]) => (
                <OAuthButton
                  key={provider}
                  provider={provider as OAuthProvider}
                  buttonText={config.buttonText}
                  oauthCallbackRoute={sbKitConfig.authRoutes.oauthCallback}
                  redirectUrl={typeof redirect_url === 'string' ? redirect_url : null}
                />
              ))}
            </div>
            <SeparatorWithText>or</SeparatorWithText>
          </>
        )}
        <SignInForm redirectUrl={redirect_url} sbKitConfig={sbKitConfig} />
      </AuthCardContent>

      <AuthCardFooter>
        <p className="text-sm font-normal text-muted-foreground">{"Don't have an account?"}</p>
        <Link
          href={{
            pathname: sbKitConfig.authRoutes.signUp,
            query: redirect_url ? { redirect_url: redirect_url } : undefined,
          }}
        >
          <p className="text-sm text-brand font-medium">Sign up</p>
        </Link>
      </AuthCardFooter>
    </AuthCard>
  );
};

export default SignIn;
