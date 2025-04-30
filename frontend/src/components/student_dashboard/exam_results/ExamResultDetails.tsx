import Button from "@/components/forms/Button";
import { FiArrowLeft, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

const courses = [
  { code: "BCH 101", title: "Build Your Own Bitcoin Transaction Processor", credit: 3, score: 74, grade: "A" },
  { code: "BIO 112", title: "Build Your Own Bitcoin Transaction Processor", credit: 2, score: 63, grade: "B" },
  { code: "TSX 121", title: "Build Your Own Bitcoin Transaction Processor", credit: 2, score: 78, grade: "A" },
  { code: "TSX122", title: "Build Your Own Bitcoin Transaction Processor", credit: 2, score: 64, grade: "B" },
  { code: "TSX 123", title: "Build Your Own Bitcoin Transaction Processor", credit: 1, score: 63, grade: "B" },
  { code: "BIO 112", title: "Build Your Own Bitcoin Transaction Processor", credit: 1, score: 63, grade: "B" },
];

const summary = {
  TCR: 21.0,
  TCE: 21.0,
  TGP: 87.0,
  CCR: 21.0,
  CCE: 21.0,
  CGP: 87.0,
  GPA: 4.14,
  LCGPA: 4.14,
  CGPA: 4.14,
};

export default function ExamResultDetails({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full">
        <div className="flex items-center gap-2 mb-5">
          <Link href="#" onClick={onBack} className="text-gray-500 hover:text-primary flex items-center gap-1 text-base font-medium">
            <div className="border border-[#DBE2E8] bg-white rounded-sm p-1">
              <FiArrowLeft className="text-lg" />
            </div>
            Go Back
          </Link>
        </div>
      <div className="bg-white rounded-xl border border-[#DBE1E8] mb-8">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8] flex justify-between items-center">
          <span>SESSION: 2023</span>
          <span className="font-normal">200L Second Semester Results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">S/N</th>
                <th className="px-6 py-4 text-left">COURSE CODE</th>
                <th className="px-6 py-4 text-left">COURSE TITLE</th>
                <th className="px-6 py-4 text-left">CREDIT</th>
                <th className="px-6 py-4 text-left">SCORE</th>
                <th className="px-6 py-4 text-left">GRADE</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((row, idx) => (
                <tr className="border-b border-[#DBE1E8]" key={idx}>
                  <td className="px-6 py-4 font-medium text-gray-700">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.code}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.title}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.credit}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.score}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between gap-6 px-6 py-6 text-base font-semibold text-gray-700">
<div className="flex gap-6">
<span>TCR: {summary.TCR}</span>
          <span>TCE: {summary.TCE}</span>
          <span>TGP: {summary.TGP}</span>
          <span>CCR: {summary.CCR}</span>
          <span>CCE: {summary.CCE}</span>
          <span>CGP: {summary.CGP}</span>
</div>
<div className="flex gap-6">
<span className="text-black font-bold">GPA: {summary.GPA}</span>
          <span className="text-black font-bold">LCGPA: {summary.LCGPA}</span>
          <span className="text-black font-bold">CGPA: {summary.CGPA}</span>
</div>
        </div>
        <div className="flex justify-end p-6">
          <Button variant="primary" className="px-16 py-4 text-lg">
            Print Result
          </Button>
        </div>
      </div>
    </div>
  );
} 