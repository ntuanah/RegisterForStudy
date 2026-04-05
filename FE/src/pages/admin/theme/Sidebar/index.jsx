import { NavLink, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../../../service/authService";
import { toast } from "react-toastify";
import { getMyInfoAPI } from "../../../../service/userService";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

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

  const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className=" bg-white shadow-xl border-e border-[#0A4174] flex flex-col h-screen sticky top-0">
      <div className="py-6 px-20 flex flex-col items-center text-center">
        <img
          src={defaultAvatar}
          alt="avt"
          className="w-24 border-2 border-black rounded-full p-1 mb-4"
        />
        <div>
          <p className="text-xl font-semibold">{userInfo?.fullName || "Đang tải..."}</p>
        </div>
      </div>

      <div className="space-y-3 px-5 text-[#5483B3] font-medium flex flex-col">
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Thông tin cá nhân
        </NavLink>

        <NavLink
          to="/admin/user-management"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Quản lý người dùng
        </NavLink>

        <NavLink
          to="/admin/major-management"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Quản lý ngành học
        </NavLink>

        <NavLink
          to="/admin/cohort-management"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Quản lý khoá
        </NavLink>

        <NavLink
          to="/admin/subject-management"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Quản lý môn học
        </NavLink>

        <NavLink
          to="/admin/training-program-management"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Quản lý chương trình đào tạo
        </NavLink>

        <NavLink
          to="/admin/score-management"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Quản lý điểm số
        </NavLink>

        <NavLink
          to="/admin/semester-configuration"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Cấu hình học kỳ
        </NavLink>
      </div>

      <div className="mt-auto pb-6 flex justify-center">
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
