import SbKitLogo from '@/components/sb-kit-logo';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="active:scale-95 transition-transform">
        <SbKitLogo />
      </div>
    ),
  },
  links: [],
  githubUrl: 'https://github.com/bytaesu/sb-kit',
};
