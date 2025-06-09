'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { useEffect, useState } from 'react';

const code = `import { sbKit } from '@/lib/sb-kit';

const SignUp = sbKit.components.SignUp;

const Page = () => {
  return <SignUp />;
};

export default Page;`;

const TypingCodeBlock = () => {
  const [typedCode, setTypedCode] = useState('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setTypedCode(code.slice(0, index));
      index++;
      if (index > code.length) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <DynamicCodeBlock
      lang="ts"
      code={typedCode}
      options={{
        themes: {
          light: 'one-light',
          dark: 'one-dark-pro',
        },
      }}
    />
  );
};

export default TypingCodeBlock;
