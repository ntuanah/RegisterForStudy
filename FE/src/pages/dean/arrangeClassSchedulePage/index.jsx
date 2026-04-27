import { useState } from "react";
import MainContent from "./mainContent";
import SidebarCourseList from "./SidebarCourseList";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { toast } from "react-toastify";
import { autoAssignScheduleAPI } from "../../../service/scheduleService";

const ArrangeClassSchedulePage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isAutoAssigning, setIsAutoAssigning] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAutoAssign = async () => {
    if (
      !window.confirm(
        "Hệ thống sẽ chạy thuật toán xếp phòng và giờ tự động cho toàn bộ học kỳ. Bạn có chắc chắn muốn chạy không?",
      )
    ) {
      return;
    }

    try {
      setIsAutoAssigning(true);
      const semesterRes = await getCurrentSemesterAPI();
      const semesterData = semesterRes.data;

      if (semesterData.code !== 1000 || !semesterData.result?.id) {
        toast.error("Không tìm thấy thông tin học kỳ hiện tại!");
        setIsAutoAssigning(false);
        return;
      }

      const currentSemesterId = semesterData.result.id;
      const assignRes = await autoAssignScheduleAPI(currentSemesterId);
      const assignData = assignRes.data;

      if (assignData.code === 1000 || assignData.code === 200) {
        const { placed, failed, successRate } = assignData.result;

        toast.success(
          <div className="flex flex-col gap-1">
            <span className="font-bold">Xếp lịch tự động hoàn tất!</span>
            <span className="text-sm">Thành công: {placed} lớp</span>
            <span className="text-sm">Thất bại: {failed} lớp</span>
            <span className="text-sm">
              Tỉ lệ thành công: {successRate.toFixed(2)}%
            </span>
          </div>,
          { autoClose: 5000 },
        );

        setRefreshKey((prev) => prev + 1);
      } else {
        toast.error(assignData.message || "Lỗi khi chạy thuật toán xếp lịch!");
      }
    } catch (error) {
      console.error("Lỗi Auto Assign:", error);
      toast.error("Đã xảy ra lỗi kết nối khi chạy thuật toán!");
    } finally {
      setIsAutoAssigning(false);
    }
  };

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Sắp xếp lịch phòng học
        </h2>
      </div>

      <div className="p-8">
        <div className="flex justify-between">
          <div className="mb-5">
            <h1 className="text-3xl font-black text-slate-900">
              Sắp xếp lịch phòng học
            </h1>
            <p className="text-slate-500 mt-1">
              Sắp xếp lịch và phòng học cho các học phần.
            </p>
          </div>
          <div>
            <button
              onClick={handleAutoAssign}
              disabled={isAutoAssigning}
              className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 transition-all duration-300 flex items-center gap-2 shadow-md
                ${
                  isAutoAssigning
                    ? "bg-gray-400 cursor-wait opacity-80"
                    : "bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer hover:-translate-y-1"
                }`}
            >
              {isAutoAssigning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang xử lý thuật toán...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M8.5 9L7.4 6.6L5 5.5l2.4-1.1L8.5 2l1.1 2.4L12 5.5L9.6 6.6L8.5 9Zm6.5 3l-.95-2.05L12 9l2.05-.95L15 6l.95 2.05L18 9l-2.05.95L15 12ZM4 14l-.95-2.05L1 11l2.05-.95L4 8l.95 2.05L7 11l-2.05.95L4 14Zm.5 6.5L3 19l7.5-7.5l4 4l7.1-7.975l1.4 1.4l-8.5 9.575l-4-4l-6 6Z"
                    />
                  </svg>
                  <span>Xếp lịch tự động</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <SidebarCourseList
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
            />
          </div>

          <div className="col-span-9">
            <MainContent selectedSubject={selectedSubject} refreshKey={refreshKey}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrangeClassSchedulePage;
