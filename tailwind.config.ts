import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      lightbeige: "#F5F5DC",
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      nuito: ['Nuito', 'sans-serif'],
    },
    extend: {
      colors: {
        background: {
          light: '#eaeadb',
          dark: '#1a1a1a',
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        }
      }
    },
    screens: {
      'max-xs': {'max': '379'},
    }
  },
  plugins: [],
}

export default config
