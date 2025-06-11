import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { baseOptions } from '@/app/layout.config';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
