/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: ["./node_modules/tw-elements/js/**/*.js"],
    theme: {
        extend: {},
    },
    plugins: [
        require("tw-elements/plugin.cjs"),
        require('tailwind-scrollbar'),
    ],
}