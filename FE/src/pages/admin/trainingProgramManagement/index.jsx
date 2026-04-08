import { useEffect, useState } from "react";
import AddTrainingProgram from "../../../components/admin/Modal/AddTrainingProgram";
import TrainingProgramTable from "../../../components/admin/TrainingProgramTable";
import AddSubjectTrainingProgram from "../../../components/admin/Modal/AddSubjectTrainingProgram";
import {
  deleteProgramAPI,
  getAllProgramsAPI,
  publishProgramAPI,
  searchProgramAPI,
} from "../../../service/programService";
import { toast } from "react-toastify";
import LinkProgram from "../../../components/admin/Modal/LinkProgram";
import UpdateProgram from "../../../components/admin/Modal/UpdateProgram";

const TrainingProgramManagement = () => {
  const [selectedUpdateProgram, setSelectedUpdateProgram] = useState(null);
  const [selectedLinkProgramId, setSelectedLinkProgramId] = useState(null);
  const [openAddTrainingProgram, setOpenAddTrainingProgram] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedProgramId, setExpandedProgramId] = useState(null);
  const [keyword, setKeyword] = useState("");

  const fetchPrograms = async (searchWord = keyword) => {
    try {
      setIsLoading(true);

      let response;
      if (searchWord && searchWord.trim() !== "") {
        response = await searchProgramAPI(searchWord);
      } else {
        response = await getAllProgramsAPI();
      }

      const { data } = response;

      if (data.code === 1000) {
        setPrograms(data.result || []);
      } else {
        toast.error(data.message || "Lỗi lấy danh sách chương trình đào tạo");
        setPrograms([]);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách chương trình đào tạo!");
      setPrograms([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProgram = async (programId, programName) => {
    const isConfirm = window.confirm(
      `Bạn có chắc chắn muốn xóa "${programName}" không? Hành động này không thể hoàn tác!`,
    );
    if (!isConfirm) return;

    try {
      setIsLoading(true);
      const response = await deleteProgramAPI(programId);
      const { data } = response;

      if (data.code === 1000) {
        toast.success("Xóa chương trình đào tạo thành công!");
        fetchPrograms();

        if (expandedProgramId === programId) {
          setExpandedProgramId(null);
        }
      } else {
        toast.error(data.message || "Xóa chương trình thất bại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi kết nối khi xóa chương trình!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishProgram = async (programId, isActive, programName) => {
    // Nếu đã Publish rồi thì chặn lại không cho gọi API
    if (isTemplate === true) {
      toast.info(`Chương trình "${programName}" đã được Publish từ trước!`);
      return;
    }

    // Nếu chưa Publish thì hỏi xác nhận
    const isConfirm = window.confirm(
      `Bạn có chắc chắn muốn Publish (Mở khóa) chương trình "${programName}" không?`,
    );
    if (!isConfirm) return;

    try {
      setIsLoading(true);
      const response = await publishProgramAPI(programId);
      const { data } = response;

      if (data.code === 1000) {
        toast.success("Publish chương trình đào tạo thành công!");
        fetchPrograms(); // Load lại danh sách để đổi icon sang Khóa Mở
      } else {
        toast.error(data.message || "Publish thất bại!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Lỗi kết nối khi publish chương trình!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPrograms(keyword);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const toggleProgram = (id) => {
    if (expandedProgramId === id) {
      setExpandedProgramId(null);
    } else {
      setExpandedProgramId(id);
    }
  };

  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Quản lý chương trình đào tạo
        </h2>
      </div>
      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Quản lý chương trình đào tạo
            </h1>
            <p className="text-slate-500 mt-1">
              Quản lý chương trình đào tạo và thông tin chương trình đào tạo.
            </p>
          </div>

          <div>
            <button
              onClick={() => setOpenAddTrainingProgram(true)}
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
              Thêm chương trình đào tạo
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center border border-[#0A4174] rounded-full px-3 py-3 hover:bg-blue-50 cursor-pointer">
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
            placeholder="Tìm kiếm chương trình đào tạo"
            className="flex-1 outline-none text-sm ml-2 bg-transparent"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="mt-5 space-y-5">
          {isLoading ? (
            <p className="text-slate-500 italic text-center py-4">
              Đang tìm kiếm...
            </p>
          ) : programs.length === 0 ? (
            <p className="text-slate-500 italic text-center py-4">
              {keyword
                ? "Không tìm thấy chương trình đào tạo nào phù hợp."
                : "Chưa có chương trình đào tạo nào."}
            </p>
          ) : (
            programs.map((program, index) => (
              <div
                key={program.id}
                className="border border-[#5483B3] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex justify-between items-start">
                  <div
                    onClick={() => toggleProgram(program.id)}
                    className="cursor-pointer flex-1"
                  >
                    <h3 className="text-lg font-bold text-[#0A4174] hover:text-[#5483B3] transition-colors">
                      {index + 1}. {program.name} ({program.code})
                    </h3>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-slate-600">
                      <p className="flex items-center gap-1">
                        <span className="font-semibold text-slate-500">
                          Ngành:
                        </span>
                        {program.majorName}
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="font-semibold text-slate-500">
                          Tổng tín chỉ:
                        </span>
                        {program.totalCredits}
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="font-semibold text-slate-500">
                          Thời gian:
                        </span>
                        {program.durationYears} năm
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="font-semibold text-slate-500">
                          Trạng thái:
                        </span>
                        {program.isActive ? (
                          <span className="text-green-600 font-medium">
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Đã đóng
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handlePublishProgram(
                          program.id,
                          program.isTemplate,
                          program.name,
                        )
                      }
                      disabled={isLoading || program.isTemplate === true}
                      className={`${
                        program.isTemplate === true
                          ? "text-green-600 border-green-600 bg-green-50 cursor-default"
                          : "text-slate-500 border-slate-400 bg-slate-50 hover:bg-slate-500 hover:text-white cursor-pointer"
                      } font-medium border rounded-full p-2 transition-all duration-300 flex items-center gap-2 whitespace-nowrap disabled:opacity-50`}
                      title={
                        program.isTemplate === true
                          ? "Chương trình đã Publish"
                          : "Bấm để Publish chương trình"
                      }
                    >
                      {program.isTemplate === true ? (
                        // Icon Khóa Mở (Đã Publish)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z" />
                            <path
                              strokeLinecap="round"
                              d="M6 10V8a6 6 0 0 1 11.811-1.5"
                            />
                          </g>
                        </svg>
                      ) : (
                        // Icon Khóa Đóng (Chưa Publish)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <rect
                              width="18"
                              height="11"
                              x="3"
                              y="11"
                              rx="2"
                              ry="2"
                            />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </g>
                        </svg>
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedLinkProgramId(program.id)}
                      className="text-[#5483B3] font-medium border border-[#0A4174] rounded-full p-2 bg-blue-50 hover:bg-[#5483B3] hover:text-white cursor-pointer transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
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
                          strokeWidth="2"
                          d="M10 21c-2.5 2.5-5 2-7 0s-2.5-4.5 0-7l3-3l7 7zm4-18c2.5-2.5 5-2 7.001 0s2.499 4.5 0 7l-3 3L11 6zm-3 7l-2.5 2.5zm3 3l-2.5 2.5z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => setSelectedUpdateProgram(program)}
                      className="text-[#5483B3] font-medium border border-[#0A4174] rounded-full p-2 bg-blue-50 hover:bg-[#5483B3] hover:text-white cursor-pointer transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
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
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteProgram(program.id, program.name)
                      }
                      disabled={isLoading}
                      className="text-red-500 font-medium border border-red-500 rounded-full p-2 bg-red-50 hover:bg-red-400 hover:text-white cursor-pointer transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19.45 4.06h-4.18v-.5a1.5 1.5 0 0 0-1.5-1.5h-3.54a1.5 1.5 0 0 0-1.5 1.5v.5H4.55a.5.5 0 0 0 0 1h.72l.42 14.45a2.493 2.493 0 0 0 2.5 2.43h7.62a2.493 2.493 0 0 0 2.5-2.43l.42-14.45h.72a.5.5 0 0 0 0-1m-9.72-.5a.5.5 0 0 1 .5-.5h3.54a.5.5 0 0 1 .5.5v.5H9.73Zm7.58 15.92a1.5 1.5 0 0 1-1.5 1.46H8.19a1.5 1.5 0 0 1-1.5-1.46L6.26 5.06h11.48Z"
                        />
                        <path
                          fill="currentColor"
                          d="M8.375 8a.5.5 0 0 1 1 0l.25 10a.5.5 0 0 1-1 0Zm7.25.007a.5.5 0 0 0-1 0l-.25 10a.5.5 0 0 0 1 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {expandedProgramId === program.id && (
                  <div className="mt-5 pt-5 border-t border-[#5483B3]">
                    <TrainingProgramTable programId={program.id} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {openAddTrainingProgram && (
        <AddTrainingProgram
          close={() => setOpenAddTrainingProgram(false)}
          refresh={fetchPrograms}
        />
      )}

      {selectedLinkProgramId && (
        <LinkProgram
          programId={selectedLinkProgramId}
          close={() => setSelectedLinkProgramId(null)}
        />
      )}

      {selectedUpdateProgram && (
        <UpdateProgram
          programData={selectedUpdateProgram}
          close={() => setSelectedUpdateProgram(null)}
          refresh={fetchPrograms}
        />
      )}
    </div>
  );
};

export default TrainingProgramManagement;
