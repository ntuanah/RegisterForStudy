import { useState } from "react";
import {
  createRegistrationPeriodAPI,
  deleteRegistrationPeriodAPI,
  updateRegistrationPeriodAPI,
} from "../../../service/registrationPeriodService";
import { toast } from "react-toastify";
import { getPeriodCohortsAPI } from "../../../service/periodCohortService";
import { getAllCohortsAPI } from "../../../service/cohortService";
import PeriodCohortCard from "../PeriodCohortCard";

const RegistrationPeriodCard = ({
  isCreate,
  periodData,
  semesterId,
  onCancel,
  onSuccess,
  index,
}) => {
  const [name, setName] = useState(isCreate ? "" : periodData?.name || "");
  const [startTime, setStartTime] = useState(
    isCreate ? "" : periodData?.startTime?.slice(0, 16) || "",
  );
  const [endTime, setEndTime] = useState(
    isCreate ? "" : periodData?.endTime?.slice(0, 16) || "",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showCohorts, setShowCohorts] = useState(false);
  const [isAddingCohort, setIsAddingCohort] = useState(false);
  const [cohortPeriods, setCohortPeriods] = useState([]);
  const [cohortsList, setCohortsList] = useState([]);
  const [isLoadingCohorts, setIsLoadingCohorts] = useState(false);

  const fetchCohortData = async () => {
    try {
      setIsLoadingCohorts(true);
      const [periodRes, cohortsRes] = await Promise.all([
        getPeriodCohortsAPI(periodData.id),
        getAllCohortsAPI(),
      ]);
      if (periodRes.data.code === 200 || periodRes.data.code === 1000) {
        setCohortPeriods(periodRes.data.result || []);
      }
      if (cohortsRes.data.code === 1000) {
        setCohortsList(cohortsRes.data.result || []);
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu khóa:", error);
      toast.error("Lỗi tải thông tin khóa học!");
    } finally {
      setIsLoadingCohorts(false);
    }
  };

  const handleToggleCohorts = () => {
    if (!showCohorts) {
      fetchCohortData();
    }
    setShowCohorts(!showCohorts);
  };

  const handleCohortSuccess = () => {
    setIsAddingCohort(false);
    fetchCohortData();
  };

  const handleCreate = async () => {
    if (!name || !startTime || !endTime) {
      return toast.warning("Vui lòng nhập đầy đủ thông tin!");
    }

    try {
      setIsSaving(true);
      const payload = {
        semesterId: semesterId,
        name: name,
        startTime: startTime + ":00",
        endTime: endTime + ":59",
      };

      const res = await createRegistrationPeriodAPI(payload);
      if (res.data.code === 1000) {
        toast.success("Tạo đợt đăng ký thành công!");
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.data.message || "Tạo đợt đăng ký thất bại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối Server!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!name || !startTime || !endTime) {
      return toast.warning("Vui lòng nhập đầy đủ thông tin!");
    }

    try {
      setIsSaving(true);
      const payload = {
        semesterId: periodData.semesterId,
        name: name,
        startTime: startTime.length === 16 ? startTime + ":00" : startTime,
        endTime: endTime.length === 16 ? endTime + ":59" : endTime,
      };

      const res = await updateRegistrationPeriodAPI(periodData.id, payload);
      if (res.data.code === 1000) {
        toast.success("Cập nhật đợt đăng ký thành công!");
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
    if (
      !window.confirm(
        "Bạn có chắc chắn muốn xóa đợt đăng ký này? Dữ liệu sẽ không thể khôi phục.",
      )
    )
      return;

    try {
      setIsDeleting(true);
      const res = await deleteRegistrationPeriodAPI(periodData.id);
      if (res.data.code === 1000) {
        toast.success("Xóa đợt đăng ký thành công!");
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
    setName(periodData?.name || "");
    setStartTime(periodData?.startTime?.slice(0, 16) || "");
    setEndTime(periodData?.endTime?.slice(0, 16) || "");
    setIsEditing(false);
  };

  const isReadOnly = !isCreate && !isEditing;

  return (
    <div className="bg-blue-50 rounded-xl p-4 md:p-6 shadow-sm border border-[#0A4174]">
      <div className="mb-4 flex items-start md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full">
          <h2 className="text-base md:text-lg font-semibold whitespace-nowrap">
            {isCreate ? "Tạo đợt mới:" : `Đợt ${index}:`}
          </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={isReadOnly}
            placeholder={isCreate ? "Nhập tên đợt đăng ký" : ""}
            className="w-full md:w-[500px] border border-gray-300 rounded-xl px-4 py-2 text-base md:text-lg outline-none focus:ring-2 focus:ring-[#5483B3] bg-white text-slate-800"
          />
        </div>

        <div className = "shrink-0 flex items-center justify-center">
          {isCreate ? (
            <svg
              onClick={onCancel}
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
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
              className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-transparent border-none p-0"
            >
              {isDeleting ? (
                <div className="w-[22px] h-[22px] border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  height="22px"
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

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-500 mb-2">
          Thời gian bắt đầu
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          readOnly={isReadOnly}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#5483B3] bg-white text-slate-800"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-500 mb-2">
          Thời gian kết thúc
        </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          readOnly={isReadOnly}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#5483B3] bg-white text-slate-800"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        {!isCreate && !isEditing && (
          <>
            <button
              onClick={handleToggleCohorts}
              className={`h-fit font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-white hover:bg-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 ${showCohorts ? "text-[#5483B3]  hover:bg-[#0A4174]" : "text-[#5483B3]"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="M1024 768q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30m0 640q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20m0-1152q143 0 284 35t266 105t226 170t166 234q40 83 61 171t21 181h-128q0-118-36-221t-99-188t-150-152t-185-113t-209-70t-217-24q-108 0-217 24t-208 70t-186 113t-149 152t-100 188t-36 221H0q0-92 21-180t61-172q64-132 165-233t227-171t266-104t284-36"
                />
              </svg>
              {showCohorts ? "Ẩn chi tiết đợt theo khóa" : "Chi tiết đợt theo khóa"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="h-fit text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
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
              Chỉnh sửa
            </button>
          </>
        )}

        {!isCreate && isEditing && (
          <>
            <button
              onClick={handleCancelEdit}
              disabled={isSaving}
              className="h-fit text-slate-600 font-medium border border-slate-400 rounded-full px-5 py-3 bg-white hover:bg-slate-200 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              Hủy
            </button>

            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
            >
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </>
        )}

        {isCreate && (
          <button
            onClick={handleCreate}
            disabled={isSaving}
            className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
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
            )}
            {isSaving ? "Đang lưu..." : "Lưu đợt đăng ký"}
          </button>
        )}
      </div>

      {showCohorts && (
        <div className="mt-8 pt-6 border-t border-[#0A4174]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pl-0 md:pl-8 gap-4">
            <h3 className="text-lg md:text-xl font-bold text-[#0A4174]">
              Các đợt đăng ký theo khóa
            </h3>
            <button
              onClick={() => setIsAddingCohort(true)}
              disabled={isAddingCohort}
              className="w-full sm:w-auto justify-center h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-[#0A4174] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
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
                  d="M4 12h8m0 0h8m-8 0V4m0 8v8"
                />
              </svg>
              Thêm đợt theo khóa
            </button>
          </div>

          <div className="pl-8 flex flex-col gap-4 ml-4">
            {isAddingCohort && (
              <PeriodCohortCard
                isCreate={true}
                periodId={periodData.id}
                cohortsList={cohortsList}
                onCancel={() => setIsAddingCohort(false)}
                onSuccess={handleCohortSuccess}
              />
            )}

            {isLoadingCohorts ? (
              <div className="flex justify-center py-5">
                <div className="w-6 h-6 rounded-full"></div>
              </div>
            ) : cohortPeriods.length === 0 && !isAddingCohort ? (
              <div className="text-center py-6 text-slate-500 italic border  border-slate-300 rounded-xl">
                Chưa có đợt đăng ký nào cho khóa.
              </div>
            ) : (
              cohortPeriods.map((cp, idx) => (
                <PeriodCohortCard
                  key={cp.id}
                  isCreate={false}
                  cohortPeriodData={cp}
                  periodId={periodData.id}
                  cohortsList={cohortsList}
                  index={idx + 1}
                  onSuccess={handleCohortSuccess}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPeriodCard;
