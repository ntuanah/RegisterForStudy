const ListStudent = ({ close }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-3/4 rounded-xl p-6 border border-[#0A4174]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Danh sách sinh viên</h2>

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

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left  border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
                  STT
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
                  Mã sinh viên
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
                  Tên sinh viên
                </th>
                <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-24">
                  Lớp
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">A46573</td>
                <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
                <td className="px-6 py-4">TT35CL07</td>
              </tr>

              <tr>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">A46573</td>
                <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
                <td className="px-6 py-4">TT35CL07</td>
              </tr>

              <tr>
                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4">A46573</td>
                <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
                <td className="px-6 py-4">TT35CL07</td>
              </tr>

              <tr>
                <td className="px-6 py-4">4</td>
                <td className="px-6 py-4">A46573</td>
                <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
                <td className="px-6 py-4">TT35CL07</td>
              </tr>

              <tr>
                <td className="px-6 py-4">5</td>
                <td className="px-6 py-4">A46573</td>
                <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
                <td className="px-6 py-4">TT35CL07</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListStudent;
