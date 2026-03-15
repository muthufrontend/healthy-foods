import { notFound } from "next/navigation";
import Link from "next/link";
import { getFoodsByCategory, categories } from "@/lib/data";
import CategoryClientView from "@/components/CategoryClientView";

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
        <div className="bg-beige-50 min-h-screen">
            {/* Breadcrumb Navigation - Kept outside client view for SEO and simplicity */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
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
            </div>

            <CategoryClientView category={category} initialFoods={foods} />
        </div>
    );
}
