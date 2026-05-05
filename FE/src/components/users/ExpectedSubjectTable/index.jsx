import React, { useEffect, useState } from "react";
import { getProgramSubjectsAPI } from "../../../service/classSectionService";
import { toast } from "react-toastify";
import { getMyInfoAPI } from "../../../service/userService";

const ExpectedSubjectTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({
    cohortId: null,
    majorId: null,
  });

  const fetchStudentInfo = async () => {
    try {
      const response = await getMyInfoAPI();
      const { data } = response;

      console.log("Kết quả API Info:", data);

      if (data.code === 1000 || data.code === 200) {
        const info = data.result?.studentInfo;
        if (info && info.cohortId && info.majorId) {
          console.log(
            "-> Đã thấy cohortId:",
            info.cohortId,
            "và majorId:",
            info.majorId,
          );
          setStudentInfo({
            cohortId: info.cohortId,
            majorId: info.majorId,
          });
        } else {
          toast.error("Không tìm thấy Khóa và Ngành của sinh viên!");
          setIsLoading(false);
        }
      } else {
        toast.error(data.message || "Không thể lấy thông tin sinh viên");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Lỗi fetchStudentInfo:", error);
      toast.error("Lỗi kết nối khi lấy thông tin cá nhân!");
      setIsLoading(false);
    }
  };

  const fetchSubjects = async () => {
    const { cohortId, majorId } = studentInfo;

    if (!cohortId || !majorId) return;

    try {
      console.log(
        "2. Đang gọi API lấy danh sách môn học với Khóa:",
        cohortId,
        "Ngành:",
        majorId,
      );
      setIsLoading(true);
      const response = await getProgramSubjectsAPI(cohortId, majorId);
      const { data } = response;

      console.log("Kết quả API Môn học:", data);

      if (data.code === 1000 || data.code === 200) {
        setSubjects(data.result?.content || []);
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
    fetchStudentInfo();
  }, []);

  useEffect(() => {
    if (studentInfo.cohortId && studentInfo.majorId) {
      fetchSubjects();
    }
  }, [studentInfo.cohortId, studentInfo.majorId]);

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
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Yêu cầu
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-4 border-blue-200 border-t-[#0A4174] rounded-full animate-spin"></div>
                  Đang tải chương trình đào tạo...
                </div>
              </td>
            </tr>
          ) : !studentInfo.cohortId || !studentInfo.majorId ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 text-center text-slate-500 italic"
              >
                Không tìm thấy thông tin Khóa/Ngành của bạn.
              </td>
            </tr>
          ) : subjects.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 text-center text-slate-500 italic"
              >
                Chưa có dữ liệu môn học cho Khóa/Ngành của bạn.
              </td>
            </tr>
          ) : (
            subjects.map((subject, index) => (
              <tr
                key={subject.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 ">
                  {subject.subjectCode}
                </td>
                <td className="px-6 py-4 font-medium">{subject.subjectName}</td>
                <td className="px-6 py-4 ">
                  {subject.credits}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      subject.sectionTitle.toLowerCase().includes("bắt buộc")
                        ? "bg-blue-100 text-[#5483B3]"
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
