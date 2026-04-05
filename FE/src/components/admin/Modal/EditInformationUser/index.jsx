import { useEffect, useState } from "react";
import { getUserByIdAPI, updateStudentProfileAPI } from "../../../../service/userService";
import { toast } from "react-toastify";

const EditInformationUser = ({ close, id, refresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "ROLE_USER",
    studentCode: "",
    majorName: "",
    gender: "MALE",
    dob: "",
    cccd: "",
    emergencyContact: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserByIdAPI(id);
        const { data } = response;
        if (data.code === 1000) {
          const result = data.result;

          setFormData({
            fullName: result.fullName || "",
            role: result.roles?.[0] || "ROLE_USER", // Lấy role đầu tiên trong mảng
            studentCode: result.studentInfo?.studentCode || "",
            majorName: result.studentInfo?.majorName || "",
            gender: result.studentInfo?.gender || "MALE",
            dob: result.studentInfo?.dob || "", // Nếu BE chưa có thì mặc định rỗng
            cccd: result.studentInfo?.cccd || "",
            emergencyContact: result.studentInfo?.emergencyContact || "",
            email: result.email || "",
            phone: result.studentInfo?.phone || "",
            address: result.studentInfo?.address || "",
          });
        }
      } catch (error) {
        toast.error("Không thể tải thông tin chi tiết người dùng!");
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (
      !formData.fullName.trim() ||
      !formData.studentCode.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      return toast.warning("Vui lòng không bỏ trống thông tin!");
    }

    try {
      setIsLoading(true);

      // Gửi toàn bộ dữ liệu đi. Nếu BE cần biến roles là mảng thì ép kiểu nó thành mảng
      const payload = {
        ...formData,
        roles: [formData.role],
      };

      const response = await updateStudentProfileAPI(id, payload);
      const { data } = response;

      if (data.code === 1000) {
        toast.success("Cập nhật thông tin thành công!");
        refresh(); // Load lại bảng
        close(); // Đóng form
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
          <h2 className="text-xl font-bold">Chỉnh sửa thông tin người dùng</h2>

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

        <div className="flex gap-20 px-10">
          <div className="space-y-2">
            <div className="">
              <h3 className="text-lg text-[#5483B3] font-semibold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M38.5 5.5h-29a4 4 0 0 0-4 4v29a4 4 0 0 0 4 4h29a4 4 0 0 0 4-4v-29a4 4 0 0 0-4-4"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.72 5.5h4.56v8.554h-4.56z"
                  />
                  <circle
                    cx="18.869"
                    cy="23.804"
                    r="3.28"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.477 35.477a6.392 6.392 0 1 1 12.785 0zm15.205-6.393h7.841m-7.841-4h7.841m-7.841 8h7.841"
                  />
                </svg>
                Thông tin cá nhân
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Vai trò
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3] bg-white"
                >
                  <option value="ROLE_USER">Sinh viên</option>
                  <option value="ROLE_LECTURER">Giảng viên</option>
                  <option value="ROLE_DEPARTMENTHEAD">Trưởng bộ môn</option>
                  <option value="ROLE_DEAN">Trưởng khoa</option>
                  <option value="ROLE_ADMIN">Quản trị viên</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Mã số
                </label>
                <input
                  type="text"
                  name="studentCode"
                  value={formData.studentCode}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Ngành
                </label>
                <input
                  type="text"
                  name="majorName"
                  value={formData.majorName}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Giới tính
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3] bg-white"
                >
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Căn cước công dân
                </label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Liên lạc khẩn cấp
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="">
              <h3 className="text-lg text-[#5483B3] font-semibold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M154.7 142.75a36 36 0 1 0-37.4 0a63.6 63.6 0 0 0-32.5 22.85a4 4 0 0 0 6.4 4.8a56 56 0 0 1 89.6 0a4 4 0 0 0 6.4-4.8a63.65 63.65 0 0 0-32.5-22.85M108 112a28 28 0 1 1 28 28a28 28 0 0 1-28-28m100-84H64a12 12 0 0 0-12 12v28H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v28a12 12 0 0 0 12 12h144a12 12 0 0 0 12-12V40a12 12 0 0 0-12-12m4 188a4 4 0 0 1-4 4H64a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4h144a4 4 0 0 1 4 4Z"
                  />
                </svg>
                Thông tin liên lạc
              </h3>
            </div>

            <div className="space-y-10">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Địa chỉ
                </label>
                <textarea
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleOnChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3] resize-none"
                ></textarea>
              </div>
            </div>
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
                d="M16.25 21v-4.765a1.59 1.59 0 0 0-1.594-1.588H9.344a1.59 1.59 0 0 0-1.594 1.588V21m8.5-17.715v2.362a1.59 1.59 0 0 1-1.594 1.588H9.344A1.59 1.59 0 0 1 7.75 5.647V3m8.5.285A3.2 3.2 0 0 0 14.93 3H7.75m8.5.285c.344.156.661.374.934.645l2.382 2.375A3.17 3.17 0 0 1 20.5 8.55v9.272A3.18 3.18 0 0 1 17.313 21H6.688A3.18 3.18 0 0 1 3.5 17.823V6.176A3.18 3.18 0 0 1 6.688 3H7.75"
              />
            </svg>
            {isLoading ? "Đang xử lý..." : "Chỉnh sửa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInformationUser;
