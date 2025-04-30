import { FiX } from "react-icons/fi";

export default function FeeSuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-fade-in flex flex-col items-center justify-center">
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-lg cursor-pointer border border-[#DBE1E7] p-1 rounded-full"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-6">
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none"><circle cx="48" cy="48" r="48" fill="#4CAF50"/><path d="M68 38L44.5 61.5L32 49" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="text-2xl font-bold text-center mb-2">Payment Successful!!!</div>
          <div className="text-gray-500 text-center text-lg">Your payment has been processed<br />successfully.</div>
        </div>
      </div>
    </div>
  );
} 