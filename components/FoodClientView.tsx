"use client";

import { motion } from "framer-motion";
import { getImagePath } from "@/lib/utils";
import { FoodItem } from "@/lib/data";
import ProgressBar from "@/components/ProgressBar";
import { CheckCircle2, XCircle } from "lucide-react";

interface FoodClientViewProps {
    food: FoodItem;
    categoryName: string;
}

export default function FoodClientView({ food, categoryName }: FoodClientViewProps) {
    // Helper to extract a number from strings like "50g" or "100 kcal" to use for the progress bar percentage
    const parseValue = (str: string) => {
        const match = str.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
    };

    // Calculate arbitrary percentages for demo visualization purposes
    const getPercentage = (key: string, val: string) => {
        const num = parseValue(val);
        if (key === "calories") return Math.min((num / 500) * 100, 100);
        if (key === "fiber") return Math.min((num / 30) * 100, 100);
        if (key.includes("vitamin")) return Math.min((num / 100) * 100, 100);
        if (key === "potassium") return Math.min((num / 1000) * 100, 100);
        return Math.min(num, 100); // generic fallback
    };

    return (
        <article className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-50/50 to-transparent pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 relative z-10">
                {/* Left Column: Hero Image */}
                <div className="w-full lg:w-5/12 relative h-80 lg:h-auto min-h-[400px] lg:min-h-[600px] bg-gradient-to-br from-beige-100 to-green-50 flex-shrink-0 overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center text-[12rem] opacity-5"
                    >
                        🌿
                    </motion.div>
                    {food.image && (
                        <motion.img
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                            src={getImagePath(food.image)}
                            alt={`${food.name} presentation`}
                            className="absolute inset-0 object-cover w-full h-full z-10 hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    )}
                </div>

                {/* Right Column: Content */}
                <div className="w-full lg:w-7/12 p-8 lg:p-16 lg:pl-0 flex flex-col justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 inline-flex items-center"
                    >
                        <span className="px-4 py-1.5 rounded-full text-sm font-bold tracking-wider text-primary-700 bg-primary-50 uppercase border border-primary-100 shadow-sm">
                            {categoryName}
                        </span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 text-balance"
                    >
                        {food.name}
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl text-balance"
                    >
                        {food.description}
                    </motion.p>

                    {/* Animated Nutrition Stats */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/60 p-6 rounded-2xl border border-gray-100 shadow-sm mb-8"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-primary-500 rounded-full inline-block" />
                            Nutrition Highlights
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            {Object.entries(food.nutrition).map(([key, value], index) => {
                                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                return (
                                    <ProgressBar 
                                        key={key} 
                                        label={label} 
                                        valueText={value as string} 
                                        percentage={getPercentage(key, value as string)} 
                                        color={index % 2 === 0 ? "bg-primary-500" : "bg-accent-500"}
                                    />
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Pros & Cons Section */}
            <div className="px-8 pb-12 lg:px-16 lg:pb-16 pt-8 bg-beige-50/50">
                <motion.h2 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-gray-900 mb-8 text-center"
                >
                    What you need to know
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pros Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="bg-primary-50 rounded-3xl p-8 border border-primary-100 shadow-sm relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 text-9xl opacity-5 pointer-events-none">✨</div>
                        <h3 className="text-2xl font-bold text-primary-800 mb-6 flex items-center gap-3">
                            <span className="p-2 bg-primary-100 rounded-xl"><CheckCircle2 className="w-6 h-6 text-primary-600" /></span>
                            Benefits
                        </h3>
                        <ul className="space-y-4">
                            {food.pros.map((pro, index) => (
                                <motion.li 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    key={index} 
                                    className="flex items-start text-primary-900 font-medium"
                                >
                                    <CheckCircle2 className="w-5 h-5 mr-3 text-primary-500 mt-0.5 flex-shrink-0" />
                                    <span className="leading-relaxed">{pro}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Cons Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="bg-red-50 rounded-3xl p-8 border border-red-100 shadow-sm relative overflow-hidden"
                    >
                        <div className="absolute -bottom-10 -right-10 text-9xl opacity-5 pointer-events-none">⚠️</div>
                        <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
                            <span className="p-2 bg-red-100 rounded-xl"><XCircle className="w-6 h-6 text-red-500" /></span>
                            Things to consider
                        </h3>
                        <ul className="space-y-4">
                            {food.cons.map((con, index) => (
                                <motion.li 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    key={index} 
                                    className="flex items-start text-red-900 font-medium"
                                >
                                    <XCircle className="w-5 h-5 mr-3 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="leading-relaxed">{con}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </article>
    );
}
