import { useEffect, useState } from "react";
import {
  assignLecturerAPI,
  getSuggestedLecturersAPI,
  removeLecturerAPI,
} from "../../../service/scheduleService";
import { toast } from "react-toastify";

const PracticeClassCard = ({ practiceClass, index, refresh }) => {
  const schedule = practiceClass.schedules?.[0];
  const [suggestedLecturers, setSuggestedLecturers] = useState([]);
  const [isLoadingLecturers, setIsLoadingLecturers] = useState(false);
  const [selectedLecturerCode, setSelectedLecturerCode] = useState(
    schedule?.lecturerCode || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchLecturers = async () => {
      if (!schedule?.id) return;
      try {
        setIsLoadingLecturers(true);
        const res = await getSuggestedLecturersAPI(schedule.id);
        if (res.data.code === 1000) {
          let suggested = res.data.result || [];

          if (schedule.lecturerId && schedule.lecturerCode) {
            const isLecturerInList = suggested.some(
              (l) => l.lecturerId === schedule.lecturerId,
            );
            if (!isLecturerInList) {
              suggested = [
                ...suggested,
                {
                  lecturerId: schedule.lecturerId,
                  lecturerCode: schedule.lecturerCode,
                  fullName: schedule.lecturerName || "Giảng viên đang dạy",
                  totalScore: "N/A",
                },
              ];
            }
          }

          setSuggestedLecturers(suggested);
        }
      } catch (error) {
        console.warn(
          "Lớp chưa xếp lịch hoặc không lấy được gợi ý:",
          error.message,
        );
      } finally {
        setIsLoadingLecturers(false);
      }
    };
    fetchLecturers();
  }, [schedule?.id, schedule?.lecturerId]);

  useEffect(() => {
    setSelectedLecturerCode(schedule?.lecturerCode || "");
  }, [schedule?.lecturerCode]);

  const handleSaveLecturer = async () => {
    if (!schedule?.id) return toast.warning("Lớp này chưa có lịch học!");
    if (!selectedLecturerCode)
      return toast.warning("Vui lòng chọn giảng viên!");

    try {
      setIsSaving(true);
      const payload = { lecturerCode: selectedLecturerCode };
      const res = await assignLecturerAPI(schedule.id, payload);

      if (res.data.code === 1000) {
        toast.success("Phân công giảng viên thành công!");
        if (refresh) refresh();
      } else {
        toast.error(res.data.message || "Phân công thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối Server!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLecturer = async () => {
    if (!schedule?.id) return toast.warning("Lớp này chưa có lịch học!");
    if (!schedule?.lecturerId)
      return toast.warning("Lớp này chưa có giảng viên để hủy!");

    if (
      !window.confirm("Bạn có chắc chắn muốn hủy phân công giảng viên lớp này?")
    )
      return;

    try {
      setIsSaving(true);
      const res = await removeLecturerAPI(schedule.id);

      if (res.data.code === 1000) {
        toast.success("Hủy phân công giảng viên thành công!");
        setSelectedLecturerCode("");
        if (refresh) refresh();
      } else {
        toast.error(res.data.message || "Hủy phân công thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối Server!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border border-[#0A4174] border-s-4 p-4 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="bg-blue-50 p-3 rounded-xl text-[#5483B3] h-fit">
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
            <h4 className="font-bold text-base text-slate-800">
              Lớp thực hành #{index}
            </h4>
            <p className="text-sm font-semibold text-[#5483B3] mt-1">
              {practiceClass.sectionCode} -{" "}
              {schedule
                ? `${schedule.roomName || "Chưa xếp phòng"}, ${schedule.dayOfWeekName || "Chưa xếp thứ"}, Tiết ${schedule.startPeriod || "-"}-${schedule.endPeriod || "-"}`
                : "Chưa xếp lịch học"}
            </p>
          </div>
        </div>

        <div className="flex gap-5 items-end">
          <div className="flex gap-2">
            <select
              value={selectedLecturerCode}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setSelectedLecturerCode(e.target.value)}
              disabled={!schedule?.id || isSaving}
              className="text-slate-700 font-medium border border-[#5483B3] rounded-lg px-3 py-2 w-72 outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">-- Chọn giảng viên --</option>
              {isLoadingLecturers ? (
                <option disabled>Đang tải gợi ý...</option>
              ) : suggestedLecturers.length === 0 &&
                schedule?.id &&
                !schedule?.lecturerCode ? (
                <option disabled>Không có giảng viên phù hợp</option>
              ) : (
                suggestedLecturers.map((lecturer) => (
                  <option
                    key={lecturer.lecturerId}
                    value={lecturer.lecturerCode}
                  >
                    {lecturer.fullName} ({lecturer.lecturerCode})
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            onClick={handleSaveLecturer}
            disabled={isSaving}
            className="h-fit text-white font-medium border border-[#0A4174] rounded-full p-3 bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
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
                  d="M16.25 21v-4.765a1.59 1.59 0 0 0-1.594-1.588H9.344a1.59 1.59 0 0 0-1.594 1.588V21m8.5-17.715v2.362a1.59 1.59 0 0 1-1.594 1.588H9.344A1.59 1.59 0 0 1 7.75 5.647V3m8.5.285A3.2 3.2 0 0 0 14.93 3H7.75m8.5.285c.344.156.661.374.934.645l2.382 2.375A3.17 3.17 0 0 1 20.5 8.55v9.272A3.18 3.18 0 0 1 17.313 21H6.688A3.18 3.18 0 0 1 3.5 17.823V6.176A3.18 3.18 0 0 1 6.688 3H7.75"
                />
              </svg>
            )}
          </button>

          <button
            onClick={handleDeleteLecturer}
            disabled={isSaving}
            className="h-fit text-red-500 font-medium border border-red-500 rounded-full p-3 bg-white hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
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
    </div>
  );
};

export default PracticeClassCard;
