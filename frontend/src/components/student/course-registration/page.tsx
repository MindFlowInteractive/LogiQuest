"use client";
import { useRouter } from "next/navigation";
import SemesterRegistration from "@/components/student_dashboard/course_registration/SemesterRegistration";

export default function CourseRegistrationPage() {
  const router = useRouter();
  return (
    <div className="">
      <SemesterRegistration onRegister={() => router.push("/student/register-course")} />
    </div>
  );
} 