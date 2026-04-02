import { useState } from "react";
import EditMajor from "../Modal/EditMajor";

const MajorTable = () => {
  const [openEditMajor, setOpenEditMajor] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-5">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-25">
              Mã ngành
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên ngành
            </th>

            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          <tr>
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">CNTT</td>
            <td className="px-6 py-4">Công nghệ thông tin</td>
            <td className="px-6 py-4">
              <div className="flex gap-4 text-[#5483B3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
                  onClick={() => setOpenEditMajor(true)}
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

      {openEditMajor && (
        <EditMajor close={() => setOpenEditMajor(false)} />
      )}
    </div>
  );
};

export default MajorTable;
