import EmployeeCard from "../EmployeeCard";

export default function EmployeeList({ employees }: { employees: any[] }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-4 col-span-full">
            No employees match the filters.
          </p>
        )}
      </div>
    );
  }