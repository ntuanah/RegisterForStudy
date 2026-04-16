import React, { useEffect, useState } from "react";
import { getOpenedSubjectsAPI } from "../../../service/classSectionService";
import { toast } from "react-toastify";
import ClassSectionSubTable from "../ClassSectionSubTable";

const ExpectedSemesterTable = ({ refreshTrigger }) => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSubjectId, setExpandedSubjectId] = useState(null);

  const fetchOpenedSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await getOpenedSubjectsAPI();
      const { data } = response;

      if (data.code === 1000) {
        setSubjects(data.result?.content || []);
      } else {
        toast.error(data.message || "Lỗi lấy danh sách môn học");
        setSubjects([]);
      }
    } catch (error) {
      console.error("Lỗi fetchOpenedSubjects:", error);
      toast.error("Không thể tải danh sách môn học đã mở!");
      setSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenedSubjects();
    setExpandedSubjectId(null);
  }, [refreshTrigger]);

  const toggleExpand = (id) => {
    setExpandedSubjectId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-12 ">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24 ">
              Mã môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 ">
              Tên môn học
            </th>
            <th className="px-4 py-2 text-[10px] font-bold text-slate-400 w-20 text-center ">
              Số tín chỉ
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 ">
              Bộ môn
            </th>
            <th className="px-4 py-2 text-[10px] font-bold text-slate-400 w-20 text-center ">
              Lý thuyết
            </th>
            <th className="px-4 py-2 text-[10px] font-bold text-slate-400 w-20 text-center ">
              Thực hành
            </th>
            <th className="px-4 py-2 text-[10px] font-bold text-slate-400 w-16 text-center ">
              Hệ số
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan="9" className="px-6 py-4 text-center text-slate-500">
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
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-[#0A4174]">
                    {subject.code}
                  </td>
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
  );
};

export default ExpectedSemesterTable;
