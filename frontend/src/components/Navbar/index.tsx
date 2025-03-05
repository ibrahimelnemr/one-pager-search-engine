export default function Navbar({companyName}: {companyName: string}) {
    return (
        <nav className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <h1 className="text-xl font-bold tracking-wide">{companyName}</h1>
                <ul className="flex space-x-6">
                    {["Home", "About", "Contact"].map((item) => (
                        <li key={item}>
                            <a href="#" className="hover:underline transition duration-200">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
