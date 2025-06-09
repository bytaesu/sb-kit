'use client';

import {
  AuthCard,
  AuthCardContent,
  AuthCardDescription,
  AuthCardFooter,
  AuthCardHeader,
  AuthCardTitle,
} from '../auth-card';
import Link from 'next/link';
import ForgotPasswordForm from './form';
import { HiChevronLeft } from 'react-icons/hi';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import { useEmailOtpFlow } from '../../hooks/use-email-otp-flow';
import EmailOtpVerification from '../email-otp-verification';
import { useRedirectUrl } from '../../hooks/use-redirect-url';

type ForgotPasswordProps = {
  sbKitConfig: SbKitConfig;
};

const ForgotPassword = ({ sbKitConfig }: ForgotPasswordProps) => {
  const redirectUrl = useRedirectUrl();
  const { userEmail, isVerificationStage, enterVerificationStage, exitVerificationStage } =
    useEmailOtpFlow();

  // Show verification component if user is in verification stage
  if (isVerificationStage) {
    return (
      <EmailOtpVerification
        emailOtpType="recovery"
        sbKitConfig={sbKitConfig}
        userEmail={userEmail}
        redirectUrl={redirectUrl}
        handleExit={exitVerificationStage}
      />
    );
  }

  // Show forgot password form if user is not in verification stage
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardTitle>Reset password</AuthCardTitle>
        <AuthCardDescription>
          Enter the email address associated with your account and we will send you a code to reset
          your password.
        </AuthCardDescription>
      </AuthCardHeader>

      <AuthCardContent>
        <ForgotPasswordForm
          enterVerificationStage={enterVerificationStage}
          sbKitConfig={sbKitConfig}
        />
      </AuthCardContent>

      <AuthCardFooter>
        <Link
          href={{
            pathname: sbKitConfig.authRoutes.signIn,
            query: redirectUrl ? { redirect_url: redirectUrl } : undefined,
          }}
        >
          <div className="flex text-brand justify-center items-center">
            <HiChevronLeft size={20} />
            <p className="text-sm font-medium">Back to sign in</p>
          </div>
        </Link>
      </AuthCardFooter>
    </AuthCard>
  );
};

export default ForgotPassword;
