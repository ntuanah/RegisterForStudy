const ScoreTable = () => {
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
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35">
              Điểm quá trình
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35">
              Điểm cuối kỳ
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35">
              Điểm tổng kết
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-35">
              Điểm chữ
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          <tr className="bg-slate-200 font-semibold">
            <td colSpan={8} className="px-6 py-3">
              I. Các học phần lý luận chính trị
            </td>
          </tr>

          <tr className="bg-slate-100">
            <td colSpan={8} className="px-6 py-2 font-medium">
              Bắt buộc
            </td>
          </tr>

          <tr className="border-t border-slate-100">
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">ML113</td>
            <td className="px-6 py-4">Triết học Mác - Lênin</td>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">B</td>
          </tr>

          <tr className="border-t border-slate-100">
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">ML114</td>
            <td className="px-6 py-4">Kinh tế chính trị Mác - Lênin</td>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">B</td>
          </tr>

          <tr className="bg-slate-200 font-semibold">
            <td colSpan={8} className="px-6 py-3">
              II. Các học phần ngoại ngữ đại cương
            </td>
          </tr>

          <tr className="bg-slate-100">
            <td colSpan={8} className="px-6 py-2 font-medium">
              Bắt buộc
            </td>
          </tr>

          <tr className="border-t border-slate-100">
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">GE111</td>
            <td className="px-6 py-4">Tiếng Anh sơ cấp 1</td>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">B</td>
          </tr>

          <tr className="border-t border-slate-100">
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">GE112</td>
            <td className="px-6 py-4">Tiếng Anh sơ cấp 2</td>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">8</td>
            <td className="px-6 py-4">B</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
