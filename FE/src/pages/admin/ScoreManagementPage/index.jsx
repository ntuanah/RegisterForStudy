import { useState } from "react";
import ScoreTable from "../../../components/admin/ScoreTable";

const ScoreManagementPage = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <div className="p-4 md:p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Quản lý điểm số
        </h2>
      </div>

      <div className="p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">
            Quản lý điểm số
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Tra cứu môn học và cập nhật điểm số sinh viên theo từng lớp học phần.
          </p>
        </div>


        <ScoreTable />
      </div>
    </div>
  );
};

export default ScoreManagementPage; 