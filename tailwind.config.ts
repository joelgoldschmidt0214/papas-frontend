// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // This line is particularly important for Next.js App Router
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#004098',      // Brand/Primary
          secondary: '#D7E0FF',    // Brand/Secondary
          blue: '#1B6AAC',         // Brand/blue
          white: '#FFFFFF',        // Brand/white
        },
        text: {
          primary: '#3C3C3C',      // Text/Primary
          secondary: '#C4C4C4',    // Text/Secondary
        },
        background: {
          primary: '#F3F3F3',      // Background/Primary
        },
        component: {
          pink: '#FA9289',          // component/pink
          accent: '#FA9289',        // Accent color (was component/pink)
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config