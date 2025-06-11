'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@sb-kit/ui/components/base/button';

import { SEARCH_PARAMS } from '../constants';

type Props = {
  errorMessage: string;
};

/**
 * ErrorAlert Component
 * Displays an alert with an error message and a close button.
 * Can be dismissed by the user.
 */
const AuthErrorAlert = ({ errorMessage }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClose = () => {
    setIsVisible(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete(SEARCH_PARAMS.errorMessage);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-between bg-destructive/10 border border-destructive/20 rounded-sm p-3">
      <small className="text-xs font-medium">{errorMessage}</small>
      <Button
        type="button"
        size={'xs'}
        variant={'ghost'}
        onClick={handleClose}
        className="hover:bg-transparent"
      >
        <IoClose className="text-destructive/70" />
      </Button>
    </div>
  );
};

export default AuthErrorAlert;
