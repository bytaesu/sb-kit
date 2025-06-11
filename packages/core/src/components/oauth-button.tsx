'use client';

import { useEffect, useState } from 'react';

import { RedirectType, redirect } from 'next/navigation';

import { toast } from 'sonner';

import { Button } from '@sb-kit/ui/components/base/button';
import { cn } from '@sb-kit/ui/lib/utils';

import { OAuthAction } from '../actions/oauth';
import { OAuthProvider, oauthProviderConfig } from '../oauth-provider';

type Props = {
  provider: OAuthProvider;
  redirectUrl: string | null;
  buttonText: string;
  oauthCallbackRoute: string;
};

const OAuthButton = ({ provider, redirectUrl, buttonText, oauthCallbackRoute }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { icon, buttonClassName } = oauthProviderConfig[provider];

  // 'Safari' caches the page state when navigating back.
  // Reset loading state to ensure accurate loading behavior.
  useEffect(() => {
    const resetLoadingState = (event: PageTransitionEvent) => {
      if (event?.persisted) {
        setIsLoading(false);
      }
    };
    window.addEventListener('pageshow', resetLoadingState);
    return () => {
      window.removeEventListener('pageshow', resetLoadingState);
    };
  }, []);

  // Handles the OAuth sign-in process by redirecting to the provider's authentication URL.
  // If the callback URL is missing, an error message is displayed.
  const onClick = async (provider: OAuthProvider) => {
    setIsLoading(true);

    const { data: providerUrl, errorMessage } = await OAuthAction(
      provider,
      redirectUrl,
      oauthCallbackRoute,
    );

    if (!providerUrl || errorMessage) {
      setIsLoading(false);
      toast.error(errorMessage);
      return;
    }

    redirect(providerUrl, RedirectType.push);
  };

  return (
    <div>
      <Button
        type="button"
        variant={'outline'}
        isLoading={isLoading}
        onClick={() => onClick(provider)}
        className={cn('w-full font-medium gap-2', buttonClassName)}
      >
        {icon && <span>{icon}</span>}
        {buttonText}
      </Button>
    </div>
  );
};

export default OAuthButton;
