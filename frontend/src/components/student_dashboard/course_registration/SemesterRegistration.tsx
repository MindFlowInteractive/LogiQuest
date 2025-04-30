import Button from "@/components/forms/Button";

const currentSemester = {
  session: "2025",
  programme: "B.Sc Accounting",
  level: "400L",
  semester: "Second",
  status: "Not Registered",
  approval: "Not Approved",
};

const previousSemesters = [
  { session: "2025", programme: "B.Sc Accounting", level: "400L", semester: "First", status: "Registered" },
  { session: "2024", programme: "B.Sc Accounting", level: "300L", semester: "Second", status: "Registered" },
  { session: "2023", programme: "B.Sc Accounting", level: "200L", semester: "First", status: "Registered" },
  { session: "2022", programme: "B.Sc Accounting", level: "100L", semester: "Second", status: "Registered" },
  { session: "2022", programme: "B.Sc Accounting", level: "100L", semester: "First", status: "Registered" },
];

export default function SemesterRegistration({ onRegister }: { onRegister: () => void }) {
  return (
    <div className="space-y-12 bg-[#F7F8F9] rounded-2xl">
      <div className="bg-white rounded-xl border border-[#DBE1E8]">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">Current Semester</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">SESSION</th>
                <th className="px-6 py-4 text-left">PROGRAMME</th>
                <th className="px-6 py-4 text-left">LEVEL</th>
                <th className="px-6 py-4 text-left">SEMESTER</th>
                <th className="px-6 py-4 text-left">STATUS</th>
                <th className="px-6 py-4 text-left">APPROVAL STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#DBE1E8]">
                <td className="px-6 py-4 font-medium text-gray-700">{currentSemester.session}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentSemester.programme}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentSemester.level}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentSemester.semester}</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-50 text-yellow-600 rounded-full px-4 py-1 text-sm font-medium">{currentSemester.status}</span>
                </td>
                <td className="px-4 py-2 font-medium text-gray-700">{currentSemester.approval}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end p-6">
          <Button variant="primary" className="px-16 py-4 text-lg" onClick={onRegister}>
            Register Courses
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#DBE1E8]">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">Previous Semester Registrations</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">SESSION</th>
                <th className="px-6 py-4 text-left">PROGRAMME</th>
                <th className="px-6 py-4 text-left">LEVEL</th>
                <th className="px-6 py-4 text-left">SEMESTER</th>
                <th className="px-6 py-4 text-left">STATUS</th>
                <th className="px-6 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {previousSemesters.map((row, idx) => (
                <tr className="border-b border-[#DBE1E8]" key={idx}>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.session}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.programme}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.level}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.semester}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-50 text-green-600 rounded-full px-4 py-1 text-sm font-medium">{row.status}</span>
                  </td>
                  <td className="px-4 py-2 text-primary font-medium cursor-pointer">See Details</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 