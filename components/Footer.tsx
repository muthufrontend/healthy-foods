export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center md:justify-start mb-6 md:mb-0">
                        <span className="text-xl font-bold text-primary-600 flex items-center gap-2">
                            <span className="text-2xl">🌿</span>
                            <span>Healthy Foods</span>
                        </span>
                    </div>
                    <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1 text-center">
                        &copy; {new Date().getFullYear()} Healthy Foods Guide. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
