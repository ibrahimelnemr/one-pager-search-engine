import NavbarLink from "./NavbarLink";

export default function Navbar({companyName}: {companyName: string}) {
    const navbarItems: { name: string; url: string}[] = [
        {name: "Search by Skill", url: "/skill-search"},
        {name: "Browse", url: "/browse"},
        {name: "Home", url: "/"}
    ];
    return (
        <nav className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <h1 className="text-xl font-bold tracking-wide">{companyName}</h1>
                <ul className="flex space-x-6">
                    {Object.values(navbarItems).map((item, index) => (
                        <li key={index}>
                           <a href={item.url}>
                           {item.name}
                           </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
