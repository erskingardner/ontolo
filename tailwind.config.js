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
                octoPurple: "#2E1C50",
                octoTeal: "#3DA99E",
                octoTealLight: "#B4D8D3",
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
