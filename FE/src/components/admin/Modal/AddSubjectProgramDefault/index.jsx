import { useEffect, useState } from "react";
import { getAllSubjectsAPI } from "../../../../service/subjectService";
import { addSubjectToDefaultSectionAPI } from "../../../../service/programService";
import { toast } from "react-toastify";

const AddSubjectProgramDefault = ({ close, sectionId, refresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    subjectId: "",
    defaultSemester: 1,
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsFetching(true);
        const response = await getAllSubjectsAPI(0, 1000);

        if (response.data.code === 1000 || response.data.code === 200) {
          const rawData = response.data.result;

          let subjectList = [];
          if (Array.isArray(rawData)) {
            subjectList = rawData;
          } else if (rawData && Array.isArray(rawData.content)) {
            subjectList = rawData.content;
          } else if (rawData && Array.isArray(rawData.data)) {
            subjectList = rawData.data;
          }

          setSubjects(subjectList);

          if (subjectList.length > 0) {
            setFormData((prev) => ({
              ...prev,
              subjectId: subjectList[0].id,
            }));
          }
        }
      } catch (error) {
        toast.error("Không thể tải danh sách môn học!");
      } finally {
        setIsFetching(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    if (!formData.subjectId) {
      return toast.warning("Vui lòng chọn môn học!");
    }
    if (!formData.defaultSemester || formData.defaultSemester < 1) {
      return toast.warning("Kỳ học dự kiến không hợp lệ!");
    }

    try {
      setIsLoading(true);
      const payload = {
        sectionDefaultId: sectionId,
        subjectId: formData.subjectId,
        defaultSemester: parseInt(formData.defaultSemester, 10),
      };

      const response = await addSubjectToDefaultSectionAPI(payload);
      const { data } = response;

      if (data.code === 1000) {
        toast.success("Thêm môn học thành công!");
        refresh();
        close();
      } else {
        toast.error(data.message || "Thêm thất bại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi kết nối khi thêm môn học!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-[500px] rounded-xl p-5 md:p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold">
            Thêm môn học vào chương trình mẫu
          </h2>

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

        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Chọn Môn học
            </label>
            <select
              name="subjectId"
              value={formData.subjectId}
              onChange={handleOnChange}
              disabled={isFetching}
              className={`w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#5483B3] ${isFetching ? "bg-gray-100 cursor-wait" : "bg-white"}`}
            >
              {isFetching ? (
                <option value="">Đang tải danh sách môn học...</option>
              ) : subjects.length === 0 ? (
                <option value="">Không có môn học nào đang hoạt động</option>
              ) : (
                subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.code} - {subject.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Kỳ học dự kiến
            </label>
            <input
              type="number"
              min="1"
              name="defaultSemester"
              value={formData.defaultSemester}
              onChange={handleOnChange}
              placeholder="1"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleAdd}
            disabled={isLoading || isFetching || subjects.length === 0}
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
            {isLoading ? "Đang xử lý..." : "Thêm môn học"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectProgramDefault;
