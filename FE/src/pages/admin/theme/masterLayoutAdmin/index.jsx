import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

function MasterLayoutAdmin({ ...props }) {
  return (
    <div {...props} className="flex">
      <Sidebar />
      <div className="min-h-screen flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MasterLayoutAdmin;
