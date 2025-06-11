'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@sb-kit/ui/components/base/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@sb-kit/ui/components/base/form';
import { Input } from '@sb-kit/ui/components/base/input';

import { forgotPasswordAction } from '../../actions/forgot-password';
import { AUTH_ERRORS } from '../../constants';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import { createClientSideSchemas } from '../../schemas/client-side';

type ForgotPasswordFormProps = {
  sbKitConfig: SbKitConfig;
  enterVerificationStage: (userEmail: string) => void;
};

/**
 * ForgotPasswordForm component
 * Handles the process of collecting an email for password reset.
 * Validates the email, performs the forgot password action, and
 * sets verification stage if the email is valid.
 */
const ForgotPasswordForm = ({ sbKitConfig, enterVerificationStage }: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordSchema = useMemo(
    () => createClientSideSchemas(sbKitConfig).forgotPassword,
    [sbKitConfig],
  );

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  /**
   * Form submission handler
   * - Submits the email for password reset.
   * - If successful, initiates the verification stage.
   */
  const onSubmit = async (formData: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);

    const { data, errorMessage } = await forgotPasswordAction(formData.email);

    if (errorMessage) {
      setIsLoading(false);
      toast.error(errorMessage);
      return;
    }

    if (!data?.userEmail) {
      setIsLoading(false);
      toast.error(AUTH_ERRORS.userEmailNotFound);
      return;
    }

    // Proceed to verification stage with the provided email
    enterVerificationStage(data.userEmail);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-6">
            <Button isLoading={isLoading} type="submit" className="w-full">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
