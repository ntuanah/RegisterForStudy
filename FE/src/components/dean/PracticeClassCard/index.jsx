import { useState } from "react";
import SelectRoomTime from "../Modal/SelectRoomTime";

const PracticeClassCard = () => {
  const [openSelectRoomTime, setOpenSelectRoomTime] = useState(false);
  return (
    <div className="border border-[#0A4174] border-s-5 p-3 rounded-xl bg-gray-100">
      <div className="flex justify-between">
        <div className="flex gap-5">
          <div className="bg-blue-50 p-3 rounded-xl text-[#5483B3]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M222 128a6 6 0 0 1-6 6h-88a6 6 0 0 1 0-12h88a6 6 0 0 1 6 6m-94-58h88a6 6 0 0 0 0-12h-88a6 6 0 0 0 0 12m88 116h-88a6 6 0 0 0 0 12h88a6 6 0 0 0 0-12M83.76 43.76L56 71.51L44.24 59.76a6 6 0 0 0-8.48 8.48l16 16a6 6 0 0 0 8.48 0l32-32a6 6 0 0 0-8.48-8.48m0 64L56 135.51l-11.76-11.75a6 6 0 1 0-8.48 8.48l16 16a6 6 0 0 0 8.48 0l32-32a6 6 0 0 0-8.48-8.48m0 64L56 199.51l-11.76-11.75a6 6 0 0 0-8.48 8.48l16 16a6 6 0 0 0 8.48 0l32-32a6 6 0 0 0-8.48-8.48"
              />
            </svg>
          </div>

          <div>
            <h4 className="font-bold text-sm mt-1">Lớp thực hành #1</h4>
            <p className="text-xs text-slate-500">Mã lớp: AD2050101</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <p className="text-xs text-slate-500">Số lượng sinh viên</p>
          <input
            type="text"
            defaultValue="35"
            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
          />
        </div>
      </div>

      <div className="flex mt-3 justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">Phòng: A902, Thứ 7, Tiết 1-3</p>
        </div>
        <div className="flex gap-3 ">
          <button
            onClick={() => setOpenSelectRoomTime(true)}
            className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
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
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M12 2v3m-6.995 6.995h-3m2.926-7.063l2.12 2.122m12.022-2.129L16.95 7.047m-9.9 9.9l-2.12 2.12M11 11l10 4.4l-4.437 1.163L15.4 21z"
              />
            </svg>
            Chọn phòng, giờ học
          </button>

          <button className="h-fit text-white font-medium border border-red-500 rounded-full p-3 bg-white hover:bg-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              className="cursor-pointer"
            >
              <path
                fill="red"
                d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
              />
            </svg>
          </button>
        </div>
      </div>
      {openSelectRoomTime && (
        <SelectRoomTime close={() => setOpenSelectRoomTime(false)} />
      )}
    </div>
  );
};

export default PracticeClassCard;
