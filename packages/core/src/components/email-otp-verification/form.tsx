'use client';

import { z } from 'zod';
import { cn } from '@sb-kit/ui/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSideSchemas } from '../../schemas/client-side';
import { verifyOtpAction } from '../../actions/verify-otp';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@sb-kit/ui/components/base/input-otp';
import { AllowedEmailOtpTypes, resolveEmailOtpRedirectPath } from '../../email-otp';
import { delay } from '../../utils';

type Props = {
  userEmail: string;
  emailOtpType: AllowedEmailOtpTypes;
  redirectUrl: string | null;
  sbKitConfig: SbKitConfig;
  isLoading: boolean;
  onLoadingChange: (isLoading: boolean) => void;
};

const EmailOtpVerificationForm = ({
  userEmail,
  emailOtpType,
  redirectUrl,
  sbKitConfig,
  isLoading,
  onLoadingChange,
}: Props) => {
  const router = useRouter();

  const verifyOtpSchema = useMemo(
    () => createClientSideSchemas(sbKitConfig).verifyOtp,
    [sbKitConfig],
  );

  const form = useForm<z.infer<typeof verifyOtpSchema>>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: userEmail,
      token: '',
    },
  });

  /**
   * Handles OTP input completion.
   * Verifies the OTP and redirects if successful.
   */
  const onComplete = async (tokenValue: string) => {
    onLoadingChange(true);
    await delay(1000);

    form.setValue('token', tokenValue);

    const { email, token } = form.getValues();
    const { errorMessage } = await verifyOtpAction(email, token, emailOtpType);

    if (errorMessage) {
      onLoadingChange(false);
      toast.error(errorMessage);
      return;
    }

    const redirectPath = resolveEmailOtpRedirectPath(emailOtpType, redirectUrl, sbKitConfig);
    router.replace(redirectPath);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2">
      <InputOTP disabled={isLoading} onComplete={onComplete} maxLength={sbKitConfig.emailOtpLength}>
        <InputOTPGroup>
          {Array.from({ length: sbKitConfig.emailOtpLength }, (_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={cn({
                'w-8 h-8': sbKitConfig.emailOtpLength === 8,
                'w-7 h-8': sbKitConfig.emailOtpLength >= 9,
              })}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default EmailOtpVerificationForm;
