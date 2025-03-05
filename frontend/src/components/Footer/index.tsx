export default function Footer({copyrightText}:{copyrightText:string}) {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4 text-center text-sm mt-auto">
            <p>{copyrightText}</p>
        </footer>
    );
}
