import { useState } from "react";
import { createCohortAPI } from "../../../../service/cohortService";
import { toast } from "react-toastify";

const AddCohort = ({ close, refresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    startYear: "", 
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCohort = async () => {

    if (!formData.name.trim() || !String(formData.startYear).trim()) {
      return toast.warning("Vui lòng nhập đầy đủ tên khoá và năm bắt đầu!");
    }

    const startYearNumber = parseInt(formData.startYear, 10);
    
    const currentYear = new Date().getFullYear(); 

    if (isNaN(startYearNumber) || startYearNumber < 1988) {
        return toast.warning("Năm bắt đầu không được nhỏ hơn năm 1988!");
    }

    if (startYearNumber > currentYear) {
        return toast.warning(`Năm bắt đầu không được lớn hơn năm hiện tại (${currentYear})!`);
    }

    try {
      setIsLoading(true);
      const payload = {
        name: formData.name,
        startYear: startYearNumber, 
      };

      const response = await createCohortAPI(payload);
      const { data } = response;

      if (data.code === 1000) {
        toast.success("Thêm khoá học thành công!");
        refresh(); 
        close();   
      } else {
        toast.error(data.message || "Thêm thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối khi thêm!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thêm khoá</h2>

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
              placeholder="Nhập tên khoá"
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
              placeholder="Nhập năm bắt đầu"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleAddCohort}
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
                d="M4 12h8m0 0h8m-8 0V4m0 8v8"
              />
            </svg>
            {isLoading ? "Đang xử lý..." : "Thêm khoá"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCohort;
