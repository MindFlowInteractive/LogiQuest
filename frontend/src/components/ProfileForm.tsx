import React, { useState, useRef } from "react";

interface ProfileFormProps {
	initialData?: {
		fullName?: string;
		username?: string;
		email?: string;
		phoneNumber?: string;
		countryResidence?: string;
		stateResidence?: string;
	};
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialData = {} }) => {
	const [formData, setFormData] = useState({
		fullName: initialData.fullName || "Abdulsalam Jabril",
		username: initialData.username || "AJ",
		email: initialData.email || "abdulsalamjabril@gmail.com",
		phoneNumber: initialData.phoneNumber || "0802 143 4566",
		countryResidence: initialData.countryResidence || "Nigeria",
		stateResidence: initialData.stateResidence || "Kaduna",
	});

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleEditClick = () => {
		// Implement edit logic or form submission
		console.log("Form Data:", formData);
	};

	return (
		<div className="bg-black min-h-screen flex items-center justify-center p-4">
			<div className="bg-[#1E1E1E] rounded-lg w-full max-w-xl p-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
				{/* Profile Picture Section */}
				<div className="flex flex-col items-center justify-start w-full md:w-1/3">
					<div className="text-white text-2xl mb-6 self-start hidden md:block">
						Setting
					</div>

					<div className="flex flex-col items-center">
						<div className="w-32 h-32 bg-white rounded-full mb-4 relative">
							{profileImage ? (
								<img
									src={profileImage}
									alt="Profile"
									className="w-full h-full rounded-full object-cover"
								/>
							) : null}
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleImageUpload}
								accept=".png,.jpg,.jpeg"
								className="hidden"
							/>
							<button
								onClick={() => fileInputRef.current?.click()}
								className="absolute bottom-0 right-0 bg-yellow-500 text-black hover:bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center"
							>
								+
							</button>
						</div>
						<div className="text-xs text-gray-400 text-center">
							must be a .png, .jpg smaller than 5mb
						</div>
					</div>
				</div>

				{/* Form Section */}
				<div className="flex flex-col w-full md:w-2/3">
					<div className="text-white text-2xl mb-6 block md:hidden">
						Setting
					</div>

					<div className="space-y-4">
						{[
							{ label: "Display Fullname", name: "fullName" },
							{ label: "Username", name: "username" },
							{ label: "Email", name: "email", type: "email" },
							{ label: "Phone Number", name: "phoneNumber" },
							{
								label: "Country Residence",
								name: "countryResidence",
							},
							{
								label: "State Residence",
								name: "stateResidence",
							},
						].map(({ label, name, type = "text" }) => (
							<div key={name}>
								<input
									type={type}
									name={name}
									value={
										formData[name as keyof typeof formData]
									}
									onChange={handleInputChange}
									placeholder={label}
									className="w-full bg-[#2B2B2B] text-white px-4 py-2 rounded-md border border-transparent focus:border-[#00B2FF] focus:outline-none"
								/>
							</div>
						))}
					</div>

					<button
						onClick={handleEditClick}
						className="w-full mt-6 bg-[#353536] text-yellow-400 py-2 rounded-md transition-colors"
					>
						Edit
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfileForm;
