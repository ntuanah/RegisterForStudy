import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getClassSectionsBySubjectAPI } from "../../../service/classSectionService";
import { deleteClassSectionAPI } from "../../../service/classSectionService";
import { updateClassSectionAPI } from "../../../service/classSectionService";

const ClassSectionSubTable = ({ subjectId }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ sectionCode: "", capacity: 0 });

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await getClassSectionsBySubjectAPI(subjectId);
      const { data } = response;
      if (data.code === 1000 || data.code === 200) {
        setClasses(data.result || []);
      }
    } catch (error) {
      toast.error("Lỗi khi tải chi tiết lớp học phần!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) fetchClasses();
  }, [subjectId]);

  const handleDelete = async (id) => {
    const isConfirm = window.confirm(
      "Bạn có chắc chắn muốn xóa lớp học phần này không?",
    );
    if (!isConfirm) return;

    try {
      const response = await deleteClassSectionAPI(id);
      const { data } = response;

      if (data.code === 1000 || data.code === 200) {
        toast.success(data.message || "Xóa lớp học phần thành công!");
        fetchClasses();
      } else {
        toast.error(data.message || "Xóa thất bại!");
      }
    } catch (error) {
      console.error("Lỗi xóa lớp học phần:", error);
      toast.error(error.response?.data?.message || "Lỗi kết nối khi xóa!");
    }
  };

  const handleEditClick = (cls) => {
    setEditingId(cls.id);
    setEditForm({
      sectionCode: cls.sectionCode,
      capacity: cls.capacity,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ sectionCode: "", capacity: 0 });
  };

  const handleSaveEdit = async (cls) => {
    try {
      const payload = { ...cls, ...editForm };
      const response = await updateClassSectionAPI(cls.id, payload);
      const { data } = response;

      if (data.code === 1000 || data.code === 200) {
        toast.success(data.message || "Cập nhật thành công!");
        setEditingId(null);
        fetchClasses();
      } else {
        toast.error(data.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error(error.response?.data?.message || "Lỗi kết nối khi cập nhật!");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500 bg-slate-50">
        Đang tải cấu trúc lớp học phần...
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500 italic bg-slate-50">
        Không có lớp học phần nào cho môn này.
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 border-t border-slate-200 shadow-inner">
      <h4 className="text-[#0A4174] font-bold mb-5">
        Chi tiết Lớp học phần đã mở
      </h4>

      <div className="flex flex-col gap-6">
        {classes.map((parentClass) => {
          const isEditingParent = editingId === parentClass.id;

          return (
            <div
              key={parentClass.id}
              className="bg-white border border-blue-100 rounded-xl shadow-sm "
            >
              <div className="bg-blue-50 p-4 border-b border-blue-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-[11px] font-bold rounded-md bg-[#5483B3] text-white">
                    {parentClass.subjectComponentType === "THEORY"
                      ? "LÝ THUYẾT"
                      : "THỰC HÀNH"}
                  </span>

                  {isEditingParent ? (
                    <input
                      type="text"
                      className="border border-[#5483B3] rounded px-2 py-1 outline-none text-sm w-32 font-bold text-slate-800"
                      value={editForm.sectionCode}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          sectionCode: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span className="font-bold text-slate-800 text-lg">
                      {parentClass.sectionCode}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-8 text-sm mr-2">
                  <div className="flex flex-col items-end">
                    <span className="text-slate-500 text-xs">Sĩ số</span>
                    <div className="font-bold flex items-center gap-1">
                      {parentClass.enrolledCount} /
                      {isEditingParent ? (
                        <input
                          type="number"
                          className="border border-[#5483B3] rounded px-1 py-0.5 outline-none text-sm w-16 text-center"
                          value={editForm.capacity}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              capacity: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        parentClass.capacity
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-slate-500 text-xs">Trạng thái</span>
                    <span
                      className={`font-semibold ${
                        parentClass.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {parentClass.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pl-5 border-l border-blue-200 ml-2">
                    {isEditingParent ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(parentClass)}
                          className="text-[#5483B3] hover:text-[#0A4174] transition-colors cursor-pointer"
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
                              d="M20 6L9 17l-5-5"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
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
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(parentClass)}
                          className="text-[#5483B3] hover:text-[#0A4174] transition-colors cursor-pointer"
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
                          onClick={() => handleDelete(parentClass.id)}
                          className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {parentClass.children && parentClass.children.length > 0 && (
                <div className="p-5">
                  <div className="text-xs font-bold text-slate-500 mb-3">
                    Các lớp thực hành ({parentClass.children.length} lớp)
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {parentClass.children.map((child) => {
                      const isEditingChild = editingId === child.id;

                      return (
                        <div
                          key={child.id}
                          className={`border rounded-lg p-3 transition-all bg-white 
                            ${isEditingChild ? "border-blue-400 shadow-md ring-2 ring-blue-100" : "border-slate-200 hover:border-[#5483B3] hover:shadow-md"}`}
                        >
                          <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 items-center">
                            {isEditingChild ? (
                              <input
                                type="text"
                                className="border border-[#5483B3] rounded px-2 py-0.5 outline-none text-xs w-full mr-2 font-bold text-slate-700"
                                value={editForm.sectionCode}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    sectionCode: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              <div className="font-black text-[#5483B3]">
                                {child.sectionCode}
                              </div>
                            )}

                            <div className="flex gap-2">
                              {isEditingChild ? (
                                <>
                                  <button
                                    onClick={() => handleSaveEdit(child)}
                                    className="text-[#5483B3] hover:text-[#0A4174] cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16px"
                                      height="16px"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20 6L9 17l-5-5"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="text-red-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16px"
                                      height="16px"
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
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEditClick(child)}
                                    className="text-[#5483B3] hover:text-[#0A4174] cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14px"
                                      height="14px"
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
                                    onClick={() => handleDelete(child.id)}
                                    className="text-red-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14px"
                                      height="14px"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                                      />
                                    </svg>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-500">Sĩ số:</span>
                            <div className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                              {child.enrolledCount} /
                              {isEditingChild ? (
                                <input
                                  type="number"
                                  className="border border-[#5483B3] rounded px-1 py-0.5 outline-none text-[11px] w-12 bg-white"
                                  value={editForm.capacity}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      capacity: Number(e.target.value),
                                    })
                                  }
                                />
                              ) : (
                                child.capacity
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassSectionSubTable;
