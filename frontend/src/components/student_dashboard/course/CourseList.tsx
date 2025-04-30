import Image from "next/image";
import Button from "@/components/forms/Button";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const courses = [
  {
    title: "Build Your Own Bitcoin Transaction Processor",
    image: "/course.png",
    progress: 4,
    total: 20,
  },
  {
    title: "Build Your Own Bitcoin Transaction Processor",
    image: "/course.png",
    progress: 4,
    total: 20,
  },
  {
    title: "Course Title",
    image: "/course.png",
    progress: 24,
    total: 24,
  },
];

export default function CourseList() {
  return (
    <div className="bg-white rounded-xl border border-[#DBE1E8] w-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#DBE1E8] bg-[#F7F8F9] rounded-t-xl">
        <div className="font-semibold text-2xl text-gray-800">Recent Courses</div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 px-6 py-2 text-base font-medium border-[#DBE1E8]">
            <FiFilter className="text-lg" /> Filters
          </Button>
          <Button variant="primary" className="px-6 py-2 text-base font-medium flex gap-1 items-center">
            See All
            <FiChevronRight className="text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-[#DBE1E8]">
        {courses.map((course, idx) => (
          <div key={idx} className="flex items-center gap-6 px-6 py-8 bg-white rounded-xl">
            <div className="w-[136px] h-[100px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image src={course.image} alt={course.title} width={136} height={100} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-xl text-gray-800 mb-2">{course.title}</div>
              <div className="w-full h-2 bg-[#F1F1F1] rounded-full mb-1">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${(course.progress / course.total) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 mt-1">{course.progress}/{course.total} stages done</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 