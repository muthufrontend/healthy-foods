"use client";

import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import FoodCard from "@/components/FoodCard";
import { categories, getFeaturedFoods } from "@/lib/data";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function Home() {
    const featuredFoods = getFeaturedFoods(4);

    return (
        <div className="bg-beige-50">
            <Hero />

            {/* Category Section */}
            <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-20">
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-gray-900 text-balance mb-4">
                        Explore Categories
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-xl text-gray-500 max-w-2xl mx-auto text-balance">
                        Browse our comprehensive database of healthy foods categorized for your convenience.
                    </motion.p>
                </motion.div>
                
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {categories.map((category) => (
                        <motion.div key={category.slug} variants={itemVariants}>
                            <CategoryCard
                                name={category.name}
                                slug={category.slug}
                                icon={category.icon}
                                image={category.image}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Featured Foods Section */}
            <section id="featured" className="bg-white py-24 relative isolate">
                {/* Soft top gradient transition */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-beige-50 to-transparent pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="flex justify-between items-end mb-16"
                    >
                        <div>
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-gray-900 text-balance mb-4">
                                Featured Foods
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-xl text-gray-500 max-w-2xl text-balance">
                                Handpicked selections packed with nutrients for a balanced diet.
                            </motion.p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {featuredFoods.map((food) => (
                            <motion.div key={food.slug} variants={itemVariants}>
                                <FoodCard food={food} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
