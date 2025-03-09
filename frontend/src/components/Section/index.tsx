import React, { useState, ReactNode } from "react";
import MockOnePagerData from "@/data/MockOnePagerData";
import { API_URL } from "@/data/ApiData";

export function BrowseSection() {
  return (
    <Section employees={MockOnePagerData}>
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

export function Section({ children, employees }: { children: ReactNode; employees: any[] }) {
  return (
    <section className="py-16">
      <div className="w-full px-6">
        {children}
        <EmployeeList employees={employees} />
      </div>
    </section>
  );
}

function EmployeeList({ employees }: { employees: any[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 w-full">
      {employees.map((employee, index) => (
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
      <h3 className="text-lg font-semibold mt-4 text-gray-900">{employee.name}</h3>
      <p className="text-sm text-gray-500 mt-1 truncate w-56" title={`${employee.title} | ${employee.officialTitle}`}>
        {employee.title} | {employee.officialTitle}
      </p>

      {/* Cost Center */}
      <p className="text-sm text-gray-600 mt-2 truncate w-56" title={employee.costCenter}>
        {employee.costCenter}
      </p>

      {/* Divider */}
      <div className="w-10 border-b-2 border-gray-300 my-3"></div>

      {/* Skills */}
      <div className="text-sm text-gray-700 mt-2 w-56 truncate" title={employee.businessSkills}>
        <strong className="text-gray-800">Business Skills:</strong> {employee.businessSkills}
      </div>

      <div className="text-sm text-gray-700 mt-2 w-56 truncate" title={employee.technologySkills}>
        <strong className="text-gray-800">Tech Skills:</strong> {employee.technologySkills}
      </div>

      {/* Profile Link */}
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

export function SkillSearchSection() {
  const [input, setInput] = useState<string>("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!input.trim()) return; // Prevent empty submissions

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/search?query=${input.trim()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200 transition hover:shadow-2xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        Skill Search
      </h1>

      {/* Search Input */}
      <div className="flex space-x-3 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a skill..."
          className="w-full border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-semibold shadow-md text-lg"
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Employees List */}
      {employees.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employees</h2>
          <EmployeeList employees={employees} />
        </div>
      )}
    </div>
  );
}
