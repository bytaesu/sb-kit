import { cn } from '@sb-kit/ui/lib/utils';

import type { SbKitConfig } from '../sb-kit/sb-kit.types';

type Props = {
  sbKitConfig: SbKitConfig;
  password: string;
  className?: string;
};

/**
 * PasswordConditionBar Component
 * Displays a visual representation of password strength based on fulfilled conditions.
 * Each fulfilled condition is represented by a colored bar.
 */
const PasswordConditionBar = ({ sbKitConfig, password, className }: Props) => {
  const conditions = sbKitConfig.passwordPolicy;

  if (conditions.length === 0) return null;

  const fulfilledConditions = conditions.filter(({ regexSource }) =>
    new RegExp(regexSource).test(password),
  ).length;

  const allConditionsMet = fulfilledConditions === conditions.length;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-1">
        {Array(conditions.length)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1 flex-1 rounded-full transition-all duration-500',
                i < fulfilledConditions ? 'bg-destructive' : 'bg-border',
                allConditionsMet && 'bg-green-500/80',
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default PasswordConditionBar;
