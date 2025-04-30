const history = [
  { session: "2025", programme: "B.Sc Accounting", level: "400L", fees: "Paid", reg: "Registered", status: "Not Graduated" },
  { session: "2024", programme: "B.Sc Accounting", level: "300L", fees: "Paid", reg: "Registered", status: "Not Graduated" },
  { session: "2023", programme: "B.Sc Accounting", level: "200L", fees: "Paid", reg: "Registered", status: "Not Graduated" },
  { session: "2022", programme: "B.Sc Accounting", level: "100L", fees: "Paid", reg: "Registered", status: "Not Graduated" },
  { session: "2022", programme: "B.Sc Accounting", level: "100L", fees: "Paid", reg: "Registered", status: "Not Graduated" },
];

export default function AcademicHistory() {
  return (
    <div className="bg-white rounded-xl border border-[#DBE1E8] w-full mt-6">
      <div className="flex bg-[#F7F8F9] py-3 px-6 rounded-t-xl border-b border-[#DBE1E8] items-center">
        <div className="font-semibold text-lg text-gray-800">History</div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex bg-[#F7F8F9] px-6 py-3 text-black text-sm font-semibold border-b border-[#DBE1E8]">
          <div className="flex-1">Session</div>
          <div className="flex-1">Programme</div>
          <div className="flex-1">Level</div>
          <div className="flex-1">Fees</div>
          <div className="flex-1">Course Reg.</div>
          <div className="flex-1">Status</div>
        </div>
        {history.map((row, idx) => (
          <div key={idx} className="flex items-center border-b border-[#DBE1E8] text-gray-700 text-sm last:border-0 px-6 py-4">
            <div className="flex-1">{row.session}</div>
            <div className="flex-1">{row.programme}</div>
            <div className="flex-1">{row.level}</div>
            <div className="flex-1">
              <span className="bg-green-50 text-green-600 font-semibold rounded-full px-4 py-1">{row.fees}</span>
            </div>
            <div className="flex-1">
              <span className="bg-green-50 text-green-600 font-semibold rounded-full px-4 py-1">{row.reg}</span>
            </div>
            <div className="flex-1">{row.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 