import Input from "@/components/forms/Input";
import Button from "@/components/forms/Button";
import Image from "next/image";

export default function BiodataForm() {
  return (
    <div className="bg-white rounded-xl border border-[#DBE1E8] p-8">
      <h2 className="text-2xl font-bold mb-6">Biodata</h2>
      <div className="flex items-center gap-6 mb-8">
        <Image src="/profile-pix.png" alt="Profile" width={64} height={64} className="rounded-full object-cover" />
      </div>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input label="Surname" value="Muhammed" readOnly />
        <Input label="First Name" value="Balarebe" readOnly />
        <Input label="Other Names" value="Okechukwu" readOnly />
        <Input label="Faculty" value="Social Sciences" readOnly />
        <Input label="Department" value="Political Science" readOnly />
        <Input label="Programme" value="B.Sc International Studies" readOnly />
        <Input label="Nationality" value="Nigerian" readOnly />
        <Input label="State" value="Osun" readOnly />
        <Input label="LGA" value="Boluwaduro" readOnly />
        <Input label="Email" value="muhammedokechukwu@gmail.com" readOnly />
        <Input label="Phone No" value="09087654324" readOnly />
        <Input label="School Email" value="muhammedmlsname@gmail.com" readOnly />
        <Input label="Gender" value="Male" readOnly />
        <Input label="DOB" value="2003-02-23" readOnly />
        <Input label="Marital Status" value="Single" readOnly />
        <Input label="Contact Address" value="No. 5 Sadauki Street" readOnly className="md:col-span-2" />
        <Input label="Home Address" value="No. 5 Sadauki Street" readOnly className="md:col-span-2" />
        <Input label="Next of Kin" value="Hauwa Balarebe Okechukwu" readOnly />
        <Input label="Next of Kin Phone No." value="09123456543" readOnly />
        <Input label="Relationship with Next if Kin" value="Sister" readOnly />
        <Input label="Next of Kin Email" value="HauwaBalerebe@gmail.com" readOnly />
        <Input label="Next of Kin Contact Address" value="No. 5 Sadauki Street" readOnly />
        <div className="md:col-span-3 flex justify-end mt-6">
          <Button variant="primary">Save Changes</Button>
        </div>
      </form>
    </div>
  );
} 