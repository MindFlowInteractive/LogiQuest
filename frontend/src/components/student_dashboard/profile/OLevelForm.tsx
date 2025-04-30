import React, { useState } from "react";
import Button from "@/components/forms/Button";
import AddOLevelModal from "@/components/student_dashboard/profile/AddOLevelModal";

const olevelData = {
  examType: "West Africa Examination Council",
  examYear: "2022",
  centreNumber: "41919915675014",
  centreName: "First Baptist High School, Sabon Gari, Zaria",
  examNumber: "41919915675014",
  subjects: [
    { subject: "Data Processing", grade: "A" },
    { subject: "Christian Religious Knowledge", grade: "A" },
    { subject: "Economics", grade: "A" },
    { subject: "Geography", grade: "A" },
    { subject: "Government", grade: "A" },
    { subject: "Literature in English", grade: "A" },
    { subject: "Civic Education", grade: "A" },
    { subject: "English Language", grade: "A" },
    { subject: "General Mathematics", grade: "A" },
  ],
};

export default function OLevelForm() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-[#DBE1E8] p-8">
      <AddOLevelModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <h2 className="text-2xl font-bold mb-6">O-Level</h2>
      <div className="flex justify-end mb-4">
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Add O-Level
        </Button>
      </div>
      <div className="bg-white rounded-xl border border-[#DBE1E8] p-6">
        <div className="flex flex-col md:gap-8 mb-4">
          <div className="flex-1 mb-2 md:mb-0">
            <div className="font-medium text-gray-700">Exam Type</div>
            <div className="text-gray-900 font-semibold">
              {olevelData.examType}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-700">Exam Year</div>
            <div className="text-gray-900 font-semibold">
              {olevelData.examYear}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-700">Centre Number</div>
            <div className="text-gray-900 font-semibold">
              {olevelData.centreNumber}
            </div>
          </div>
        </div>
        <div className="flex flex-col  md:gap-8 mb-4">
          <div className="flex-1 mb-2 md:mb-0">
            <div className="font-medium text-gray-700">Centre Name</div>
            <div className="text-gray-900 font-semibold">
              {olevelData.centreName}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-700">Exam Number</div>
            <div className="text-gray-900 font-semibold">
              {olevelData.examNumber}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex border-b border-gray-200 bg-[#F5F5F5] py-3 px-4 mb-2 text-gray-700">
            <div className="flex-1">SUBJECT</div>
            <div className="w-32 text-right">GRADE</div>
          </div>
          <div className="flex flex-col gap-6">
            {olevelData.subjects.map((row, idx) => (
              <div
                key={idx}
                className="flex items-center py-2 border-b last:border-0 border-gray-100"
              >
                <div className="flex-1 text-gray-800">{row.subject}</div>
                <div className="w-32 text-right text-gray-800 font-semibold">
                  {row.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
