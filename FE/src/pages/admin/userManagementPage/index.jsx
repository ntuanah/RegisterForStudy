import UserFilterBar from "../../../components/admin/UserFilterBar";
import UserManagementTable from "../../../components/admin/UserManagementTable";

const UserManagementPage = () => {
  return (
    <div>
      <div className="p-5 border-b border-gray-300 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-[#0A4174] rounded-full inline-block"></span>
          Quản lý người dùng
        </h2>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            Quản lý người dùng
          </h1>
          <p className="text-slate-500 mt-1">
            Quản lý và cập nhật thông tin cá nhân của bạn.
          </p>
        </div>

        <UserFilterBar />
        <UserManagementTable />
      </div>
    </div>
  );
};

export default UserManagementPage;
