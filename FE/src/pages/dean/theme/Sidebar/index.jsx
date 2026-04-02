import { NavLink, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../../../service/authService";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();

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

  return (
    <div className=" bg-white shadow-xl border-e border-[#0A4174] flex flex-col h-screen sticky top-0">
      <div className="py-6 px-20 flex flex-col items-center text-center">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1ngOY_Yq7YHqXKHGTe8sgBUczFjiM-63QZBVCPNGMdX9d1YGbcTN5fu-C2Hw6MUE8y_LsdreLUqu5EyR9aA7F3MFInMjXAvRnnfSv8jRPfWI28Rz6PgYs-8Vfqg6uS9kOZmKXOGsjImgiw6eOl9TJP-iC3ZCgRraxEBIG5dQQSTtYQWuc6BPHtPv0qBSBxTga31ICw70DBoScpOqgQbeNKofDCOloEnUsewieQ7coKLJqqMU3ZH9GcUktYNGlGC4pUmAd0tseCS8"
          alt="avt"
          className="w-24 border-2 border-black rounded-full p-1 mb-4"
        />
        <div>
          <p className="text-xl font-semibold">Nguyễn Tuấn Anh</p>
          <p className="text-sm text-gray-500 font-semibold mt-1">
            Công nghệ thông tin
          </p>
        </div>
      </div>

      <div className="space-y-3 px-5 text-[#5483B3] font-medium flex flex-col">
        <NavLink
          to="/dean/profile"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Thông tin cá nhân
        </NavLink>

        <NavLink
          to="/dean/arrange-class-schedule"
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
          Sắp xếp lịch phòng học
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
