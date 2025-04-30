"use client"
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { PiBellLight } from "react-icons/pi";
import { FiUser, FiAward, FiSettings, FiLogOut } from "react-icons/fi";

const user = {
  name: "Abraham Janet",
  email: "abraham@gmail.com",
  initial: "A",
};

export default function StudentNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node) &&
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 w-full h-20 bg-white flex items-center justify-between px-8 border-b border-gray-100 z-20">
      <div className="text-2xl font-semibold text-gray-900">Dashboard</div>
      <div className="flex items-center gap-6 relative">
        <button
          ref={notifRef}
          className="relative p-3 rounded-full border border-gray-100 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setNotifOpen((v) => !v);
            setProfileOpen(false);
          }}
        >
          <PiBellLight className="text-xl text-gray-500" />
        </button>
        {notifOpen && (
          <div className="absolute right-20 top-16 w-[400px] bg-white rounded-2xl shadow-xl border border-[#DBE1E8] z-30 animate-fade-in">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-2">
                <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#F3F4F6"/><rect x="14" y="20" width="20" height="8" rx="2" fill="#D1D5DB"/><rect x="18" y="28" width="12" height="2" rx="1" fill="#E5E7EB"/></svg>
              </div>
              <div className="text-gray-500 text-center">Your notifications will appear here.</div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 bg-[#F7F8F9] rounded-b-2xl">
              <button className="text-primary font-medium hover:underline cursor-pointer">View all notifications</button>
              <button className="text-gray-500 font-medium hover:underline cursor-pointer">Mark all as read</button>
            </div>
          </div>
        )}

        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              {user.initial}
            </div>
            <FaChevronDown className="text-gray-500" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-xl border border-[#DBE1E8] z-30 animate-fade-in">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold text-2xl relative">
                  {user.initial}
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <div className="font-semibold text-lg text-black">{user.name}</div>
                  <div className="text-gray-500 text-base">{user.email}</div>
                </div>
              </div>
              <div className="flex flex-col py-2">
                <button className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 text-base">
                  <FiUser className="text-lg" /> View profile
                </button>
                <button className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 text-base">
                  <FiAward className="text-lg" /> Badges
                </button>
                <button className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 text-base">
                  <FiSettings className="text-lg" /> Settings
                </button>
              </div>
              <div className="border-t border-gray-100">
                <button className="flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-gray-50 text-base w-full">
                  <FiLogOut className="text-lg" /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 