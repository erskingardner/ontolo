export const categories: App.Category[] = [
    { name: "Skip", icon: "fast-forward" },
    {
        name: "Entertainment",
        icon: "clapperboard",
        subcategories: [
            { name: "Memes", icon: "laugh" },
            { name: "Music", icon: "music" },
            { name: "TV & Films", icon: "tv" },
            { name: "Theatre", icon: "bitcoin" },
            { name: "Art", icon: "image" },
            { name: "Sport & Hobbies", icon: "medal" },
        ],
    },
    {
        name: "Finance",
        icon: "circle-dollar-sign",
        subcategories: [
            { name: "Investing", icon: "line-chart" },
            { name: "Personal Finance", icon: "wallet" },
            { name: "Macro", icon: "globe-2" },
            { name: "Bitcoin", icon: "bitcoin" },
            { name: "Altcoins", icon: "trash-2" },
        ],
    },
    {
        name: "Technology",
        icon: "cpu",
        subcategories: [
            { name: "News", icon: "newspaper" },
            { name: "Tutorials", icon: "library" },
            { name: "Products", icon: "box" },
        ],
    },
    {
        name: "Health",
        icon: "heart-pulse",
        subcategories: [
            { name: "Medicine", icon: "syringe" },
            { name: "Wellness", icon: "sparkles" },
        ],
    },
    {
        name: "Food",
        icon: "utensils",
        subcategories: [
            { name: "Meals", icon: "beef" },
            { name: "Recipes", icon: "book-marked" },
        ],
    },
    {
        name: "Travel",
        icon: "map-pinned",
        subcategories: [
            { name: "News", icon: "newspaper" },
            { name: "Guides", icon: "library" },
            { name: "Destinations", icon: "map-pinned" },
        ],
    },
];
