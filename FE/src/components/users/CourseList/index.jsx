import React, { useEffect, useState } from "react";
import CourseDetail from "../CourseDetail";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { getMyInfoAPI } from "../../../service/userService";
import { getProgramSubjectsAPI } from "../../../service/classSectionService";

const CourseList = () => {
  const [openSubjectId, setOpenSubjectId] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [semesterId, setSemesterId] = useState(null);
  const [studentInfo, setStudentInfo] = useState({ cohortId: "", majorId: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [semRes, userRes] = await Promise.all([
          getCurrentSemesterAPI(),
          getMyInfoAPI(),
        ]);

        if (semRes.data.code === 1000) {
          setSemesterId(semRes.data.result.id);
        }

        if (userRes.data.code === 1000) {
          const sInfo = userRes.data.result.studentInfo;
          if (sInfo) {
            setStudentInfo({
              cohortId: sInfo.cohortId,
              majorId: sInfo.majorId,
            });
          }
        }
      } catch (error) {
        toast.error("Lỗi lấy dữ liệu hệ thống!");
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!studentInfo.cohortId || !studentInfo.majorId) return;

      try {
        setIsLoading(true);
        const res = await getProgramSubjectsAPI(
          studentInfo.cohortId,
          studentInfo.majorId,
          currentPage,
          10,
        );
        if (res.data.code === 1000) {
          setSubjects(res.data.result.content || []);
          setTotalPages(res.data.result.totalPages || 1);
        }
      } catch (error) {
        toast.error("Lỗi lấy danh sách môn học!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, [studentInfo.cohortId, studentInfo.majorId, currentPage]);

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
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
                  STT
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                  Mã học phần
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
                  Tên học phần
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  STC
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center">
                    <div className="w-8 h-8 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : subjects.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    Không có môn học nào đang mở.
                  </td>
                </tr>
              ) : (
                subjects.map((subject, index) => (
                  <React.Fragment key={subject.id}>
                    <tr>
                      <td className="px-6 py-4">
                        {(currentPage - 1) * 10 + index + 1}
                      </td>
                      <td className="px-6 py-4">{subject.subjectCode}</td>
                      <td className="px-6 py-4">{subject.subjectName}</td>
                      <td className="px-6 py-4 text-center">
                        {subject.credits}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            setOpenSubjectId(
                              openSubjectId === subject.subjectId
                                ? null
                                : subject.subjectId,
                            )
                          }
                          className={`font-medium border rounded-full px-5 py-3 transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-sm hover:-translate-y-1 cursor-pointer
                            ${
                              openSubjectId === subject.subjectId
                                ? "bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200"
                                : "text-white border-[#0A4174] bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3]"
                            }`}
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
                              d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
                            />
                          </svg>
                          {openSubjectId === subject.subjectId
                            ? "Đóng lại"
                            : "Đăng ký"}
                        </button>
                      </td>
                    </tr>

                    {openSubjectId === subject.subjectId && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                          <CourseDetail
                            subjectId={subject.subjectId}
                            semesterId={semesterId}
                          />
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

export default CourseList;
