import Image from "next/image";

const documents = [
  { title: "Birth Certificate", image: "/certificate.png" },
  { title: "Birth Certificate", image: "/certificate2.png" },
  { title: "Birth Certificate", image: "/certificate3.png" },
  { title: "Birth Certificate", image: "/certificate.png" },
  { title: "Birth Certificate", image: "/certificate.png" },
  { title: "Birth Certificate", image: "/certificate.png" },
  { title: "Birth Certificate", image: "/certificate.png" },
  { title: "Birth Certificate", image: "/certificate.png" },
];

export default function DocumentGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
      {documents.map((doc, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-[#DBE2E8] p-3 flex flex-col">
          <div className="w-full h-[297px] rounded-lg overflow-hidden mb-2 bg-gray-100 flex items-center justify-center">
            <Image src={doc.image} alt={doc.title} width={200} height={160} className="object-contain w-full h-full" />
          </div>
          <div className="text-base font-medium text-gray-700 scroll-py-2">{doc.title}</div>
        </div>
      ))}
    </div>
  );
} 