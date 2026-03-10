const RegisterResult = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">
        Kết quả đăng ký học: 2 học phần, 6 tín chỉ
      </h3>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-[10px] text-left border-collapse">
          <thead className="bg-blue-50 text-slate-400">
            <tr>
              <th className="px-6 py-2 font-bold">STT</th>
              <th className="px-6 py-2 font-bold">Loại</th>
              <th className="px-6 py-2 font-bold">Mã LHP</th>
              <th className="px-6 py-2 font-bold">Tên LHP</th>
              <th className="px-6 py-2 font-bold">STC</th>
              <th className="px-6 py-2 font-bold">GV</th>
              <th className="px-6 py-2 font-bold">Lịch học</th>
              <th className="px-6 py-2 font-bold">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            <tr>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">Lý thuyết</td>
              <td className="px-6 py-4">252AD20601</td>
              <td className="px-6 py-4">Ẩm thực Việt Nam</td>
              <td className="px-6 py-4 text-center">3</td>
              <td className="px-6 py-4">Nguyễn Nhiên Hương</td>
              <td className="px-6 py-4">Thứ Hai, 08g50 - 10g40, A506</td>
              <td className="px-6 py-4 text-right">
                <button className="text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                  Hủy
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterResult;
