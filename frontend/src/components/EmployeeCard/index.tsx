import { useState } from "react";
import ProfilePopup from "../ProfilePopup";

export default function EmployeeCard({ employee }: { employee: any }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    return (
      <>
        <div 
          className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center w-full max-w-sm mx-auto border border-gray-200 dark:border-gray-700 cursor-pointer transform hover:scale-105"
          onClick={() => setIsPopupOpen(true)}
        >
          <div className="relative w-28 h-28">
            <img
              src={employee.profileImage}
              alt={employee.name}
              className="w-28 h-28 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
            />
          </div>
  
          <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-100">{employee.name}</h3>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-1">{employee.officialTitle}</p>
  
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Tech Skills:</strong> {employee.technologySkills}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Business Skills:</strong> {employee.businessSkills}
            </p>
          </div>
        </div>
  
        {isPopupOpen && (
          <ProfilePopup employee={employee} onClose={() => setIsPopupOpen(false)} />
        )}
      </>
    );
  }
  