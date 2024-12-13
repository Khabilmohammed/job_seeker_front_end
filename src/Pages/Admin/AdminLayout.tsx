import { Outlet } from "react-router-dom";
import HeaderbarAdmin from "../../Componenets/Admin/Headerbar/HeaderbarAdmin";
import SidebarAdmin from "../../Componenets/Admin/sideBarAdmin/SidebarAdmin";

export const AdminLayout = () => {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <HeaderbarAdmin />
        <div className="flex flex-1">
          <SidebarAdmin />
          <div className="flex-1 flex flex-col overflow-y-auto p-4">
            <div className="w-full max-w-7xl mx-auto">
            <Outlet /> 
            </div>
          </div>
        </div>
      </div>
    );
  };