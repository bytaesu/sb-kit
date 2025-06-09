import TypingCodeBlock from './typing-code-block';
import SignUpMock from './sign-up-mock';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@sb-kit/ui/components/base/button';

const HeroSection = () => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2 md:space-y-4 lg:space-y-6">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight sm:space-y-1">
          <span className="block">Simplify auth.</span>
          <span className="block">Focus on product.</span>
        </h1>
        <div className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-2xl">
          <p>
            <span className="text-primary tracking-tight underline decoration-brand">sb-kit</span>
            {' is a drop-in authentication layer'}
            <br className="block sm:hidden" />
            {' for Next.js and Supabase.'}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-2">
        <Link href={'/docs'} passHref>
          <Button variant={'default'} className="rounded-full px-6 py-4 md:py-6 md:px-8 md:text-lg">
            Read the docs
            <ArrowRight strokeWidth={2.5} />
          </Button>
        </Link>

        <p className="text-brand font-semibold text-xs">Free, open source, and built with 💙</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-8">
        <div className="flex-1 basis-1/2 max-w-sm w-full mx-auto">
          <TypingCodeBlock />
        </div>

        <div className="flex-1 basis-1/2 max-w-sm w-full flex items-center justify-center mx-auto">
          <SignUpMock />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
