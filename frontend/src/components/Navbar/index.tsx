import NavbarLink from "./NavbarLink";
import Image from "next/image";

export default function Navbar({ companyName }: { companyName: string }) {
    const navbarItems: { name: string; url: string }[] = [
        { name: "AI Search", url: "/ai-search" },
        { name: "Basic Search", url: "/search" },
    ];

    return (
        <nav className="bg-white/70 backdrop-blur-md shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-12">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg"
                        alt="logo"
                        width={120}
                        height={40}
                        className="object-contain"
                    />
                </div>

                {/* Navigation Items */}
                <ul className="hidden md:flex space-x-8">
                    {navbarItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.url}
                                className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium text-lg"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button (Optional) */}
                <div className="md:hidden">
                    <button className="text-gray-700 focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
