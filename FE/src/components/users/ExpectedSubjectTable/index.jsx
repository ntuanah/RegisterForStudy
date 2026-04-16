import { useEffect, useState } from "react";
import { getProgramSubjectsAPI } from "../../../service/classSectionService";
import { toast } from "react-toastify";

const ExpectedSubjectTable = ({ cohortId, majorId }) => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubjects = async () => {
    // Nếu chưa có khóa hoặc ngành thì không gọi API
    if (!cohortId || !majorId) return;

    try {
      setIsLoading(true);
      const response = await getProgramSubjectsAPI(cohortId, majorId);
      const { data } = response;

      if (data.code === 1000) {
        setSubjects(data.result || []);
      } else {
        toast.error(data.message || "Lỗi lấy danh sách môn học");
        setSubjects([]);
      }
    } catch (error) {
      console.error("Lỗi fetchSubjects:", error);
      toast.error("Không thể tải danh sách môn học!");
      setSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [cohortId, majorId]);

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-5">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-25">
              Mã môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên môn
            </th>

            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30">
              Số tín
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30">
              Yêu cầu
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : subjects.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 text-center text-slate-500 italic"
              >
                Chưa có dữ liệu môn học cho Khóa/Ngành này.
              </td>
            </tr>
          ) : (
            subjects.map((subject, index) => (
              <tr
                key={subject.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-bold text-slate-700">
                  {subject.subjectCode}
                </td>
                <td className="px-6 py-4 font-medium">{subject.subjectName}</td>
                <td className="px-6 py-4 text-center font-semibold text-[#0A4174]">
                  {subject.credits}
                </td>
                <td className="px-6 py-4">
                  {/* Hiển thị Bắt buộc / Tự chọn với màu sắc phân biệt */}
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      subject.sectionTitle.toLowerCase().includes("bắt buộc")
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {subject.sectionTitle}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpectedSubjectTable;
