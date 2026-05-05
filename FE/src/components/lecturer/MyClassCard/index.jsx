import { useState } from "react";
import ListStudent from "../ListStudent";

const MyClassCard = ({ classData }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="bg-white border border-[#5483B3] rounded-xl flex flex-col overflow-hidden h-full">

        <div className="h-28 bg-blue-50 flex items-center justify-center relative border-b border-[#5483B3]/20">
           <span className="text-3xl font-black text-[#5483B3] opacity-30 tracking-widest uppercase">
             {classData.subjectCode}
           </span>
           <div className="absolute bottom-2 left-4 px-2 py-0.5 bg-[#5483B3] text-white text-xs font-bold rounded">
             {classData.sectionCode}
           </div>
        </div>
        
        <div className="p-5 space-y-3 flex flex-col flex-1">

          <h3 className="text-lg font-bold text-slate-800 line-clamp-2 h-14" title={classData.subjectName}>
            {classData.subjectName}
          </h3>
          
          <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold">{classData.dayOfWeekName}</p>
            <p className="text-xs text-[#5483B3] font-black">
              Tiết {classData.startPeriod} - {classData.endPeriod}
            </p>
          </div>
          
          <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Phòng học</p>
            <p className="text-sm text-[#5483B3] font-bold">{classData.roomName}</p>
          </div>

          <div className="flex-1"></div>

          <button
            onClick={() => setOpenModal(true)}
            className="w-full mt-2 text-white font-medium border border-[#0A4174] rounded-full px-5 py-2.5 bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
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
            Xem sinh viên
          </button>
        </div>
      </div>

      {openModal && (
        <ListStudent 
          close={() => setOpenModal(false)} 
          classSectionId={classData.classSectionId} 
        />
      )}
    </>
  );
};

export default MyClassCard;
