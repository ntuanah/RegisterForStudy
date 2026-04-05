import { useEffect, useMemo, useState } from "react";
import EditInformationUser from "../Modal/EditInformationUser";
import InformationUser from "../Modal/InformationUser";
import { toast } from "react-toastify";
import { getAllUsersAPI } from "../../../service/userService";

const UserManagementTable = ({ searchWord, selectedRole }) => {
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (word) => {
    try {
      setIsLoading(true);
      const response = await getAllUsersAPI(word);
      const { data } = response;

      if (data.code === 1000) {
        setUsers(data.result?.content || []);
      } else {
        toast.error(data.message || "Lỗi lấy dữ liệu người dùng");
        setUsers([]);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách người dùng!");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(searchWord);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchWord]);

  const filteredUsers = useMemo(() => {
    if (!selectedRole || selectedRole === "ALL") return users;

    return users.filter((user) => {
      return user.roles && user.roles.includes(selectedRole);
    });
  }, [users, selectedRole]);

  const formatRoles = (rolesArray) => {
    if (!rolesArray || rolesArray.length === 0) return "N/A";

    return rolesArray
      .map((role) => {
        if (role === "ROLE_ADMIN") return "Quản trị viên";
        if (role === "ROLE_USER") return "Sinh viên";
        if (role === "ROLE_LECTURER") return "Giảng viên";
        if (role === "ROLE_DEAN") return "Trưởng khoa";
        if (role === "ROLE_DEPARTMENTHEAD") return "Trưởng bộ môn";
        return role;
      })
      .join(", ");
  };

  return (
    <div className="border border-slate-200 rounded-xl shadow-sm mt-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-5">
              STT
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-15">
              Mã người dùng
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400">
              Tên người dùng
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Email
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-50">
              Vai trò
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-44">
              Trạng thái
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-400 w-30">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-slate-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-slate-500">
                Không tìm thấy người dùng nào.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, index) => (
              <tr
                key={user.accountId}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-slate-700">
                  {user.username}
                </td>
                <td className="px-6 py-4">{user.fullName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 font-medium">
                  {formatRoles(user.roles)}
                </td>
                <td className="px-6 py-4">
                  {user.isActive ? (
                    <span className="flex items-center text-green-600 gap-1">
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
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500 gap-1">
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
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4 text-[#5483B3]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      className="cursor-pointer hover:text-blue-700 transition"
                      onClick={() => setEditUserId(user.accountId)}
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
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editUserId && (
        <EditInformationUser
          id={editUserId}
          close={() => setEditUserId(null)}
          refresh={() => fetchUsers(searchWord)}
        />
      )}
    </div>
  );
};

export default UserManagementTable;
