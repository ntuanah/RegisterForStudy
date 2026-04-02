import { useState } from "react";
import { toast } from "react-toastify";
import {
  forgotPasswordAPI,
  resetPasswordAPI,
  verifyOtpAPI,
} from "../../../../service/authService";

const ForgotPassword = ({ close }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const handleSendEmail = async () => {
    if (!email) {
      toast.warning("Vui lòng nhập email!");
      return;
    }
    try {
      setIsLoading(true);
      const res = await forgotPasswordAPI(email);
      if (res.data.code === 1000) {
        toast.success(res.data.message || "Đã gửi mã OTP!");
        setStep(2); 
      } else {
        toast.error(res.data.message || "Lỗi gửi email!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối server!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.warning("Vui lòng nhập mã OTP!");
      return;
    }
    try {
      setIsLoading(true);
      const res = await verifyOtpAPI(email, otp);
      if (res.data.code === 1000) {
        toast.success(res.data.message || "Xác thực OTP thành công!");
        setResetToken(res.data.result);
        setStep(3);
      } else {
        toast.error(res.data.message || "Mã OTP không hợp lệ!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối server!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.warning("Vui lòng nhập đầy đủ mật khẩu!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setIsLoading(true);
      const res = await resetPasswordAPI(
        email,
        resetToken,
        newPassword,
        confirmPassword,
      );
      if (res.data.code === 1000) {
        toast.success(res.data.message || "Khôi phục mật khẩu thành công!");
        close();
      } else {
        toast.error(res.data.message || "Lỗi đổi mật khẩu!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối server!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-2xl p-6 border border-[#0A4174] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0A4174]">Quên mật khẩu</h2>

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

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full ${
                step === s ? "bg-[#5483B3]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 uppercase mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSendEmail}
                disabled={isLoading}
                className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 
                  ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer hover:-translate-y-1"}`}
              >
                {!isLoading && (
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
                      d="m14 10l-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04l-3.219-7.242a.54.54 0 0 0-.271-.271l-7.242-3.22a.535.535 0 0 1 .04-.993z"
                    />
                  </svg>
                )}
                {isLoading ? "Đang gửi..." : "Gửi OTP"}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 uppercase mb-1">
                Mã OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Nhập OTP"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="h-fit text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                Quay lại
              </button>

              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 
                  ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer hover:-translate-y-1"}`}
              >
                {!isLoading && (
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
                      <path
                        strokeDasharray="60"
                        d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.6s"
                          values="60;0"
                        />
                      </path>
                      <path
                        strokeDasharray="14"
                        strokeDashoffset="14"
                        d="M8 12l3 3l5 -5"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.6s"
                          dur="0.2s"
                          to="0"
                        />
                      </path>
                    </g>
                  </svg>
                )}
                {isLoading ? "Đang xác thực..." : "Xác nhận"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 uppercase mb-1">
                Mật khẩu mới
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 uppercase mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="h-fit text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                Quay lại
              </button>

              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className={`h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 
                  ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer hover:-translate-y-1"}`}
              >
                {isLoading ? "Đang xử lý..." : "Hoàn tất"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
