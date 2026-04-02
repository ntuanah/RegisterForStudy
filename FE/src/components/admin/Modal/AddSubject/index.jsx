import { useState } from "react";
import { toast } from "react-toastify";
import { addSubjectAPI } from "../../../../service/subjectService";

const AddSubject = ({ close, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: "",
    coffe: "",
    departmentName: "",
    theoryPeriod: "",
    practicePeriod: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.code?.trim() ||
      !formData.name?.trim() ||
      formData.credits === "" ||
      formData.coffe === "" ||
      !formData.departmentName?.trim()
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        code: formData.code.trim(),
        name: formData.name.trim(),
        departmentName: formData.departmentName.trim(),
        credits: parseInt(formData.credits, 10),
        coffe: parseFloat(String(formData.coffe).replace(",", ".")),
        theoryPeriod: parseInt(formData.theoryPeriod, 10) || 0,
        practicePeriod: parseInt(formData.practicePeriod, 10) || 0,
      };

      const { data } = await addSubjectAPI(payload);

      if (data.code === 200) {
        toast.success(data.message || "Thêm môn học thành công!");
        onSuccess();
        close();
      } else if (data.code === 1601) {
        toast.error("Môn học này đã tồn tại!");
      } else {
        toast.error(data.message || "Lỗi khi thêm môn học!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối đến server!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thêm môn học</h2>

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

        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Mã môn
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleOnChange}
              placeholder="VD: IT3011"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Tên môn
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              placeholder="VD: Lập trình Java"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Số tín chỉ (STC)
            </label>
            <input
              type="number"
              name="credits"
              value={formData.credits}
              onChange={handleOnChange}
              placeholder="VD: 3"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Hệ số
            </label>
            <input
              type="text"
              name="coffe"
              value={formData.coffe}
              onChange={handleOnChange}
              placeholder="VD: 1.8"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Khoa
            </label>
            <input
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleOnChange}
              placeholder="VD: Khoa Công nghệ thông tin"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Số tiết lý thuyết
            </label>
            <input
              type="number"
              name="theoryPeriod"
              value={formData.theoryPeriod}
              onChange={handleOnChange}
              placeholder="VD: 30"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Số tiết thực hành
            </label>
            <input
              type="number"
              name="practicePeriod"
              value={formData.practicePeriod}
              onChange={handleOnChange}
              placeholder="VD: 15"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer hover:-translate-y-1"
            }`}
          >
            {!isLoading && (
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
            )}
            {isLoading ? "Đang xử lý..." : "Thêm môn học"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
