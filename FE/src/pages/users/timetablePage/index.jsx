const TimetablePage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Thời khoá biểu
        </h2>
      </div>

      <div className="p-8">
        <div className="flex gap-5">
          <div className="w-48">
            <select
              name=""
              id=""
              className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option>Học kỳ 1</option>
              <option>Học kỳ 2</option>
            </select>
          </div>

          <div className="w-48">
            <select
              name=""
              id=""
              className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option>2022-2023</option>
              <option>2023-2024</option>
              <option>2024-2025</option>
              <option>2025-2026</option>
            </select>
          </div>

          <div className="flex items-center gap-5 px-5 py-2 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"
              />
            </svg>
            <span>09/03/2026 - 15/03/2026</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z"
              />
            </svg>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <td className="border-e px-6 py-2 text-[10px] font-bold text-slate-400">
                  Tiết
                </td>
                <td className="border-e px-6 py-2 text-[10px] font-bold text-slate-400">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 2</h2> <p>09/03/2026</p>
                  </div>
                </td>
                <td className="border-e px-6 py-2 text-[10px] font-bold text-slate-400">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 3</h2> <p>10/03/2026</p>
                  </div>
                </td>
                <td className="border-e px-6 py-2 text-[10px] font-bold text-slate-400">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 4</h2> <p>11/03/2026</p>
                  </div>
                </td>
                <td className="border-e px-6 py-2 text-[10px] font-bold text-slate-400">
                      <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 5</h2> <p>12/03/2026</p>
                  </div>
                </td>
                <td className="border-e px-6 py-2 text-[10px] font-bold text-slate-400">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 6</h2> <p>13/03/2026</p>
                  </div>
                </td>
                <td className="border-e px-6 py-2 text-[10px] font-bold text-slate-400">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Thứ 7</h2> <p>14/03/2026</p>
                  </div>
                </td>
                <td className="px-6 py-2 text-[10px] font-bold text-slate-400">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Chủ nhật</h2> <p>15/03/2026</p>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="border-e px-6 py-4 ">1</td>
                <td className="border-e px-6 py-4 text-center" rowspan={2}>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-gray-700">B608</p>
                    <p className="text-red-600 font-semibold">
                      Tiếng Anh trung cấp 2 (GE232)
                    </p>
                    <p>LHP: 252GE23205</p> <p>Số tiết: 2</p> <p>Tiết: 1-2</p>
                    <p>Giờ bắt đầu: 07g00</p>
                    <p className="text-blue-600">GV: Nguyễn Thị Thúy</p>
                  </div>
                </td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">2</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">3</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">4</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">5</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">6</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">7</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">8</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">9</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">10</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">11</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
              <tr>
                <td className="border-e px-6 py-4 ">12</td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="border-e px-6 py-4 text-center"></td>
                <td className="px-6 py-4 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
