import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
    name: string;
    slug: string;
    icon: string;
    image?: string;
}

export default function CategoryCard({ name, slug, icon, image }: CategoryCardProps) {
    return (
        <Link href={`/category/${slug}`} className="group block h-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-200 h-full flex flex-col">
                {image ? (
                    <div className="w-full h-48 relative overflow-hidden bg-gray-50 flex-shrink-0">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ) : (
                    <div className="pt-8 text-6xl mb-2 transform transition-transform group-hover:-translate-y-2 flex-shrink-0">{icon}</div>
                )}
                <div className="p-6 flex-grow flex items-center justify-center">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-widest relative z-10">
                        {name}
                    </h3>
                </div>
            </div>
        </Link>
    );
}
