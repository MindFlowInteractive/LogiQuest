import React from "react";

const tabs = [
  "Biodata",
  "O-Level",
  "Upload Picture",
  "Upload Signature",
  "Change Password",
];

export default function ProfileTabs({ active, onChange }: { active: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex gap-6 border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-2 px-2 text-base font-medium border-b-2 transition-colors cursor-pointer ${
            active === tab
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-primary"
          }`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
} 