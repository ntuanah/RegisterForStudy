import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getClassSectionGradesAPI, updateFinalScoreAPI, updateMidtermScoreAPI } from "../../../../service/gradeService";

const ListStudent = ({ classSectionId, close }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingState, setEditingState] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setIsLoading(true);
        const response = await getClassSectionGradesAPI(classSectionId);
        const { data } = response;

        if (data.code === 1000 || data.code === 200) {
          setStudents(data.result || []);
        } else {
          toast.error(data.message || "Lỗi khi lấy danh sách điểm!");
        }
      } catch (error) {
        console.error("Lỗi fetchGrades:", error);
        toast.error("Không thể kết nối đến server để lấy điểm!");
      } finally {
        setIsLoading(false);
      }
    };

    if (classSectionId) {
      fetchGrades();
    }
  }, [classSectionId]);

  const handleEditClick = (student, type) => {
    setEditingState({ id: student.enrollmentId, type });
    const currentValue =
      type === "GK" ? student.midtermScore : student.finalScore;
    setEditValue(currentValue !== null ? currentValue : "");
  };

  const handleCancelEdit = () => {
    setEditingState(null);
    setEditValue("");
  };

  // Lưu điểm
  const handleSaveScore = async (student) => {
    // Validate điểm (từ 0 đến 10)
    const scoreNum = parseFloat(editValue);
    if (editValue === "" || isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) {
      return toast.warning("Vui lòng nhập điểm hợp lệ (từ 0 đến 10)!");
    }

    try {
      setIsSaving(true);
      const type = editingState.type;

      // Gọi API tương ứng
      const response =
        type === "GK"
          ? await updateMidtermScoreAPI(student.enrollmentId, scoreNum)
          : await updateFinalScoreAPI(student.enrollmentId, scoreNum);

      const { data } = response;

      if (data.code === 1000) {
        toast.success(
          `Cập nhật điểm ${type === "GK" ? "Giữa kỳ" : "Cuối kỳ"} thành công!`,
        );

        // Cập nhật lại UI không cần fetch lại toàn bộ bảng
        setStudents((prev) =>
          prev.map((s) => {
            if (s.enrollmentId === student.enrollmentId) {
              return {
                ...s,
                // Ghi đè toàn bộ dữ liệu trả về từ API (chứa cả totalScore mới)
                ...data.result,
              };
            }
            return s;
          }),
        );

        // Thoát chế độ edit
        handleCancelEdit();
      } else {
        toast.error(data.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật điểm:", error);
      toast.error(
        error.response?.data?.message || "Lỗi kết nối khi cập nhật điểm!",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-[1000px] rounded-xl p-4 md:p-6 border border-[#0A4174] shadow-2xl flex flex-col max-h-[95vh]">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4 shrink-0">
          <h2 className="text-xl font-black text-[#0A4174] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#5483B3] rounded-full inline-block"></span>
            Danh sách sinh viên & Điểm số
          </h2>

          <button
            onClick={close}
            className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center justify-center shrink-0"
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

        <div className="overflow-y-auto overflow-x-auto custom-scrollbar flex-1 border border-slate-200 rounded-lg">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead className="bg-blue-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500  w-12 text-center">
                  STT
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500  w-28">
                  Mã sinh viên
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 ">
                  Tên sinh viên
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500  w-28">
                  Lớp
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500  w-32 text-center">
                  Điểm quá trình
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500  w-24 text-center">
                  Điểm thi
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500  w-36 text-center">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#5483B3] border-t-transparent rounded-full animate-spin"></div>
                      Đang tải dữ liệu điểm...
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    Chưa có sinh viên nào trong lớp học phần này.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => {
                  // Xác định dòng này và ô nào đang được sửa
                  const isEditingThisRow =
                    editingState?.id === student.enrollmentId;
                  const isEditingGK =
                    isEditingThisRow && editingState?.type === "GK";
                  const isEditingCK =
                    isEditingThisRow && editingState?.type === "CK";

                  return (
                    <tr
                      key={student.enrollmentId || index}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">
                        {student.studentCode}
                      </td>
                      <td className="px-4 py-3">{student.studentName}</td>
                      <td className="px-4 py-3">{student.adminClassName}</td>

                      {/* Cột Điểm GK */}
                      <td className="px-4 py-3 text-center font-bold text-slate-700">
                        {isEditingGK ? (
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="10"
                            autoFocus
                            className="w-16 border border-[#5483B3] rounded outline-none px-2 py-1 text-center font-bold"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleSaveScore(student)
                            }
                          />
                        ) : student.midtermScore !== null ? (
                          student.midtermScore
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Cột Điểm CK */}
                      <td className="px-4 py-3 text-center font-bold text-slate-700">
                        {isEditingCK ? (
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="10"
                            autoFocus
                            className="w-16 border border-[#5483B3] rounded outline-none px-2 py-1 text-center font-bold"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleSaveScore(student)
                            }
                          />
                        ) : student.finalScore !== null ? (
                          student.finalScore
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {isEditingThisRow ? (
                            // Giao diện khi ĐANG SỬA ĐIỂM (Nút Lưu / Hủy)
                            <>
                              <button
                                onClick={() => handleSaveScore(student)}
                                disabled={isSaving}
                                className="text-[#5483B3] border border-[#0A4174] hover:bg-blue-50 px-3 py-1.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer bg-white shadow-sm hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 min-w-[45px]"
                              >
                                <span className="font-bold text-xs whitespace-nowrap">
                                  {isSaving ? "..." : "Lưu"}
                                </span>
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                disabled={isSaving}
                                className="text-red-500 border border-red-300 hover:bg-red-100 px-3 py-1.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer bg-white shadow-sm hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 min-w-[45px]"
                              >
                                <span className="font-bold text-xs whitespace-nowrap">
                                  Hủy
                                </span>
                              </button>
                            </>
                          ) : (
                            // Giao diện BÌNH THƯỜNG (Nút chọn GK / CK)
                            <>
                              <button
                                onClick={() => handleEditClick(student, "GK")}
                                className="text-[#5483B3] hover:text-white border border-[#5483B3] hover:bg-[#5483B3] px-3 py-1.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer bg-white shadow-sm hover:-translate-y-0.5 min-w-[45px]"
                              >
                                <span className="font-bold text-xs whitespace-nowrap">
                                  GK
                                </span>
                              </button>

                              <button
                                onClick={() => handleEditClick(student, "CK")}
                                className="text-[#5483B3] hover:text-white border border-[#5483B3] hover:bg-[#5483B3] px-3 py-1.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer bg-white shadow-sm hover:-translate-y-0.5 min-w-[45px]"
                              >
                                <span className="font-bold text-xs whitespace-nowrap">
                                  CK
                                </span>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListStudent;
