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

  const fetchSubjects = async (searchWord = keyword) => {
    try {
      setIsLoading(true);

      let response;
      if (searchWord && searchWord.trim() !== "") {
        response = await searchSubjectAPI(searchWord);
      } else {
        response = await getAllSubjectsAPI();
      }

      const data = response.data;

      if (data.code === 200) {
        setSubjects(data.result);
      } else {
        toast.error(data.message || "Lỗi lấy dữ liệu từ server");
        setSubjects([]);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách môn học!");
      setSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSubjects(keyword);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, refresh]);

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

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-15">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30">
              Mã môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              STC
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              Hệ số
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Khoa
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center text-slate-500">
                Đang tìm kiếm...
              </td>
            </tr>
          ) : subjects.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center text-slate-500">
                Không tìm thấy môn học nào phù hợp.
              </td>
            </tr>
          ) : (
            subjects.map((subject, index) => (
              <tr
                key={subject.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-slate-700">
                  {subject.code}
                </td>
                <td className="px-6 py-4">{subject.name}</td>
                <td className="px-6 py-4 text-center">{subject.credits}</td>
                <td className="px-6 py-4 text-center">{subject.coefficient}</td>
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

      {editSubjectId && (
        <EditSubject
          id={editSubjectId}
          close={() => setEditSubjectId(null)}
          refresh={() => fetchSubjects()}
        />
      )}
    </div>
  );
};

export default SubjectTable;
