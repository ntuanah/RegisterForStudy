import { useEffect, useState } from "react";
import { getUnassignedSchedulesAPI } from "../../../service/scheduleService";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { toast } from "react-toastify";
import PracticeClassCard from "../../dean/PracticeClassCard";
import TheoryClassCard from "../../dean/TheoryClassCard";

const UnassignedClassesList = () => {
  const [unassignedList, setUnassignedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSemesterId, setCurrentSemesterId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUnassigned = async (semesterId, page) => {
    try {
      setIsLoading(true);
      const apiPage = page - 1;
      const res = await getUnassignedSchedulesAPI(semesterId, apiPage);

      if (res.data.code === 1000) {
        setUnassignedList(res.data.result?.content || []);
        setTotalPages(res.data.result?.totalPages || 1);
      } else {
        toast.error("Lỗi lấy danh sách chưa xếp lịch");
      }
    } catch (error) {
      toast.error("Không thể tải danh sách chưa xếp lịch");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSemesterAndData = async () => {
      try {
        setIsLoading(true);
        const semesterRes = await getCurrentSemesterAPI();
        if (semesterRes.data.code === 1000 && semesterRes.data.result?.id) {
          const fetchedSemesterId = semesterRes.data.result.id;
          setCurrentSemesterId(fetchedSemesterId);
          fetchUnassigned(fetchedSemesterId, currentPage);
        } else {
          toast.error("Không tìm thấy học kỳ hiện tại!");
        }
      } catch (error) {
        toast.error("Lỗi kết nối máy chủ!");
      }
    };

    fetchSemesterAndData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
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
  return (
    <div className="border border-slate-200 rounded-xl shadow-sm bg-blue-50 flex flex-col h-full max-h-[850px]">
      <div className="p-5 border-b border-slate-200 bg-white rounded-t-xl flex justify-between items-center shadow-sm z-10">
        <div>
          <h3 className="font-bold text-[#0A4174] text-xl">
            Các lớp chưa hoàn tất xếp lịch
          </h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-5">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : unassignedList.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-blue-200">
            <p className="text-lg font-bold text-slate-600">
              Tất cả các lớp đã được xếp lịch hoàn tất!
            </p>
          </div>
        ) : (
          unassignedList.map((item, index) => {
            const fakeClassObject = {
              id: item.classSectionId,
              sectionCode: item.sectionCode,
              capacity: "40",
              schedules: [
                {
                  id: item.id,
                  roomId: item.roomId,
                  roomName: item.roomName,
                  lecturerId: item.lecturerId,
                  lecturerCode: item.lecturerCode,
                  lecturerName: item.lecturerName,
                  dayOfWeekName: item.dayOfWeekName,
                  startPeriod: item.startPeriod,
                  endPeriod: item.endPeriod,
                },
              ],
              children: [],
            };

            const STT = (currentPage - 1) * 10 + index + 1;
            const isPractice = item.sectionCode?.toUpperCase().includes("TH");

            return (
              <div key={item.id} className="relative mt-3">
                <div className="absolute -top-4 left-4 bg-blue-50 text-[#5483B3] border border-[#0A4174] text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                  {item.subjectCode} - {item.subjectName}
                </div>

                {isPractice ? (
                  <div className="pt-2">
                    <PracticeClassCard
                      practiceClass={fakeClassObject}
                      index={STT}
                      refresh={() =>
                        fetchUnassigned(currentSemesterId, currentPage)
                      }
                    />
                  </div>
                ) : (
                  <div className="pt-2">
                    <TheoryClassCard
                      theoryClass={fakeClassObject}
                      index={STT}
                      refresh={() =>
                        fetchUnassigned(currentSemesterId, currentPage)
                      }
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white rounded-b-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
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
                    ? "border-slate-200 text-slate-300 bg-gray-50 cursor-not-allowed"
                    : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-blue-50 hover:border-[#0A4174] cursor-pointer"
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
                    ? "border-slate-200 text-slate-300 bg-gray-50 cursor-not-allowed"
                    : "border-[#0A4174] text-[#5483B3] bg-white hover:bg-blue-50 hover:border-[#0A4174] cursor-pointer"
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
  );
};

export default UnassignedClassesList;
