import { useEffect, useState } from "react";
import EditCohort from "../Modal/EditCohort";
import {
  getAllCohortsAPI,
  searchCohortAPI,
} from "../../../service/cohortService";
import { toast } from "react-toastify";

const CohortTable = ({ keyword, refresh }) => {
  const [editCohortId, setEditCohortId] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCohorts = async (searchWord = keyword) => {
    try {
      setIsLoading(true);

      let response;
      if (searchWord && searchWord.trim() !== "") {
        response = await searchCohortAPI(searchWord);
      } else {
        response = await getAllCohortsAPI();
      }

      const { data } = response;

      if (data.code === 1000) {
        setCohorts(data.result || []);
      } else {
        toast.error(data.message || "Lỗi lấy dữ liệu từ server");
        setCohorts([]);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách khóa học!");
      setCohorts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCohorts(keyword);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, refresh]);

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-5">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên khoá
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-40">
              Năm bắt đầu
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-slate-500">
                Đang tìm kiếm...
              </td>
            </tr>
          ) : cohorts.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-slate-500">
                {keyword
                  ? "Không tìm thấy khóa học nào phù hợp."
                  : "Chưa có khóa học nào."}
              </td>
            </tr>
          ) : (
            cohorts.map((cohort, index) => (
              <tr
                key={cohort.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-slate-700">
                  {cohort.name}
                </td>
                <td className="px-6 py-4">{cohort.startYear}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-4 text-[#5483B3]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      className="cursor-pointer hover:text-blue-700 transition"
                      onClick={() => setEditCohortId(cohort.id)}
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

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      className="cursor-pointer hover:text-red-700 transition"
                      onClick={() => toast.info("Tính năng Xóa sẽ thêm sau")}
                    >
                      <path
                        fill="red"
                        d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editCohortId && (
        <EditCohort
          id={editCohortId}
          close={() => setEditCohortId(null)}
          refresh={fetchCohorts}
        />
      )}
    </div>
  );
};

export default CohortTable;
