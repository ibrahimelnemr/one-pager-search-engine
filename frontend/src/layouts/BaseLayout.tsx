import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            <Navbar />
            <main className="flex-grow flex flex-col container mx-auto px-6 sm:px-12 lg:px-24 py-10">
                {children}
            </main>
            <Footer />
        </div>
    );
}
