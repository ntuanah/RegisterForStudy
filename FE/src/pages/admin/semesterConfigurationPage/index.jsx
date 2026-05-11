import { useEffect, useState } from "react";
import OpenSubjectTable from "../../../components/admin/OpenSubjectTable";
import RegistrationPeriodCard from "../../../components/admin/RegistrationPeriodCard";
import AddOpenSubject from "../../../components/admin/Modal/AddOpenSubject";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { getRegistrationPeriodsAPI } from "../../../service/registrationPeriodService";
import { toast } from "react-toastify";
import { clearRedisAPI, syncRedisAPI } from "../../../service/registrationService";

const SemesterConfigurationPage = () => {
  const [currentSemester, setCurrentSemester] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const semRes = await getCurrentSemesterAPI();
        if (semRes.data.code === 1000) {
          setCurrentSemester(semRes.data.result);
        }

        const periodRes = await getRegistrationPeriodsAPI(currentPage, 10);
        if (periodRes.data.code === 1000) {
          setPeriods(periodRes.data.result.content || []);
          setTotalPages(periodRes.data.result.totalPages || 1);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
        toast.error("Lỗi kết nối khi tải cấu hình học kỳ!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, refreshTrigger]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pageNumbers;
  };

  const handleSuccess = () => {
    setIsAddingNew(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSyncRedis = async () => {
    if (!currentSemester) {
      toast.warning("Chưa xác định được học kỳ hiện tại!");
      return;
    }

    const confirmMsg = `Bạn có chắc chắn muốn đồng bộ sĩ số của học kỳ [${currentSemester.name}] lên Redis không?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      setIsSyncing(true);
      const res = await syncRedisAPI(currentSemester.id);

      if (res.data.code === 1000) {
        toast.success("Đồng bộ dữ liệu lên Redis thành công!");
      } else {
        toast.error(res.data.message || "Đồng bộ thất bại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi hệ thống khi đồng bộ Redis!",
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleClearRedis = async () => {
    const confirmMsg =
      "CẢNH BÁO: Hành động này sẽ dọn dẹp TOÀN BỘ dữ liệu đăng ký tín chỉ trên Redis. Bạn có chắc chắn không?";
    if (!window.confirm(confirmMsg)) return;

    try {
      setIsClearing(true);
      const res = await clearRedisAPI();

      if (res.data.code === 1000) {
        toast.success("Đã dọn dẹp toàn bộ dữ liệu trên Redis thành công!");
      } else {
        toast.error(res.data.message || "Dọn dẹp thất bại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi hệ thống khi dọn dẹp Redis!",
      );
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Cấu hình học kỳ
        </h2>
      </div>

      <div className="p-4 md:p-8">
        <div className="space-y-7 mt-3 md:mt-5">
          <div className="mb-8 flex justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Thời gian đăng ký học phần
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full xl:w-auto">
              <button
                type="button"
                onClick={handleSyncRedis}
                disabled={isSyncing || !currentSemester}
                className="w-full sm:w-auto justify-center h-fit font-medium border border-[#0A4174] rounded-full p-3 transition-all duration-300 flex items-center gap-2 text-[#5483B3] bg-white hover:bg-gray-200 cursor-pointer hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSyncing ? (
                  <div className="w-4 h-4 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M11 19H7q-.425 0-.712.288T6 20t.288.713T7 21h10q.425 0 .713-.288T18 20t-.288-.712T17 19h-4v-7.2l.9.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7l-2.6-2.6q-.3-.3-.7-.3t-.7.3l-2.6 2.6q-.275.275-.275.7t.275.7t.7.275t.7-.275l.9-.9zm-7-3q-.825 0-1.412-.587T2 14V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v9q0 .825-.587 1.413T20 16h-4q-.425 0-.712-.288T15 15t.288-.712T16 14h4V5H4v9h4q.425 0 .713.288T9 15t-.288.713T8 16z"
                    />
                  </svg>
                )}
                <span>
                  {isSyncing ? "Đang đồng bộ..." : "Đồng bộ dữ liệu redis"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleClearRedis}
                disabled={isClearing}
                className="w-full sm:w-auto justify-center h-fit font-medium border border-[#0A4174] rounded-full p-3 transition-all duration-300 flex items-center gap-2 text-[#5483B3] bg-white hover:bg-gray-200 cursor-pointer hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isClearing ? (
                  <div className="w-4 h-4 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m21 3l-8 8.5m-3.554-.415c-2.48.952-4.463.789-6.446.003c.5 6.443 3.504 8.92 7.509 9.912c0 0 3.017-2.134 3.452-7.193c.047-.548.07-.821-.043-1.13c-.114-.309-.338-.53-.785-.973c-.736-.728-1.103-1.092-1.54-1.184c-.437-.09-1.007.128-2.147.565"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4.5 16.446S7 16.93 9.5 15"
                      />
                      <path
                        strokeWidth="1.5"
                        d="M8.5 7.25a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 4v.1"
                      />
                    </g>
                  </svg>
                )}
                <span>
                  {isClearing ? "Đang dọn dẹp..." : "Dọn dẹp dữ liệu redis"}
                </span>
              </button>

              <button
                onClick={() => setIsAddingNew(true)}
                disabled={isAddingNew || !currentSemester}
                className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300
                  ${isAddingNew ? "bg-gray-400 cursor-not-allowed" : "bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer hover:-translate-y-1 shadow-md"}`}
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
                Thêm đợt đăng ký
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {isAddingNew && currentSemester && (
              <RegistrationPeriodCard
                isCreate={true}
                semesterId={currentSemester.id}
                onCancel={() => setIsAddingNew(false)}
                onSuccess={handleSuccess}
              />
            )}

            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : periods.length === 0 && !isAddingNew ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500 italic">
                  Chưa có đợt đăng ký nào trong học kỳ này.
                </p>
              </div>
            ) : (
              periods.map((period, index) => (
                <RegistrationPeriodCard
                  key={period.id}
                  isCreate={false}
                  periodData={period}
                  index={(currentPage - 1) * 10 + index + 1}
                  onSuccess={handleSuccess}
                />
              ))
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 mt-6 border border-slate-200 flex items-center justify-between bg-blue-50 rounded-xl shadow-sm">
            <span className="text-sm text-slate-500">
              Trang{" "}
              <span className="font-bold text-[#5483B3]">{currentPage}</span> /{" "}
              {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border flex items-center justify-center transition-colors
                  ${
                    currentPage === 1
                      ? "border-slate-200 text-slate-300 bg-white cursor-not-allowed"
                      : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-slate-100 hover:border-[#0A4174] cursor-pointer"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="m15 18l-6-6l6-6"
                  />
                </svg>
              </button>

              {getPageNumbers().map((num, index) =>
                num === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="px-2 text-slate-500 font-bold tracking-widest"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${num}`}
                    onClick={() => handlePageChange(num)}
                    className={`w-9 h-9 rounded-lg border text-sm font-bold transition-all flex items-center justify-center
                      ${
                        currentPage === num
                          ? "bg-[#5483B3] text-white border-[#0A4174] shadow-md cursor-default"
                          : "border-slate-300 text-slate-600 bg-white hover:bg-blue-50 hover:text-[#5483B3] hover:border-[#5483B3] cursor-pointer"
                      }`}
                  >
                    {num}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border flex items-center justify-center transition-colors
                  ${
                    currentPage === totalPages
                      ? "border-slate-200 text-slate-300 bg-white cursor-not-allowed"
                      : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-slate-100 hover:border-[#0A4174] cursor-pointer"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="m9 18l6-6l-6-6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterConfigurationPage;
