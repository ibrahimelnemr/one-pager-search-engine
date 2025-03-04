export default function Navbar() {
    return (
        <nav className="bg-blue-700 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <h1 className="text-xl font-bold tracking-wide">Company Name</h1>
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
