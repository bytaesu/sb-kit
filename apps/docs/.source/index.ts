// @ts-nocheck -- skip type checking
import { _runtime } from 'fumadocs-mdx';

import * as docs_0 from '../content/docs/concepts.mdx?collection=docs&hash=1749652792125';
import * as docs_1 from '../content/docs/getting-started.mdx?collection=docs&hash=1749652792125';
import * as docs_2 from '../content/docs/index.mdx?collection=docs&hash=1749652792125';
import * as docs_3 from '../content/docs/settings.mdx?collection=docs&hash=1749652792125';
import * as _source from '../source.config';

export const docs = _runtime.docs<typeof _source.docs>(
  [
    {
      info: {
        path: 'concepts.mdx',
        absolutePath: '/Users/taesu/Repository/sb-kit/apps/docs/content/docs/concepts.mdx',
      },
      data: docs_0,
    },
    {
      info: {
        path: 'getting-started.mdx',
        absolutePath: '/Users/taesu/Repository/sb-kit/apps/docs/content/docs/getting-started.mdx',
      },
      data: docs_1,
    },
    {
      info: {
        path: 'index.mdx',
        absolutePath: '/Users/taesu/Repository/sb-kit/apps/docs/content/docs/index.mdx',
      },
      data: docs_2,
    },
    {
      info: {
        path: 'settings.mdx',
        absolutePath: '/Users/taesu/Repository/sb-kit/apps/docs/content/docs/settings.mdx',
      },
      data: docs_3,
    },
  ],
  [
    {
      info: {
        path: 'meta.json',
        absolutePath: '/Users/taesu/Repository/sb-kit/apps/docs/content/docs/meta.json',
      },
      data: {
        title: 'sb-kit',
        pages: ['---About---', 'index', 'concepts', '---Guides---', 'getting-started', 'settings'],
        defaultOpen: true,
      },
    },
  ],
);
