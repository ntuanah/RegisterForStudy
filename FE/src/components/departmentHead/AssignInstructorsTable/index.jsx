const AssignInstructorsTable = () => {
  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-40">
              Mã lớp
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Loại lớp
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Phòng học
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Lịch học
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Giảng viên phụ trách
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          <tr>
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">AD20501</td>
            <td className="px-6 py-4">Lý thuyết</td>
            <td className="px-6 py-4">A506</td>
            <td className="px-6 py-4">Thứ 2 (3-4)</td>
            <td className="px-6 py-4">
              <div className="flex-1 flex items-center border border-[#0A4174] rounded-full px-3 py-3 hover:bg-blue-50 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.398 0-4.064-1.666Q3.808 11.898 3.808 9.5t1.666-4.064t4.064-1.667t4.065 1.667T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm giảng viên"
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">AD2050101</td>
            <td className="px-6 py-4">Thực hành</td>
            <td className="px-6 py-4">A902</td>
            <td className="px-6 py-4">Thứ 7 (1-3)</td>
            <td className="px-6 py-4">
              <div className="flex-1 flex items-center border border-[#0A4174] rounded-full px-3 py-3 hover:bg-blue-50 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.398 0-4.064-1.666Q3.808 11.898 3.808 9.5t1.666-4.064t4.064-1.667t4.065 1.667T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm giảng viên"
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AssignInstructorsTable;
