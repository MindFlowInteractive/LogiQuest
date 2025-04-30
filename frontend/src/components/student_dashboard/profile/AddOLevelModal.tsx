import React, { useState } from "react";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { FiX } from "react-icons/fi";

interface AddOLevelModalProps {
  open: boolean;
  onClose: () => void;
}

const subjects = [
  "Data Processing",
  "Christian Religious Knowledge",
  "Economics",
  "Geography",
  "Government",
  "Literature in English",
  "Civic Education",
  "English Language",
  "General Mathematics",
];
const grades = ["A", "B", "C", "D", "E", "F"];

export default function AddOLevelModal({ open, onClose }: AddOLevelModalProps) {
  const [tab, setTab] = useState("Upload Manually");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-lg cursor-pointer border border-[#DBE1E7] p-1 rounded-full"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-black mt-10">Add O-Level</h2>
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          {['Upload Manually', 'Upload Scanned Document'].map((t) => (
            <button
              key={t}
              className={`pb-2 px-2 text-base font-medium border-b-2 transition-colors ${
                tab === t ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'
              }`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === 'Upload Manually' ? (
          <form className="space-y-6">
            <Select label="Document Type" required>
              <option value="">Select Type</option>
              <option value="waec">WAEC</option>
              <option value="neco">NECO</option>
            </Select>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Select label="Subject" required className="flex-1">
                  <option value="">Select Subject</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
                <Select label="Grade" required className="flex-1">
                  <option value="">Select Grade</option>
                  {grades.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </Select>
              </div>
            ))}
            <div className="flex gap-4 mt-8">
              <Button variant="outline" type="button" className="flex-1 py-4 text-lg" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-1 py-4 text-lg">
                Add O-Level
              </Button>
            </div>
          </form>
        ) : (
          <form className="space-y-6">
            <Select label="Document Type" required>
              <option value="">Select Type</option>
              <option value="waec">WAEC</option>
              <option value="neco">NECO</option>
            </Select>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Document<span className="text-red-500">*</span>
              </label>
              <label className="block border-2 border-dashed border-primary/30 bg-primary/5 rounded-xl px-4 py-8 text-center cursor-pointer text-primary font-medium">
                + Choose File(s)
                <Input type="file" className="hidden" multiple />
              </label>
            </div>
            <div className="flex gap-4 mt-8">
              <Button variant="outline" type="button" className="flex-1 py-4 text-lg" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-1 py-4 text-lg">
                Add O-Level
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 