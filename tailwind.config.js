/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-typewriter')({
        wordsets: {
            bookstore: {
                words: ['Welcome to the bookstore', 'Created by Nandan Vyas'],
                delay: 3
            }
        }
    })
],
}