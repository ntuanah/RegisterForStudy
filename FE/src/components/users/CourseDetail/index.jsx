import { useState } from "react";

const CourseDetail = () => {
  const [selectedTheory, setSelectedTheory] = useState(null);
  return (
    <div>
      <div className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            DANH SÁCH LỚP HỌC PHẦN ĐANG MỞ
          </span>
        </div>

        <div className="">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
                  Chọn
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  Loại
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                  Mã LHP
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  Lớp SH
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  SL tối thiếu
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  SL tối đa
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  Còn lại
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
                  GV
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
                  Lịch học
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="px-6 py-4">
                  <input
                    type="radio"
                    name="theory"
                    onChange={() => setSelectedTheory("1")}
                  />
                </td>
                <td className="px-6 py-4">Lý thuyết</td>
                <td className="px-6 py-4">252IT33301</td>
                <td className="px-6 py-4">TI3701</td>
                <td className="px-6 py-4 text-center">40</td>
                <td className="px-6 py-4 text-center">70</td>
                <td className="px-6 py-4 text-center text-red-600 font-bold">
                  6
                </td>
                <td className="px-6 py-4">Tân Văn Sơn</td>
                <td className="px-6 py-4">
                  Thứ Năm, 07g00 - 09g40, A706, 29/01/2026 - 28/05/2026
                </td>
              </tr>

              {selectedTheory === "1" && (
                <>
                  <tr className="bg-slate-50">
                    <td
                      colSpan="9"
                      className="px-6 py-2 font-semibold text-slate-600"
                    >
                      Lớp thực hành
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4">
                      <input type="radio" name="practice" />
                    </td>
                    <td className="px-6 py-4">Thực hành</td>
                    <td className="px-6 py-4">252IT33301P1</td>
                    <td className="px-6 py-4">TH3701</td>
                    <td className="px-6 py-4 text-center">20</td>
                    <td className="px-6 py-4 text-center">35</td>
                    <td className="px-6 py-4 text-center text-red-600 font-bold">
                      6
                    </td>
                    <td className="px-6 py-4">Nguyễn Văn A</td>
                    <td className="px-6 py-4">Thứ Sáu 07g00 - 09g40</td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4">
                      <input type="radio" name="practice" />
                    </td>
                    <td className="px-6 py-4">Thực hành</td>
                    <td className="px-6 py-4">252IT33301P2</td>
                    <td className="px-6 py-4">TH3702</td>
                    <td className="px-6 py-4 text-center">20</td>
                    <td className="px-6 py-4 text-center">35</td>
                    <td className="px-6 py-4 text-center text-red-600 font-bold">
                      4
                    </td>
                    <td className="px-6 py-4">Trần Văn B</td>
                    <td className="px-6 py-4">Thứ Bảy 07g00 - 09g40</td>
                  </tr>

                  <tr>
                    <td colSpan="9" className="py-4 bg-slate-50"></td>
                  </tr>
                </>
              )}

              <tr>
                <td className="px-6 py-4">
                  <input type="radio" name="theory" />
                </td>
                <td className="px-6 py-4">Lý thuyết</td>
                <td className="px-6 py-4">252IT33301</td>
                <td className="px-6 py-4">TI3701</td>
                <td className="px-6 py-4 text-center">20</td>
                <td className="px-6 py-4 text-center">35</td>
                <td className="px-6 py-4 text-center text-red-600 font-bold">
                  6
                </td>
                <td className="px-6 py-4">Tân Văn Sơn</td>
                <td className="px-6 py-4">
                  Thứ Năm, 07g00 - 09g40, A706, 29/01/2026 - 28/05/2026
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
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
            />
          </svg>
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
