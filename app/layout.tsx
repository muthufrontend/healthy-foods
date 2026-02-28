import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Healthy Foods Guide",
    description: "Discover the nutritional benefits, pros, and cons of your favorite fruits, nuts, and vegetables.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
