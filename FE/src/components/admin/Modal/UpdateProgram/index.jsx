import { useEffect, useState } from "react";
import { getAllMajorsAPI } from "../../../../service/majorService";
import { toast } from "react-toastify";
import { updateProgramAPI } from "../../../../service/programService";

const UpdateProgram = ({ close, programData, refresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [majors, setMajors] = useState([]);

  const [formData, setFormData] = useState({
    name: programData?.name || "",
    code: programData?.code || "",
    totalCredits: programData?.totalCredits || "",
    durationYears: programData?.durationYears || "",
    majorId: programData?.majorId || "",
  });

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await getAllMajorsAPI();
        if (response.data.code === 1000) {
          const activeMajors = response.data.result.filter((m) => m.isActive);
          setMajors(activeMajors);
        }
      } catch (error) {
        toast.error("Không thể tải danh sách ngành học!");
      }
    };
    fetchMajors();
  }, []);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (
      !formData.name.trim() ||
      !formData.code.trim() ||
      !formData.majorId ||
      !String(formData.totalCredits).trim() ||
      !String(formData.durationYears).trim()
    ) {
      return toast.warning("Vui lòng nhập đầy đủ thông tin!");
    }

    try {
      setIsLoading(true);
      const payload = {
        name: formData.name.trim(),
        code: formData.code.trim(),
        majorId: formData.majorId,
        totalCredits: parseInt(formData.totalCredits, 10),
        durationYears: parseFloat(formData.durationYears),
      };

      const response = await updateProgramAPI(programData.id, payload);
      const { data } = response;

      if (data.code === 1000) {
        toast.success("Cập nhật chương trình đào tạo thành công!");
        if (refresh) refresh();
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
          <h2 className="text-xl font-bold">Cập nhật chương trình đào tạo</h2>

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

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Tên chương trình đào tạo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Mã chương trình
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleOnChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Ngành học
            </label>
            <select
              name="majorId"
              value={formData.majorId}
              onChange={handleOnChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#5483B3] bg-white cursor-pointer"
            >
              {majors.length === 0 && <option value="">Đang tải...</option>}
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Tổng tín chỉ
            </label>
            <input
              type="number"
              name="totalCredits"
              value={formData.totalCredits}
              onChange={handleOnChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Thời gian đào tạo (Năm)
            </label>
            <input
              type="number"
              step="0.5"
              name="durationYears"
              value={formData.durationYears}
              onChange={handleOnChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleUpdate}
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
            {isLoading ? "Đang xử lý..." : "Cập nhật chương trình đào tạo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgram;
