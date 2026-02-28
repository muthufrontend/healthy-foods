import { notFound } from "next/navigation";
import Link from "next/link";
import FoodCard from "@/components/FoodCard";
import { getFoodsByCategory, categories } from "@/lib/data";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = categories.find((c) => c.slug === slug);

    if (!category) return {};

    return {
        title: `${category.name} | Healthy Foods`,
        description: `Explore our collection of healthy ${category.name.toLowerCase()} and learn about their nutritional benefits.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = categories.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    const foods = getFoodsByCategory(slug);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb Navigation */}
            <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link href="/" className="hover:text-primary-600 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-400 ml-1 md:ml-2">Categories</span>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-900 font-medium ml-1 md:ml-2">{category.name}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Page Header */}
            <div className="bg-white rounded-2xl p-8 mb-12 border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="text-6xl bg-green-50 p-4 rounded-xl">{category.icon}</div>
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                        {category.name}
                    </h1>
                    <p className="text-xl text-gray-600">
                        Explore our curated selection of nutritious {category.name.toLowerCase()}.
                    </p>
                </div>
            </div>

            {/* Search Bar Placeholder */}
            <div className="mb-8 max-w-md">
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 h-12 sm:text-sm border-gray-300 rounded-xl"
                        placeholder={`Search ${category.name.toLowerCase()}...`}
                    />
                </div>
            </div>

            {/* Grid listing of foods */}
            {foods.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {foods.map((food) => (
                        <FoodCard key={food.slug} food={food} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-gray-500 text-lg">More items coming soon!</p>
                </div>
            )}
        </div>
    );
}
