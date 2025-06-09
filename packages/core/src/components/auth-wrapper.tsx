import { SonnerToaster } from '@sb-kit/ui/components/base/sonner';

export type AuthWrapperProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

const AuthWrapper = ({ header, footer, children }: AuthWrapperProps) => {
  return (
    <>
      <SonnerToaster />
      {header ?? <div className="h-16" />}
      <div className="mx-auto px-4 w-full max-w-md min-w-2xs">{children}</div>
      {footer ?? <div className="h-16" />}
    </>
  );
};

export default AuthWrapper;
