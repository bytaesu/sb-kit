'use client';

import { forwardRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Input } from '@sb-kit/ui/components/base/input';
import { Button } from '@sb-kit/ui/components/base/button';

/**
 * PasswordInput Component
 * A custom password input field that allows users to toggle the visibility of their password.
 * Uses forwardRef to support refs for parent components.
 */
const PasswordInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const [passwordHidden, setPasswordHidden] = useState(true);

    return (
      <div className="relative">
        <Input
          type={passwordHidden ? 'password' : 'text'}
          className={`pr-10 ${className}`}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setPasswordHidden(!passwordHidden)}
          className="absolute inset-y-0 right-0 flex items-center text-muted-foreground hover:bg-transparent"
        >
          {passwordHidden ? (
            <IoEyeOffOutline className="w-5 h-5" />
          ) : (
            <IoEyeOutline className="w-5 h-5" />
          )}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
