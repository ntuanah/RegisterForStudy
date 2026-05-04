import { useState } from "react";
import { toast } from "react-toastify";
import {
  createPeriodCohortAPI,
  deletePeriodCohortAPI,
  updatePeriodCohortAPI,
} from "../../../service/periodCohortService";

const PeriodCohortCard = ({
  isCreate,
  cohortPeriodData,
  periodId,
  cohortsList,
  onCancel,
  onSuccess,
  index,
}) => {
  const [cohortId, setCohortId] = useState(
    isCreate ? "" : cohortPeriodData?.cohortId || "",
  );
  const [startTime, setStartTime] = useState(
    isCreate ? "" : cohortPeriodData?.startTime?.slice(0, 16) || "",
  );
  const [endTime, setEndTime] = useState(
    isCreate ? "" : cohortPeriodData?.endTime?.slice(0, 16) || "",
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!cohortId || !startTime || !endTime) {
      return toast.warning("Vui lòng chọn khóa và nhập đầy đủ thời gian!");
    }

    try {
      setIsSaving(true);
      const payload = {
        registrationPeriodId: periodId,
        cohortId: cohortId,
        startTime: startTime + ":00",
        endTime: endTime + ":59",
      };

      const res = await createPeriodCohortAPI(payload);
      if (res.data.code === 200 || res.data.code === 1000) {
        toast.success("Thêm đợt đăng ký cho khóa thành công!");
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.data.message || "Thêm đợt thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối Server!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!cohortId || !startTime || !endTime) {
      return toast.warning("Vui lòng nhập đầy đủ thông tin!");
    }

    try {
      setIsSaving(true);
      const payload = {
        startTime: startTime.length === 16 ? startTime + ":00" : startTime,
        endTime: endTime.length === 16 ? endTime + ":59" : endTime,
      };

      const res = await updatePeriodCohortAPI(cohortPeriodData.id, payload);
      if (res.data.code === 200 || res.data.code === 1000) {
        toast.success("Cập nhật đợt khóa thành công!");
        setIsEditing(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.data.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối Server!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đợt đăng ký của khóa này?"))
      return;

    try {
      setIsDeleting(true);
      const res = await deletePeriodCohortAPI(cohortPeriodData.id);
      if (res.data.code === 200 || res.data.code === 1000) {
        toast.success("Xóa đợt đăng ký khóa thành công!");
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.data.message || "Xóa thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối Server!");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setCohortId(cohortPeriodData?.cohortId || "");
    setStartTime(cohortPeriodData?.startTime?.slice(0, 16) || "");
    setEndTime(cohortPeriodData?.endTime?.slice(0, 16) || "");
    setIsEditing(false);
  };

  const isReadOnly = !isCreate && !isEditing;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4 w-full">
          <h2 className="text-md font-semibold whitespace-nowrap text-[#0A4174]">
            {isCreate ? "Tạo đợt khóa mới:" : `Đợt khóa ${index}:`}
          </h2>

          <select
            value={cohortId}
            onChange={(e) => setCohortId(e.target.value)}
            disabled={!isCreate}
            className="w-[400px] border border-gray-300 rounded-xl px-4 py-2 text-md outline-none focus:ring-2 focus:ring-[#5483B3] bg-white text-slate-800 disabled:bg-gray-50 font-semibold"
          >
            <option value="">-- Chọn Khóa --</option>
            {cohortsList.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.name} (Bắt đầu: {cohort.startYear})
              </option>
            ))}
            {!isCreate &&
              !cohortsList.find((c) => c.id === cohortPeriodData?.cohortId) && (
                <option value={cohortPeriodData?.cohortId}>
                  {cohortPeriodData?.cohortName}
                </option>
              )}
          </select>
        </div>

        <div>
          {isCreate ? (
            <svg
              onClick={onCancel}
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
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
          ) : (
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting || isEditing}
              className="bg-transparent border-none p-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <div className="w-[20px] h-[20px] border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                >
                  <path
                    fill="currentColor"
                    d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">
            Thời gian bắt đầu
          </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            readOnly={isReadOnly}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-md outline-none focus:ring-2 focus:ring-[#5483B3] bg-white text-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">
            Thời gian kết thúc
          </label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            readOnly={isReadOnly}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-md outline-none focus:ring-2 focus:ring-[#5483B3] bg-white text-slate-800"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        {!isCreate && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="h-fit text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-white hover:bg-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 text-sm"
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
                strokeWidth="1.5"
                d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
              />
            </svg>
            Chỉnh sửa
          </button>
        )}

        {!isCreate && isEditing && (
          <>
            <button
              onClick={handleCancelEdit}
              disabled={isSaving}
              className="h-fit text-slate-600 font-medium border border-slate-400 rounded-full px-5 py-3 bg-white hover:bg-slate-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 text-sm"
            >
              Hủy
            </button>
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 text-sm disabled:bg-gray-400"
            >
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </>
        )}

        {isCreate && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="h-fit text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-white hover:bg-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 text-sm disabled:bg-gray-400"
          >
            {isSaving ? "Đang lưu..." : "Lưu đợt theo khóa"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PeriodCohortCard;
