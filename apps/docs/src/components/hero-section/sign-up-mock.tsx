'use client';

import { Button } from '@sb-kit/ui/components/base/button';
import { Input } from '@sb-kit/ui/components/base/input';
import { Label } from '@sb-kit/ui/components/base/label';
import { SeparatorWithText } from '@sb-kit/ui/components/base/separator';
import { cn } from '@sb-kit/ui/lib/utils';
import { EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

const SignUpMock = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 2000); // 2 sec

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`pointer-events-none select-none w-full max-w-sm transition-all duration-700 ${
        visible ? 'blur-0 opacity-100' : 'blur-[8px] opacity-40'
      }`}
    >
      <div className="w-full max-w-sm  bg-card shadow-2xl rounded-2xl border overflow-hidden">
        <div className="p-6 space-y-3">
          <div className="space-y-2 text-center p-3">
            <h1 className="text-2xl font-semibold">Create an account</h1>
          </div>

          <Button disabled variant={'outline'} className="w-full font-medium gap-2">
            <GitHubIcon className="w-5 h-5" />
            Continue with GitHub
          </Button>

          <SeparatorWithText className="mt-4">or</SeparatorWithText>

          <div className="space-y-2">
            <Label className="text-muted-foreground">Email</Label>
            <Input disabled />
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground">Password</Label>
            <div className="relative">
              <Input disabled className={`pr-10`} />
              <Button
                disabled
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 flex items-center text-muted-foreground hover:bg-transparent"
              >
                <EyeOff className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex gap-1 py-2">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className={cn('h-1 flex-1 rounded-full transition-all duration-500 bg-border/50')}
                />
              ))}
          </div>

          <Button variant={'primary'} disabled className="w-full">
            Continue
          </Button>
        </div>

        <div
          data-slot="card-footer"
          className={cn(
            'flex items-center px-6',
            'p-4 border-t bg-muted/60 dark:bg-muted/30 flex justify-center items-center gap-1',
          )}
        >
          <p className="text-sm font-normal text-muted-foreground">Already have an account?</p>
          <p className="text-sm text-primary/60 font-bold">Sign in</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpMock;

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.385.6.111.82-.26.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.386-1.333-1.756-1.333-1.756-1.089-.745.082-.729.082-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.304.762-1.604-2.665-.304-5.467-1.334-5.467-5.933 0-1.31.467-2.382 1.236-3.222-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.005 2.047.138 3 .404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.652.241 2.873.118 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.625-5.48 5.922.43.37.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 22.296 24 17.796 24 12.5 24 5.87 18.627.5 12 .5z" />
    </svg>
  );
}
