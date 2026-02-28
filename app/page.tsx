import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import FoodCard from "@/components/FoodCard";
import { categories, getFeaturedFoods } from "@/lib/data";

export default function Home() {
    const featuredFoods = getFeaturedFoods(4);

    return (
        <>
            <Hero />

            {/* Category Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-balance">
                        Explore Categories
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto text-balance">
                        Browse our comprehensive database of healthy foods categorized for your convenience.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.slug}
                            name={category.name}
                            slug={category.slug}
                            icon={category.icon}
                            image={category.image}
                        />
                    ))}
                </div>
            </section>

            {/* Featured Foods Section */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 text-balance">
                                Featured Foods
                            </h2>
                            <p className="mt-3 text-lg text-gray-500 max-w-2xl text-balance">
                                Handpicked selections packed with nutrients.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredFoods.map((food) => (
                            <FoodCard key={food.slug} food={food} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
