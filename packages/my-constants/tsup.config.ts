import { Options, defineConfig } from 'tsup'

export default defineConfig((options: Options) => ({
  ...options,
  treeshake: true,
  splitting: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  minify: !options.watch,
  clean: !options.watch,
  esbuildOptions(eo) {
    eo.charset = 'utf8'
  },
}))
