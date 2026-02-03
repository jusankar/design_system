import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/@jusankar/moon/**/*.{js,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
} satisfies Config
