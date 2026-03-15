const OpenSubjectTable = () => {
  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
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
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 text-center">
              Số lượng lớp học phần
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 text-center">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          <tr>
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">AD205</td>
            <td className="px-6 py-4">Ẩm thực Việt Nam</td>
            <td className="px-6 py-4 text-center">5</td>
            <td className="px-6 py-4">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
                >
                  <path
                    fill="red"
                    d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                  />
                </svg>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OpenSubjectTable;
