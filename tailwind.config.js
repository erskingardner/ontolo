/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "media",
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        container: {
            center: true,
        },
        extend: {
            fontFamily: {
                sans: [
                    "Inter var, sans-serif",
                    {
                        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
                        fontVariationSettings: '"opsz" 32',
                    },
                ],
                mono: ["Anonymous Pro, monospace"],
            },
            colors: {
                ltngWhite: "#FFF0D6",
                ltngYellow: "#EEC47A",
                nostrOrange: "#FA5733",
                btcOrange: "#F2A900",
                btcGray: "#4d4d4d",
                btcBlue: "#0d579b",
                btcGreen: "#329239",
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
