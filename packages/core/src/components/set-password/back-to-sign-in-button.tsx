'use client';

import { useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { Button } from '@sb-kit/ui/components/base/button';

import { signOutAction } from '../../actions/sign-out';
import { AUTH_ERRORS, SEARCH_PARAMS } from '../../constants';
import { SbKitConfig } from '../../sb-kit/sb-kit.types';

type BackToSignInButtonProps = {
  sbKitConfig: SbKitConfig;
  redirectUrl: string | null;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Allows users to sign out and return to the sign-in page from set-password
 */
const BackToSignInButton = ({
  sbKitConfig,
  redirectUrl,
  className,
  children = (
    <div className="flex text-brand justify-center items-center">
      <HiChevronLeft size={20} />
      <p className="text-sm font-medium">Back to sign in</p>
    </div>
  ),
}: BackToSignInButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const { errorMessage } = await signOutAction();

    if (errorMessage) {
      setIsLoading(false);
      toast.error(AUTH_ERRORS.signOutError);
      return;
    }

    const signInUrl = new URL(sbKitConfig.authRoutes.signIn, window.location.origin);
    if (redirectUrl) {
      signInUrl.searchParams.set(SEARCH_PARAMS.redirectUrl, redirectUrl);
    }
    router.replace(signInUrl.toString());
  };

  return (
    <Button
      size="xs"
      variant="ghost"
      onClick={handleSignOut}
      isLoading={isLoading}
      className={className}
    >
      {children}
    </Button>
  );
};
export default BackToSignInButton;
