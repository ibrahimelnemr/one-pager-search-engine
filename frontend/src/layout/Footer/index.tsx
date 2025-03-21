export function Footer({ copyrightText }: { copyrightText: string }) {
    return (
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-400 text-sm mt-10">
        
        {/* Copyright Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-gray-500 dark:text-gray-400">
          {copyrightText}
        </div>
      </footer>
    );
  }