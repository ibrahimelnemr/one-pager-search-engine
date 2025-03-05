import React from "react";

// interface Employee {
//     username?: string;
//     email?: string;
//     dpnProfileLink?: string;
//     profileImage?: string;
//     name?: string;
//     title?: string;
//     officialTitle?: string;
//     costCenter?: string;
//     businessSkills?: string[];
//     technologySkills?: string[];
//     industryExperience?: string[];
//     education?: string;
//     languages?: string;
//     certificates?: string;
//     summaryOfProfessionalExperience?: string;
//     relevantExperience?: string;
//     selectedClients?: string;
// }

export default function EmployeeCard({ employee }: { employee: any }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
            {/* Profile Image */}
            <img
                src={employee.profileImage}
                alt={employee.name}
                className="w-20 h-20 rounded-full mx-auto border-2 border-gray-300"
            />

            {/* Name and Title */}
            <div className="text-center mt-4">
                <h3 className="text-xl font-semibold">{employee.name}</h3>
                <p className="text-gray-500">{employee.title} | {employee.officialTitle}</p>
            </div>

            {/* Cost Center */}
            <p className="text-sm text-gray-600 mt-2 text-center">{employee.costCenter}</p>

            {/* Skills */}
            <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700">Business Skills:</h4>
                <p className="text-xs text-gray-600">{employee.businessSkills.join(", ")}</p>
            </div>

            <div className="mt-2">
                <h4 className="text-sm font-semibold text-gray-700">Technology Skills:</h4>
                <p className="text-xs text-gray-600">{employee.technologySkills.join(", ")}</p>
            </div>

            {/* Experience */}
            <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700">Experience:</h4>
                <p className="text-xs text-gray-600">{employee.relevantExperience}</p>
            </div>

            {/* Profile Link */}
            <a
                href={employee.dpnProfileLink}
                className="block mt-4 text-blue-600 text-center text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                View Full Profile
            </a>
        </div>
    );
}
