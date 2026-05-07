import React, { useState } from "react";
import { getSubjectPrerequisitesAPI } from "../../../service/subjectService";
import { toast } from "react-toastify";

const toRoman = (num) => {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let str = "";
  for (let i of Object.keys(roman)) {
    let q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
};

const TrainingProgramTable = ({ programData, isLoading }) => {
  const [openSubjectId, setOpenSubjectId] = useState(null);
  const [prerequisites, setPrerequisites] = useState({});
  const [isLoadingPrereq, setIsLoadingPrereq] = useState(false);

  const handleTogglePrerequisite = async (subjectId) => {
    if (openSubjectId === subjectId) {
      setOpenSubjectId(null);
      return;
    }

    setOpenSubjectId(subjectId);

    if (!prerequisites[subjectId]) {
      try {
        setIsLoadingPrereq(true);
        const res = await getSubjectPrerequisitesAPI(subjectId);
        if (res.data.code === 1000) {
          setPrerequisites((prev) => ({
            ...prev,
            [subjectId]: res.data.result || [],
          }));
        }
      } catch (error) {
        toast.error("Lỗi tải thông tin điều kiện tiên quyết!");
      } finally {
        setIsLoadingPrereq(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!programData || !programData.groups || programData.groups.length === 0) {
    return (
      <div className="text-center p-10 border border-dashed border-slate-300 rounded-xl bg-slate-50 mt-5">
        <p className="text-slate-500 font-medium">
          Chưa có dữ liệu chương trình đào tạo.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5 overflow-hidden overflow-x-auto">
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-15 whitespace-nowrap">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20 whitespace-nowrap">
              Mã môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
              Tên môn
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20 whitespace-nowrap">
              STC
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50 whitespace-nowrap">
              Điều kiện tiên quyết
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {programData.groups.map((group) => (
            <React.Fragment key={group.id}>
              <tr className="bg-slate-200 font-bold text-[#0A4174]">
                <td colSpan={5} className="px-6 py-3 uppercase">
                  {toRoman(group.index)}. {group.name}
                </td>
              </tr>

              {group.sections?.map((section) => (
                <React.Fragment key={section.id}>
                  <tr className="bg-slate-50 border-y border-slate-200">
                    <td
                      colSpan={5}
                      className="px-6 py-2 font-semibold text-slate-700 italic"
                    >
                      {section.title}{" "}
                      {section.requiredCredits > 0 &&
                        `(Yêu cầu: ${section.requiredCredits} tín chỉ)`}
                    </td>
                  </tr>

                  {section.subjects && section.subjects.length > 0 ? (
                    section.subjects.map((subject, idx) => {
                      const currentSubjectId = subject.subjectId || subject.id;

                      return (
                        <React.Fragment key={currentSubjectId}>
                          <tr
                            className={`border-b border-slate-100 hover:bg-blue-50/50 transition-colors ${openSubjectId === currentSubjectId ? "bg-blue-50/30" : ""}`}
                          >
                            <td className="px-6 py-3 text-slate-600 font-medium text-center">
                              {idx + 1}
                            </td>
                            <td className="px-6 py-3 ">
                              {subject.subjectCode}
                            </td>
                            <td className="px-6 py-3 text-slate-800 font-medium">
                              {subject.subjectName}
                            </td>
                            <td className="px-6 py-3 text-center">
                              {subject.credits}
                            </td>
                            <td className="px-6 py-3 text-center">
      
                              <button
                                onClick={() =>
                                  handleTogglePrerequisite(currentSubjectId)
                                }
                                className={`${openSubjectId === currentSubjectId ? "text-[#0A4174]" : "text-[#5483B3]"} hover:text-[#0A4174] cursor-pointer transition-colors`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18px"
                                  height="18px"
                                  viewBox="0 0 2048 2048"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M1024 768q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30m0 640q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20m0-1152q143 0 284 35t266 105t226 170t166 234q40 83 61 171t21 181h-128q0-118-36-221t-99-188t-150-152t-185-113t-209-70t-217-24q-108 0-217 24t-208 70t-186 113t-149 152t-100 188t-36 221H0q0-92 21-180t61-172q64-132 165-233t227-171t266-104t284-36"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>

                          {openSubjectId === currentSubjectId && (
                            <tr className="bg-slate-50 border-b border-slate-200">
                              <td colSpan={5} className="px-10 py-4">
                                <div className="flex items-start gap-3">
                                  <span className="text-sm font-bold text-slate-600 whitespace-nowrap mt-1">
                                    Môn tiên quyết:
                                  </span>

                                  {isLoadingPrereq ? (
                                    <span className="text-sm text-slate-500 italic flex items-center gap-2 mt-1">
                                      <div className="w-4 h-4 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                                      Đang tải...
                                    </span>
                                  ) : prerequisites[currentSubjectId] &&
                                    prerequisites[currentSubjectId].length >
                                      0 ? (
                                    <div className="flex flex-wrap gap-2">
                                      {prerequisites[currentSubjectId].map(
                                        (prereq) => (
                                          <span
                                            key={prereq.id}
                                            className="bg-white border border-slate-300 text-[#0A4174] px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                                          >
                                            {prereq.code} - {prereq.name}
                                          </span>
                                        ),
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-sm text-slate-500 italic mt-1">
                                      Không có điều kiện tiên quyết
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <tr className="border-b border-slate-100">
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-xs text-slate-400 italic"
                      >
                        Chưa có môn học nào thuộc nhóm này
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingProgramTable;
