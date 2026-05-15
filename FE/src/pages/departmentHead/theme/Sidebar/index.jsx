import { NavLink, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../../../service/authService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getMyInfoAPI } from "../../../../service/userService";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ isOpen, close }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyInfoAPI();
        if (response.data.code === 1000) {
          setUserInfo(response.data.result);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin sidebar:", error);
      }
    };

    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        let userRoles = [];
        if (Array.isArray(decodedToken.roles)) {
          userRoles = decodedToken.roles;
        } else if (typeof decodedToken.roles === "string") {
          userRoles = decodedToken.roles.split(",").map((r) => r.trim());
        }
        setRoles(userRoles);
      } catch (error) {
        console.error("Lỗi parse token sidebar:", error);
      }
    }

    fetchMyInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutAPI();
      const { data } = response;

      if (data.code === 1000) {
        localStorage.removeItem("accessToken");

        toast.success(data.message || "Đăng xuất thành công!");
        navigate("/login");
      } else {
        toast.error(data.message || "Lỗi khi đăng xuất!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối đến server!");

      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const hasLecturerRole =
    roles.includes("ROLE_LECTURER") || roles.includes("LECTURER");

  return (
    <div
      className={`bg-white shadow-xl border-e border-[#0A4174] flex flex-col h-screen fixed md:sticky top-0 left-0 z-50 w-72 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="md:hidden flex justify-end p-4 pb-0">
        <button
          onClick={close} 
          className="text-white font-medium border border-[#0A4174] rounded-full p-2 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center justify-center shadow-md"
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

      <div className="py-6 px-6 flex flex-col items-center text-center mt-2 md:mt-0">
        <img
          src={defaultAvatar}
          alt="avt"
          className="w-24 border-2 border-black rounded-full p-1 mb-4 object-cover"
        />
        <div>
          <p className="text-xl font-semibold">
            {userInfo?.fullName || "Đang tải..."}
          </p>
        </div>
      </div>

      <div className="space-y-3 px-5 text-[#5483B3] font-medium flex flex-col overflow-y-auto">
        <NavLink
          to="/department-head/profile"
          onClick={close}
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Thông tin cá nhân
        </NavLink>

        <NavLink
          to="/department-head/assign-instructors"
          onClick={close}
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Phân công giảng viên
        </NavLink>

        <NavLink
          to="/department-head/lecturer-schedule"
          onClick={close}
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Lịch giảng viên
        </NavLink>

        {hasLecturerRole && (
          <button
            onClick={() => {
              navigate("/lecturer/profile");
              close();
            }}
            className="text-left border border-[#e88a18] text-[#e88a18] rounded-full px-5 py-3 inline-block hover:bg-orange-50 hover:text-[#e88a18] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            Đổi sang Giảng viên
          </button>
        )}
      </div>

      <div className="mt-auto pb-6 pt-4 flex justify-center">
        <button
          onClick={handleLogout}
          className=" text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-10 py-3 hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
