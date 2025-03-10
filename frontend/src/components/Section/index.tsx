import React, { useEffect, useState } from "react";
import MockOnePagerData from "@/data/MockOnePagerData";
import { API_URL } from "@/data/ApiData";
import axios from "axios";


export function BrowseSection() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [techSkillFilter, setTechSkillFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [officialTitleFilter, setOfficialTitleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [certificateFilter, setCertificateFilter] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/`);
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees", error);
        setEmployees([]); // Fallback to empty state
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
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
      <div className="text-center mb-10">
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Find the Right Talent
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <SearchBar placeholder="Technology Skills" value={techSkillFilter} onChange={setTechSkillFilter} />
        <SearchBar placeholder="Industry Experience" value={industryFilter} onChange={setIndustryFilter} />
        <SearchBar placeholder="Official Title" value={officialTitleFilter} onChange={setOfficialTitleFilter} />
        <SearchBar placeholder="Name" value={nameFilter} onChange={setNameFilter} />
        <SearchBar placeholder="Certificates" value={certificateFilter} onChange={setCertificateFilter} />
      </div>

      {loading ? (
        <div className="flex justify-center mt-6">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <EmployeeList employees={filteredEmployees} />
      )}
    </Section>
  );
}

// Skill Search Section
export function SkillSearchSection() {
  const [input, setInput] = useState<string>("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/search`, {
        params: { query: input.trim() },
      });

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
        AI-Powered Search
      </h1>

      {/* Search Input */}
      <div className="flex justify-center items-center space-x-4 w-full max-w-3xl mx-auto mb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a skill..."
          className="w-full border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg placeholder-gray-500"
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
          <EmployeeList employees={employees} />
        </div>
      )}
    </Section>
  );
}

// Components
function SearchBar({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (value: string) => void; }) {
  return (
    <div className="relative flex w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/80 backdrop-blur-md border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg placeholder-gray-500 text-gray-900 outline-none"
      />
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-screen-2xl mx-auto">{children}</div>
    </section>
  );
}

function EmployeeList({ employees }: { employees: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {employees.length > 0 ? (
        employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg mt-4 col-span-full">
          No employees match the filters.
        </p>
      )}
    </div>
  );
}

function EmployeeCard({ employee }: { employee: any }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div 
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center w-full max-w-sm mx-auto border border-gray-200 cursor-pointer transform hover:scale-105"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative w-28 h-28">
          <img
            src={employee.profileImage}
            alt={employee.name}
            className="w-28 h-28 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <h3 className="text-xl font-semibold mt-4 text-gray-800">{employee.name}</h3>
        <p className="text-md text-gray-500 mt-1">{employee.officialTitle}</p>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Tech Skills:</strong> {employee.technologySkills}
          </p>
          <p className="text-sm text-gray-600">
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

function ProfilePopup({ employee, onClose }: { employee: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <div className="text-center">
          <img 
            src={employee.profileImage} 
            alt={employee.name} 
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
          />
          <h2 className="text-2xl font-bold mt-3">{employee.name}</h2>
          <p className="text-gray-500">{employee.officialTitle}</p>
        </div>

        <div className="mt-4 space-y-2">
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