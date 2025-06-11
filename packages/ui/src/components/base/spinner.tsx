import { Loader2 } from 'lucide-react';

type SpinnerProps = {
  size?: number;
  stokeWidth?: number;
  className?: string;
};

const Spinner = ({ size = 24, stokeWidth = 2, className = '' }: SpinnerProps) => {
  return <Loader2 size={size} strokeWidth={stokeWidth} className={`animate-spin ${className}`} />;
};

export { Spinner };
