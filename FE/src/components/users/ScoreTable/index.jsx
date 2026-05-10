import React, { useEffect, useState } from "react";
import { getMyTranscriptTreeAPI } from "../../../service/gradeService";
import { toast } from "react-toastify";

const toRoman = (num) => {
  const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  return roman[num] || num;
};

const ScoreTable = () => {
  const [transcriptData, setTranscriptData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        setIsLoading(true);
        const response = await getMyTranscriptTreeAPI();
        const { data } = response;

        if (data.code === 1000 || data.code === 200) {
          setTranscriptData(data.result);
        } else {
          toast.error(data.message || "Lỗi khi lấy dữ liệu bảng điểm!");
        }
      } catch (error) {
        console.error("Lỗi fetchTranscript:", error);
        toast.error("Không thể kết nối đến server để lấy bảng điểm!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranscript();
  }, []);

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
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35 whitespace-nowrap">
              Điểm quá trình
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35 whitespace-nowrap">
              Điểm cuối kỳ
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35 whitespace-nowrap">
              Điểm tổng kết
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35 whitespace-nowrap">
              Điểm chữ
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {isLoading ? (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-slate-500">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                    Đang tải dữ liệu bảng điểm...
                  </div>
                </td>
              </tr>
            ) : !transcriptData || !transcriptData.subjectGroups || transcriptData.subjectGroups.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-slate-500 italic">
                  Chưa có dữ liệu bảng điểm.
                </td>
              </tr>
            ) : (
              transcriptData.subjectGroups.map((group, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  <tr className="bg-slate-200 font-semibold text-[#0A4174]">
                    <td colSpan={8} className="px-6 py-3 uppercase">
                      {toRoman(groupIndex + 1)}. {group.groupName.trim()}
                    </td>
                  </tr>

                  {group.sections.map((section, sectionIndex) => (
                    <React.Fragment key={`${groupIndex}-${sectionIndex}`}>
                      <tr className="bg-slate-100 text-slate-700">
                        <td colSpan={8} className="px-6 py-2.5 font-medium italic">
                          {section.sectionTitle}
                        </td>
                      </tr>

                      {section.subjects.map((subject, subjectIndex) => (
                        <tr key={subject.subjectId} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-center">
                            {subjectIndex + 1}
                          </td>
                          <td className="px-6 py-4 ">
                            {subject.subjectCode}
                          </td>
                          <td className="px-6 py-4 ">
                            {subject.subjectName}
                          </td>
                          <td className="px-4 py-4 text-center ">
                            {subject.credits}
                          </td>
                          
                          <td className="px-4 py-4 text-center">
                            {subject.midtermScore !== null ? subject.midtermScore : "-"}
                          </td>
                          <td className="px-4 py-4 text-center ">
                            {subject.finalScore !== null ? subject.finalScore : "-"}
                          </td>
                          <td className="px-4 py-4 text-center font-bold text-[#5483B3]">
                            {subject.totalScore !== null ? subject.totalScore : "-"}
                          </td>
                          
                          <td className="px-4 py-4 text-center">
                            {subject.letterGrade ? (
                              <span className={`font-bold ${subject.isPassed === false ? "text-red-500" : "text-slate-800"}`}>
                                {subject.letterGrade}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
