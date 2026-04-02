import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { ROUTERS } from "./router"; 

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to={ROUTERS.USER.LOGIN} replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.roles || []; 

    const hasPermission = userRoles.some((role) => allowedRoles.includes(role));

    if (hasPermission) {
      return <Outlet />;
    } else {
      toast.error("Bạn không có quyền truy cập trang này!");
      
      if (userRoles.includes("ROLE_ADMIN")) return <Navigate to={ROUTERS.ADMIN.PROFILE} replace />;
      if (userRoles.includes("ROLE_DEAN")) return <Navigate to={ROUTERS.DEAN.PROFILE} replace />;
      if (userRoles.includes("ROLE_DEPARTMENT_HEAD") || userRoles.includes("ROLE_DEPARTMENTHEAD")) return <Navigate to={ROUTERS.DEPARTMENTHEAD.PROFILE} replace />;
      if (userRoles.includes("ROLE_LECTURER")) return <Navigate to={ROUTERS.LECTURER.PROFILE} replace />;
      
      return <Navigate to={ROUTERS.USER.HOME} replace />;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return <Navigate to={ROUTERS.USER.LOGIN} replace />;
  }
};

export default ProtectedRoute;