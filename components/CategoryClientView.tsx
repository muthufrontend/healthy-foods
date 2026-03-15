"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import FoodCard from "@/components/FoodCard";
import { FoodItem } from "@/lib/data";
import { Search, Filter, Droplets, Dumbbell, Zap } from "lucide-react";

interface CategoryClientViewProps {
    category: {
        name: string;
        description?: string;
        icon: string;
    };
    initialFoods: FoodItem[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function CategoryClientView({ category, initialFoods }: CategoryClientViewProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // Simple client-side filtering logic
    const filteredFoods = initialFoods.filter((food) => {
        const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesFilter = true;
        if (activeFilter === "Protein") {
            matchesFilter = Object.keys(food.nutrition).some(n => n.toLowerCase().includes("protein"));
        } else if (activeFilter === "Fiber") {
            matchesFilter = Object.keys(food.nutrition).some(n => n.toLowerCase().includes("fiber"));
        } else if (activeFilter === "Vitamins") {
            matchesFilter = Object.keys(food.nutrition).some(n => n.toLowerCase().includes("vitamin"));
        }

        return matchesSearch && matchesFilter;
    });

    const filters = [
        { id: "Protein", label: "High Protein", icon: <Dumbbell className="w-4 h-4" /> },
        { id: "Fiber", label: "High Fiber", icon: <Droplets className="w-4 h-4" /> },
        { id: "Vitamins", label: "Vitamin Rich", icon: <Zap className="w-4 h-4" /> },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            {/* Page Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="glass-card p-8 mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
            >
                <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-primary-300/20 blur-[80px] rounded-full pointer-events-none" />
                
                <motion.div 
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                    className="text-7xl bg-white/60 shadow-sm p-6 rounded-3xl"
                >
                    {category.icon}
                </motion.div>
                <div className="text-center md:text-left relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3 text-balance">
                        {category.name}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl text-balance">
                        Explore our curated selection of nutritious {category.name.toLowerCase()} tailored to support your wellbeing.
                    </p>
                </div>
            </motion.div>

            {/* Smart Search & Filters */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm"
            >
                <div className="relative w-full lg:max-w-md group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/80 border-transparent focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10 rounded-xl transition-all outline-none text-gray-800 placeholder-gray-400 shadow-sm"
                        placeholder={`Search ${category.name.toLowerCase()}...`}
                    />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
                    <span className="flex items-center text-sm font-semibold text-gray-500 mr-2 uppercase tracking-wider">
                        <Filter className="w-4 h-4 mr-1" />
                        Filters
                    </span>
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setActiveFilter(activeFilter === f.id ? null : f.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow active:scale-95 ${
                                activeFilter === f.id
                                    ? "bg-primary-500 text-white border border-primary-600"
                                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                            }`}
                        >
                            {f.icon}
                            {f.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Grid listing of foods */}
            {filteredFoods.length > 0 ? (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredFoods.map((food) => (
                            <motion.div 
                                key={food.slug} 
                                variants={itemVariants}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FoodCard food={food} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-white border-dashed shadow-sm"
                >
                    <div className="text-6xl mb-4 opacity-50">🧭</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500 text-lg">We couldn't find any {category.name.toLowerCase()} matching your search.</p>
                    <button 
                        onClick={() => { setSearchQuery(""); setActiveFilter(null); }}
                        className="mt-6 px-6 py-2 bg-white border border-gray-200 text-primary-600 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-all"
                    >
                        Clear Filters
                    </button>
                </motion.div>
            )}
        </div>
    );
}
