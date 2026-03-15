import { notFound } from "next/navigation";
import Link from "next/link";
import { getFoodBySlug, categories, foods } from "@/lib/data";
import FoodClientView from "@/components/FoodClientView";

interface FoodPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return foods.map((food) => ({
        slug: food.slug,
    }));
}

export async function generateMetadata({ params }: FoodPageProps) {
    const { slug } = await params;
    const food = getFoodBySlug(slug);

    if (!food) return {};

    return {
        title: `${food.name} | Nutrition, Pros & Cons | Healthy Foods`,
        description: `Learn about the nutritional benefits, pros, and cons of ${food.name}. ${food.description}`,
        openGraph: {
            title: `${food.name} - Nutrition Facts & Benefits`,
            description: food.description,
            images: [food.image || '/images/default.jpg'],
        },
    };
}

export default async function FoodPage({ params }: FoodPageProps) {
    const { slug } = await params;
    const food = getFoodBySlug(slug);

    if (!food) {
        notFound();
    }

    const category = categories.find(c => c.slug === food.category);
    const categoryName = category ? category.name : food.category;

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${food.name} - Nutrition Facts, Pros & Cons`,
        "description": food.description,
        "image": food.image,
        "author": {
            "@type": "Organization",
            "name": "Healthy Foods Guide"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Healthy Foods Guide",
            "logo": {
                "@type": "ImageObject",
                "url": "https://example.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://example.com/food/${food.slug}`
        }
    };

    return (
        <div className="bg-beige-50 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumbs */}
                <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="hover:text-primary-600 transition-colors font-medium">
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <Link href={`/category/${food.category}`} className="hover:text-primary-600 transition-colors ml-1 md:ml-2 font-medium">
                                    {categoryName}
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-gray-900 font-bold ml-1 md:ml-2">{food.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <FoodClientView food={food} categoryName={categoryName} />
            </div>
        </div>
    );
}
