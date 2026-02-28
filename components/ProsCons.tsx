interface ProsConsProps {
    pros: string[];
    cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {/* Pros Section */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200 shadow-sm">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Pros
                </h3>
                <ul className="space-y-3">
                    {pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-900">{pro}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cons Section */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200 shadow-sm">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                    Cons
                </h3>
                <ul className="space-y-3">
                    {cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-red-900">{con}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
