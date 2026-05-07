import React, { useEffect, useState } from "react";
import { getCurrentSemesterAPI } from "../../../service/semesterService";
import { getPendingLecturerSubjectsAPI } from "../../../service/scheduleService";
import TheoryClassCard from "../TheoryClassCard";
import { getClassSectionsBySubjectAPI } from "../../../service/classSectionService";

const AssignInstructorsTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSubjectId, setExpandedSubjectId] = useState(null);
  const [classSections, setClassSections] = useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);

  const refreshClasses = async (subjectId) => {
    try {
      const res = await getClassSectionsBySubjectAPI(subjectId);
      if (res.data.code === 1000) {
        setClassSections(res.data.result || []);
      }
    } catch (error) {
      console.error("Lỗi khi refresh lớp học phần:", error);
    }
  };

  const handleToggle = async (subjectId) => {
    if (expandedSubjectId === subjectId) {
      setExpandedSubjectId(null);
      setClassSections([]);
      return;
    }

    setExpandedSubjectId(subjectId);
    try {
      setIsLoadingClasses(true);
      const res = await getClassSectionsBySubjectAPI(subjectId);
      if (res.data.code === 1000) {
        setClassSections(res.data.result || []);
      } else {
        toast.error("Không lấy được danh sách lớp học phần!");
        setClassSections([]);
      }
    } catch (error) {
      toast.error("Lỗi khi tải chi tiết lớp học phần!");
      setClassSections([]);
    } finally {
      setIsLoadingClasses(false);
    }
  };

  useEffect(() => {
    const fetchPendingSubjects = async () => {
      try {
        setIsLoading(true);

        const semesterRes = await getCurrentSemesterAPI();
        const semesterData = semesterRes.data;

        if (semesterData.code === 1000 && semesterData.result?.id) {
          const currentSemesterId = semesterData.result.id;

          const subjectRes =
            await getPendingLecturerSubjectsAPI(currentSemesterId);
          const subjectData = subjectRes.data;

          if (subjectData.code === 1000) {
            setSubjects(subjectData.result || []);
          } else {
            toast.error(
              subjectData.message || "Không thể lấy danh sách môn học!",
            );
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
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5 overflow-x-auto">
      <table className="w-full min-w-[1000px] text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20 whitespace-nowrap">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-40 whitespace-nowrap">
              Mã môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
              Tên môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 whitespace-nowrap">
              Ngành
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 whitespace-nowrap">
              Tiết lý thuyết
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 whitespace-nowrap">
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
              <td
                colSpan={6}
                className="px-6 py-10 text-center text-slate-500 italic"
              >
                Chưa có môn học nào cần phân công giảng viên trong học kỳ này.
              </td>
            </tr>
          ) : (
            subjects.map((subject, index) => (
              <React.Fragment key={subject.id}>
                <tr
                  onClick={() => handleToggle(subject.id)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{subject.code}</td>
                  <td className="px-6 py-4">{subject.name}</td>
                  <td className="px-6 py-4">{subject.departmentName || "-"}</td>
                  <td className="px-6 py-4 font-medium">
                    {subject.theoryPeriod}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {subject.practicePeriod}
                  </td>
                </tr>

                {expandedSubjectId === subject.id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-slate-50">
                      {isLoadingClasses ? (
                        <div className="flex justify-center py-5">
                          <div className="w-6 h-6 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : classSections.length === 0 ? (
                        <p className="text-center text-slate-500 italic py-5">
                          Môn học này chưa được tạo lớp học phần.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {classSections.map((classItem, idx) => (
                            <TheoryClassCard 
                              key={classItem.id} 
                              theoryClass={classItem} 
                              index={idx + 1} 
                              refresh={() => refreshClasses(subject.id)}
                            />
                          ))}
                        </div>
                      )}
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

export default AssignInstructorsTable;
