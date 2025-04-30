import React from "react";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { FiX } from "react-icons/fi";

interface UploadDocumentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UploadDocumentModal({ open, onClose }: UploadDocumentModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative animate-fade-in">
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-lg cursor-pointer border border-[#DBE1E7] p-1 rounded-full"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-black mt-10">Upload Document</h2>
        <form className="space-y-6">
          <div>
            <Select label="Document Type" required>
              <option value="">Select Type</option>
              <option value="birth">Birth Certificate</option>
              <option value="passport">Passport</option>
            </Select>
          </div>
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
              Save Document
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 