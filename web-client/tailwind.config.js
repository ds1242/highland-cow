/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#122d64',
        'neutral-one': '#fffaff',
        'neutral-two': '#a9aabc',
        'neutral-three': '#757687',
        'accent-one': '#bc2f2d',
        'accent-two': '#317d11'
      },
    },
  },
  plugins: [],
}

