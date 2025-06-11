'use client';

import { useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';

import { Button } from '@sb-kit/ui/components/base/button';
import { Spinner } from '@sb-kit/ui/components/base/spinner';

import { AllowedEmailOtpTypes, emailOtpMessageByType } from '../../email-otp';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import {
  AuthCard,
  AuthCardContent,
  AuthCardFooter,
  AuthCardHeader,
  AuthCardTitle,
} from '../auth-card';
import EmailOtpVerificationForm from './form';

type Props = {
  userEmail: string;
  sbKitConfig: SbKitConfig;
  emailOtpType: AllowedEmailOtpTypes;
  redirectUrl: string | null;
  handleExit: () => void;
};

const EmailOtpVerification = ({
  userEmail,
  sbKitConfig,
  emailOtpType,
  redirectUrl,
  handleExit,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { message } = emailOtpMessageByType[emailOtpType];

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardTitle>Verification</AuthCardTitle>
        <p className="text-muted-foreground text-sm">{message(userEmail)}</p>
      </AuthCardHeader>

      <AuthCardContent>
        <EmailOtpVerificationForm
          userEmail={userEmail}
          emailOtpType={emailOtpType}
          redirectUrl={redirectUrl}
          sbKitConfig={sbKitConfig}
          isLoading={isLoading}
          onLoadingChange={setIsLoading}
        />
      </AuthCardContent>

      <AuthCardFooter>
        {isLoading ? (
          <Button disabled variant="ghost" size="xs">
            <Spinner />
            Verifying
          </Button>
        ) : (
          <Button variant="ghost" size="xs" onClick={handleExit}>
            <div className="flex text-brand justify-center items-center">
              <HiChevronLeft size={20} />
              <p className="text-sm font-medium">Back</p>
            </div>
          </Button>
        )}
      </AuthCardFooter>
    </AuthCard>
  );
};

export default EmailOtpVerification;
