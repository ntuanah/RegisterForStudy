import React from "react";

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
                    section.subjects.map((subject, idx) => (
                      <tr
                        key={subject.id}
                        className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors"
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
                        <td className="px-6 py-3">
                          <div className="flex gap-2 justify-center flex-wrap">
                            {subject.prerequisites &&
                            subject.prerequisites.length > 0 ? (
                              subject.prerequisites.map((prereqCode, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] text-white font-medium border border-[#0A4174] rounded-full px-2 py-0.5 bg-[#5483B3]"
                                >
                                  {prereqCode}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
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
