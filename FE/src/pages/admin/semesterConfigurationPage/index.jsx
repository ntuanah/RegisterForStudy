import { useState } from "react";
import OpenSubjectTable from "../../../components/admin/OpenSubjectTable";
import RegistrationPeriodCard from "../../../components/admin/RegistrationPeriodCard";
import AddOpenSubject from "../../../components/admin/Modal/AddOpenSubject";

const SemesterConfigurationPage = () => {
  const [openSubject, setOpenSubject] = useState(false);
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Cấu hình học kỳ
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Cấu hình học kỳ
            </h1>
            <p className="text-slate-500 mt-1">
              Cấu hình thông tin cho học kỳ.
            </p>
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
              Lưu cấu hình
            </button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-#0A4174]">
          <h2 className="text-lg font-semibold mb-4">
            Thông tin học kỳ hiện tại
          </h2>
          <label className="text-sm font-medium text-slate-500 mb-2">
            Học kỳ
          </label>
          <div className="flex gap-5 mt-2">
            <div className="w-48">
              <select
                name=""
                id=""
                className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option>Học kỳ 1</option>
                <option>Học kỳ 2</option>
              </select>
            </div>

            <div className="w-48">
              <select
                name=""
                id=""
                className="w-full px-5 py-3 rounded-xl border border-[#0A4174] shadow-sm bg-white font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option>2022-2023</option>
                <option>2023-2024</option>
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-7 mt-7">
          <div className="mb-8 flex justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Thời gian đăng ký học phần
              </h2>
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
                    d="M4 12h8m0 0h8m-8 0V4m0 8v8"
                  />
                </svg>
                Thêm đợt đăng ký
              </button>
            </div>
          </div>

          <RegistrationPeriodCard />
          <RegistrationPeriodCard />
        </div>

        <div className="space-y-7 mt-7">
          <div className="mb-8 flex justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Mở môn</h2>
            </div>

            <div className="">
              <button
                onClick={() => setOpenSubject(true)}
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
                Thêm môn học
              </button>
            </div>
          </div>

          <OpenSubjectTable />
          {openSubject && (
            <AddOpenSubject close={() => setOpenSubject(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SemesterConfigurationPage;
