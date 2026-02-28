"use client";

import { useState, useEffect } from "react";
import { getImagePath } from "@/lib/utils";

export default function Hero() {
    const banners = [
        "/images/Banner-1.jpg",
        "/images/Banner-2.jpg",
        "/images/Banner-3.jpg",
        "/images/Banner-4.jpg",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="relative bg-gray-900 overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-6">
            <div className="absolute inset-0">
                {banners.map((banner, index) => (
                    <img
                        key={banner}
                        src={getImagePath(banner)}
                        alt={`Healthy Foods Banner ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
            </div>
            <div className="relative w-full h-80 sm:h-96 md:h-[30rem] lg:h-[36rem] z-10">
                {/* Provides height for the slider */}
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-white scale-125 shadow-md" : "bg-white/50 hover:bg-white/80"
                            }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
