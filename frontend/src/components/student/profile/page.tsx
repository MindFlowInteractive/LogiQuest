"use client";
import React, { useState } from "react";
import ProfileTabs from "@/components/student_dashboard/profile/ProfileTabs";
import BiodataForm from "@/components/student_dashboard/profile/BiodataForm";
import OLevelForm from "@/components/student_dashboard/profile/OLevelForm";
import ChangePasswordForm from "@/components/student_dashboard/profile/ChangePasswordForm";

const tabComponents: Record<string, React.ReactNode> = {
  Biodata: <BiodataForm />,
  "O-Level": <OLevelForm />,
  "Upload Picture": <div className="bg-white rounded-xl border border-[#DBE1E8] p-8 text-center text-gray-500">Upload Picture Tab (To be implemented)</div>,
  "Upload Signature": <div className="bg-white rounded-xl border border-[#DBE1E8] p-8 text-center text-gray-500">Upload Signature Tab (To be implemented)</div>,
  "Change Password": <ChangePasswordForm />,
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Biodata");
  return (
    <div className=" mx-auto">
      <ProfileTabs active={activeTab} onChange={setActiveTab} />
      {tabComponents[activeTab]}
    </div>
  );
} 