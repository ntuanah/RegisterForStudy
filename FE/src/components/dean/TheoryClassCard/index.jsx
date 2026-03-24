import { useState } from "react";
import PracticeClassCard from "../PracticeClassCard";
import SelectRoomTime from "../Modal/SelectRoomTime";

const TheoryClassCard = () => {
  const [openPracticeClassCard, setOpenPracticeClassCard] = useState(false);
  const [openSelectRoomTime, setOpenSelectRoomTime] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="border border-[#0A4174] p-3 rounded-xl bg-white">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <div className="bg-blue-50 p-3 rounded-xl text-[#5483B3]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M1 2.828c.885-.37 2.154-.769 3.388-.893c1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493c-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752c1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81c-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02c1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877c1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"
                />
              </svg>
            </div>

            <div>
              <h4 className="font-bold text-sm mt-1">Lớp lý thuyết #1</h4>
              <p className="text-xs text-slate-500">Mã lớp: AD20501</p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <p className="text-xs text-slate-500">Số lượng sinh viên</p>
              <input
                type="text"
                defaultValue="70"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div>
              <button className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16.25 21v-4.765a1.59 1.59 0 0 0-1.594-1.588H9.344a1.59 1.59 0 0 0-1.594 1.588V21m8.5-17.715v2.362a1.59 1.59 0 0 1-1.594 1.588H9.344A1.59 1.59 0 0 1 7.75 5.647V3m8.5.285A3.2 3.2 0 0 0 14.93 3H7.75m8.5.285c.344.156.661.374.934.645l2.382 2.375A3.17 3.17 0 0 1 20.5 8.55v9.272A3.18 3.18 0 0 1 17.313 21H6.688A3.18 3.18 0 0 1 3.5 17.823V6.176A3.18 3.18 0 0 1 6.688 3H7.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex mt-3 justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">
              Phòng: A506, Thứ 2, Tiết 3-4{" "}
            </p>
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

            <button
              onClick={() => setOpenPracticeClassCard(true)}
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
                  strokeWidth="1.5"
                  d="M4 12h8m0 0h8m-8 0V4m0 8v8"
                />
              </svg>
              Thêm lớp thực hành
            </button>
          </div>
        </div>
      </div>

      <div className="ms-10">
        {openPracticeClassCard && <PracticeClassCard />}
        {openSelectRoomTime && (
          <SelectRoomTime close={() => setOpenSelectRoomTime(false)} />
        )}
      </div>
    </div>
  );
};

export default TheoryClassCard;
