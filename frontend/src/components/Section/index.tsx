import React, { useState, ReactNode } from "react";
import MockOnePagerData from "@/data/MockOnePagerData";
import { API_URL } from "@/data/ApiData";

export function BrowseSection() {
  const [techSkillFilter, setTechSkillFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [officialTitleFilter, setOfficialTitleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [certificateFilter, setCertificateFilter] = useState("");

  // Filter employees based on input values
  const filteredEmployees = MockOnePagerData.filter((employee) => {
    return (
      (!techSkillFilter ||
        employee.technologySkills
          .toLowerCase()
          .includes(techSkillFilter.toLowerCase())) &&
      (!industryFilter ||
        employee.industryExperience
          .toLowerCase()
          .includes(industryFilter.toLowerCase())) &&
      (!officialTitleFilter ||
        employee.officialTitle
          .toLowerCase()
          .includes(officialTitleFilter.toLowerCase())) &&
      (!nameFilter ||
        employee.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (!certificateFilter ||
        employee.certificates
          .toLowerCase()
          .includes(certificateFilter.toLowerCase()))
    );
  });

  return (
    <Section>
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Basic Search
        </h2>
      </div>

      {/* Search Bars */}
      <div className="flex flex-col space-y-4 mb-6">
        <SearchBar
          placeholder="Filter by Technology Skills..."
          value={techSkillFilter}
          onChange={setTechSkillFilter}
        />
        <SearchBar
          placeholder="Filter by Industry Experience..."
          value={industryFilter}
          onChange={setIndustryFilter}
        />
        <SearchBar
          placeholder="Filter by Official Title..."
          value={officialTitleFilter}
          onChange={setOfficialTitleFilter}
        />
        <SearchBar
          placeholder="Filter by Name..."
          value={nameFilter}
          onChange={setNameFilter}
        />
        <SearchBar
          placeholder="Filter by Certificates..."
          value={certificateFilter}
          onChange={setCertificateFilter}
        />
      </div>

      {/* Employee List */}
      <EmployeeList employees={filteredEmployees} />
    </Section>
  );
}



function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white/80 backdrop-blur-md border border-gray-300 p-4 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg placeholder-gray-500 text-gray-900 outline-none"
      />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md text-lg hover:bg-blue-700 transition-all">
        🔍
      </button>
    </div>
  );
}


function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16">
      <div className="w-full px-6">{children}</div>
    </section>
  );
}

function EmployeeList({ employees }: { employees: any[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 w-full">
      {employees.length > 0 ? (
        employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg mt-4">
          No employees match the filters.
        </p>
      )}
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
      <p className="text-sm text-gray-500 mt-1 truncate w-56">
        {employee.title} | {employee.officialTitle}
      </p>

      {/* Cost Center */}
      <p className="text-sm text-gray-600 mt-2 truncate w-56">
        {employee.costCenter}
      </p>

      {/* Divider */}
      <div className="w-10 border-b-2 border-gray-300 my-3"></div>

      {/* Skills */}
      <div className="text-sm text-gray-700 mt-2 w-56 truncate">
        <strong className="text-gray-800">Business Skills:</strong> {employee.businessSkills}
      </div>

      <div className="text-sm text-gray-700 mt-2 w-56 truncate">
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
    <Section>
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        AI Search
      </h1>

      {/* Search Input */}
      <div className="flex justify-center items-center space-x-4 w-full mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a skill..."
          className="w-3/5 border border-gray-300 p-4 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg placeholder-gray-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition font-semibold shadow-md text-lg"
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
          <EmployeeList employees={employees} />
        </div>
      )}
    </Section>
  );
}
