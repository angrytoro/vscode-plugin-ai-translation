/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/webview/**/*.{js,ts,jsx,tsx}',
    './node_modules/streamdown/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
