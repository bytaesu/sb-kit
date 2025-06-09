import { sbKit } from '@/lib/supabase/sb-kit';

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = sbKit.components.AuthWrapper;

const Layout = ({ children }: Props) => {
  return (
    <AuthWrapper header={<Header />} footer={<Footer />}>
      {children}
    </AuthWrapper>
  );
};

export default Layout;

const Header = () => {
  return <div className="bg-amber-300/30 py-16">Header area</div>;
};

const Footer = () => {
  return <div className="bg-amber-300/30 py-16">Footer area</div>;
};
