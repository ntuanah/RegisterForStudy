import React, { useEffect, useState } from "react";
import { getProgramTreeAPI, removeSubjectFromProgramSectionAPI } from "../../../service/programService";
import { toast } from "react-toastify";
import AddSubjectTrainingProgram from "../Modal/AddSubjectTrainingProgram";

const TrainingProgramTable = ({ programId }) => {
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTreeData = async () => {
    if (!programId) return;
    try {
      setIsLoading(true);
      const response = await getProgramTreeAPI(programId);
      const { data } = response;

      if (data.code === 1000) {
        setTreeData(data.result);
      } else {
        toast.error(data.message || "Lỗi lấy cấu trúc chương trình!");
      }
    } catch (error) {
      toast.error("Không thể tải cấu trúc chương trình đào tạo!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTreeData();
  }, [programId]);

  const handleDeleteSubject = async (sectionId, subjectId) => {
    const isConfirm = window.confirm(
      "Bạn có chắc chắn muốn xóa môn học này khỏi chương trình đào tạo không?",
    );
    if (!isConfirm) return;

    try {
      const response = await removeSubjectFromProgramSectionAPI(
        sectionId,
        subjectId,
      );
      const { data } = response;

      if (data.code === 1000) {
        toast.success("Xóa môn học thành công!");
        fetchTreeData();
      } else {
        toast.error(data.message || "Xóa môn học thất bại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi kết nối khi xóa môn học!",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="border border-slate-200 rounded-xl shadow-sm p-5 text-center text-slate-500">
        Đang tải chi tiết chương trình đào tạo...
      </div>
    );
  }

  if (!treeData || !treeData.groups || treeData.groups.length === 0) {
    return (
      <div className="border border-slate-200 rounded-xl shadow-sm p-5 text-center text-slate-500">
        Chưa có dữ liệu môn học cho chương trình này.
      </div>
    );
  }

  const toRoman = (num) => {
    const roman = [
      "O",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "XIII",
      "XIV",
      "XV",
    ];
    return roman[num] || num;
  };

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-15">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              Mã môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              STC
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Điều kiện tiên quyết
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-15 text-center">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {treeData.groups
            .sort((a, b) => a.index - b.index)
            .map((group) => (
              <React.Fragment key={group.id}>
                <tr className="bg-slate-200 font-semibold">
                  <td colSpan={6} className="px-6 py-3 uppercase">
                    {toRoman(group.index)}. {group.name}
                  </td>
                </tr>

                {group.sections.map((section) => (
                  <React.Fragment key={section.id}>
                    <tr className="bg-slate-100">
                      <td colSpan={6} className="px-6 py-2 font-medium">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span>{section.title}</span>
                            {section.requiredCredits > 0 && (
                              <span className="text-[11px] font-normal text-slate-500 border border-slate-300 rounded px-2 py-0.5 bg-white">
                                Yêu cầu: {section.requiredCredits} TC
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => setSelectedSectionId(section.id)}
                            className="text-[#5483B3] hover:text-[#0A4174] cursor-pointer "
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
                                d="M4 12h8m0 0h8m-8 0V4m0 8v8"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {section.subjects && section.subjects.length > 0 ? (
                      section.subjects.map((subject, index) => (
                        <tr
                          key={subject.id}
                          className="border-t border-slate-100 za"
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{subject.subjectCode}</td>
                          <td className="px-6 py-4">{subject.subjectName}</td>
                          <td className="px-6 py-4">{subject.credits}</td>
                          <td className="px-6 py-4">-</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() =>
                                handleDeleteSubject(
                                  section.id,
                                  subject.subjectId,
                                )
                              }
                              className="text-red-400 hover:text-red-600 cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-t border-slate-100">
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-slate-400 italic text-xs"
                        >
                          Chưa có môn học nào trong phần này
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
        </tbody>
      </table>

      {selectedSectionId && (
        <AddSubjectTrainingProgram
          sectionId={selectedSectionId}
          close={() => setSelectedSectionId(null)}
          refresh={fetchTreeData}
        />
      )}
    </div>
  );
};

export default TrainingProgramTable;
