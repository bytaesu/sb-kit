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

import { signUpAction } from '../../actions/sign-up';
import { AUTH_ERRORS } from '../../constants';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';
import { createClientSideSchemas } from '../../schemas/client-side';
import PasswordConditionBar from '../password-condition-bar';
import PasswordInput from '../password-input';

type SignUpFormProps = {
  enterVerificationStage: (userEmail: string) => void;
  sbKitConfig: SbKitConfig;
};

const SignUpForm = ({ sbKitConfig, enterVerificationStage }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const signUpSchema = useMemo(() => createClientSideSchemas(sbKitConfig).signUp, [sbKitConfig]);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Handles form submission
   * - Submits user data for sign-up.
   * - Calls enterVerificationStage on success or shows error on failure.
   */
  const onSubmit = async (formData: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);

    const { data, errorMessage } = await signUpAction(formData.email, formData.password);

    if (errorMessage) {
      setIsLoading(false);
      toast.error(errorMessage);
      return;
    }

    if (data) {
      enterVerificationStage(data?.userEmail);
    } else {
      setIsLoading(false);
      toast.error(AUTH_ERRORS.userEmailNotFound);
    }
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    {...field}
                    // The password field is validated in real-time as the user types
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger('password');
                    }}
                  />
                </FormControl>
                <FormMessage />
                <PasswordConditionBar
                  sbKitConfig={sbKitConfig}
                  password={form.watch('password')}
                  className="pt-3"
                />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6">
          <Button isLoading={isLoading} type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
