/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'codeflow': {
          bg: '#0f172a',
          sidebar: '#1e293b',
          card: '#1e293b',
          hover: '#334155',
          accent: '#3b82f6',
          'accent-hover': '#2563eb',
          text: '#f1f5f9',
          'text-muted': '#94a3b8',
          border: '#334155',
        }
      }
    },
  },
  plugins: [],
}

