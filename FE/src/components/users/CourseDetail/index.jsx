import React, { useEffect, useState } from "react";
import { getClassSectionsBySubjectAPI } from "../../../service/classSectionService";

const CourseDetail = ({ subjectId, semesterId }) => {
  const [classSections, setClassSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTheory, setSelectedTheory] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null);

  useEffect(() => {
    const fetchClassSections = async () => {
      if (!subjectId || !semesterId) return;

      try {
        setIsLoading(true);
        const res = await getClassSectionsBySubjectAPI(subjectId, semesterId);
        if (res.data.code === 1000) {
          setClassSections(res.data.result || []);
        }
      } catch (error) {
        toast.error("Lỗi lấy danh sách lớp học phần!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchClassSections();
  }, [subjectId, semesterId]);

  const formatSchedules = (schedules) => {
    if (!schedules || schedules.length === 0) return "Chưa xếp lịch";
    return schedules
      .map(
        (s) =>
          `${s.dayOfWeekName}, Tiết ${s.startPeriod}-${s.endPeriod}, ${s.roomName}`,
      )
      .join(" | ");
  };

  const formatLecturers = (schedules) => {
    if (!schedules || schedules.length === 0) return "Chưa phân công";
    const names = [...new Set(schedules.map((s) => s.lecturerName))].filter(
      Boolean,
    );
    return names.length > 0 ? names.join(", ") : "Chưa phân công";
  };

  const handleRegister = () => {
    if (!selectedTheory) {
      return toast.warning("Vui lòng chọn 1 lớp Lý thuyết!");
    }
    const theoryClass = classSections.find((c) => c.id === selectedTheory);
    if (theoryClass?.children?.length > 0 && !selectedPractice) {
      return toast.warning("Vui lòng chọn 1 nhóm Thực hành đi kèm!");
    }

    toast.success("Giả lập Đăng ký thành công (Chờ nối API Enroll)!");
    console.log(
      "Lý thuyết ID:",
      selectedTheory,
      "Thực hành ID:",
      selectedPractice,
    );
  };

  return (
    <div>
      <div className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            DANH SÁCH LỚP HỌC PHẦN ĐANG MỞ
          </span>
        </div>

        <div className="">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
                  Chọn
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35">
                  Loại
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
                  Mã LHP
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  SL tối đa
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  Còn lại
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-60">
                  GV
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-60">
                  Lịch học
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <div className="w-6 h-6 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : classSections.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500 italic">
                    Chưa có lớp học phần nào được mở cho môn này.
                  </td>
                </tr>
              ) : (
                classSections.map((section) => (
                  <React.Fragment key={section.id}>
                    <tr className={selectedTheory === section.id ? "bg-blue-50/50" : ""}>
                      <td className="px-6 py-4">
                        <input
                          type="radio"
                          name={`theory-${subjectId}`}
                          checked={selectedTheory === section.id}
                          onChange={() => {
                            setSelectedTheory(section.id);
                            setSelectedPractice(null); 
                          }}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">Lý thuyết</td>
                      <td className="px-6 py-4 ">{section.sectionCode}</td>
                      <td className="px-6 py-4 text-center">{section.capacity}</td>
                      <td className="px-6 py-4 text-center text-red-600">
                        {section.capacity - section.enrolledCount}
                      </td>
                      <td className="px-6 py-4">{formatLecturers(section.schedules)}</td>
                      <td className="px-6 py-4">{formatSchedules(section.schedules)}</td>
                    </tr>

                    {selectedTheory === section.id && section.children && section.children.length > 0 && (
                      <>
                        <tr className="bg-slate-50">
                          <td colSpan="7" className="px-6 py-2 font-semibold text-slate-600">
                            Lớp thực hành:
                          </td>
                        </tr>
                        {section.children.map((child) => (
                          <tr key={child.id} className={selectedPractice === child.id ? "bg-blue-50" : ""}>
                            <td className="px-6 py-4 pl-10">
                              <input
                                type="radio"
                                name={`practice-${section.id}`}
                                checked={selectedPractice === child.id}
                                onChange={() => setSelectedPractice(child.id)}
                                className="cursor-pointer"
                              />
                            </td>
                            <td className="px-6 py-4">Thực hành</td>
                            <td className="px-6 py-4 ">{child.sectionCode}</td>
                            <td className="px-6 py-4 text-center">{child.capacity}</td>
                            <td className="px-6 py-4 text-center text-red-600 ">
                              {child.capacity - child.enrolledCount}
                            </td>
                            <td className="px-6 py-4">{formatLecturers(child.schedules)}</td>
                            <td className="px-6 py-4">{formatSchedules(child.schedules)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="9" className="py-4 bg-slate-50 border-b border-slate-200"></td>
                        </tr>
                      </>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
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
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
