// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],  // you can keep both formats
  dts: {
    entry: 'src/index.ts', // 👈 ensures .d.ts is generated (not .d.cts)
  },
  clean: true,
});
