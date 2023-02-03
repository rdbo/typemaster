/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
        colors: {
            "primary": {
                "100": "#4090ff",
                "200": "#204590"
            },
            "secondary": {
                "100": "#f9c501",
                "200": "#fbf3d4"
            }
        },
        fontFamily: {
            body: ["Arvo"]
        }
    },
  },
  plugins: [],
}
