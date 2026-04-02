import { useState } from "react";
import MajorTable from "../../../components/admin/MajorTable";
import AddMajor from "../../../components/admin/Modal/AddMajor";

const MajorManagementPage = () => {
  const [openAddMajor, setOpenAddMajor] = useState(false);
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Quản lý ngành học
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Quản lý ngành học
            </h1>
            <p className="text-slate-500 mt-1">
              Quản lý thông tin của các ngành học.
            </p>
          </div>

          <div className="">
            <button
              onClick={() => setOpenAddMajor(true)}
              className=" text-white font-medium border border-[#0A4174] rounded-full px-10 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
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
              Thêm ngành học
            </button>
          </div>
        </div>

        <MajorTable />
        {openAddMajor && <AddMajor close={() => setOpenAddMajor(false)} />}
      </div>
    </div>
  );
};

export default MajorManagementPage;
