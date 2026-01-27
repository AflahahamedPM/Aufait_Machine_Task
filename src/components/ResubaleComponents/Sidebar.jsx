import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  House,
  FolderX,
  FileText,
  FilePenLine,
  Layers,
  FolderUp,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarMenus = [
    { icon: House, link: "/home" },
    { icon: FolderX, link: "/risk-management" },
    { icon: FilePenLine, link: "/dashboard" },
    { icon: FolderUp, link: "/upload" },
    { icon: FileText, link: "/profile" },
    { icon: Layers, link: "/files" },
  ];

  return (
    <div className="w-16 h-screen bg-white flex flex-col items-center py-6 border-r border-gray-300 gap-4">
      {sidebarMenus?.map((menu, index) => {
        const Icon = menu?.icon;
        const isActive = location.pathname === menu?.link;

        return (
          <div
            key={index}
            className={`p-2 ${isActive ? "bg-primary rounded-lg" : ""}`}
          >
            <Icon
              onClick={() => navigate(menu?.link)}
              className={`w-6 h-6 cursor-pointer transition-colors
              ${isActive ? "text-white" : "text-[#231F1F]"}
            `}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
