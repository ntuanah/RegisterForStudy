const PayTuition = () => {
  return (
    <div>
      <div className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            Học phí
          </span>
        </div>

        <div className="">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
                  STT
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                  Mã học phần
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
                  Tên học phần
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  Số tín chỉ
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                  Học phí
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">AD205</td>
                <td className="px-6 py-4">Ẩm thực Việt Nam</td>
                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4 text-center">2.700.000</td>
              </tr>

              <tr>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">AD205</td>
                <td className="px-6 py-4">Ẩm thực Việt Nam</td>
                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4 text-center">2.700.000</td>
              </tr>

              <tr className="bg-slate-50">
                <td 
                  colSpan={4} 
                  className="px-6 py-3 text-right font-bold text-slate-700 text-sm"
                >
                  Tổng học phí
                </td>
                <td className="px-6 py-3 text-center font-bold text-[#5483B3] text-base">
                  5.400.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M13.5 13a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zM2 6.75A2.75 2.75 0 0 1 4.75 4h10.5A2.75 2.75 0 0 1 18 6.75v6.5A2.75 2.75 0 0 1 15.25 16H4.75A2.75 2.75 0 0 1 2 13.25zM4.75 5A1.75 1.75 0 0 0 3 6.75V8h14V6.75A1.75 1.75 0 0 0 15.25 5zM17 9H3v4.25c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 17 13.25z"
            />
          </svg>
          Thanh toán học phí
        </button>
      </div>
    </div>
  );
};

export default PayTuition;
