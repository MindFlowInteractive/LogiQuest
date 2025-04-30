import Button from "@/components/forms/Button";
import { FiX } from "react-icons/fi";

const selectedCourses = [
  {
    sn: 1,
    code: "BCH 101",
    title: "Build Your Own Bitcoin...",
    session: "2025",
    credit: 2,
  },
  {
    sn: 2,
    code: "BIO 112",
    title: "Build Your Own Bitcoin...",
    session: "2025",
    credit: 2,
  },
  {
    sn: 3,
    code: "TSX 121",
    title: "Build Your Own Bitcoin...",
    session: "2025",
    credit: 1,
  },
  {
    sn: 4,
    code: "TSX122",
    title: "Build Your Own Bitcoin...",
    session: "2025",
    credit: 2,
  },
  {
    sn: 5,
    code: "TSX 123",
    title: "Build Your Own Bitcoin...",
    session: "2025",
    credit: 2,
  },
  {
    sn: 6,
    code: "TSX 123",
    title: "Build Your Own Bitcoin...",
    session: "2025",
    credit: 2,
  },
];

export default function ConfirmSelectionModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-4 relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-lg cursor-pointer border border-[#DBE1E7] p-1 rounded-full"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <div className="bg-white rounded-xl border border-[#DBE1E8]">
          <div className="font-semibold text-lg bg-[#F7F8F9] px-6 py-4 rounded-t-xl border-b border-[#DBE1E8]">
            Confirm Selection
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#F7F8F9] text-gray-700 border-b border-[#DBE1E8]">
                  <th className="px-6 py-4 text-left">S/N</th>
                  <th className="px-6 py-4 text-left">Course Code</th>
                  <th className="px-6 py-4 text-left">Course Title</th>
                  <th className="px-6 py-4 text-left">Session</th>
                  <th className="px-6 py-4 text-left">Credit Unit</th>
                  <th className="px-6 py-4 text-left">Select</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses.map((row) => (
                  <tr className="border-b border-[#DBE1E8]" key={row.sn}>
                    <td className="px-6 py-4">{row.sn}</td>
                    <td className="px-6 py-4">{row.code}</td>
                    <td className="px-6 py-4">{row.title}</td>
                    <td className="px-6 py-4">{row.session}</td>
                    <td className="px-6 py-4">{row.credit}</td>
                    <td className="px-6 py-4">
                      <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <span className="w-3 h-3 bg-primary rounded-full block"></span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4">
            <div className="text-gray-700 text-sm space-y-1">
              <div>
                Minimum credit units: 10 &nbsp; &nbsp; No. of courses selected:
                10
              </div>
              <div>
                Maximum credit units: 14 &nbsp; &nbsp; Total credit units
                selected: 14
              </div>
            </div>
          </div>
        </div>

        <div className="text-gray-500 text-sm my-6">
          Note: You cannot undo this action
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 py-4 text-lg"
            onClick={onClose}
          >
            Edit
          </Button>
          <Button
            variant="primary"
            className="flex-1 py-4 text-lg"
            onClick={onConfirm}
          >
            Confirm Selection
          </Button>
        </div>
      </div>
    </div>
  );
}
