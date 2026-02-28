import { Nutrition } from "@/lib/data";

interface NutritionTableProps {
    nutrition: Nutrition;
}

export default function NutritionTable({ nutrition }: NutritionTableProps) {
    // Define standard order and formatting
    const labels: Record<string, string> = {
        calories: "Calories",
        fiber: "Dietary Fiber",
        vitaminC: "Vitamin C",
        potassium: "Potassium",
        vitaminE: "Vitamin E",
        vitaminK: "Vitamin K",
        protein: "Protein",
        iron: "Iron",
        omega3: "Omega-3",
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden my-6">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Nutrition Facts</h3>
                <span className="text-xs text-gray-500">Per 100g approx.</span>
            </div>
            <div className="divide-y divide-gray-200">
                {Object.entries(nutrition).map(([key, value]) => (
                    <div key={key} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <span className="text-gray-600 font-medium">{labels[key] || key}</span>
                        <span className="text-gray-900 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
