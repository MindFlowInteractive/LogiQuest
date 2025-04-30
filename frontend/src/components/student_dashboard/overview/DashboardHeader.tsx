import Button from "@/components/forms/Button";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <div className="text-xs text-gray-500 mb-1">Welcome Back</div>
        <div className="font-bold text-lg text-gray-800">
          Muhammed Balarebe Okechukwu
        </div>
      </div>
      <div className="flex gap-2">
        <Link href={"/student/view-document"}>
          <Button variant="outline">View Documents</Button>
        </Link>
        <Button variant="primary">Print Admission Letter</Button>
      </div>
    </div>
  );
}
