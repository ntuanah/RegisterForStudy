import { useEffect, useState } from "react";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { getPendingLecturerSubjectsAPI } from "../../../service/scheduleService";

const AssignInstructorsTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPendingSubjects = async () => {
      try {
        setIsLoading(true);
        
        const semesterRes = await getCurrentSemesterAPI();
        const semesterData = semesterRes.data;

        if (semesterData.code === 1000 && semesterData.result?.id) {
          const currentSemesterId = semesterData.result.id;

          const subjectRes = await getPendingLecturerSubjectsAPI(currentSemesterId);
          const subjectData = subjectRes.data;

          if (subjectData.code === 1000) {
            setSubjects(subjectData.result || []);
          } else {
            toast.error(subjectData.message || "Không thể lấy danh sách môn học!");
          }
        } else {
          toast.error("Không tìm thấy thông tin học kỳ hiện tại!");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách môn phân công:", error);
        toast.error("Đã xảy ra lỗi kết nối Server!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingSubjects();
  }, []);

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-40">
              Mã môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 ">
              Tên môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Ngành
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Tiết lý thuyết
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Tiết thực hành
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center">
                <div className="flex justify-center">
                  <div className="w-8 h-8 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </td>
            </tr>
          ) : subjects.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-slate-500 italic">
                Chưa có môn học nào cần phân công giảng viên trong học kỳ này.
              </td>
            </tr>
          ) : (
            subjects.map((subject, index) => (
              <tr key={subject.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-600">
                  {index + 1}
                </td>
                <td className="px-6 py-4  ">
                  {subject.code}
                </td>
                <td className="px-6 py-4 ">
                  {subject.name}
                </td>
                <td className="px-6 py-4">
                  {subject.departmentName || "-"}
                </td>
                <td className="px-6 py-4 font-medium">
                  {subject.theoryPeriod}
                </td>
                <td className="px-6 py-4  font-medium">
                  {subject.practicePeriod}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignInstructorsTable;
