import { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordAPI } from "../../../../service/authService";

const ChangePassword = ({ close }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async () => {
    if (
      !formData.oldPassword.trim() ||
      !formData.newPassword.trim() ||
      !formData.confirmPassword.trim()
    ) {
      return toast.warning("Vui lòng điền đầy đủ thông tin!");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
    }

    try {
      setIsLoading(true);

      const payload = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      };

      const response = await changePasswordAPI(payload);
      const { data } = response;

      if (data.code === 1000) {
        toast.success(data.message || "Đổi mật khẩu thành công!");
        close(); 
      } else {
        toast.error(data.message || "Đổi mật khẩu thất bại!");
      }
    } catch (error) {
      const errorData = error.response?.data;
      
      if (errorData?.code === 1006) {
        toast.error("Mật khẩu cũ không chính xác!");
      } else {
        toast.error(errorData?.message || "Lỗi hệ thống khi đổi mật khẩu!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-[500px] rounded-xl p-5 md:p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-bold">Đổi mật khẩu</h2>

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
              Mật khẩu cũ
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleOnChange}
              placeholder="Nhập mật khẩu hiện tại"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Mật khẩu mới
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleOnChange}
              placeholder="Nhập mật khẩu mới"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              placeholder="Nhập lại mật khẩu mới"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleChangePassword}
            disabled={isLoading}
            className={`w-full md:w-auto h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer"}`}
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
            {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
