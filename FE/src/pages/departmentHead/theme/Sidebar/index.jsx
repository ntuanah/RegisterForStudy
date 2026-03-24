import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
          <p className="text-sm text-gray-500 font-semibold mt-1">Công nghệ thông tin</p>
        </div>
      </div>

      <div className="space-y-3 px-5 text-[#5483B3] font-medium flex flex-col">

        <NavLink
          to="/department-head/profile"
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
          className={({ isActive }) =>
            `border border-[#0A4174] rounded-full px-5 py-3 inline-block hover:bg-gray-200 hover:text-[#5483B3] transition-all duration-300 hover:-translate-y-1 ${
              isActive ? "bg-[#5483B3] text-white" : ""
            }`
          }
        >
            Phân công giảng viên
        </NavLink>

      </div>

      <div className="mt-auto pb-6 flex justify-center">
        <button className=" text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-10 py-3 hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1">
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
