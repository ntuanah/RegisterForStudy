const ProfileAdminPage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Hồ sơ admin
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            Thông tin cá nhân
          </h1>
          <p className="text-slate-500 mt-1">
            Quản lý và cập nhật thông tin cá nhân của bạn.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="h-32 bg-blue-50 relative">
            <div className="absolute inset-0 opacity-10"></div>
          </div>

          <div className="px-8 pb-8 -mt-12 relative flex items-end justify-between gap-6">
            <div className="size-32 rounded-2xl bg-white p-1 shadow-lg">
              <img
                className="w-full h-full rounded-xl border border-slate-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1ngOY_Yq7YHqXKHGTe8sgBUczFjiM-63QZBVCPNGMdX9d1YGbcTN5fu-C2Hw6MUE8y_LsdreLUqu5EyR9aA7F3MFInMjXAvRnnfSv8jRPfWI28Rz6PgYs-8Vfqg6uS9kOZmKXOGsjImgiw6eOl9TJP-iC3ZCgRraxEBIG5dQQSTtYQWuc6BPHtPv0qBSBxTga31ICw70DBoScpOqgQbeNKofDCOloEnUsewieQ7coKLJqqMU3ZH9GcUktYNGlGC4pUmAd0tseCS8"
                alt=""
              />
            </div>

            <div className="flex-1 flex flex-col justify-between gap-4 pb-2">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Nguyễn Tuấn Anh
                </h3>
                
              </div>
            </div>

            <button className=" text-white font-medium border border-[#0A4174] rounded-full px-10 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"
                />
              </svg>
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-blue-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-5">
            <div className="">
              <h3 className="text-lg text-[#5483B3] font-semibold mb-4 flex items-center gap-2">
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

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
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
                  Ngày sinh
                </label>
                <p className="text-sm font-medium">01/05/2004</p>
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
                  Số căn cước công dân
                </label>
                <p className="text-sm font-medium">123456789012</p>
              </div>

              <div className="col-span-2">
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

          <div className="bg-blue-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-5">
            <div className="">
              <h3 className="text-lg text-[#5483B3] font-semibold mb-4 flex items-center gap-2">
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

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="18.5" height="17" x="2.682" y="3.5" rx="4" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.729 7.59l7.205 4.13a3.96 3.96 0 0 0 3.975 0l7.225-4.13"
                      />
                    </g>
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider">
                    Email admin
                  </p>
                  <p className="text-sm font-medium">ntuanah15@gmailcom</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-slate-400">
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
                      strokeWidth="1.5"
                      d="M18.118 14.702L14 15.5c-2.782-1.396-4.5-3-5.5-5.5l.77-4.13L7.815 2H4.064c-1.128 0-2.016.932-1.847 2.047c.42 2.783 1.66 7.83 5.283 11.453c3.805 3.805 9.286 5.456 12.302 6.113c1.165.253 2.198-.655 2.198-1.848v-3.584z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider">
                    Số điện thoại
                  </p>
                  <p className="text-sm font-medium">0987244992</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-slate-400">
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
                      d="m12 23l-6-6a9 9 0 1 1 12 0z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider">
                    Địa chỉ thường trú
                  </p>
                  <p className="text-sm font-medium">Thái Nguyên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdminPage;
