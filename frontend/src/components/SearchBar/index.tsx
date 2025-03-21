export default function SearchBar({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (value: string) => void; }) {
    return (
      <div className="relative flex w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 outline-none"
        />
      </div>
    );
  }
  