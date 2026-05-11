import React, { useEffect, useState } from "react";
import { getOpenedSubjectsAPI } from "../../../service/classSectionService";
import { toast } from "react-toastify";
import ClassSectionSubTable from "../ClassSectionSubTable";

const ExpectedSemesterTable = ({ refreshTrigger }) => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSubjectId, setExpandedSubjectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOpenedSubjects = async (page) => {
    try {
      setIsLoading(true);
      const apiPage = page - 1;

      const response = await getOpenedSubjectsAPI(apiPage);
      const { data } = response;

      if (data.code === 1000 || data.code === 200) {
        setSubjects(data.result?.content || []);
        setTotalPages(data.result?.totalPages || 1);
      } else {
        toast.error(data.message || "Lỗi lấy danh sách môn học");
        setSubjects([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Lỗi fetchOpenedSubjects:", error);
      toast.error("Không thể tải danh sách môn học đã mở!");
      setSubjects([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenedSubjects(currentPage);
    setExpandedSubjectId(null);
  }, [refreshTrigger, currentPage]);

  const toggleExpand = (id) => {
    setExpandedSubjectId((prev) => (prev === id ? null : id));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
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

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-12 whitespace-nowrap">
                STT
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24 whitespace-nowrap">
                Mã môn
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                Tên môn học
              </th>
              <th className="px-4 py-2 text-[10px] font-bold text-slate-400 w-20 text-center whitespace-nowrap">
                Số tín chỉ
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 whitespace-nowrap">
                Bộ môn
              </th>
              <th className="px-4 py-2 text-[10px] font-bold text-slate-400 w-20 text-center whitespace-nowrap">
                Lý thuyết
              </th>
              <th className="px-4 py-2 text-[10px] font-bold text-slate-400 w-20 text-center whitespace-nowrap">
                Thực hành
              </th>
              <th className="px-4 py-2 text-[10px] font-bold text-slate-400 w-16 text-center whitespace-nowrap">
                Hệ số
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-4 text-center text-slate-500"
                >
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : subjects.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-4 text-center text-slate-500 italic"
                >
                  Chưa có môn học nào được mở.
                </td>
              </tr>
            ) : (
              subjects.map((subject, index) => (
                <React.Fragment key={subject.id}>
                  <tr
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedSubjectId === subject.id ? "bg-blue-50" : ""}`}
                    onClick={() => toggleExpand(subject.id)}
                  >
                    <td className="px-6 py-4">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium ">{subject.code}</td>
                    <td className="px-6 py-4 font-medium">{subject.name}</td>
                    <td className="px-4 py-4 text-center">{subject.credits}</td>
                    <td className="px-6 py-4">{subject.departmentName}</td>
                    <td className="px-4 py-4 text-center">
                      {subject.theoryPeriod}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {subject.practicePeriod}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {subject.coefficient}
                    </td>
                  </tr>

                  {expandedSubjectId === subject.id && (
                    <tr>
                      <td colSpan="8" className="">
                        <ClassSectionSubTable subjectId={subject.id} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-blue-50 rounded-b-xl">
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
  );
};

export default ExpectedSemesterTable;
