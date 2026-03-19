const AddSubjectTrainingProgram = ({ close }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-xl p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Xây dựng chương trình đào tạo</h2>

          <div className="flex gap-3">
            <button className=" text-white font-medium border border-[#0A4174] rounded-full px-5 py-1 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
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
                  d="M4 12h8m0 0h8m-8 0V4m0 8v8"
                />
              </svg>
              Thêm nhóm học phần
            </button>
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
        </div>

        <div className="space-y-6">
          <div className="border border-[#0A4174] rounded-xl p-3">
            <div className="flex justify-between mb-2 items-center">
              <label className="block text-lg font-medium text-slate-400 tracking-wider mb-1">
                Nhóm học phần
              </label>
              <div className="flex gap-3">
                <button className=" text-white font-medium border border-[#0A4174] rounded-full px-5 py-1 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
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
                      d="M4 12h8m0 0h8m-8 0V4m0 8v8"
                    />
                  </svg>
                  Thêm loại học phần
                </button>
                <button className=" font-medium border border-red-500 rounded-full p-2 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    className="cursor-pointer"
                  >
                    <path
                      fill="red"
                      d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <input
              type="text"
              defaultValue="Học phần chính trị"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
            />

            <div className="border border-[#0A4174] rounded-xl p-3 mt-3">
              <div className="flex justify-between mb-2 items-center">
                <label className="block text-lg font-medium text-slate-400 tracking-wider mb-1">
                  Loại học phần
                </label>
                <div className="flex gap-3">
                  <button className=" text-white font-medium border border-[#0A4174] rounded-full px-5 py-1 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
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
                        d="M4 12h8m0 0h8m-8 0V4m0 8v8"
                      />
                    </svg>
                    Thêm môn học
                  </button>
                  <button className=" font-medium border border-red-500 rounded-full p-2 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      className="cursor-pointer"
                    >
                      <path
                        fill="red"
                        d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <input
                type="text"
                defaultValue="Bắt buộc"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
              />

              <div className="border border-[#0A4174] rounded-xl p-3 mt-3">
                <div className="flex justify-between mb-2 items-center">
                  <label className="block text-lg font-medium text-slate-400 tracking-wider mb-1">
                    Môn học
                  </label>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      defaultValue="Bắt buộc"
                      className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                    />
                    <button className=" font-medium border border-red-500 rounded-full p-2 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        className="cursor-pointer"
                      >
                        <path
                          fill="red"
                          d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      defaultValue="Bắt buộc"
                      className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#5483B3]"
                    />
                    <button className=" font-medium border border-red-500 rounded-full p-2 bg-white hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        className="cursor-pointer"
                      >
                        <path
                          fill="red"
                          d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button className="h-fit text-white font-medium border border-[#0A4174] rounded-full px-5 py-3 bg-[#5483B3] hover:bg-gray-200 hover:text-[#5483B3] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
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
                d="M4 12h8m0 0h8m-8 0V4m0 8v8"
              />
            </svg>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectTrainingProgram;
