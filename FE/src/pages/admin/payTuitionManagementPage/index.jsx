import { useEffect, useState } from "react";
import PayTuitionTable from "../../../components/admin/PayTuitionTable";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import {
  generateTuitionInvoicesAPI,
  getRegistrationPeriodsBySemesterAPI,
} from "../../../service/tuitionService";
import { toast } from "react-toastify";

const PayTuitionManagementPage = () => {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isLoadingPeriods, setIsLoadingPeriods] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingPeriods(true);
        const semRes = await getCurrentSemesterAPI();
        if (semRes.data.code === 1000) {
          const semester = semRes.data.result;
          setCurrentSemester(semester);

          const periodsRes = await getRegistrationPeriodsBySemesterAPI(
            semester.id,
            0,
            1000,
          );
          if (periodsRes.data.code === 1000) {
            const periodsList = periodsRes.data.result.content || [];
            setPeriods(periodsList);

            if (periodsList.length > 0) {
              setSelectedPeriod(periodsList[0].id);
            }
          }
        }
      } catch (error) {
        toast.error("Lỗi khi lấy thông tin đợt đăng ký!");
      } finally {
        setIsLoadingPeriods(false);
      }
    };

    fetchData();
  }, []);

  const handleCalculateTuition = async () => {
    if (!selectedPeriod) {
      return toast.warning("Vui lòng chọn đợt đăng ký để tính học phí!");
    }

    const isConfirm = window.confirm(
      "Bạn có chắc chắn muốn chốt học phí cho đợt đăng ký này?",
    );
    if (!isConfirm) return;

    try {
      setIsGenerating(true);
      const res = await generateTuitionInvoicesAPI(selectedPeriod);

      if (res.data.code === 1000) {
        toast.success(
          res.data.message ||
            `Đã chốt học phí thành công! (${res.data.result} hóa đơn)`,
        );
        setRefreshTrigger((prev) => prev + 1);
      } else {
        toast.error(res.data.message || "Tính học phí thất bại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi kết nối khi tính học phí!",
      );
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Quản lý đóng học phí
        </h2>
      </div>

      <div className="p-4 md:p-8">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">
              Quản lý đóng học phí
            </h1>
            <p className="text-sm md:text-base text-slate-500 mt-1">
              Quản lý thông tin học phí của sinh viên.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-80">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                disabled={
                  isLoadingPeriods || isGenerating || periods.length === 0
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-full bg-white text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#5483B3] disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm truncate"
              >
                {isLoadingPeriods ? (
                  <option value="">Đang tải danh sách...</option>
                ) : periods.length === 0 ? (
                  <option value="">Không có đợt đăng ký nào</option>
                ) : (
                  periods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              onClick={handleCalculateTuition}
              disabled={isGenerating || isLoadingPeriods || !selectedPeriod}
              className="w-full sm:w-auto text-white font-medium border border-[#0A4174] rounded-full px-8 py-3 bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex justify-center items-center gap-2 shadow-sm disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12.71 17.29a1 1 0 0 0-.16-.12a.6.6 0 0 0-.17-.09a.6.6 0 0 0-.19-.06a.93.93 0 0 0-.57.06a.9.9 0 0 0-.54.54a.84.84 0 0 0-.08.38a1 1 0 0 0 .07.38a1.5 1.5 0 0 0 .22.33A1 1 0 0 0 12 19a.84.84 0 0 0 .38-.08a1.2 1.2 0 0 0 .33-.21A1 1 0 0 0 13 18a1 1 0 0 0-.08-.38a1 1 0 0 0-.21-.33m-4.16-4.12a.6.6 0 0 0-.17-.09a.6.6 0 0 0-.19-.08a.86.86 0 0 0-.39 0l-.18.06l-.18.09l-.15.12A1.05 1.05 0 0 0 7 14a1 1 0 0 0 .29.71a1.2 1.2 0 0 0 .33.21A1 1 0 0 0 9 14a1.05 1.05 0 0 0-.29-.71Zm.16 4.12a1 1 0 0 0-.33-.21A1 1 0 0 0 7.8 17l-.18.06a.8.8 0 0 0-.18.09a2 2 0 0 0-.15.12a1 1 0 0 0-.21.33a.94.94 0 0 0 0 .76a1.2 1.2 0 0 0 .21.33A1 1 0 0 0 8 19a.84.84 0 0 0 .38-.08a1.2 1.2 0 0 0 .33-.21a1.2 1.2 0 0 0 .21-.33a.94.94 0 0 0 0-.76a1 1 0 0 0-.21-.33m2.91-4.21a1 1 0 0 0-.33.21A1.05 1.05 0 0 0 11 14a1 1 0 0 0 1.38.92a1.2 1.2 0 0 0 .33-.21A1 1 0 0 0 13 14a1.05 1.05 0 0 0-.29-.71a1 1 0 0 0-1.09-.21m5.09 4.21a1.2 1.2 0 0 0-.33-.21a1 1 0 0 0-1.09.21a1 1 0 0 0-.21.33a.94.94 0 0 0 0 .76a1.2 1.2 0 0 0 .21.33A1 1 0 0 0 16 19a.84.84 0 0 0 .38-.08a1.2 1.2 0 0 0 .33-.21a1 1 0 0 0 .21-1.09a1 1 0 0 0-.21-.33M16 5H8a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1m-1 4H9V7h6Zm3-8H6a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3m1 19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1Zm-2.45-6.83a.6.6 0 0 0-.17-.09a.6.6 0 0 0-.19-.06a.86.86 0 0 0-.39 0l-.18.06l-.18.09l-.15.12A1.05 1.05 0 0 0 15 14a1 1 0 0 0 1.38.92a1.2 1.2 0 0 0 .33-.21A1 1 0 0 0 17 14a1.05 1.05 0 0 0-.29-.71Z"
                  />
                </svg>
              )}
              {isGenerating ? "Đang tính..." : "Tính học phí"}
            </button>
          </div>
        </div>

        <PayTuitionTable refreshTrigger={refreshTrigger}/>
      </div>
    </div>
  );
};

export default PayTuitionManagementPage;
