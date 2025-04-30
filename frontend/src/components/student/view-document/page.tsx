"use client"
import React, { useState } from "react";
import DocumentGrid from "@/components/student_dashboard/view_document/DocumentGrid";
import Button from "@/components/forms/Button";
import UploadDocumentModal from "@/components/student_dashboard/view_document/UploadDocumentModal";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import Link from "next/link";

export default function ViewDocumentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="">
      <UploadDocumentModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link href="/student/dashboard" className="text-gray-500 hover:text-primary flex items-center gap-1 text-base font-medium">
            <div className="border border-[#DBE2E8] bg-white rounded-sm p-1">
              <FiArrowLeft className="text-lg" />
            </div>
            Go Back
          </Link>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2 px-6 py-3 text-base font-medium"
          onClick={() => setModalOpen(true)}
        >
          <FiUpload className="text-lg" /> Upload Document
        </Button>
      </div>
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">View Documents</h1>
        <div className="text-gray-500 text-base">All uploaded documents will appear here</div>
      </div>
      <DocumentGrid />
    </div>
  );
} 