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

          <div className="flex gap-3">
            <div className="w-60">
              <select
                name=""
                id=""
                className="w-full px-5 py-3 rounded-full border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option>Ẩm thực Việt Nam</option>
                <option>Kỹ năng sống</option>
                <option>abc</option>
                <option>xyz</option>
              </select>
            </div>

            <div className="">
              <button className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
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
                    d="M16.25 21v-4.765a1.59 1.59 0 0 0-1.594-1.588H9.344a1.59 1.59 0 0 0-1.594 1.588V21m8.5-17.715v2.362a1.59 1.59 0 0 1-1.594 1.588H9.344A1.59 1.59 0 0 1 7.75 5.647V3m8.5.285A3.2 3.2 0 0 0 14.93 3H7.75m8.5.285c.344.156.661.374.934.645l2.382 2.375A3.17 3.17 0 0 1 20.5 8.55v9.272A3.18 3.18 0 0 1 17.313 21H6.688A3.18 3.18 0 0 1 3.5 17.823V6.176A3.18 3.18 0 0 1 6.688 3H7.75"
                  />
                </svg>
                Lưu phân công
              </button>
            </div>
          </div>
        </div>

        <AssignInstructorsTable />
      </div>
    </div>
  );
};

export default AssignInstructorsPage;
