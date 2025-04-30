import Button from "@/components/forms/Button";

const currentResult = {
  session: "2025",
  semester: "Second",
  level: "400L",
  lcgpa: 3.62,
  cgpa: 3.92,
};

const previousResults = [
  { session: "2025", semester: "First", level: "400L", lcgpa: 3.55, cgpa: 3.62 },
  { session: "2024", semester: "Second", level: "300L", lcgpa: 3.47, cgpa: 3.55 },
  { session: "2023", semester: "First", level: "200L", lcgpa: 3.74, cgpa: 3.47 },
  { session: "2022", semester: "Second", level: "100L", lcgpa: 4.14, cgpa: 3.74 },
  { session: "2022", semester: "First", level: "100L", lcgpa: 4.14, cgpa: 4.14 },
];

export default function ExamResultsOverview({ onViewResult }: { onViewResult: () => void }) {
  return (
    <div className="space-y-12 bg-[#F7F8F9] rounded-2xl">
      <div className="bg-white rounded-xl border border-[#DBE1E8]">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">Current Semester Results</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">SESSION</th>
                <th className="px-6 py-4 text-left">SEMESTER</th>
                <th className="px-6 py-4 text-left">LEVEL</th>
                <th className="px-6 py-4 text-left">LCGPA</th>
                <th className="px-6 py-4 text-left">CGPA</th>
                <th className="px-6 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#DBE1E8]">
                <td className="px-6 py-4 font-medium text-gray-700">{currentResult.session}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentResult.semester}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentResult.level}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentResult.lcgpa}</td>
                <td className="px-6 py-4 font-bold text-gray-700">{currentResult.cgpa}</td>
                <td className="px-6 py-4 text-primary font-medium cursor-pointer">Print Result</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end p-6">
          <Button variant="primary" className="px-16 py-4 text-lg" onClick={onViewResult}>
            View Result
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#DBE1E8]">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">Previous Semester Results</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">SESSION</th>
                <th className="px-6 py-4 text-left">SEMESTER</th>
                <th className="px-6 py-4 text-left">LEVEL</th>
                <th className="px-6 py-4 text-left">LCGPA</th>
                <th className="px-6 py-4 text-left">CGPA</th>
                <th className="px-6 py-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {previousResults.map((row, idx) => (
                <tr className="border-b border-[#DBE1E8]" key={idx}>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.session}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.semester}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.level}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.lcgpa}</td>
                  <td className="px-6 py-4 font-bold text-gray-700">{row.cgpa}</td>
                  <td className="px-6 py-4 text-primary font-medium cursor-pointer space-x-4">
                    <span className="underline cursor-pointer">Details</span>
                    <span className="underline cursor-pointer">Print Result</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 