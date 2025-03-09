import { API_URL } from "@/data/ApiData";
import React, { useState } from "react";

export default function SkillSearchSection() {
    const [input, setInput] = useState<string>("");
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!input.trim()) return; // Prevent empty submissions

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/search?query=${input.trim()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
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
            <div className="mt-8">
                {employees.length > 0 && (
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Employees</h2>
                )}
                <div className="space-y-4">
                    {employees.map((employee) => (
                        <div
                            key={employee.id}
                            className="border p-6 rounded-xl shadow-md bg-gray-50 hover:shadow-lg transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                            <p className="text-gray-600">{employee.bio}</p>
                            <p className="text-gray-600">{employee.email}</p>
                            <a
                                href={`https://people.deloitte/profile/${employee.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                View Profile
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
