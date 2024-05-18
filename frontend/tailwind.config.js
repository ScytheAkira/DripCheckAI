import flowbitePlugin from 'flowbite/plugin'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'accent-glow': '0 4px 6px -1px rgba(148, 243, 228, 0.5), 0 2px 4px -1px rgba(148, 243, 228, 0.5)', // Adjust the RGBA values to match your accent color
      },
    },
  },
  plugins: [
    require('daisyui'), flowbitePlugin
  ],
  daisyui: {
    themes: [
      {
        'dark': {
          primary: "#1A1A1B",
          secondary: "#29A19C",
          "primary-content": "#FFFFFF",
          accent: "#94F3E4",
          neutral: "#333F44",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
}
