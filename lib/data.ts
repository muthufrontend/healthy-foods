export type Nutrition = {
    calories: string;
    fiber: string;
    vitaminC?: string;
    [key: string]: string | undefined;
};

export type FoodItem = {
    name: string;
    slug: string;
    category: "fruits" | "nuts" | "vegetables";
    description: string;
    nutrition: Nutrition;
    pros: string[];
    cons: string[];
    image: string;
};

export const categories = [
    { name: "Fruits", slug: "fruits", icon: "🍎", image: "/images/fruits-category.jpg" },
    { name: "Nuts", slug: "nuts", icon: "🥜", image: "/images/nuts-category.jpg" },
    { name: "Vegetables", slug: "vegetables", icon: "🥦", image: "/images/vegetables-category.jpg" },
];

export const foods: FoodItem[] = [
    {
        name: "Apple",
        slug: "apple",
        category: "fruits",
        description: "A crunchy, sweet fruit that is a great source of fiber and vitamin C. Keeps the doctor away!",
        nutrition: {
            calories: "52 kcal",
            fiber: "2.4 g",
            vitaminC: "4.6 mg",
            potassium: "107 mg",
        },
        pros: ["High in soluble fiber", "Promotes heart health", "Convenient snack"],
        cons: ["May contain pesticide residue if not organic", "Apple seeds contain trace amounts of cyanide"],
        image: "/images/apple.png",
    },
    {
        name: "Banana",
        slug: "banana",
        category: "fruits",
        description: "A soft, sweet fruit rich in potassium and quick energy. Perfect for pre-workout or smoothies.",
        nutrition: {
            calories: "89 kcal",
            fiber: "2.6 g",
            vitaminC: "8.7 mg",
            potassium: "358 mg",
        },
        pros: ["Excellent source of potassium", "Easy to digest", "Affordable"],
        cons: ["High in sugar compared to other fruits", "Can cause sugar spikes if eaten alone in large quantities"],
        image: "/images/banana.png",
    },
    {
        name: "Almonds",
        slug: "almonds",
        category: "nuts",
        description: "A crunchy, nutrient-dense tree nut packed with healthy fats, protein, and vitamin E.",
        nutrition: {
            calories: "579 kcal",
            fiber: "12.5 g",
            protein: "21.1 g",
            vitaminE: "25.6 mg",
        },
        pros: ["Rich in healthy monounsaturated fats", "Good source of plant protein", "High in Vitamin E"],
        cons: ["High in calories (easy to overeat)", "Contains phytic acid which can reduce mineral absorption"],
        image: "/images/almonds.png",
    },
    {
        name: "Walnuts",
        slug: "walnuts",
        category: "nuts",
        description: "Brain-shaped nuts known for their exceptionally high omega-3 fatty acid content.",
        nutrition: {
            calories: "654 kcal",
            fiber: "6.7 g",
            protein: "15.2 g",
            omega3: "9000 mg",
        },
        pros: ["Excellent source of Omega-3s", "Promotes brain health", "Reduces inflammation"],
        cons: ["High in calories", "Can go rancid quickly if not stored properly"],
        image: "/images/walnuts.png",
    },
    {
        name: "Broccoli",
        slug: "broccoli",
        category: "vegetables",
        description: "A cruciferous green vegetable that is a nutritional powerhouse, loaded with vitamins and antioxidants.",
        nutrition: {
            calories: "34 kcal",
            fiber: "2.6 g",
            vitaminC: "89.2 mg",
            vitaminK: "101.6 mcg",
        },
        pros: ["Extremely high in Vitamin C and K", "Contains powerful cancer-fighting compounds", "Versatile to cook"],
        cons: ["Can cause gas or bloating in some people", "May interfere with thyroid function if eaten raw in massive amounts"],
        image: "/images/broccoli.png",
    },
    {
        name: "Spinach",
        slug: "spinach",
        category: "vegetables",
        description: "A leafy green vegetable known for its iron and calcium content, though often best absorbed when cooked.",
        nutrition: {
            calories: "23 kcal",
            fiber: "2.2 g",
            vitaminC: "28.1 mg",
            iron: "2.7 mg",
        },
        pros: ["Very low in calories", "High in iron and vitamins", "Good for eye health"],
        cons: ["High in oxalates which can contribute to kidney stones", "Iron is non-heme (less bioavailable without Vitamin C)"],
        image: "/images/spinach.png",
    },
];

export function getFoodsByCategory(categorySlug: string): FoodItem[] {
    return foods.filter((food) => food.category === categorySlug);
}

export function getFoodBySlug(slug: string): FoodItem | undefined {
    return foods.find((food) => food.slug === slug);
}

export function getFeaturedFoods(count: number = 4): FoodItem[] {
    return foods.slice(0, count);
}
