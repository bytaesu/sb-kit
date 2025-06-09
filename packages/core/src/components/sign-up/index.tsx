'use client';

import {
  AuthCard,
  AuthCardContent,
  AuthCardFooter,
  AuthCardHeader,
  AuthCardTitle,
} from '../auth-card';
import Link from 'next/link';
import SignUpForm from './form';
import OAuthButton from '../oauth-button';
import { OAuthProvider } from '../../oauth-provider';
import { useEmailOtpFlow } from '../../hooks/use-email-otp-flow';
import { SeparatorWithText } from '@sb-kit/ui/components/base/separator';
import { useRedirectUrl } from '../../hooks/use-redirect-url';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import EmailOtpVerification from '../email-otp-verification';

type SignUpProps = {
  sbKitConfig: SbKitConfig;
};

const SignUp = ({ sbKitConfig }: SignUpProps) => {
  const redirectUrl = useRedirectUrl();
  const { userEmail, isVerificationStage, enterVerificationStage, exitVerificationStage } =
    useEmailOtpFlow();

  // Show verification component if user is in verification stage
  if (isVerificationStage) {
    return (
      <EmailOtpVerification
        emailOtpType="signup"
        sbKitConfig={sbKitConfig}
        userEmail={userEmail}
        redirectUrl={redirectUrl}
        handleExit={exitVerificationStage}
      />
    );
  }

  // Get all configured OAuth providers from sbKitConfig
  const configuredProviders = sbKitConfig.oauthProviders || {};
  const hasOAuthProviders = Object.keys(configuredProviders).length > 0;

  // Show sign-up page if user is not in verification stage
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardTitle>Create an account</AuthCardTitle>
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
                  redirectUrl={redirectUrl}
                />
              ))}
            </div>
            <SeparatorWithText>or</SeparatorWithText>
          </>
        )}
        <SignUpForm enterVerificationStage={enterVerificationStage} sbKitConfig={sbKitConfig} />
      </AuthCardContent>

      <AuthCardFooter>
        <p className="text-sm font-normal text-muted-foreground">Already have an account?</p>
        <Link
          href={{
            pathname: sbKitConfig.authRoutes.signIn,
            query: redirectUrl ? { redirect_url: redirectUrl } : undefined,
          }}
        >
          <p className="text-sm text-brand font-medium">Sign in</p>
        </Link>
      </AuthCardFooter>
    </AuthCard>
  );
};

export default SignUp;
