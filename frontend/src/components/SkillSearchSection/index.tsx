import React, { useEffect, useState, ReactNode } from "react";
import MockOnePagerData from "@/data/MockOnePagerData";
import { API_URL } from "@/data/ApiData";
import axios from "axios";
import Navbar from "../Navbar";
import Section from "../Section";
import EmployeeList from "../EmployeeList";

// Skill Search Section
export default function SkillSearchSection() {
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
          {/* AI Search */}
        </h1>
  
        {/* Search Input */}
        <div className="flex justify-center items-center space-x-4 w-full max-w-3xl mx-auto mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a skill..."
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 outline-none"
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
  