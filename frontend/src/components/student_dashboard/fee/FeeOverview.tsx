import Button from "@/components/forms/Button";

const currentFee = {
  session: "2025",
  programme: "B.Sc Accounting",
  level: "400L",
  semester: "Second",
  status: "Not Paid",
  fee: "N 200,000",
};

const previousPayments = [
  { session: "2025", ref: "1353785874245134", level: "400L", semester: "First", status: "Paid" },
  { session: "2024", ref: "1353785874245134", level: "300L", semester: "Second", status: "Paid" },
  { session: "2023", ref: "1353785874245134", level: "200L", semester: "First", status: "Paid" },
  { session: "2022", ref: "1353785874245134", level: "100L", semester: "Second", status: "Paid" },
  { session: "2022", ref: "1353785874245134", level: "100L", semester: "First", status: "Paid" },
];

export default function FeeOverview({ onPay }: { onPay: () => void }) {
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
                <th className="px-6 py-4 text-left">FEE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#DBE1E8]">
                <td className="px-6 py-4 font-medium text-gray-700">{currentFee.session}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentFee.programme}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentFee.level}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentFee.semester}</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-50 text-yellow-600 rounded-full px-4 py-1 text-sm font-medium">{currentFee.status}</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">{currentFee.fee}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-6">
          <a href="#" className="text-gray-500 underline hover:text-primary">Fee Breakdown</a>
          <Button variant="primary" className="px-16 py-4 text-lg" onClick={onPay}>
            Pay
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#DBE1E8]">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">Previous Semester Payments</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">SESSION</th>
                <th className="px-6 py-4 text-left">REFERENCE NUMBER</th>
                <th className="px-6 py-4 text-left">LEVEL</th>
                <th className="px-6 py-4 text-left">SEMESTER</th>
                <th className="px-6 py-4 text-left">STATUS</th>
                <th className="px-6 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {previousPayments.map((row, idx) => (
                <tr className="border-b border-[#DBE1E8]" key={idx}>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.session}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.ref}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.level}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.semester}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-50 text-green-600 rounded-full px-4 py-1 text-sm font-medium">{row.status}</span>
                  </td>
                  <td className="px-6 py-4 text-primary font-medium cursor-pointer">Receipt</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 