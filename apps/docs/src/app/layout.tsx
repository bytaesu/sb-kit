import type { ReactNode } from 'react';

import type { Metadata } from 'next/types';

import { RootProvider } from 'fumadocs-ui/provider';

import { pretendard } from '@/fonts';

import './global.css';

export const metadata: Metadata = {
  title: 'sb-kit',
  description: 'Drop-in authentication layer for Next.js and Supabase.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={pretendard.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
