'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SearchParams } from 'next/dist/server/request/search-params';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

import { signInAction } from '../../actions/sign-in';
import { getSafeRedirectPathFromParam } from '../../safe-redirect';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import { createClientSideSchemas } from '../../schemas/client-side';

type Props = {
  redirectUrl: SearchParams[string];
  sbKitConfig: SbKitConfig;
};

/**
 * SignInForm Component
 * A form component that allows users to sign in by providing an email and password.
 * Includes validation, form submission, and error handling.
 */
const SignInForm = ({ redirectUrl, sbKitConfig }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signInSchema = useMemo(() => createClientSideSchemas(sbKitConfig).signIn, [sbKitConfig]);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Handles form submission.
   * - Attempts to sign the user in with provided credentials.
   * - Redirects to the private home on success or displays an error message on failure.
   */
  const onSubmit = async (formData: z.infer<typeof signInSchema>) => {
    setIsLoading(true);

    const { errorMessage } = await signInAction(formData.email, formData.password);
    if (errorMessage) {
      setIsLoading(false);
      toast.error(errorMessage);
      return;
    }

    const safePath = getSafeRedirectPathFromParam(redirectUrl, window.location.origin, sbKitConfig);
    router.replace(safePath);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
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
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href={{
                      pathname: sbKitConfig.authRoutes.forgotPassword,
                      query: redirectUrl ? { redirect_url: redirectUrl } : undefined,
                    }}
                  >
                    <p className="text-sm text-brand font-medium">Forgot password?</p>
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input id="password" type="password" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-6">
          <Button isLoading={isLoading} type="submit" className="w-full">
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
