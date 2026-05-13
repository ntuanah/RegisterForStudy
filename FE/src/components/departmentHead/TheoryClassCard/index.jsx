import { useEffect, useState } from "react";
import PracticeClassCard from "../PracticeClassCard";
import {
  assignLecturerAPI,
  getSuggestedLecturersAPI,
  removeLecturerAPI,
} from "../../../service/scheduleService";
import { toast } from "react-toastify";
import { getLecturersByMajorAPI, getMyInfoAPI } from "../../../service/userService";

const TheoryClassCard = ({ theoryClass, index, refresh }) => {
  const [showPractice, setShowPractice] = useState(false);
  const schedule = theoryClass?.schedules?.[0];

  const [allLecturers, setAllLecturers] = useState([]);
  const [suggestedLecturers, setSuggestedLecturers] = useState([]);
  const [isLoadingLecturers, setIsLoadingLecturers] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);

  const [selectedLecturerCode, setSelectedLecturerCode] = useState(
    schedule?.lecturerCode || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchLecturersByMajor = async () => {
      try {
        setIsLoadingLecturers(true);
        const infoRes = await getMyInfoAPI();
        
        if (infoRes.data.code === 1000) {
          const majorId = infoRes.data.result?.lecturerInfo?.majorId;
          if (majorId) {
            const lecRes = await getLecturersByMajorAPI(majorId);
            if (lecRes.data.code === 1000) {
              const lecturersData = lecRes.data.result?.content || lecRes.data.result || [];
              setAllLecturers(lecturersData);
            }
          }
        }
      } catch (error) {
        console.error("Lỗi tải danh sách giảng viên:", error);
      } finally {
        setIsLoadingLecturers(false);
      }
    };
    fetchLecturersByMajor();
  }, []);

  useEffect(() => {
    setSelectedLecturerCode(schedule?.lecturerCode || "");
  }, [schedule?.lecturerCode]);

  const handleShowSuggestions = async (e) => {
    e.stopPropagation();
    if (!schedule?.id) return toast.warning("Lớp này chưa có lịch học!");

    setShowSuggestModal(true);
    setSuggestedLecturers([]); 

    try {
      const res = await getSuggestedLecturersAPI(schedule.id);
      if (res.data.code === 1000 && res.data.result) {
        setSuggestedLecturers(res.data.result);
      } else {
        setSuggestedLecturers([]); 
      }
    } catch (error) {
      setSuggestedLecturers([]);
    }
  };

  const handleSaveLecturer = async (e) => {
    e.stopPropagation();
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

  const handleDeleteLecturer = async (e) => {
    e.stopPropagation();
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
    <div>
      <div
        onClick={() => setShowPractice(!showPractice)}
        className="border border-[#0A4174] p-4 rounded-xl bg-white shadow-sm"
      >
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
                {theoryClass.sectionCode} -{" "}
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
                <option value="">-- Chọn giảng viên (Tất cả) --</option>
                {isLoadingLecturers ? (
                  <option disabled>Đang tải danh sách...</option>
                ) : (
                  allLecturers.map((lecturer) => {
                    const code = lecturer.lecturerInfo?.lecturerCode || lecturer.username;
                    return (
                      <option key={lecturer.accountId || code} value={code}>
                        {lecturer.fullName} ({code})
                      </option>
                    )
                  })
                )}
                {schedule?.lecturerCode &&
                  !allLecturers.some(
                    (l) => (l.lecturerInfo?.lecturerCode || l.username) === schedule.lecturerCode,
                  ) && (
                    <option value={schedule.lecturerCode}>
                      {schedule.lecturerName || "Giảng viên đang dạy"} (
                      {schedule.lecturerCode})
                    </option>
                  )}
              </select>

              <button
                onClick={handleShowSuggestions}
                disabled={!schedule?.id}
                title="Gợi ý giảng viên"
                className="h-fit text-[#5483B3] font-medium border border-[#0A4174] rounded-full p-3 bg-blue-50 hover:bg-[#5483B3] hover:text-white cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 15.8c-3.7 0-6.8-3-6.8-6.8s3-6.8 6.8-6.8c3.7 0 6.8 3 6.8 6.8s-3.1 6.8-6.8 6.8m0-12C9.1 3.8 6.8 6.1 6.8 9s2.4 5.2 5.2 5.2c2.9 0 5.2-2.4 5.2-5.2S14.9 3.8 12 3.8M8 17.5h8V19H8zm2 3h4V22h-4z"
                  />
                </svg>
              </button>
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

      {showPractice &&
        theoryClass.children &&
        theoryClass.children.length > 0 && (
          <div className="mt-3 ml-8 pl-6 space-y-3">
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
      {showPractice &&
        (!theoryClass.children || theoryClass.children.length === 0) && (
          <div className="mt-2 ml-10 text-sm text-slate-500 italic">
            Lớp này không có thực hành.
          </div>
        )}

      {showSuggestModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-all"
          onClick={() => setShowSuggestModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#0A4174] mb-6 flex items-center gap-2">
              Gợi ý giảng viên
            </h2>

            <button
              onClick={() => setShowSuggestModal(false)}
              className="h-fit text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            </div>

            <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
              {suggestedLecturers.length === 0 ? (
                <div className="text-center py-10 bg-blue-50 rounded-2xl border border-[#0A4174]">
                  <p className="text-slate-500 font-medium">Không có giảng viên nào phù hợp để gợi ý.</p>
                  <p className="text-sm text-slate-400 mt-1">Vui lòng chọn giảng viên từ danh sách tổng.</p>
                </div>
              ) : (
                suggestedLecturers.map((l) => (
                  <div
                    key={l.lecturerId}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-2xl "
                    onClick={() => {
                      setSelectedLecturerCode(l.lecturerCode);
                      setShowSuggestModal(false);
                    }}
                  >
                    <div>
                      <p className="font-bold text-[15px] text-slate-800">
                        {l.fullName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 font-medium">
                        Mã GV: {l.lecturerCode}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-white bg-[#5483B3] px-3 py-1.5 rounded-full shadow-sm">
                      Phù hợp: {l.totalScore}đ
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheoryClassCard;
