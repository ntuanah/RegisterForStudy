import { useEffect, useState } from "react";
import OpenSubjectTable from "../../../components/admin/OpenSubjectTable";
import RegistrationPeriodCard from "../../../components/admin/RegistrationPeriodCard";
import AddOpenSubject from "../../../components/admin/Modal/AddOpenSubject";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { getRegistrationPeriodsAPI } from "../../../service/registrationPeriodService";
import { toast } from "react-toastify";

const SemesterConfigurationPage = () => {
  const [currentSemester, setCurrentSemester] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleSuccess = () => {
    setIsAddingNew(false);
    setRefreshTrigger((prev) => prev + 1);
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

            <div className="w-full sm:w-auto">
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

              {getPageNumbers().map((num) => (
                <button
                  key={num}
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
              ))}

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
