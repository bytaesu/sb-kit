import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Sandbox | sb-kit',
  description: 'sb-kit sandbox',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
