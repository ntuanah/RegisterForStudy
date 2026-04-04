import { useState } from "react";
import CohortTable from "../../../components/admin/CohortTable";
import AddCohort from "../../../components/admin/Modal/AddCohort";

const CohortManagementPage = () => {
  const [openAddCohort, setOpenAddCohort] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Quản lý khoá
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Quản lý khoá</h1>
            <p className="text-slate-500 mt-1">
              Quản lý thông tin của các khoá.
            </p>
          </div>

          <div className="">
            <button
              onClick={() => setOpenAddCohort(true)}
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
              Thêm khoá
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center border border-[#0A4174] rounded-full px-3 py-3 hover:bg-blue-50 cursor-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.398 0-4.064-1.666Q3.808 11.898 3.808 9.5t1.666-4.064t4.064-1.667t4.065 1.667T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"
            />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm khoá"
            className="flex-1 outline-none text-sm ml-2 bg-transparent"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <CohortTable keyword={keyword} refresh={refresh} />
        {openAddCohort && (
          <AddCohort
            close={() => setOpenAddCohort(false)}
            refresh={() => setRefresh(!refresh)}
          />
        )}
      </div>
    </div>
  );
};

export default CohortManagementPage;
