import { useState } from "react";
import CourseDetail from "../CourseDetail";

const CourseList = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            NHOM-GDTC
          </span>
        </div>

        <div className="p-0">
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
                  STC
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  Số lượng LHP
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">PG102</td>
                <td className="px-6 py-4">GDTC: Bóng chuyền cơ bản</td>
                <td className="px-6 py-4 text-center">1</td>
                <td className="px-6 py-4 text-center">4</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setOpen(open === 1 ? null : 1)}
                    className="text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
                  >
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
                </td>
              </tr>

              {open === 1 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 bg-gray-50">
                    <CourseDetail />
                  </td>
                </tr>
              )}

              <tr>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">PG102</td>
                <td className="px-6 py-4">GDTC: Bóng chuyền cơ bản</td>
                <td className="px-6 py-4 text-center">1</td>
                <td className="px-6 py-4 text-center">4</td>
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
                        strokeWidth="1.5"
                        d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
                      />
                    </svg>
                    Đăng ký
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4">PG102</td>
                <td className="px-6 py-4">GDTC: Bóng chuyền cơ bản</td>
                <td className="px-6 py-4 text-center">1</td>
                <td className="px-6 py-4 text-center">4</td>
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
                        strokeWidth="1.5"
                        d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
                      />
                    </svg>
                    Đăng ký
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4">4</td>
                <td className="px-6 py-4">PG102</td>
                <td className="px-6 py-4">GDTC: Bóng chuyền cơ bản</td>
                <td className="px-6 py-4 text-center">1</td>
                <td className="px-6 py-4 text-center">4</td>
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
                        strokeWidth="1.5"
                        d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
                      />
                    </svg>
                    Đăng ký
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">PG102</td>
                <td className="px-6 py-4">GDTC: Bóng chuyền cơ bản</td>
                <td className="px-6 py-4 text-center">1</td>
                <td className="px-6 py-4 text-center">4</td>
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
                        strokeWidth="1.5"
                        d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
                      />
                    </svg>
                    Đăng ký
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
