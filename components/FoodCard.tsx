"use client";

import Link from "next/link";
import { getImagePath } from "@/lib/utils";
import { FoodItem } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FoodCardProps {
    food: FoodItem;
}

export default function FoodCard({ food }: FoodCardProps) {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="glass-card overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border-transparent hover:border-white/60 relative"
        >
            <div className="relative h-56 w-full bg-beige-100 overflow-hidden">
                {/* Floating Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-600 shadow-sm capitalize tracking-wide">
                        {food.category}
                    </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-primary-50/50 to-primary-100/50">
                    🌿
                </div>
                {food.image && (
                    <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src={getImagePath(food.image)}
                        alt={food.name}
                        className="absolute inset-0 object-cover w-full h-full z-10"
                    />
                )}
                {/* Soft gradient overlay at the bottom for text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-white/40">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                        {food.name}
                    </h3>
                </div>
                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-2 leading-relaxed">
                    {food.description}
                </p>
                
                <Link
                    href={`/food/${food.slug}`}
                    className="mt-auto flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-white border border-gray-200 text-gray-800 font-medium rounded-xl hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
}
