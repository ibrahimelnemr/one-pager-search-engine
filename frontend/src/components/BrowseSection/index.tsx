import React, { useEffect, useState, ReactNode } from "react";
import MockOnePagerData from "@/data/MockOnePagerData";
import { API_URL } from "@/data/ApiData";
import axios from "axios";
import Navbar from "../Navbar";
import Section from "../Section";
import EmployeeList from "../EmployeeList";
import SearchBar from "../SearchBar";

export default function BrowseSection() {
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
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          {/* Basic Search */}
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