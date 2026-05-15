import React, { useEffect, useState } from "react";
import { getLecturersByMajorAPI, getMyInfoAPI } from "../../../service/userService";
import { toast } from "react-toastify";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { getLecturerScheduleSummaryAPI } from "../../../service/scheduleService";

const LecturerScheduleTable = () => {
    const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [majorId, setMajorId] = useState(null); 
  const [currentSemesterId, setCurrentSemesterId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  const [expandedLecturerCode, setExpandedLecturerCode] = useState(null);
  const [scheduleSummary, setScheduleSummary] = useState(null);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [infoRes, semesterRes] = await Promise.all([
          getMyInfoAPI(),
          getCurrentSemesterAPI()
        ]);

        const infoData = infoRes.data || infoRes;
        const semesterData = semesterRes.data || semesterRes;

        if (infoData?.code === 1000) {
          const userMajorId = infoData?.result?.lecturerInfo?.majorId; 
          if (userMajorId) setMajorId(userMajorId);
          else toast.warning("Không tìm thấy thông tin chuyên ngành của bạn!");
        } else {
          toast.error(infoData?.message || "Lỗi khi lấy thông tin người dùng!");
        }

        if (semesterData?.code === 1000) {
          setCurrentSemesterId(semesterData.result.id);
        } else {
          toast.error(semesterData?.message || "Không thể lấy học kỳ hiện tại!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Lỗi kết nối Server khi tải dữ liệu khởi tạo!");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!majorId) return;

    const fetchLecturers = async () => {
      setLoading(true);
      setExpandedLecturerCode(null); 
      setScheduleSummary(null);

      try {
        const res = await getLecturersByMajorAPI(majorId, currentPage - 1, pageSize);
        const data = res.data || res;
        
        if (data?.code === 1000) {
          setLecturers(data.result.content);
          setTotalPages(data.result.totalPages);
        } else {
          toast.error(data?.message || "Lỗi khi tải danh sách giảng viên!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Lỗi kết nối Server khi tải danh sách!");
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, [majorId, currentPage]);

  const handleRowClick = async (lecturerCode) => {
    if (expandedLecturerCode === lecturerCode) {
      setExpandedLecturerCode(null);
      setScheduleSummary(null);
      return;
    }

    if (!currentSemesterId) {
      return toast.warning("Chưa có thông tin học kỳ hiện tại để xem lịch dạy!");
    }

    setExpandedLecturerCode(lecturerCode);
    setLoadingSchedule(true);
    setScheduleSummary(null);

    try {
      const res = await getLecturerScheduleSummaryAPI(lecturerCode, currentSemesterId);
      const data = res.data || res;

      if (data?.code === 1000) {
        setScheduleSummary(data.result);
      } else {
        toast.error(data?.message || "Không thể lấy lịch dạy của giảng viên này!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối khi lấy lịch dạy!");
    } finally {
      setLoadingSchedule(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, "...", totalPages);
      else if (currentPage >= totalPages - 2) pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5 overflow-x-auto">
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-5 whitespace-nowrap">STT</th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-40 whitespace-nowrap">Mã giảng viên</th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">Tên giảng viên</th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-80 whitespace-nowrap">Khoa</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {loading ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-slate-500">Đang tải dữ liệu...</td>
            </tr>
          ) : lecturers.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-slate-500">Không tìm thấy giảng viên nào.</td>
            </tr>
          ) : (
            lecturers.map((lecturer, index) => {
              const lecCode = lecturer.lecturerInfo?.lecturerCode;
              const isExpanded = expandedLecturerCode === lecCode;

              return (
                <React.Fragment key={lecturer.accountId}>
                  <tr 
                    onClick={() => handleRowClick(lecCode)}
                    className={`transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4">{(currentPage - 1) * pageSize + index + 1}</td>
                    <td className="px-6 py-4 ">{lecCode}</td>
                    <td className="px-6 py-4 ">{lecturer.fullName}</td>
                    <td className="px-6 py-4">{lecturer.lecturerInfo?.majorName}</td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-slate-50/50">
                      <td colSpan="4" className="p-0 border-b border-slate-200">
                        <div className="px-10 py-6 animate-[fadeIn_0.2s_ease-in-out]">
                          {loadingSchedule ? (
                            <div className="flex items-center gap-2 text-slate-500 font-medium">
                              <div className="w-4 h-4 border border-slate-400 rounded-full animate-spin"></div>
                              Đang tải lịch dạy...
                            </div>
                          ) : scheduleSummary ? (
                            <div>
                              <div className="flex gap-6 mb-4 text-sm">
                                <p className="text-slate-600 font-medium bg-white px-4 py-2 border border-[#0A4174] rounded-full shadow-sm">
                                  Tổng số lớp: <span className="text-[#5483B3] font-bold ml-1">{scheduleSummary.totalClasses}</span>
                                </p>
                                <p className="text-slate-600 font-medium bg-white px-4 py-2 border border-[#0A4174] rounded-full shadow-sm">
                                  Tổng số tiết: <span className="text-[#5483B3] font-bold ml-1">{scheduleSummary.totalPeriods}</span>
                                </p>
                              </div>

                              {scheduleSummary.schedules?.length > 0 ? (
                                <div className="border border-slate-200 rounded-xl shadow-sm overflow-hidden bg-white">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-blue-50 border-b border-slate-200">
                                        <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">Mã Lớp</th>
                                        <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">Môn Học</th>
                                        <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">Thứ</th>
                                        <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">Tiết</th>
                                        <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">Phòng</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                      {scheduleSummary.schedules.map((s, idx) => (
                                        <tr key={idx} className="">
                                          <td className="px-6 py-4 f">{s.sectionCode}</td>
                                          <td className="px-6 py-4">{s.subjectName}</td>
                                          <td className="px-6 py-4">{s.dayOfWeekName}</td>
                                          <td className="px-6 py-4 ">{s.startPeriod} - {s.endPeriod}</td>
                                          <td className="px-6 py-4">{s.roomName}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-slate-500 italic text-sm mt-2">Giảng viên chưa có lịch dạy trong học kỳ này.</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-red-500 text-sm">Không có dữ liệu lịch dạy.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>

      {!loading && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-blue-50 rounded-b-xl">
          <span className="text-sm text-slate-500">
            Trang <span className="font-bold text-[#5483B3]">{currentPage}</span> / {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border flex items-center justify-center transition-colors
                ${currentPage === 1 ? "border-slate-200 text-slate-300 bg-white cursor-not-allowed" : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-slate-100 hover:border-[#0A4174] cursor-pointer"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m15 18l-6-6l6-6" />
              </svg>
            </button>

            {getPageNumbers().map((num, index) =>
              num === "..." ? (
                <span key={`dots-${index}`} className="px-2 text-slate-500 font-bold tracking-widest">...</span>
              ) : (
                <button
                  key={`page-${num}`}
                  onClick={() => handlePageChange(num)}
                  className={`w-9 h-9 rounded-lg border text-sm font-bold transition-all flex items-center justify-center
                    ${currentPage === num ? "bg-[#5483B3] text-white border-[#0A4174] shadow-md cursor-default" : "border-slate-300 text-slate-600 bg-white hover:bg-blue-50 hover:text-[#5483B3] hover:border-[#5483B3] cursor-pointer"}`}
                >
                  {num}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border flex items-center justify-center transition-colors
                ${currentPage === totalPages ? "border-slate-200 text-slate-300 bg-white cursor-not-allowed" : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-slate-100 hover:border-[#0A4174] cursor-pointer"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m9 18l6-6l-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerScheduleTable;
