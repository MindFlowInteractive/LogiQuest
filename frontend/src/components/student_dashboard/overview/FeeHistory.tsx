export default function FeeHistory() {
  return (
    <div className="bg-white rounded-xl border border-[#DBE1E8] w-full">
      <div className="flex bg-[#F7F8F9] py-3 px-6 rounded-t-xl border-b border-[#DBE1E8]">
        <div className="font-semibold text-lg text-gray-800">Fee History</div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 p-6">
        <div className="flex-1 space-y-1 border border-[#DBE1E8] rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-800">₦ 925,000.00</div>
          <div className="text-gray-500 text-xs">Total Amount To Be Paid</div>
        </div>
        <div className="flex-1 space-y-1 border border-[#DBE1E8] rounded-xl p-4">
          <div className="text-2xl font-bold text-green-500">₦ 462,500.00</div>
          <div className="text-gray-500 text-xs">Total Amount Paid</div>
        </div>
        <div className="flex-1 space-y-1 border border-[#DBE1E8] rounded-xl p-4">
          <div className="text-2xl font-bold text-red-500">₦ 462,500.00</div>
          <div className="text-gray-500 text-xs">Balance Due</div>
        </div>
      </div>
      <div className="">
        <div className="flex bg-[#F7F8F9] px-3 py-2 text-black text-sm font-semibold">
          <div className="flex-1 px-4 py-2">Date</div>
          <div className="flex-1 px-4 py-2">Amount</div>
          <div className="flex-1 px-4 py-2">Balance</div>
          <div className="flex-1 px-4 py-2">Payment Method</div>
        </div>
        <div className="flex text-sm px-3 py-2 text-[#666666]">
          <div className="flex-1 px-4 py-2">09/04/25; 19:54</div>
          <div className="flex-1 px-4 py-2">₦ 462,500.00</div>
          <div className="flex-1 px-4 py-2">₦ 462,500.00</div>
          <div className="flex-1 px-4 py-2">Bank Transfer</div>
        </div>
      </div>
    </div>
  );
}
