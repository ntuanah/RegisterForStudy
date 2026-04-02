import BG from "../../../assets/users/bg.jpg";
import Logo from "../../../assets/users/Logo.svg";
import GGLogo from "../../../assets/users/GGLogo.png";
import TeamsLogo from "../../../assets/users/TeamsLogo.jpeg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ROUTERS } from "../../../utils/router";
import { jwtDecode } from "jwt-decode";
import { loginAPI } from "../../../service/authService";
import ForgotPassword from "../../../components/users/Modal/ ForgotPassword";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const tokenFromUrl = searchParams.get("accessToken");

    if (tokenFromUrl) {
      localStorage.setItem("accessToken", tokenFromUrl);
      toast.success("Đăng nhập thành công!");

      try {
        const decodedToken = jwtDecode(tokenFromUrl);
        let userRoles = [];
        if (Array.isArray(decodedToken.roles)) {
          userRoles = decodedToken.roles;
        } else if (typeof decodedToken.roles === "string") {
          userRoles = [decodedToken.roles];
        }

        let redirectPath = ROUTERS.USER.HOME;

        if (userRoles.includes("ROLE_ADMIN") || userRoles.includes("ADMIN")) {
          redirectPath = ROUTERS.ADMIN.PROFILE;
        } else if (
          userRoles.includes("ROLE_DEAN") ||
          userRoles.includes("DEAN")
        ) {
          redirectPath = ROUTERS.DEAN.PROFILE;
        } else if (
          userRoles.includes("DEPARTMENT_HEAD") ||
          userRoles.includes("ROLE_DEPARTMENT_HEAD") ||
          userRoles.includes("ROLE_DEPARTMENTHEAD") ||
          userRoles.includes("DEPARTMENTHEAD")
        ) {
          redirectPath = ROUTERS.DEPARTMENTHEAD.PROFILE;
        } else if (
          userRoles.includes("ROLE_LECTURER") ||
          userRoles.includes("LECTURER")
        ) {
          redirectPath = ROUTERS.LECTURER.PROFILE;
        } else {
          redirectPath = ROUTERS.USER.PROFILE;
        }

        navigate(redirectPath);
      } catch (error) {
        toast.error("Lỗi xác thực token từ Teams!");
        localStorage.removeItem("accessToken");
      }
    }
  }, [searchParams, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await loginAPI(formData.username, formData.password);
      const data = response.data;

      if (data.code === 1000) {
        toast.success(data.message || "Đăng nhập thành công!");

        const token = data.result.accessToken;
        localStorage.setItem("accessToken", token);

        const decodedToken = jwtDecode(token);
        const userRoles = decodedToken.roles || [];

        let redirectPath = ROUTERS.USER.HOME;

        if (userRoles.includes("ROLE_ADMIN")) {
          redirectPath = ROUTERS.ADMIN.PROFILE;
        } else if (userRoles.includes("ROLE_DEAN")) {
          redirectPath = ROUTERS.DEAN.PROFILE;
        } else if (
          userRoles.includes("DEPARTMENT_HEAD") ||
          userRoles.includes("ROLE_DEPARTMENTHEAD")
        ) {
          redirectPath = ROUTERS.DEPARTMENTHEAD.PROFILE;
        } else if (userRoles.includes("LECTURER")) {
          redirectPath = ROUTERS.LECTURER.PROFILE;
        } else {
          redirectPath = ROUTERS.USER.PROFILE;
        }

        navigate(redirectPath);
      } else {
        toast.error(data.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Sai username hoặc password",
        );
      } else {
        toast.error("Lỗi kết nối đến server!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeamsLogin = () => {
    const API_BASE = import.meta.env.VITE_API_URL.replace("/api", "");
    window.location.href = `${API_BASE}/oauth2/authorization/azure`;
  };

  const handleGoogleLogin = () => {
    const API_BASE = import.meta.env.VITE_API_URL.replace("/api", "");
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  return (
    <div
      className="min-h-screen flex justify-between items-center bg-cover bg-center px-45"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div>
        <img src={Logo} alt="" className="w-100" />
        <p className="text-8xl text-[#5483B3] text-shadow-2xs font-bold">
          Chào mừng
        </p>
        <p className="text-3xl text-[#0A4174] text-shadow-2xs font-bold">
          Bạn đến với trang đăng ký học
        </p>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
          Bắt đầu hành trình học tập của bạn với trải nghiệm đăng ký đơn giản,
          trực quan và thuận tiện. Mọi thông tin được sắp xếp rõ ràng, giúp bạn
          dễ dàng theo dõi, quản lý và chủ động hơn trong suốt quá trình học.
        </p>
      </div>
      <div className="w-[550px] bg-white/10 rounded-3xl p-10 shadow-2xl border border-white/30">
        <div className="flex items-center mb-6">
          <img src={Logo} alt="Logo" className="w-30 border-e me-2 pe-2" />
          <p className="text-center text-[#0A4174] font-bold text-2xl">
            Đăng ký học TLU
          </p>
        </div>
        <h2 className="text-2xl font-bold text-[#5483B3] mb-2 mt-2">
          Đăng nhập
        </h2>
        <form onSubmit={handleLogin} className="space-y-9">
          <div>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleOnChange}
              className="w-full p-2 border-b border-gray-300 outline-none focus:border-[#5483B3] cursor-pointer"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full p-2 border-b border-gray-300 outline-none focus:border-[#5483B3] cursor-pointer pr-10"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5483B3] cursor-pointer transition-colors"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M2.854 2.146a.5.5 0 1 0-.708.708l3.5 3.498a8.1 8.1 0 0 0-3.366 5.046a.5.5 0 1 0 .98.204a7.1 7.1 0 0 1 3.107-4.528L7.953 8.66a3.5 3.5 0 1 0 4.886 4.886l4.307 4.308a.5.5 0 0 0 .708-.708zm9.265 10.68A2.5 2.5 0 1 1 8.673 9.38zm-1.995-4.824l3.374 3.374a3.5 3.5 0 0 0-3.374-3.374M10 6c-.57 0-1.129.074-1.666.213l-.803-.803A7.7 7.7 0 0 1 10 5c3.693 0 6.942 2.673 7.72 6.398a.5.5 0 0 1-.98.204C16.058 8.327 13.207 6 10 6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M3 13c3.6-8 14.4-8 18 0" />
                    <path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
                  </g>
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-[#5483B3]"
              />
              <span className="text-gray-600">Nhớ tôi</span>
            </label>
            <div
              onClick={() => setOpenForgotPassword(true)}
              className="text-[#5483B3] hover:text-[#0A4174] font-medium cursor-pointer"
            >
              Quên mật khẩu?
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-2 rounded-full transition duration-300 cursor-pointer flex justify-center items-center ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#5483B3] hover:bg-[#0A4174]"
            }`}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="border-gray-300 flex-1" />
          <span className="px-2 text-gray-500">Hoặc</span>
          <hr className="border-gray-300 flex-1" />
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full border border-[#5483B3] text-[#5483B3] font-bold py-2 rounded-full hover:bg-gray-300 transition duration-300 cursor-pointer flex items-center justify-center gap-3"
          >
            <img src={GGLogo} alt="Google Logo" className="w-6 h-6" />
            Đăng nhập với Google
          </button>

          <button
            onClick={handleTeamsLogin}
            type="button"
            className="w-full border border-[#5483B3] text-[#5483B3] font-bold py-2 rounded-full hover:bg-gray-300 transition duration-300 cursor-pointer flex items-center justify-center gap-3"
          >
            <img src={TeamsLogo} alt="Teams Logo" className="w-6 h-6" />
            Đăng nhập với Teams
          </button>
        </div>
      </div>

      {openForgotPassword && (
        <ForgotPassword close={() => setOpenForgotPassword(false)} />
      )}
    </div>
  );
};

export default LoginPage;
