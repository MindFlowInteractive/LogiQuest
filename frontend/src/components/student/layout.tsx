import Sidebar from "@/components/student_dashboard/layout/Sidebar";
import StudentNavbar from "@/components/student_dashboard/layout/StudentNavbar";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <StudentNavbar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
} 