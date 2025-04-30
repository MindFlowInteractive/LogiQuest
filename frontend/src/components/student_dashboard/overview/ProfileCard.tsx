

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl border border-[#DBE1E8] p-4 flex flex-col items-center w-full max-w-xs">
      <div className="rounded-lg overflow-hidden mb-4">
        <img
          src="/profile-pix.png"
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Name:</div>
          <div className="font-semibold text-sm text-black">Muhammed B. Okechukwu</div>
        </div>
        <hr className="text-[#DBE1E8]" />
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Email:</div>
          <div className="font-semibold text-sm text-black">muhammed@gmail.com</div>
        </div>
        <hr className="text-[#DBE1E8]" />
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Phone:</div>
          <div className="font-semibold text-sm text-black">09076586754</div>
        </div>
        <hr className="text-[#DBE1E8]" />
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">State:</div>
          <div className="font-semibold text-sm text-black">Osun State</div>
        </div>
        <hr className="text-[#DBE1E8]" />
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Gender:</div>
          <div className="font-semibold text-sm text-black">Male</div>
        </div>
      </div>
    </div>
  );
} 