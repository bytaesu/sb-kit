import { Card, CardContent, CardFooter, CardHeader } from '@sb-kit/ui/components/base/card';
import { cn } from '@sb-kit/ui/lib/utils';

type WithChildren = {
  children: React.ReactNode;
  className?: string;
};

const AuthCard = ({ children, className }: WithChildren) => {
  return <Card className={cn('pb-0 shadow-2xl', className)}>{children}</Card>;
};

const AuthCardHeader = ({ children, className }: WithChildren) => {
  return <CardHeader className={cn('space-y-2', className)}>{children}</CardHeader>;
};

const AuthCardTitle = ({ children, className }: WithChildren) => {
  return <h1 className={cn('text-center text-2xl font-semibold', className)}>{children}</h1>;
};

const AuthCardDescription = ({ children, className }: WithChildren) => {
  return <p className={cn('text-muted-foreground text-sm font-normal', className)}>{children}</p>;
};

const AuthCardContent = ({ children, className }: WithChildren) => {
  return <CardContent className={cn('space-y-4', className)}>{children}</CardContent>;
};

const AuthCardFooter = ({ children, className }: WithChildren) => {
  return (
    <CardFooter
      className={cn(
        'p-4 border-t bg-muted/60 dark:bg-muted/30 flex justify-center items-center gap-1',
        className,
      )}
    >
      {children}
    </CardFooter>
  );
};

export {
  AuthCard,
  AuthCardHeader,
  AuthCardTitle,
  AuthCardDescription,
  AuthCardContent,
  AuthCardFooter,
};
