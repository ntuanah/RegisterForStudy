import { useState } from "react";
import PracticeClassCard from "../PracticeClassCard";
import SelectRoomTime from "../Modal/SelectRoomTime";
import { toast } from "react-toastify";
import { deleteScheduleRoomAPI, deleteScheduleTimeAPI } from "../../../service/scheduleService";

const TheoryClassCard = ({ theoryClass, index, refresh }) => {
  const [openPracticeClassCard, setOpenPracticeClassCard] = useState(false);
  const [openSelectRoomTime, setOpenSelectRoomTime] = useState(false);

  const handleDeleteSchedule = async () => {
    const scheduleId = theoryClass.schedules?.[0]?.id;
    
    if (!scheduleId) {
      return toast.warning("Lớp học này chưa có lịch để xóa!");
    }

    if (!window.confirm("Bạn có chắc chắn muốn hủy phân công thời gian và phòng của lớp Lý thuyết này không?")) return;

    try {
      await deleteScheduleTimeAPI(scheduleId);
      await deleteScheduleRoomAPI(scheduleId);
      
      toast.success("Đã hủy phân công lịch học thành công!");
      if (refresh) refresh();   

    } catch (error) {
      console.error("Lỗi khi xóa lịch:", error);
      toast.error("Đã xảy ra lỗi khi hủy lịch học!");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="border border-[#0A4174] p-4 rounded-xl bg-white shadow-sm">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-[#5483B3] h-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M1 2.828c.885-.37 2.154-.769 3.388-.893c1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493c-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752c1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81c-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02c1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877c1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"
                />
              </svg>
            </div>

            <div>
              <h4 className="font-bold text-base text-slate-800">
                Lớp lý thuyết #{index}
              </h4>
              <p className="text-sm font-semibold text-[#5483B3] mt-1">
                {theoryClass.sectionCode}
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-end">
            <div className="flex gap-2 items-center">
              <p className="text-xs text-slate-500 font-medium">
                Sĩ số sinh viên
              </p>
              <input
                type="text"
                defaultValue={theoryClass.capacity}
                className="w-16 text-center text-sm font-bold border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <button onClick={handleDeleteSchedule} className="h-fit text-red-500 font-medium border border-red-500 rounded-full p-3 bg-white hover:bg-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
              />
            </svg>
          </button>
          </div>
        </div>

        <div className="flex mt-4 pt-3 justify-between items-center">
          <div>
            <p className="text-sm font-medium text-[#5483B3] bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-[#0A4174] font-bold">Lịch:</span>{" "}
              {theoryClass.schedules?.[0]?.roomName || "Chưa xếp phòng"},{" "}
              {theoryClass.schedules?.[0]?.dayOfWeekName || ""}, Tiết{" "}
              {theoryClass.schedules?.[0]?.startPeriod || ""}-
              {theoryClass.schedules?.[0]?.endPeriod || ""}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setOpenSelectRoomTime(true)}
              className="h-fit text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
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
              Chọn phòng giờ học
            </button>

            {theoryClass.children?.length > 0 && (
              <button
                onClick={() => setOpenPracticeClassCard(!openPracticeClassCard)}
                className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                {openPracticeClassCard
                  ? "Ẩn thực hành"
                  : `Xem ${theoryClass.children.length} lớp TH`}
              </button>
            )}
          </div>
        </div>
      </div>

      {openPracticeClassCard && theoryClass.children && (
        <div className="ml-8 pl-6 py-2 space-y-4 relative">
          <div className="absolute top-0 left-[-2px] w-2 h-full "></div>
          {theoryClass.children.map((practiceClass, idx) => (
            <PracticeClassCard
              key={practiceClass.id}
              practiceClass={practiceClass}
              index={idx + 1}
              refresh={refresh}
            />
          ))}
        </div>
      )}

      {openSelectRoomTime && (
        <SelectRoomTime
          close={() => setOpenSelectRoomTime(false)}
          scheduleId={theoryClass.schedules?.[0]?.id}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default TheoryClassCard;
