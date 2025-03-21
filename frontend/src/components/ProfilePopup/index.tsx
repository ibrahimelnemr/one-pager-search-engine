export default function ProfilePopup({ employee, onClose }: { employee: any; onClose: () => void }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ✕
          </button>
  
          <div className="text-center">
            <img 
              src={employee.profileImage} 
              alt={employee.name} 
              className="w-24 h-24 rounded-full mx-auto "
            />
            <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-gray-100">{employee.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{employee.officialTitle}</p>
          </div>
  
          <div className="mt-4 space-y-2 dark:text-gray-400">
            <p><strong>Technology Skills:</strong> {employee.technologySkills}</p>
            <p><strong>Business Skills:</strong> {employee.businessSkills}</p>
            <p><strong>Industry Experience:</strong> {employee.industryExperience}</p>
            <p><strong>Certificates:</strong> {employee.certificates}</p>
          </div>
  
          <div className="mt-5 text-center">
            <a 
              href={employee.dpnProfileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-700 transition font-semibold"
            >
              View DPN Profile
            </a>
          </div>
        </div>
      </div>
    );
  }
  