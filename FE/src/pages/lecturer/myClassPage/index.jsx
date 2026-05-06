import { useEffect, useState } from "react";
import MyClassCard from "../../../components/lecturer/MyClassCard";
import { getMyInfoAPI } from "../../../service/userService";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { toast } from "react-toastify";
import { getLecturerScheduleAPI } from "../../../service/scheduleService";

const MyClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [lecturerCode, setLecturerCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [userRes, semesterRes] = await Promise.all([
          getMyInfoAPI(),
          getCurrentSemesterAPI(),
        ]);

        if (userRes.data.code === 1000) {
          setLecturerCode(
            userRes.data.result.lecturerInfo?.lecturerCode ||
              userRes.data.result.username,
          );
        }

        if (semesterRes.data.code === 1000) {
          setCurrentSemester(semesterRes.data.result);
        }
      } catch (error) {
        toast.error("Lỗi khi tải thông tin dữ liệu ban đầu!");
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!currentSemester?.id || !lecturerCode) return;

      try {
        setIsLoading(true);
        const res = await getLecturerScheduleAPI(
          lecturerCode,
          currentSemester.id,
          currentPage,
          12,
        );

        if (res.data.code === 1000) {
          setClasses(res.data.result.content || []);
          setTotalPages(res.data.result.totalPages || 1);
        }
      } catch (error) {
        toast.error("Lỗi khi tải lịch dạy!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [currentSemester?.id, lecturerCode, currentPage]);

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

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Lớp học của tôi {currentSemester ? `- ${currentSemester.name}` : ""}
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {classes.length === 0 ? (
            <div className="text-center py-20 text-slate-500 italic">
              Không có lớp học nào được phân công trong học kỳ này.
            </div>
          ) : (
            <div className="p-4 md:p-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {classes.map((cls) => (
                <MyClassCard key={cls.id} classData={cls} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="px-10 py-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Trang{" "}
                <span className="font-bold text-[#5483B3]">{currentPage}</span>{" "}
                / {totalPages}
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
        </>
      )}
    </div>
  );
};

export default MyClassPage;
