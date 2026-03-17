import { useState } from "react";
import EditSubject from "../Modal/EditSubject";

const SubjectTable = () => {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-15">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              Mã môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              STC
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              Hệ số
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Điều kiện tiên quyết
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          <tr>
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">AD205</td>
            <td className="px-6 py-4">Ẩm thực Việt Nam</td>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">1.8</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-4 text-[#5483B3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
                  onClick={() => setOpenEdit(true)}
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

          <tr>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">AD205</td>
            <td className="px-6 py-4">Ẩm thực Việt Nam</td>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">1.8</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-4 text-[#5483B3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
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

          <tr>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">AD205</td>
            <td className="px-6 py-4">Ẩm thực Việt Nam</td>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">1.8</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-4 text-[#5483B3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
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

          <tr>
            <td className="px-6 py-4">4</td>
            <td className="px-6 py-4">AD205</td>
            <td className="px-6 py-4">Ẩm thực Việt Nam</td>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">1.8</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-4 text-[#5483B3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
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

          <tr>
            <td className="px-6 py-4">5</td>
            <td className="px-6 py-4">AD205</td>
            <td className="px-6 py-4">Ẩm thực Việt Nam</td>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">1.8</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
                <span className="text-white font-medium border border-[#0A4174] rounded-full px-3 py-1 bg-[#5483B3]">
                  AD233
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-4 text-[#5483B3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
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

      {openEdit && <EditSubject close={() => setOpenEdit(false)} />}
    </div>
  );
};

export default SubjectTable;
