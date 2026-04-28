import AssignInstructorsTable from "../../../components/departmentHead/AssignInstructorsTable";

const AssignInstructorsPage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Phân công giảng viên
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Phân cồng giảng viên
            </h1>
            <p className="text-slate-500 mt-1">
              Quản lý và điều phối giảng viên giảng dạy cho các học phần.
            </p>
          </div>

        </div>

        <AssignInstructorsTable />
      </div>
    </div>
  );
};

export default AssignInstructorsPage;
