// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'], // or ['esm', 'cjs'] if needed
  dts: {
    entry: 'src/index.ts',  // ✅ forces correct .d.ts generation
  },
  clean: true,
});