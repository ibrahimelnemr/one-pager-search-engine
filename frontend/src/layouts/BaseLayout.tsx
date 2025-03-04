import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="relative flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );

}