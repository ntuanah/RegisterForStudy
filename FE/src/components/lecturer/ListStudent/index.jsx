import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getClassSectionGradesAPI } from "../../../service/gradeService";

const ListStudent = ({ close, classSectionId }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!classSectionId) return;
      
      try {
        setIsLoading(true);
        const res = await getClassSectionGradesAPI(classSectionId);
        
        if (res.data.code === 1000) {
          setStudents(res.data.result || []);
        } else {
          toast.error(res.data.message || "Lỗi tải danh sách sinh viên!");
        }
      } catch (error) {
        toast.error("Lỗi kết nối khi tải danh sách sinh viên!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [classSectionId]);
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] lg:w-3/4 rounded-xl p-4 md:p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Danh sách sinh viên</h2>

          <button
            onClick={close}
            className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20 whitespace-nowrap">
                  STT
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32 whitespace-nowrap">
                  Mã sinh viên
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                  Tên sinh viên
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-40 whitespace-nowrap">
                  Lớp
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35 whitespace-nowrap">
                  Điểm quá trình
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24 whitespace-nowrap">
                  Điểm thi
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24 whitespace-nowrap">
                  Điểm tổng kết
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center">
                    <div className="flex justify-center items-center gap-2 text-[#5483B3]">
                      <div className="w-5 h-5 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                      Đang tải danh sách...
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-500 italic">
                    Chưa có sinh viên nào trong danh sách.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.studentId || index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{student.studentCode}</td>
                    <td className="px-6 py-4 ">{student.studentName}</td>
                    <td className="px-6 py-4 ">{student.adminClassName || "-"}</td>
                    <td className="px-6 py-4 text-center ">
                      {student.midtermScore !== null ? student.midtermScore : "-"}
                    </td>
                    <td className="px-6 py-4 text-center ">
                      {student.finalScore !== null ? student.finalScore : "-"}
                    </td>
                    <td className="px-6 py-4 text-center ">
                      {student.totalScore !== null ? student.totalScore : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListStudent;
