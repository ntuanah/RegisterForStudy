import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getClassSectionsBySubjectAPI } from "../../../service/classSectionService";
import ListStudent from "../Modal/ListStudent";

const ScoreClassSubTable = ({ subjectId }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await getClassSectionsBySubjectAPI(subjectId);
      const { data } = response;
      if (data.code === 1000 || data.code === 200) {
        setClasses(data.result || []);
      }
    } catch (error) {
      toast.error("Lỗi khi tải chi tiết lớp học phần!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) fetchClasses();
  }, [subjectId]);

  const handleManageScore = (classSection) => {
    setSelectedClassId(classSection.id);
  };

  const formatScheduleInfo = (cls) => {
    const schedule = cls.schedules?.[0];

    if (!schedule) {
      return "Chưa xếp lịch";
    }

    const lecturer = schedule.lecturerName || "Chưa xếp GV";
    const room = schedule.roomName || "Chưa xếp phòng";
    const day = schedule.dayOfWeekName || "Chưa xếp thứ";
    const time =
      schedule.startPeriod && schedule.endPeriod
        ? `Tiết ${schedule.startPeriod}-${schedule.endPeriod}`
        : "Chưa xếp giờ";

    return `${lecturer}, ${room}, ${day}, ${time}`;
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500 bg-slate-50 shadow-inner">
        <div className="flex justify-center items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
          Đang tải danh sách lớp...
        </div>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500 italic bg-slate-50 shadow-inner">
        Không có lớp học phần nào cho môn này.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200 shadow-inner">
      <h4 className="text-[#0A4174] font-bold mb-5 flex items-center gap-2">
        <span className="w-1.5 h-4 bg-[#5483B3] rounded-full inline-block"></span>
        Chọn Lớp Học Phần để Nhập Điểm
      </h4>

      <div className="flex flex-col gap-5">
        {classes.map((parentClass) => (
          <div
            key={parentClass.id}
            className="bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-[11px] font-bold rounded-md bg-[#5483B3] text-white whitespace-nowrap shadow-sm">
                  {parentClass.subjectComponentType === "THEORY"
                    ? "LÝ THUYẾT"
                    : "THỰC HÀNH"}
                </span>
                <span className="font-bold text-slate-800 text-sm md:text-base">
                  {parentClass.sectionCode} -{" "}
                  <span className="font-medium text-slate-600">
                    {formatScheduleInfo(parentClass)}
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm w-full md:w-auto justify-between md:justify-end">
                <div className="flex flex-col items-start md:items-end">
                  <span className="text-slate-500 text-xs">Sĩ số</span>
                  <div className="font-bold flex items-center gap-1 text-[#0A4174]">
                    {parentClass.enrolledCount} / {parentClass.capacity}
                  </div>
                </div>

                <div className="flex items-center pl-4 md:pl-5 border-l border-blue-200">
                  <button
                    onClick={() => handleManageScore(parentClass)}
                    className="text-white font-medium border border-[#0A4174] bg-[#5483B3] hover:bg-[#0A4174] px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm hover:-translate-y-0.5"
                    title="Quản lý điểm số"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      height="18px"
                      viewBox="-2 -2 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m5.72 14.456l1.761-.508l10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.9.9 0 0 1-1.11-.623a.9.9 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635z"
                      />
                    </svg>
                    <span className="text-xs font-bold whitespace-nowrap">
                      Nhập điểm
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {parentClass.children && parentClass.children.length > 0 && (
              <div className="p-4 md:p-5">
                <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">
                  Các lớp thực hành 
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {parentClass.children.map((child) => (
                    <div
                      key={child.id}
                      className="border border-slate-200 rounded-lg p-3.5 bg-slate-50 hover:border-[#5483B3] hover:shadow-sm transition-all flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                        <div className="font-black text-[#5483B3] text-sm">
                          {child.sectionCode} -{" "}
                          <span className="font-medium text-slate-600 text-xs">
                            {formatScheduleInfo(child)}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Sĩ số:</span>
                          <span className="font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">
                            {child.enrolledCount} / {child.capacity}
                          </span>
                        </div>

                        <button
                          onClick={() => handleManageScore(child)}
                          className="text-[#5483B3] hover:text-white border border-[#5483B3] hover:bg-[#5483B3] px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 cursor-pointer bg-white shadow-sm hover:-translate-y-0.5"
                          title="Nhập điểm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16px"
                            height="16px"
                            viewBox="-2 -2 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m5.72 14.456l1.761-.508l10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.9.9 0 0 1-1.11-.623a.9.9 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635z"
                            />
                          </svg>
                          <span className="font-bold whitespace-nowrap hidden sm:inline">
                            Nhập điểm
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedClassId && (
        <ListStudent 
          classSectionId={selectedClassId} 
          close={() => setSelectedClassId(null)} 
        />
      )}
    </div>
  );
};

export default ScoreClassSubTable;
