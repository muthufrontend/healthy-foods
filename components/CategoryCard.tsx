"use client";

import Link from "next/link";
import { getImagePath } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryCardProps {
    name: string;
    slug: string;
    icon: string;
    image?: string;
}

export default function CategoryCard({ name, slug, icon, image }: CategoryCardProps) {
    return (
        <Link href={`/category/${slug}`} className="group block h-full outline-none focus-visible:ring-2 ring-primary-500 rounded-[24px]">
            <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card overflow-hidden text-center h-full flex flex-col group-hover:shadow-[0_20px_40px_rgba(34,197,94,0.12)] border-transparent group-hover:border-primary-100 transition-all duration-300 relative"
            >
                {/* Subtle animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {image ? (
                    <div className="w-full h-48 relative overflow-hidden bg-white/50 flex-shrink-0">
                        <img
                            src={getImagePath(image)}
                            alt={name}
                            className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ) : (
                    <div className="pt-8 text-6xl mb-2 transform transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110 flex-shrink-0">{icon}</div>
                )}
                <div className="p-6 flex-grow flex items-center justify-center relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors uppercase tracking-widest">
                        {name}
                    </h3>
                </div>
            </motion.div>
        </Link>
    );
}
