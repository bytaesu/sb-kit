'use client';

import { useState } from 'react';

/**
 * Manages email OTP verification stage state.
 * Tracks the user's email and whether they are in the verification stage.
 */
export function useEmailOtpFlow() {
  const [userEmail, setUserEmail] = useState('');
  const [isVerificationStage, setIsVerificationStage] = useState(false);

  const enterVerificationStage = (email: string) => {
    setUserEmail(email);
    setIsVerificationStage(true);
  };

  const exitVerificationStage = () => {
    setUserEmail('');
    setIsVerificationStage(false);
  };

  return {
    userEmail,
    isVerificationStage,
    enterVerificationStage,
    exitVerificationStage,
  };
}
