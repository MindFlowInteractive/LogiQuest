"use client";
import { useState } from "react";
import FeeOverview from "@/components/student_dashboard/fee/FeeOverview";
import FeePaymentPanel from "@/components/student_dashboard/fee/FeePaymentPanel";
import FeeSuccessModal from "@/components/student_dashboard/fee/FeeSuccessModal";

export default function FeePage() {
  const [showPayment, setShowPayment] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="">
      {!showPayment ? (
        <FeeOverview
          onPay={() => setShowPayment(true)}
        />
      ) : (
        <FeePaymentPanel
          onBack={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            setShowSuccess(true);
          }}
        />
      )}
      <FeeSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
} 