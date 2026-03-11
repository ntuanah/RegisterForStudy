const UserFilterBar = () => {
  return (
    <div className="flex gap-6">
      <div className="flex-1 flex items-center border border-[#0A4174] rounded-full px-3 py-3 hover:bg-blue-50 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.398 0-4.064-1.666Q3.808 11.898 3.808 9.5t1.666-4.064t4.064-1.667t4.065 1.667T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"
          />
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm nội dung bất kỳ"
          className="flex-1 outline-none text-sm"
        />
      </div>

      <div className = "flex gap-3">
        <button className=" text-white font-medium border border-[#0A4174] rounded-full px-10 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
          Tất cả vai trò
        </button>

        <button className=" text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-10 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
          Sinh viên
        </button>

        <button className=" text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-10 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
          Giảng viên
        </button>

        <button className=" text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-10 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
          Trưởng bộ môn
        </button>

        <button className=" text-[#5483B3] font-medium border border-[#0A4174] rounded-full px-10 py-3 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
          Trưởng khoa
        </button>
      </div>
    </div>
  );
};

export default UserFilterBar;
