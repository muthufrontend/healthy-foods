"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getImagePath } from "@/lib/utils";

export default function Hero() {
    return (
        <div className="relative bg-beige-50 overflow-hidden min-h-[85vh] flex items-center justify-center">
            {/* Background Decorative Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold mb-6 tracking-wide uppercase">
                            Your Ultimate Nutrition Guide
                        </span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight text-balance mb-6"
                    >
                        Eat Better. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
                            Live Healthier.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="mt-4 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto text-balance mb-10 leading-relaxed"
                    >
                        Discover the nutritional benefits, pros, and cons of your favorite fruits, nuts, and vegetables with our beautifully curated guide.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link
                            href="#categories"
                            className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold text-lg hover:bg-primary-700 hover:shadow-[0_8px_30px_rgba(22,163,74,0.3)] transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Explore Foods
                        </Link>
                        <Link
                            href="#featured"
                            className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-100 rounded-2xl font-semibold text-lg hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1"
                        >
                            View Nutrition Guide
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Floating Food Elements */}
            <motion.div
                className="absolute top-[15%] left-[10%] w-24 h-24 hidden lg:block opacity-80"
                animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <img src={getImagePath("/images/apple.png")} alt="Apple" className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>

            <motion.div
                className="absolute bottom-[20%] left-[15%] w-32 h-32 hidden lg:block opacity-80"
                animate={{ y: [0, 40, 0], rotate: [0, -15, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <img src={getImagePath("/images/broccoli.png")} alt="Broccoli" className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>

            <motion.div
                className="absolute top-[25%] right-[10%] w-28 h-28 hidden lg:block opacity-80"
                animate={{ y: [0, -40, 0], rotate: [0, 20, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
                <img src={getImagePath("/images/banana.png")} alt="Banana" className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>

            <motion.div
                className="absolute bottom-[25%] right-[15%] w-20 h-20 hidden md:block opacity-80"
                animate={{ y: [0, 30, 0], rotate: [0, -20, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <img src={getImagePath("/images/spinach.png")} alt="Spinach" className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>
            
            {/* Bottom fading gradient to blend with next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-beige-50 to-transparent z-10 pointer-events-none" />
        </div>
    );
}
