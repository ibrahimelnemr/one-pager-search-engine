import React, { ReactNode } from "react";
import MockOnePagerData from "@/data/MockOnePagerData";

export default function BrowseSection() {
    return (
      <Section>
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Meet Our Experts
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Explore the profiles of our talented professionals.
          </p>
        </div>
      </Section>
    );
  }

  
export function Section({ children }: { children: ReactNode }) {
  return (
    <section className="py-16">
      <div className="w-full px-6">
        {children}

        <EmployeeList employees={MockOnePagerData} />
      </div>
    </section>
  );
}


function EmployeeList({ employees }: { employees: any[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 w-full">
      {MockOnePagerData.map((employee, index) => (
        <EmployeeCard key={index} employee={employee} />
      ))}
    </div>
  );
}

function EmployeeCard({ employee }: { employee: any }) {
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center w-64 border border-gray-200 hover:border-gray-300">
      {/* Profile Image */}
      <div className="relative w-24 h-24">
        <img
          src={employee.profileImage}
          alt={employee.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Name and Title */}
      <h3 className="text-lg font-semibold mt-4 text-gray-900">
        {employee.name}
      </h3>
      <p
        className="text-sm text-gray-500 mt-1 truncate w-56"
        title={`${employee.title} | ${employee.officialTitle}`}
      >
        {employee.title} | {employee.officialTitle}
      </p>

      {/* Cost Center */}
      <p
        className="text-sm text-gray-600 mt-2 truncate w-56"
        title={employee.costCenter}
      >
        {employee.costCenter}
      </p>

      {/* Divider */}
      <div className="w-10 border-b-2 border-gray-300 my-3"></div>

      {/* Skills */}
      <div
        className="text-sm text-gray-700 mt-2 w-56 truncate"
        title={employee.businessSkills}
      >
        <strong className="text-gray-800">Business Skills:</strong>{" "}
        {employee.businessSkills}
      </div>

      <div
        className="text-sm text-gray-700 mt-2 w-56 truncate"
        title={employee.technologySkills}
      >
        <strong className="text-gray-800">Tech Skills:</strong>{" "}
        {employee.technologySkills}
      </div>

      {/* Profile Link - More Prominent */}
      <a
        href={employee.dpnProfileLink}
        className="mt-5 w-full bg-blue-600 text-white font-semibold text-md py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Profile
      </a>
    </div>
  );
}
