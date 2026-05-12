
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { ROUTERS } from "../../utils/router";


const OAuth2RedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("accessToken");

    if (token) {
      localStorage.setItem("accessToken", token);
      toast.success("Đăng nhập bằng tài khoản liên kết thành công!");

      try {
        const decodedToken = jwtDecode(token);
        let userRoles = [];
        
        if (Array.isArray(decodedToken.roles)) {
          userRoles = decodedToken.roles;
        } else if (typeof decodedToken.roles === "string") {
          userRoles = decodedToken.roles.split(',').map(r => r.trim());
        }

        let redirectPath = ROUTERS.USER.HOME;

        if (userRoles.includes("ROLE_ADMIN") || userRoles.includes("ADMIN")) {
          redirectPath = ROUTERS.ADMIN.PROFILE;
        } else if (userRoles.includes("ROLE_DEAN") || userRoles.includes("DEAN")) {
          redirectPath = ROUTERS.DEAN.PROFILE;
        } else if (userRoles.includes("HOD") || userRoles.includes("ROLE_HOD")) {
          redirectPath = ROUTERS.DEPARTMENTHEAD.PROFILE;
        } else if (userRoles.includes("ROLE_LECTURER") || userRoles.includes("LECTURER")) {
          redirectPath = ROUTERS.LECTURER.PROFILE;
        } else {
          redirectPath = ROUTERS.USER.PROFILE;
        }

        navigate(redirectPath, { replace: true });
      } catch (error) {
        console.error("Lỗi giải mã token OAuth2:", error);
        toast.error("Lỗi xác thực token từ hệ thống!");
        navigate("/login", { replace: true });
      }
    } else {
      toast.error("Đăng nhập thất bại: Không nhận được token!");
      navigate("/login", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
      <div className="relative flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-[#5483B3] border-t-transparent rounded-full animate-spin absolute"></div>
      </div>
      <h2 className="mt-5 text-xl font-bold text-[#0A4174] animate-pulse">
        Đang xác thực tài khoản của bạn...
      </h2>
      <p className="text-slate-500 text-sm mt-2">Vui lòng không đóng cửa sổ này</p>
    </div>
  );
};

export default OAuth2RedirectHandler;