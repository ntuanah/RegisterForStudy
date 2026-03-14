const RegistrationPeriodCard = () => {
  return (
    <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-#0A4174]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Đợt 1: Đợt đăng ký chính thức
          </h2>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            className="cursor-pointer"
          >
            <path
              fill="red"
              d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
            />
          </svg>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-500 mb-2">
          Thời gian bắt đầu
        </label>
        <input
          type="datetime-local"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#5483B3] bg-white"
        />
      </div>

      <div className="">
        <label className="block text-sm font-medium text-slate-500 mb-2">
          Thời gian kết thúc
        </label>
        <input
          type="datetime-local"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#5483B3] bg-white"
        />
      </div>
    </div>
  );
};

export default RegistrationPeriodCard;
