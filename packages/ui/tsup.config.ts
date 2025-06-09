import { defineConfig } from 'tsup';

export default defineConfig({
  outDir: 'dist',
  entry: ['./src/**/*.{ts,tsx,js,jsx}', '!./src/**/*.test.ts', '!./src/**/*.types.ts'],
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  clean: true,
  minify: true,
  sourcemap: false,
  external: ['react', 'react-dom'],
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs',
  }),
});
