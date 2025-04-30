import Input from "@/components/forms/Input";
import Button from "@/components/forms/Button";

export default function ChangePasswordForm() {
  return (
    <div className="bg-white rounded-xl border border-[#DBE1E8] p-8">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <form className="max-w-xl mx-auto space-y-6">
        <Input label="Current Password" type="password" placeholder="Current Password" />
        <Input label="New Password" type="password" placeholder="New Password" />
        <Input label="Confirm New Password" type="password" placeholder="Confirm New Password" />
        <div className="flex gap-4 pt-4">
          <Button variant="outline" className="flex-1">Cancel Changes</Button>
          <Button variant="primary" className="flex-1">Save Changes</Button>
        </div>
      </form>
    </div>
  );
} 