'use client';

import { useRedirectUrl } from '../../hooks/use-redirect-url';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import {
  AuthCard,
  AuthCardContent,
  AuthCardFooter,
  AuthCardHeader,
  AuthCardTitle,
} from '../auth-card';
import BackToSignInButton from './back-to-sign-in-button';
import SetPasswordForm from './form';

type SetPasswordProps = {
  sbKitConfig: SbKitConfig;
};

const SetPassword = ({ sbKitConfig }: SetPasswordProps) => {
  const redirectUrl = useRedirectUrl();

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardTitle>Choose a new password</AuthCardTitle>
      </AuthCardHeader>

      <AuthCardContent>
        <SetPasswordForm redirectUrl={redirectUrl} sbKitConfig={sbKitConfig} />
      </AuthCardContent>

      <AuthCardFooter>
        <BackToSignInButton sbKitConfig={sbKitConfig} redirectUrl={redirectUrl} />
      </AuthCardFooter>
    </AuthCard>
  );
};

export default SetPassword;
