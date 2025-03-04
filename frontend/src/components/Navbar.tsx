export default function Navbar() {
    return (
        <nav className="bg-blue-700 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <h1 className="text-xl font-bold">Company Name</h1>
                <ul className="flex space-x-6">
                    <li>
                        <a href="#" className="hover:underline">Home</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
