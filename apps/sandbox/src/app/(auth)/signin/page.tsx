import type { SearchParams } from 'next/dist/server/request/search-params';
import { sbKit } from '@/lib/supabase/sb-kit';

type Props = {
  searchParams: Promise<SearchParams>;
};

const SignIn = sbKit.components.SignIn;

const Page = ({ searchParams }: Props) => {
  return <SignIn searchParams={searchParams} />;
};

export default Page;
