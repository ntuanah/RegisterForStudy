import { useState } from "react";
import EditInformationUser from "../Modal/EditInformationUser";
import InformationUser from "../Modal/InformationUser";

const UserManagementTable = () => {
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
              Mã người dùng
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên người dùng
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Email
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Số điện thoại
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Trạng thái
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          <tr>
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">0987244992</td>
            <td className="px-6 py-4 flex text-green-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Hoạt động
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-4 text-[#5483B3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
                  onClick={() => setOpenModalEdit(true)}
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

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
                  onClick={() => setOpenModalInfo(true)}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11.95 12.05h.1m-.1 4h.1m-.1-8h.1M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                  />
                </svg>
              </div>
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">0987244992</td>
            <td className="px-6 py-4 flex text-slate-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Không hoạt động
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
                    d="M11.95 12.05h.1m-.1 4h.1m-.1-8h.1M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                  />
                </svg>
              </div>
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">0987244992</td>
            <td className="px-6 py-4 flex text-green-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Hoạt động
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
                    d="M11.95 12.05h.1m-.1 4h.1m-.1-8h.1M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                  />
                </svg>
              </div>
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">4</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">0987244992</td>
            <td className="px-6 py-4 flex text-green-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Hoạt động
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
                    d="M11.95 12.05h.1m-.1 4h.1m-.1-8h.1M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                  />
                </svg>
              </div>
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">5</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">0987244992</td>
            <td className="px-6 py-4 flex text-green-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Hoạt động
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
                    d="M11.95 12.05h.1m-.1 4h.1m-.1-8h.1M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                  />
                </svg>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {openModalEdit && (
        <EditInformationUser close={() => setOpenModalEdit(false)} />
      )}
      {openModalInfo && (
        <InformationUser close={() => setOpenModalInfo(false)} />
      )}
    </div>
  );
};

export default UserManagementTable;
