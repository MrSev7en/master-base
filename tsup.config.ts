import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: false,
  clean: true,
  entry: ['src/**/*.ts'],
  dts: false,
  outDir: './dist',
  splitting: false,
  sourcemap: false,
  skipNodeModulesBundle: true,
});
