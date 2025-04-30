import DashboardHeader from "@/components/student_dashboard/overview/DashboardHeader";
import CourseList from "@/components/student_dashboard/course/CourseList";

export default function StudentCoursePage() {
  return (
    <div>
      <DashboardHeader />
      <CourseList />
    </div>
  );
}
