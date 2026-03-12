const InformationUser = ({ close }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thông tin người dùng</h2>

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

        <div className="flex gap-20 px-10">
          <div className="space-y-2">
            <div className="">
              <h3 className="text-lg text-[#5483B3] font-semibold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M38.5 5.5h-29a4 4 0 0 0-4 4v29a4 4 0 0 0 4 4h29a4 4 0 0 0 4-4v-29a4 4 0 0 0-4-4"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.72 5.5h4.56v8.554h-4.56z"
                  />
                  <circle
                    cx="18.869"
                    cy="23.804"
                    r="3.28"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.477 35.477a6.392 6.392 0 1 1 12.785 0zm15.205-6.393h7.841m-7.841-4h7.841m-7.841 8h7.841"
                  />
                </svg>
                Thông tin cá nhân
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Họ và tên
                </label>
                <p className="text-sm font-medium">Nguyễn Tuấn Anh</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Vai trò
                </label>
                <p className="text-sm font-medium">Sinh viên</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Mã
                </label>
                <p className="text-sm font-medium">A46573</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Khoa
                </label>
                <p className="text-sm font-medium">Công nghệ thông tin</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Giới tính
                </label>
                <p className="text-sm font-medium">Nam</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Ngày sinh
                </label>
                <p className="text-sm font-medium">01/05/2004</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Căn cước công dân
                </label>
                <p className="text-sm font-medium">019204002062</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Liên lạc khẩn cấp
                </label>
                <p className="text-sm font-medium">0123456789</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="">
              <h3 className="text-lg text-[#5483B3] font-semibold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M154.7 142.75a36 36 0 1 0-37.4 0a63.6 63.6 0 0 0-32.5 22.85a4 4 0 0 0 6.4 4.8a56 56 0 0 1 89.6 0a4 4 0 0 0 6.4-4.8a63.65 63.65 0 0 0-32.5-22.85M108 112a28 28 0 1 1 28 28a28 28 0 0 1-28-28m100-84H64a12 12 0 0 0-12 12v28H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v28a12 12 0 0 0 12 12h144a12 12 0 0 0 12-12V40a12 12 0 0 0-12-12m4 188a4 4 0 0 1-4 4H64a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4h144a4 4 0 0 1 4 4Z"
                  />
                </svg>
                Thông tin liên lạc
              </h3>
            </div>

            <div className="space-y-10"> 
              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Email
                </label>
                <p className="text-sm font-medium">ntuanah15@gmail.com</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Số điện thoại
                </label>
                <p className="text-sm font-medium">0987244992</p>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1"
                  htmlFor="fullName"
                >
                  Địa chỉ
                </label>
                <p className="text-sm font-medium">Thái Nguyên</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationUser;
