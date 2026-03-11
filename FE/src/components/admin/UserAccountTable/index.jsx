const UserAccountTable = () => {
  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-20">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-32">
              Mã người dùng
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên người dùng
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Tên tài khoản
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Mật khẩu
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Vai trò
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Trạng thái
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          <tr>
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">N2mcSH7QZL</td>
            <td className="px-6 py-4">Sinh viên</td>
            <td className="px-6 py-4 flex text-green-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Hoạt động
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">2</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">N2mcSH7QZL</td>
            <td className="px-6 py-4">Sinh viên</td>
            <td className="px-6 py-4 flex text-slate-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Không hoạt động
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">3</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">N2mcSH7QZL</td>
            <td className="px-6 py-4">Sinh viên</td>
            <td className="px-6 py-4 flex text-green-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Hoạt động
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">4</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">N2mcSH7QZL</td>
            <td className="px-6 py-4">Sinh viên</td>
            <td className="px-6 py-4 flex text-green-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Hoạt động
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4">5</td>
            <td className="px-6 py-4">A46573</td>
            <td className="px-6 py-4">Nguyễn Tuấn Anh</td>
            <td className="px-6 py-4">A46573@thanglong.edu.vn</td>
            <td className="px-6 py-4">N2mcSH7QZL</td>
            <td className="px-6 py-4">Sinh viên</td>
            <td className="px-6 py-4 flex text-green-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 37.45c-6.89 0-12.55 5.66-12.55 12.549c0 6.89 5.66 12.55 12.55 12.55c6.655 0 12.112-5.294 12.48-11.862a3.5 3.5 0 0 0 .07-.688a3.5 3.5 0 0 0-.07-.691C62.11 42.74 56.653 37.45 50 37.45m0 7c3.107 0 5.55 2.442 5.55 5.549s-2.443 5.55-5.55 5.55s-5.55-2.443-5.55-5.55S46.892 44.45 50 44.45"
                  color="currentColor"
                />
              </svg>
              Hoạt động
            </td>
          </tr>

          
        </tbody>
      </table>
    </div>
  );
};

export default UserAccountTable;
