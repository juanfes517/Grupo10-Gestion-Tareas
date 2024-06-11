import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        // 'josefin-sans': ['"Josefin Sans"', 'sans-serif'],
        // 'dancing': ['"Dancing Script"', 'cursive'],
        dmSerif: ['var(--font-dm_serif_display)', 'serif'],
        crimsonText: ['var(--font-crimson_text)', 'serif'],
      },
      colors: {
        primary: '#111827',
        secondary: '#f3f4f6',
        tertiary: '#4B5563',
      },
    },
  },
  plugins: [],
}
export default config
