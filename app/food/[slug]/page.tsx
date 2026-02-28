import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getFoodBySlug, categories, foods } from "@/lib/data";
import NutritionTable from "@/components/NutritionTable";
import ProsCons from "@/components/ProsCons";

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
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumbs */}
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
                                <Link href={`/category/${food.category}`} className="hover:text-primary-600 transition-colors ml-1 md:ml-2">
                                    {categoryName}
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-gray-900 font-medium ml-1 md:ml-2">{food.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Two-column layout on desktop */}
                    <div className="flex flex-col md:flex-row gap-0 md:gap-10">

                        {/* Left Column: Image */}
                        <div className="w-full md:w-2/5 relative h-64 md:h-auto min-h-[400px] bg-green-50 flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10">
                                🌿
                            </div>
                            {food.image && (
                                <Image
                                    src={food.image}
                                    alt={`${food.name} presentation`}
                                    fill
                                    className="object-cover relative z-10"
                                    priority
                                />
                            )}
                        </div>

                        {/* Right Column: Content */}
                        <div className="w-full md:w-3/5 p-8 md:p-12 md:pl-0 flex flex-col justify-center">
                            <div className="mb-2 inline-flex items-center">
                                <span className="px-3 py-1 rounded-full text-sm font-semibold tracking-wide text-primary-700 bg-primary-50 uppercase">
                                    {categoryName}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                                {food.name}
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl text-balance">
                                {food.description}
                            </p>

                            {/* Nutrition Table */}
                            <NutritionTable nutrition={food.nutrition} />
                        </div>
                    </div>

                    <div className="px-8 pb-12 md:px-12 md:pb-16 pt-0">
                        <hr className="border-gray-100 my-8" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center text-balance">
                            What you need to know about {food.name}
                        </h2>
                        {/* Pros & Cons */}
                        <ProsCons pros={food.pros} cons={food.cons} />
                    </div>
                </article>
            </div>
        </>
    );
}
