import { useEffect, useState } from "react";
import { getAllCohortsAPI } from "../../../../service/cohortService";
import { toast } from "react-toastify";
import {
  assignCohortAPI,
  getLinkedCohortsAPI,
  removeCohortFromProgramAPI,
} from "../../../../service/programService";

const LinkProgram = ({ close, programId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [cohorts, setCohorts] = useState([]);
  const [linkedCohorts, setLinkedCohorts] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    cohortId: "",
    appliedDate: today,
  });

  const fetchLinkedCohorts = async () => {
    try {
      const response = await getLinkedCohortsAPI(programId);
      if (response.data.code === 1000) {
        setLinkedCohorts(response.data.result || []);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách khóa đã gắn!");
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsFetching(true);
        const [responseCohorts] = await Promise.all([
          getAllCohortsAPI(),
          fetchLinkedCohorts()
        ]);

        if (responseCohorts.data.code === 1000 || responseCohorts.data.code === 200) {
          const rawData = responseCohorts.data.result;
          let cohortList = Array.isArray(rawData) ? rawData : rawData?.content || [];

          setCohorts(cohortList);
          if (cohortList.length > 0) {
            setFormData((prev) => ({ ...prev, cohortId: cohortList[0].id }));
          }
        }
      } catch (error) {
        toast.error("Không thể tải dữ liệu khóa học!");
      } finally {
        setIsFetching(false);
      }
    };

    fetchAllData();
  }, [programId]);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssign = async () => {
    if (!formData.cohortId) return toast.warning("Vui lòng chọn khóa học!");
    if (!formData.appliedDate) return toast.warning("Vui lòng chọn ngày áp dụng!");

    const isAlreadyLinked = linkedCohorts.some((c) => c.cohortId === formData.cohortId);
    if (isAlreadyLinked) {
      return toast.warning("Khóa này đã được gắn với chương trình rồi!");
    }

    try {
      setIsLoading(true);
      const payload = {
        programId: programId,
        cohortId: formData.cohortId,
        appliedDate: formData.appliedDate,
      };

      const response = await assignCohortAPI(payload);
      if (response.data.code === 1000) {
        toast.success("Gắn khóa học thành công!");
        fetchLinkedCohorts(); 
      } else {
        toast.error(response.data.message || "Gắn thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối khi gắn khóa!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (cohortIdToRemove) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn gỡ khóa học này khỏi chương trình đào tạo không?");
    if (!isConfirm) return;

    try {
      setIsLoading(true);
      const response = await removeCohortFromProgramAPI(programId, cohortIdToRemove);

      if (response.data.code === 1000) {
        toast.success("Gỡ khóa học thành công!");
        fetchLinkedCohorts(); 
      } else {
        toast.error(response.data.message || "Gỡ thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối khi gỡ khóa!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 py-10 overflow-y-auto px-4">
      <div className="bg-white w-full max-w-[700px] rounded-xl p-5 md:p-6 border border-[#0A4174] my-auto">
        <div className="flex justify-between items-center mb-5 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold">Gắn khóa học</h2>

          <button
            onClick={close}
            className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-[#0A4174] mb-6">
          <h3 className="text-sm font-bold text-[#0A4174] mb-4 uppercase">Thêm khóa mới</h3>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="w-full md:flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1">Chọn khoá học</label>
              <select
                name="cohortId"
                value={formData.cohortId}
                onChange={handleOnChange}
                disabled={isFetching}
                className={`w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3] ${isFetching ? "bg-gray-100 cursor-wait" : "bg-white cursor-pointer"}`}
              >
                {isFetching ? (
                  <option value="">Đang tải...</option>
                ) : cohorts.length === 0 ? (
                  <option value="">Không có dữ liệu</option>
                ) : (
                  cohorts.map((cohort) => (
                    <option key={cohort.id} value={cohort.id}>
                      {cohort.name} (Năm {cohort.startYear})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="w-full md:flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1">Ngày áp dụng</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleOnChange}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <button
              onClick={handleAssign}
              disabled={isLoading || isFetching || cohorts.length === 0}
              className={`w-full md:w-auto justify-center h-[38px] text-white hover:text-[#0A4174] border border-[#0A4174] font-medium rounded-lg px-4 flex items-center gap-2 transition-all duration-300 ${
                isLoading || isFetching || cohorts.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5483B3] hover:bg-white cursor-pointer"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
              Gắn khóa
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#0A4174] mb-3 uppercase">Danh sách khóa đã gắn</h3>
          
          <div className="max-h-[300px] overflow-auto custom-scrollbar border border-[#0A4174] rounded-lg">
            <table className="w-full min-w-[500px] text-left border-collapse text-sm">
              <thead className="bg-blue-50 sticky">
                <tr>
                  <th className="px-4 py-2 font-semibold text-slate-600 whitespace-nowrap">Khóa</th>
                  <th className="px-4 py-2 font-semibold text-slate-600 whitespace-nowrap">Năm bắt đầu</th>
                  <th className="px-4 py-2 font-semibold text-slate-600 whitespace-nowrap">Ngày áp dụng</th>
                  <th className="px-4 py-2 font-semibold text-slate-600 text-center w-20 whitespace-nowrap">Gỡ</th>
                </tr>
              </thead>
              <tbody>
                {linkedCohorts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-slate-400 italic">
                      Chương trình này chưa được gắn cho khóa nào.
                    </td>
                  </tr>
                ) : (
                  linkedCohorts.map((linked, index) => (
                    <tr key={linked.id || index} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-[#0A4174]">{linked.cohortName}</td>
                      <td className="px-4 py-3">{linked.cohortStartYear}</td>
                      <td className="px-4 py-3">{linked.appliedDate}</td>
                      <td className="px-4 py-3 text-center">
                        {/* --- Nút Xóa nhỏ ở từng dòng --- */}
                        <button
                          onClick={() => handleRemove(linked.cohortId)}
                          disabled={isLoading}
                          className="text-red-400 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50"
                          title="Gỡ khóa này"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24"><path fill="currentColor" d="M19.45 4.06h-4.18v-.5a1.5 1.5 0 0 0-1.5-1.5h-3.54a1.5 1.5 0 0 0-1.5 1.5v.5H4.55a.5.5 0 0 0 0 1h.72l.42 14.45a2.493 2.493 0 0 0 2.5 2.43h7.62a2.493 2.493 0 0 0 2.5-2.43l.42-14.45h.72a.5.5 0 0 0 0-1m-9.72-.5a.5.5 0 0 1 .5-.5h3.54a.5.5 0 0 1 .5.5v.5H9.73Zm7.58 15.92a1.5 1.5 0 0 1-1.5 1.46H8.19a1.5 1.5 0 0 1-1.5-1.46L6.26 5.06h11.48Z"/><path fill="currentColor" d="M8.375 8a.5.5 0 0 1 1 0l.25 10a.5.5 0 0 1-1 0Zm7.25.007a.5.5 0 0 0-1 0l-.25 10a.5.5 0 0 0 1 0Z"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkProgram;
