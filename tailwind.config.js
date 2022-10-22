/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // keyframes: {
      //   scalein: {
      //     "0%": { transform: "scale(0)" },
      //     "100%": { transform: "scale(1)" }
      //   },
      //   scaleout: {
      //     "100%": { transform: "scale(1)" },
      //     "0%": { transform: "scale(0)" }
      //   },
      // },
      // animation: {
      //   scalein: "scalein 500ms linear",
      //   scaleout: "scaleout 500ms linear",
      // }
    },
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