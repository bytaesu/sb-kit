import { sbKit } from '@/lib/supabase/sb-kit';

const ForgotPasssword = sbKit.components.ForgotPassword;

const Page = () => {
  return <ForgotPasssword />;
};

export default Page;
