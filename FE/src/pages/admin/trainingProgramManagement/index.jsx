import { useState } from "react";
import AddTrainingProgram from "../../../components/admin/Modal/AddTrainingProgram";
import TrainingProgramTable from "../../../components/admin/TrainingProgramTable";

const TrainingProgramManagement = () => {
  const [openAddTrainingProgram, setOpenAddTrainingProgram] = useState(false);
  const [openTrainingProgramTable, setOpenTrainingProgramTable] =
    useState(false);
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Quản lý chương trình đào tạo
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Quản lý chương trình đào tạo
            </h1>
            <p className="text-slate-500 mt-1">
              Quản lý chương trình đào tạo và thông tin chương trình đào tạo.
            </p>
          </div>

          <div>
            <button
              onClick={() => setOpenAddTrainingProgram(true)}
              className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
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
              Thêm chương trình đào tạo
            </button>
          </div>
        </div>

        <div className="">
          <div className="flex gap-5">
            <div className="w-48">
              <select
                name=""
                id=""
                className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option>K33</option>
                <option>K34</option>
                <option>K35</option>
                <option>K36</option>
                <option>K37</option>
                <option>K38</option>
              </select>
            </div>

            <div className="w-48">
              <select
                name=""
                id=""
                className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option>Công nghệ thông tin</option>
                <option>Hệ thống thông tin</option>
                <option>Trí tuệ nhân tạo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <div className="flex justify-between">
              <p
                onClick={() =>
                  setOpenTrainingProgramTable(!openTrainingProgramTable)
                }
                className="text-slate-900 cursor-pointer"
              >
                1. Chương trình đào tạo ngành công nghệ thông tin năm
                2024-2025
              </p>
              <div>
                <button className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
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
                </button>
              </div>
            </div>

            {openTrainingProgramTable && (
              <div className="mt-3">
                <TrainingProgramTable />
              </div>
            )}
          </div>
          <div>
            <p className="text-slate-900 cursor-pointer">
              2. Chương trình đào tạo ngành công nghệ thông tin năm
              2025-2026
            </p>
          </div>
        </div>
      </div>

      {openAddTrainingProgram && (
        <AddTrainingProgram close={() => setOpenAddTrainingProgram(false)} />
      )}
    </div>
  );
};

export default TrainingProgramManagement;
