import { useState } from "react";
import SelectRoomTime from "../Modal/SelectRoomTime";
import { deleteScheduleRoomAPI, deleteScheduleTimeAPI } from "../../../service/scheduleService";
import { toast } from "react-toastify";

const PracticeClassCard = ({ practiceClass, index, refresh }) => {
  const [openSelectRoomTime, setOpenSelectRoomTime] = useState(false);

  const handleDeleteSchedule = async () => {
    const scheduleId = practiceClass.schedules?.[0]?.id;
    
    if (!scheduleId) {
      return toast.warning("Lớp thực hành này chưa có lịch để xóa!");
    }

    if (!window.confirm("Bạn có chắc chắn muốn hủy phân công thời gian và phòng của lớp Thực hành này không?")) return;

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
    <div className="border border-[#0A4174] border-s-4 p-3 rounded-xl bg-white shadow-sm transition-all">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="bg-white shadow-sm p-3 rounded-xl text-[#5483B3] h-fit">
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
            <h4 className="font-bold text-sm text-slate-800">
              Lớp thực hành #{index}
            </h4>
            <p className="text-xs font-semibold text-[#5483B3] mt-1">
              {practiceClass.sectionCode}
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-end">
          <div className="flex gap-2 items-center">
            <p className="text-xs text-slate-500 font-medium">
              Sĩ số sinh viên
            </p>
            <input
              type="text"
              defaultValue={practiceClass.capacity}
              className="w-16 text-center text-sm font-bold border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>
        </div>
      </div>

      <div className="flex mt-3 pt-3 justify-between items-center">
        <div>
          <p className="text-sm font-medium text-[#5483B3] bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-[#0A4174] font-bold">Lịch:</span>{" "}
            {practiceClass.schedules?.[0]?.roomName || "Chưa xếp phòng"},{" "}
            {practiceClass.schedules?.[0]?.dayOfWeekName || ""}, Tiết{" "}
            {practiceClass.schedules?.[0]?.startPeriod || ""}-
            {practiceClass.schedules?.[0]?.endPeriod || ""}
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
      {openSelectRoomTime && (
        <SelectRoomTime
          close={() => setOpenSelectRoomTime(false)}
          scheduleId={practiceClass.schedules?.[0]?.id}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default PracticeClassCard;
