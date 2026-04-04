import { useEffect, useState } from "react";
import {
  getCohortByIdAPI,
  updateCohortAPI,
} from "../../../../service/cohortService";
import { toast } from "react-toastify";

const EditCohort = ({ close, id, refresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    startYear: "",
  });

  useEffect(() => {
    const fetchCohortDetails = async () => {
      try {
        const response = await getCohortByIdAPI(id);
        const { data } = response;
        if (data.code === 1000) {
          setFormData({
            name: data.result.name || "",
            startYear: data.result.startYear || "",
          });
        }
      } catch (error) {
        toast.error("Không thể tải thông tin chi tiết khóa học!");
      }
    };

    if (id) {
      fetchCohortDetails();
    }
  }, [id]);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateCohort = async () => {
    if (!formData.name.trim() || !String(formData.startYear).trim()) {
      return toast.warning("Vui lòng nhập đầy đủ tên khoá và năm bắt đầu!");
    }

    const startYearNumber = parseInt(formData.startYear, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(startYearNumber) || startYearNumber < 1988) {
      return toast.warning("Năm bắt đầu không được nhỏ hơn năm 1988!");
    }

    if (startYearNumber > currentYear) {
      return toast.warning(
        `Năm bắt đầu không được lớn hơn năm hiện tại (${currentYear})!`,
      );
    }

    try {
      setIsLoading(true);
      const payload = {
        name: formData.name,
        startYear: startYearNumber,
      };

      const response = await updateCohortAPI(id, payload);
      const { data } = response;

      if (data.code === 1000) {
        toast.success("Cập nhật khóa học thành công!");
        refresh(); 
        close();
      } else {
        toast.error(data.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối khi cập nhật!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chỉnh sửa thông tin khoá</h2>

          <button
            onClick={close}
            className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
          >
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
                strokeWidth="2"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-10">
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Tên khoá
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Năm bắt đầu
            </label>
            <input
              type="number"
              name="startYear"
              value={formData.startYear}
              onChange={handleOnChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleUpdateCohort}
            disabled={isLoading}
            className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer"}`}
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
                d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
              />
            </svg>
            {isLoading ? "Đang xử lý..." : "Chỉnh sửa thông tin khoá"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCohort;
