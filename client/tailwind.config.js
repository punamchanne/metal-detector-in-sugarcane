/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4ade80', // green-400
                secondary: '#1f2937', // gray-800
                accent: '#facc15', // yellow-400
            },
        },
    },
    plugins: [],
}
