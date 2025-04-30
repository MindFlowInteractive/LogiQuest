"use client"
import { useState } from "react";
import ExamResultsOverview from "@/components/student_dashboard/exam_results/ExamResultsOverview";
import ExamResultDetails from "@/components/student_dashboard/exam_results/ExamResultDetails";

export default function ExamResultsPage() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="">
      {!showDetails ? (
        <ExamResultsOverview onViewResult={() => setShowDetails(true)} />
      ) : (
        <ExamResultDetails onBack={() => setShowDetails(false)} />
      )}
    </div>
  );
} 