import { FiBell } from "react-icons/fi";
import Button from "@/components/forms/Button";

const notifications = [
  {
    type: "Announcement",
    message: "Reminder: Mid-semester CA Test for Introduction to Psychology is scheduled for April 28th at 10:00 AM WAT.",
    action: "View Details",
  },
  {
    type: "Assignment Feedback",
    message: 'Your submission for "Essay 1" in Creative Writing has been graded.',
    action: "View Feedback",
  },
  {
    type: "Grades Available",
    message: "Continuous assessment scores for Calculus I are now available.",
    action: "View Scores",
  },
  {
    type: "Payment Successful",
    message: "Your payment of ₦ 200,000 for the Second Semester 2025 session tuition has been processed.",
    action: "View Receipt",
  },
];

export default function NotificationList() {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <button className="border border-[#DBE1E8] rounded-lg px-6 py-2 bg-white text-gray-700 font-medium hover:bg-gray-50">Mark all as read</button>
      </div>
      <div className="space-y-6">
        {notifications.map((n, idx) => (
          <div key={idx} className="flex items-center bg-white rounded-xl border border-[#DBE1E8] px-6 py-6 gap-6">
            <div className="flex-shrink-0">
              <div className="bg-[#F7F8F9] rounded-full w-12 h-12 flex items-center justify-center">
                <FiBell className="text-2xl text-[#A3AED0]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg mb-1">{n.type}</div>
              <div className="text-gray-600 text-base truncate whitespace-normal">{n.message}</div>
            </div>
            <div className="flex-shrink-0">
              <Button className="bg-[#4CB8EF] hover:bg-[#38a3d9] text-white  focus:outline-none">
                {n.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 