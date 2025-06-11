'use client';

import * as React from 'react';

import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '../../lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  );
}

function SeparatorWithText({
  orientation = 'horizontal',
  className,
  lineClassName,
  textClassName,
  children,
  ...props
}: {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  lineClassName?: string;
  textClassName?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  if (orientation === 'vertical') {
    return (
      <div className={cn('flex flex-col items-center', className)} {...props}>
        <Separator orientation="vertical" className={cn('flex-1', lineClassName)} />
        {children && (
          <span className={cn('my-2 text-sm text-muted-foreground select-none', textClassName)}>
            {children}
          </span>
        )}
        <Separator orientation="vertical" className={cn('flex-1', lineClassName)} />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center w-full', className)} {...props}>
      <Separator className={cn('flex-1', lineClassName)} />
      {children && (
        <span className={cn('mx-2 text-sm text-muted-foreground select-none', textClassName)}>
          {children}
        </span>
      )}
      <Separator className={cn('flex-1', lineClassName)} />
    </div>
  );
}

export { Separator, SeparatorWithText };
