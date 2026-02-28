import Image from "next/image";
import Link from "next/link";
import { FoodItem } from "@/lib/data";

interface FoodCardProps {
    food: FoodItem;
}

export default function FoodCard({ food }: FoodCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative h-48 w-full bg-gray-100">
                {/* Using unoptimized for placeholder external images or if local images aren't present yet */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-green-50 to-green-100">
                    🌿
                </div>
                {food.image && (
                    <img
                        src={food.image}
                        alt={food.name}
                        className="object-cover w-full h-full relative z-10"
                    />
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {food.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                        {food.category}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-2">{food.description}</p>
                <Link
                    href={`/food/${food.slug}`}
                    className="mt-auto block w-full text-center px-4 py-2 border border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
