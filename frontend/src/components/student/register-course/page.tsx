"use client";
import { useState } from "react";
import CourseSelection from "@/components/student_dashboard/course_registration/CourseSelection";
import ConfirmSelectionModal from "@/components/student_dashboard/course_registration/ConfirmSelectionModal";
import SuccessModal from "@/components/student_dashboard/course_registration/SuccessModal";

export default function RegisterCoursePage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <>
      <CourseSelection onContinue={() => setConfirmOpen(true)} />
      <ConfirmSelectionModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          setSuccessOpen(true);
        }}
      />
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
} 