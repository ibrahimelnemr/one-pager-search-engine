import React, { useState } from "react";

export default function SkillSearchSection() {
    const [skills, setSkills] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const baseUrl = "http://localhost:5050";

    const addSkill = () => {
        if (input.trim() && !skills.includes(input.trim())) {
            setSkills([...skills, input.trim()]);
            setInput("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/search`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skills }),
            });

            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            } else {
                console.error("Failed to fetch employees");
            }
        } catch (error) {
            console.log("Error fetching employees", error);
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
                    onClick={addSkill}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-semibold shadow-md text-lg"
                >
                    Add
                </button>
            </div>

            {/* Skills List */}
            <div className="flex flex-wrap gap-3 mb-6">
                {skills.map((skill) => (
                    <div
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center shadow-sm text-lg"
                    >
                        {skill}
                        <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-red-600 font-bold hover:text-red-800 transition"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full transition font-semibold shadow-md text-lg"
            >
                Search
            </button>

            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center mt-6">
                    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
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