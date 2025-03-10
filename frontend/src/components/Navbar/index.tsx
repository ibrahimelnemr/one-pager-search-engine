import { useEffect, useState } from "react";
import { FaSun, FaMoon, FaSearch, FaMagic } from "react-icons/fa";
import Image from "next/image";
import deloitteLogoWhite from "../../../public/images/deloitte_logo_white.png";
import deloitteLogoBlack from "../../../public/images/deloitte_logo_black.svg";

export default function Navbar({ companyName }: { companyName: string }) {
    const [darkMode, setDarkMode] = useState(false);

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    // Toggle theme and store in localStorage
    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const navbarItems = [
        { name: "AI Search", url: "/ai-search", icon: <FaMagic className="text-xl" /> },
        { name: "Basic Search", url: "/search", icon: <FaSearch className="text-xl" /> },
    ];

    return (
        <nav className="bg-white/80 dark:bg-gray-900 dark:text-white backdrop-blur-lg shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-12">
                
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <Image
                        src={darkMode ? deloitteLogoWhite : deloitteLogoBlack}
                        alt="logo"
                        width={120}
                        height={40}
                        className="object-contain"
                    />
                </div>

                {/* Navigation Items */}
                <ul className="hidden md:flex space-x-8">
                    {navbarItems.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <a
                                href={item.url}
                                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 transition duration-300 font-medium text-lg space-x-2"
                            >
                                {item.icon} <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Theme Toggle Button */}
                <button 
                    onClick={toggleTheme} 
                    className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                    {darkMode ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
                </button>
            </div>
        </nav>
    );
}
