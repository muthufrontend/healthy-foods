import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-primary-600 flex items-center gap-2">
                            <span className="text-3xl">🌿</span>
                            <span>Healthy Foods</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link href="/category/fruits" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Fruits
                        </Link>
                        <Link href="/category/nuts" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Nuts
                        </Link>
                        <Link href="/category/vegetables" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Vegetables
                        </Link>
                    </nav>

                    {/* Mobile menu button (Hamburger) */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-600 hover:text-primary-600 focus:outline-none p-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
