import React, { useState } from "react";

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://localhost:5000";

  const addSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
      setInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
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

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.log("Error fetching employees");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Skill Search</h1>

      {/* Search Bar */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a skill..."
          className="border p-2 flex-1 rounded shadow-sm"
        />
        <button
          onClick={addSkill}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <div key={skill} className="bg-gray-200 px-3 py-1 rounded flex items-center">
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition w-full"
      >
        Submit
      </button>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Employees List */}
      <div>
        {employees.length > 0 && <h2 className="text-xl font-bold mt-6">Employees</h2>}
        <div className="space-y-4 mt-2">
          {employees.map((employee) => (
            <div key={employee.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p className="text-gray-600">{employee.id}</p>
              <p className="text-gray-600">{employee.bio}</p>
              <p className="text-gray-600">{employee.email}</p>
              {/* {employee.technicalSkills.map(skill => <p>skill, </p>)}
              <p className="text-gray-600">{employee.email}</p>
              {employee.industrySkills.map(skill => <p>skill, </p>)} */}
              <a
                href={`https://people.deloitte/profile/${employee.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
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
