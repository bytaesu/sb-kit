import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/**/*.{ts,tsx,js,jsx}', '!./src/**/*.test.ts', '!./src/**/*.types.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  minify: true,
  legacyOutput: true,
  sourcemap: false,
  bundle: false, // preserve original file structure so that the "use client" directives are not lost
  external: ['react', 'react-dom', 'next'],
});
