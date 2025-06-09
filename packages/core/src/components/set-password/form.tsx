'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@sb-kit/ui/components/base/form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientSideSchemas } from '../../schemas/client-side';
import { Input } from '@sb-kit/ui/components/base/input';
import { Button } from '@sb-kit/ui/components/base/button';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import { setPasswordAction } from '../../actions/set-password';
import { getSafeRedirectPath } from '../../safe-redirect';

type Props = {
  redirectUrl: string | null;
  sbKitConfig: SbKitConfig;
};

/**
 * ResetPasswordForm Component
 * A form for users to reset their password by entering and confirming their new password.
 * Includes form validation and submission handling.
 */
const SetPasswordForm = ({ redirectUrl, sbKitConfig }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const setPasswordSchema = useMemo(
    () => createClientSideSchemas(sbKitConfig).setPassword,
    [sbKitConfig],
  );

  const form = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  /**
   * Handles form submission.
   * - Submits the new password and, upon success, navigates the user to the private home page.
   */
  const onSubmit = async (formData: z.infer<typeof setPasswordSchema>) => {
    setIsLoading(true);

    const { errorMessage } = await setPasswordAction(formData.password, formData.newPassword);

    if (errorMessage) {
      setIsLoading(false);
      toast.error(errorMessage);
      return;
    }

    const redirectPath = redirectUrl
      ? getSafeRedirectPath(new URL(redirectUrl, window.location.origin), sbKitConfig)
      : sbKitConfig.redirectPolicy.defaultPathAfterAuth;

    router.replace(redirectPath);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input id="newPassword" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6">
          <Button isLoading={isLoading} type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SetPasswordForm;
