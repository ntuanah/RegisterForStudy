import { useEffect, useState } from "react";
import {
  getAllSubjectsAPI,
  getSubjectByIdAPI,
  getSubjectPrerequisitesAPI,
  updatePrerequisitesAPI,
  updateSubjectAPI,
} from "../../../../service/subjectService";
import { toast } from "react-toastify";

const EditSubject = ({ id, close, refresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingPrereq, setIsUpdatingPrereq] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);
  const [prerequisites, setPrerequisites] = useState([""]);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: "",
    coefficient: "",
    departmentName: "",
    theoryPeriod: 15,
    practicePeriod: 15,
  });

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await getSubjectByIdAPI(id);
        const { data } = response;
        if (data.code === 200) {
          const result = data.result;
          setFormData({
            code: result.code || "",
            name: result.name || "",
            credits: result.credits || "",
            coefficient: result.coefficient || "",
            departmentName: result.departmentName || "",
            theoryPeriod: result.theoryPeriod || 0,
            practicePeriod: result.practicePeriod || 0,
          });
        }
      } catch (error) {
        toast.error("Không thể tải thông tin môn học!");
      }
    };

    const fetchAllSubjects = async () => {
      try {
        const response = await getAllSubjectsAPI();
        const { data } = response;
        if (data.code === 200) {
          const filteredSubjects = data.result.filter(
            (subject) => subject.id !== id,
          );
          setAllSubjects(filteredSubjects);
        }
      } catch (error) {
        toast.error(
          "Không thể tải danh sách môn học cho điều kiện tiên quyết!",
        );
      }
    };

    const fetchPrerequisites = async () => {
      try {
        const response = await getSubjectPrerequisitesAPI(id);
        const { data } = response;

        if (data.code === 1000 || data.code === 200) {
          const prereqList = data.result || [];
          
          const prereqIds = prereqList.map(item => item.id);

          setPrerequisites(prereqIds.length > 0 ? prereqIds : [""]);
        }
      } catch (error) {
        toast.error("Không thể tải danh sách điều kiện tiên quyết cũ!");
      }
    };

    if (id) {
      fetchSubjectDetails();
      fetchAllSubjects();
      fetchPrerequisites();
    }
  }, [id]);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubject = async () => {
    if (!formData.code || !formData.name || !formData.departmentName) {
      toast.warning("Vui lòng nhập đủ các trường bắt buộc!");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        code: formData.code,
        name: formData.name,
        credits: parseInt(formData.credits, 10),
        departmentName: formData.departmentName,
        theoryPeriod: parseInt(formData.theoryPeriod, 10),
        practicePeriod: parseInt(formData.practicePeriod, 10),
        coefficient: parseFloat(String(formData.coefficient).replace(",", ".")),
      };

      const response = await updateSubjectAPI(id, payload);
      const { data } = response;

      if (data.code === 200) {
        toast.success("Cập nhật môn học thành công!");
        refresh();
      } else {
        toast.error(data.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối khi cập nhật!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, ""]);
  };

  const handleRemovePrerequisite = (indexToRemove) => {
    const newPrereqs = prerequisites.filter(
      (_, index) => index !== indexToRemove,
    );
    setPrerequisites(newPrereqs);
  };

  const handlePrerequisiteChange = (index, value) => {
    const newPrereqs = [...prerequisites];
    newPrereqs[index] = value;
    setPrerequisites(newPrereqs);
  };

  const handleUpdatePrerequisites = async () => {
    const validIds = prerequisites.filter((prereqId) => prereqId.trim() !== "");

    const uniqueIds = [...new Set(validIds)];
    if (validIds.length !== uniqueIds.length) {
      toast.warning("Có môn tiên quyết bị chọn trùng lặp!");
      return;
    }

    try {
      setIsUpdatingPrereq(true);
      const payload = {
        prerequisiteIds: validIds,
      };

      const response = await updatePrerequisitesAPI(id, payload);
      const { data } = response;

      if (data.code === 200) {
        toast.success("Cập nhật điều kiện tiên quyết thành công!");
        refresh(); 
      } else {
        toast.error(data.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối khi cập nhật!");
    } finally {
      setIsUpdatingPrereq(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174] max-h-[90vh] overflow-y-auto">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chỉnh sửa môn học</h2>

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
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                STC
              </label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleOnChange}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                Hệ số
              </label>
              <input
                type="text"
                inputMode="decimal"
                name="coefficient"
                value={formData.coefficient}
                onChange={handleOnChange}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                Bộ môn (Khoa)
              </label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleOnChange}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                Số tiết LT
              </label>
              <input
                type="number"
                name="theoryPeriod"
                value={formData.theoryPeriod}
                onChange={handleOnChange}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                Số tiết BT/TH
              </label>
              <input
                type="number"
                name="practicePeriod"
                value={formData.practicePeriod}
                onChange={handleOnChange}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button
              onClick={handleUpdateSubject}
              disabled={isLoading}
              className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                className="cursor-pointer"
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
              {isLoading ? "Đang xử lý..." : "Chỉnh sửa môn học"}
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center my-4">
            <h2 className="text-xl font-bold">Thêm điều kiện tiên quyết</h2>

            <button
              onClick={handleAddPrerequisite}
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
                  strokeWidth="1.5"
                  d="M4 12h8m0 0h8m-8 0V4m0 8v8"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-5">
            {prerequisites.map((prereqId, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={prereqId}
                  onChange={(e) =>
                    handlePrerequisiteChange(index, e.target.value)
                  }
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3] cursor-pointer"
                >
                  <option value="" disabled>
                    -- Chọn môn học tiên quyết --
                  </option>

                  {allSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.code} - {sub.name}{" "}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleRemovePrerequisite(index)}
                  className="text-red-500 font-medium border border-red-500 rounded-lg p-2 bg-white hover:bg-red-50 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
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
            ))}

            {prerequisites.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                Môn học này hiện chưa yêu cầu điều kiện tiên quyết. Bấm dấu + để
                thêm.
              </p>
            )}
          </div>

          <div className="flex justify-end mt-5">
            <button
              onClick={handleUpdatePrerequisites}
              disabled={isUpdatingPrereq}
              className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
                isUpdatingPrereq
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer"
              }`}
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
                  d="M16.25 21v-4.765a1.59 1.59 0 0 0-1.594-1.588H9.344a1.59 1.59 0 0 0-1.594 1.588V21m8.5-17.715v2.362a1.59 1.59 0 0 1-1.594 1.588H9.344A1.59 1.59 0 0 1 7.75 5.647V3m8.5.285A3.2 3.2 0 0 0 14.93 3H7.75m8.5.285c.344.156.661.374.934.645l2.382 2.375A3.17 3.17 0 0 1 20.5 8.55v9.272A3.18 3.18 0 0 1 17.313 21H6.688A3.18 3.18 0 0 1 3.5 17.823V6.176A3.18 3.18 0 0 1 6.688 3H7.75"
                />
              </svg>
              {isUpdatingPrereq ? "Đang lưu..." : "Lưu điều kiện tiên quyết"}
            </button>
          </div>
        </div>

        <div className="">
          <h2 className="text-xl font-bold">Cấu hình môn học</h2>

          <div className="mt-3">
            <div>
              <h2 className="text-lg font-semibold text-[#5483B3]">
                Lớp lý thuyết
              </h2>

              <div className="grid grid-cols-2 gap-10 my-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Số buổi/tuần
                  </label>
                  <input
                    type="text"
                    defaultValue="1"
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Số tiết/buổi
                  </label>
                  <input
                    type="text"
                    defaultValue="2"
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#5483B3]">
                Lớp bài tập/ thực hành
              </h2>

              <div className="grid grid-cols-2 gap-10 my-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Số buổi/tuần
                  </label>
                  <input
                    type="text"
                    defaultValue="1"
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Số tiết/buổi
                  </label>
                  <input
                    type="text"
                    defaultValue="3"
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
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
        </div>
      </div>
    </div>
  );
};

export default EditSubject;
