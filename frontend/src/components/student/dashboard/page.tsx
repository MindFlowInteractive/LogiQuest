import DashboardHeader from "@/components/student_dashboard/overview/DashboardHeader";
import ProfileCard from "@/components/student_dashboard/overview/ProfileCard";
import FeeHistory from "@/components/student_dashboard/overview/FeeHistory";
import AcademicHistory from "@/components/student_dashboard/overview/AcademicHistory";

export default function StudentDashboard() {
  return (
    <>
      <DashboardHeader />
      <div className="flex flex-col lg:flex-row gap-6">
        <ProfileCard />
        <div className="flex-1 flex flex-col gap-2">
          <FeeHistory />
          <AcademicHistory />
        </div>
      </div>
    </>
  );
} 