"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
    label: string;
    valueText: string;
    percentage: number;
    color?: string; // Tailwind class like "bg-primary-500"
    className?: string;
}

export default function ProgressBar({
    label,
    valueText,
    percentage,
    color = "bg-primary-500",
    className,
}: ProgressBarProps) {
    return (
        <div className={cn("mb-4", className)}>
            <div className="flex justify-between items-end mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-semibold text-gray-900">{valueText}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(100, percentage)}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-2.5 rounded-full", color)}
                />
            </div>
        </div>
    );
}
