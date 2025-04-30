import { useState } from "react";
import Button from "@/components/forms/Button";
import { FiArrowLeft, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

const coreCourses = [
  { sn: 1, code: "BCH 101", title: "Build Your Own Bitcoin...", session: "2025", credit: 2, selected: true },
  { sn: 2, code: "BIO 112", title: "Build Your Own Bitcoin...", session: "2025", credit: 2, selected: true },
  { sn: 3, code: "TSX 121", title: "Build Your Own Bitcoin...", session: "2025", credit: 1, selected: true },
  { sn: 4, code: "TSX122", title: "Build Your Own Bitcoin...", session: "2025", credit: 2, selected: true },
  { sn: 5, code: "TSX 123", title: "Build Your Own Bitcoin...", session: "2025", credit: 2, selected: true },
];
const electiveCourses = [
  { sn: 1, code: "BCH 101", title: "Build Your Own Bitcoin...", session: "2025", credit: 2, selected: false },
  { sn: 2, code: "BIO 112", title: "Build Your Own Bitcoin...", session: "2025", credit: 2, selected: true },
];
const droppedCourses = [
  { sn: 1, code: "FIG 101", title: "Build Your Own Bitcoin...", session: "2025", credit: 2, selected: true },
  { sn: 2, code: "PRO 112", title: "Build Your Own Bitcoin...", session: "2025", credit: 2, selected: true },
];

export default function CourseSelection({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Link href="/student/course-registration" className="text-gray-500 hover:text-primary flex items-center gap-1 text-base font-medium">
            <div className="border border-[#DBE2E8] bg-white rounded-sm p-1">
              <FiArrowLeft className="text-lg" />
            </div>
            Go Back
          </Link>
        </div>
      <div className="bg-white rounded-xl border border-[#DBE1E8] mb-6">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">Core Courses</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
            <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">S/N</th>
                <th className="px-6 py-4 text-left">Course Code</th>
                <th className="px-6 py-4 text-left">Course Title</th>
                <th className="px-6 py-4 text-left">Session</th>
                <th className="px-6 py-4 text-left">Credit Unit</th>
                <th className="px-6 py-4 text-left">Select</th>
              </tr>
            </thead>
            <tbody>
              {coreCourses.map((row) => (
                <tr className="border-b border-[#DBE1E8]" key={row.sn}>
                  <td className="px-6 py-4">{row.sn}</td>
                  <td className="px-6 py-4">{row.code}</td>
                  <td className="px-6 py-4">{row.title}</td>
                  <td className="px-6 py-4">{row.session}</td>
                  <td className="px-6 py-4">{row.credit}</td>
                  <td className="px-6 py-4">
                    {row.selected ? (
                      <span className=" w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <span className="w-3 h-3 bg-primary rounded-full block"></span>
                      </span>
                    ) : (
                      <span className="inline-block w-6 h-6 rounded-full border-2 border-gray-300"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#DBE1E8] mb-6">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">Elective Courses</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">S/N</th>
                <th className="px-6 py-4 text-left">Course Code</th>
                <th className="px-6 py-4 text-left">Course Title</th>
                <th className="px-6 py-4 text-left">Session</th>
                <th className="px-6 py-4 text-left">Credit Unit</th>
                <th className="px-6 py-4 text-left">Select</th>
              </tr>
            </thead>
            <tbody>
              {electiveCourses.map((row) => (
                <tr className="border-b border-[#DBE1E8]" key={row.sn}>
                  <td className="px-6 py-4">{row.sn}</td>
                  <td className="px-6 py-4">{row.code}</td>
                  <td className="px-6 py-4">{row.title}</td>
                  <td className="px-6 py-4">{row.session}</td>
                  <td className="px-6 py-4">{row.credit}</td>
                  <td className="px-6 py-4">
                    {row.selected ? (
                      <span className=" w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <span className="w-3 h-3 bg-primary rounded-full block"></span>
                      </span>
                    ) : (
                      <span className="inline-block w-6 h-6 rounded-full border-2 border-gray-300"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#DBE1E8] mb-6">
        <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">Dropped/Carry Over Courses</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                <th className="px-6 py-4 text-left">S/N</th>
                <th className="px-6 py-4 text-left">Course Code</th>
                <th className="px-6 py-4 text-left">Course Title</th>
                <th className="px-6 py-4 text-left">Session</th>
                <th className="px-6 py-4 text-left">Credit Unit</th>
                <th className="px-6 py-4 text-left">Select</th>
              </tr>
            </thead>
            <tbody>
              {droppedCourses.map((row) => (
                <tr className="border-b border-[#DBE1E8]" key={row.sn}>
                  <td className="px-4 py-2">{row.sn}</td>
                  <td className="px-4 py-2">{row.code}</td>
                  <td className="px-6 py-4">{row.title}</td>
                  <td className="px-6 py-4">{row.session}</td>
                  <td className="px-6 py-4">{row.credit}</td>
                  <td className="px-6 py-4">
                    {row.selected ? (
                      <span className=" w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <span className="w-3 h-3 bg-primary rounded-full block"></span>
                      </span>
                    ) : (
                      <span className="inline-block w-6 h-6 rounded-full border-2 border-gray-300"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-gray-700 text-md space-y-1">
          <div>Minimum credit units: 10 &nbsp; &nbsp; No. of courses selected: 8</div>
          <div>Maximum credit units: 16 &nbsp; &nbsp; Total credit units selected: 15</div>
        </div>
        <Button variant="primary" className="px-12 py-4 text-lg" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
} 