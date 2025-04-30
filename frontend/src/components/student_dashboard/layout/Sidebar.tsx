"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import {
  PiGridFourLight,
  PiBook,
  PiBookOpenLight,
  PiCoinsLight,
  PiBellLight,
  PiUserCircleLight,
  PiExamLight,
} from "react-icons/pi";

const navItems = [
  { label: "Overview", icon: <PiGridFourLight />, url: "/student/dashboard" },
  { label: "Courses", icon: <PiBook />, url: "/student/course" },
  { label: "Course Registration", icon: <PiBookOpenLight />, url: "/student/course-registration" },
  { label: "Fee", icon: <PiCoinsLight />, url: "/student/fee" },
  { label: "Notifications", icon: <PiBellLight />, url: "/student/notification" },
  { label: "Profile", icon: <PiUserCircleLight />, url: "/student/profile" },
  { label: "Exam Results", icon: <PiExamLight />, url: "/student/exam-results" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 h-screen w-64 flex flex-col border-r bg-white border-gray-100 overflow-y-auto">
      <div className="h-20 flex items-center border-b border-gray-100 px-4">
        <span className="font-bold text-xl text-black">LMS LOGO</span>
      </div>
      <nav className="flex-1 py-6 px-4 flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={item.label}
              href={item.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-[#666666] hover:bg-primary/10 hover:text-primary ${
                isActive ? "bg-primary/10 text-primary border-r-4 border-primary" : ""
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-base">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4">
        <button className="flex items-center gap-2 text-red-500 hover:underline">
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </aside>
  );
}
