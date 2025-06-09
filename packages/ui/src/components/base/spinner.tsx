import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: string;
  stokeWidth?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, stokeWidth = 2, className = '' }) => {
  return <Loader2 size={size} strokeWidth={stokeWidth} className={`animate-spin ${className}`} />;
};

export { Spinner };
