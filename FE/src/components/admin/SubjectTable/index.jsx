import { useEffect, useState } from "react";
import EditSubject from "../Modal/EditSubject";
import {
  deleteSubjectAPI,
  getAllSubjectsAPI,
  searchSubjectAPI,
} from "../../../service/subjectService";
import { toast } from "react-toastify";

const SubjectTable = ({ keyword, refresh }) => {
  const [editSubjectId, setEditSubjectId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSubjects = async (searchWord = keyword, page) => {
    try {
      setIsLoading(true);
      const apiPage = page - 1;

      let response;
      if (searchWord && searchWord.trim() !== "") {
        response = await searchSubjectAPI(searchWord, apiPage);
      } else {
        response = await getAllSubjectsAPI(apiPage);
      }

      const data = response.data;

      if (data.code === 200 || data.code === 1000) {
        setSubjects(data.result?.content || []);
        setTotalPages(data.result?.totalPages || 1);
      } else {
        toast.error(data.message || "Lỗi lấy dữ liệu từ server");
        setSubjects([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Lỗi fetchSubjects:", error);
      toast.error("Không thể tải danh sách môn học!");
      setSubjects([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSubjects(keyword, currentPage);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, refresh, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa môn học này không?")) {
      try {
        const response = await deleteSubjectAPI(id);
        const { data } = response;

        if (data.code === 200) {
          toast.success("Xóa môn học thành công!");
          fetchSubjects(keyword);
        } else {
          toast.error(data.message || "Xóa thất bại!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Lỗi kết nối khi xóa!");
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-15 whitespace-nowrap">
                STT
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30 whitespace-nowrap">
                Mã môn
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                Tên môn
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20 whitespace-nowrap">
                STC
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20 whitespace-nowrap">
                Hệ số
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 whitespace-nowrap">
                Khoa
              </th>
              <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30 whitespace-nowrap">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-center text-slate-500"
                >
                  Đang tìm kiếm...
                </td>
              </tr>
            ) : subjects.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-center text-slate-500"
                >
                  Không tìm thấy môn học nào phù hợp.
                </td>
              </tr>
            ) : (
              subjects.map((subject, index) => (
                <tr
                  key={subject.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {subject.code}
                  </td>
                  <td className="px-6 py-4">{subject.name}</td>
                  <td className="px-6 py-4 text-center">{subject.credits}</td>
                  <td className="px-6 py-4 text-center">
                    {subject.coefficient}
                  </td>
                  <td className="px-6 py-4">{subject.departmentName}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-4 text-[#5483B3]">
                      <svg
                        onClick={() => setEditSubjectId(subject.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        className="cursor-pointer hover:text-blue-700 transition"
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

                      <svg
                        onClick={() => handleDelete(subject.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        className="cursor-pointer hover:text-red-700 transition"
                      >
                        <path
                          fill="red"
                          d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
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

      {editSubjectId && (
        <EditSubject
          id={editSubjectId}
          close={() => setEditSubjectId(null)}
          refresh={() => fetchSubjects(keyword, currentPage)}
        />
      )}
    </div>
  );
};

export default SubjectTable;
