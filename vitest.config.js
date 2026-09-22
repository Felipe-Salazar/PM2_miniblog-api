import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    server: {
      deps: {
        inline: [/express/, /router/, /body-parser/, /send/, /serve-static/, /finalhandler/]
      }
    }
  },
});