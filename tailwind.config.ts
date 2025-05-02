import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      lightbeige: "#F5F5DC",
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      nuito: ['Nuito', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

export default config
