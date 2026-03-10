import { useState } from "react";
import ListStudent from "../ListStudent";

const MyClassCard = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="bg-white border border-[#5483B3] rounded-xl">
        <div className="h-32 bg-blue-50"></div>
        <div className="p-5 space-y-2">
          <h3 className="text-lg font-bold">Cấu trúc dữ liệu và giải thuật</h3>
          <div className="flex justify-between">
            <p className="text-xs text-slate-500 font-bold">Sinh viên</p>
            <p className="text-xs text-slate-500 font-bold">30/35</p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="w-full text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
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
                d="M8 6h12M4 6.01l.01-.011M4 12.01l.01-.011M4 18.01l.01-.011M8 12h12M8 18h12"
              />
            </svg>
            Xem danh sách sinh viên
          </button>
        </div>
      </div>

      {openModal && <ListStudent close={() => setOpenModal(false)} />}
    </>
  );
};

export default MyClassCard;
