import React from "react";
import EmployeeCard from "../EmployeeCard";
import MockOnePagerData from "@/data/MockOnePagerData";

export default function BrowseSection() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                {/* Section Header */}
                <h2 className="text-3xl font-semibold text-gray-800 text-center">
                    Meet Our Experts
                </h2>
                <p className="text-gray-600 text-center mt-2">
                    Explore the profiles of our talented professionals.
                </p>

                {/* Employee Cards Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {MockOnePagerData.map((employee, index) => (
                        <EmployeeCard key={index} employee={employee} />
                    ))}
                </div>
            </div>
        </section>
    );
}
