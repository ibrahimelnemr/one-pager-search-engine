import Navbar from "@/components/Navbar";
import { Footer } from "../Footer";
import { ReactNode } from "react";

export function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter">
            <Navbar companyName="Deloitte"/>
            <main className="flex-grow flex flex-col container mx-auto py-12">
                {children}
            </main>
            <Footer copyrightText={`© ${new Date().getFullYear()} Deloitte Innovation Hub. All rights reserved.`} />
        </div>
    );
}