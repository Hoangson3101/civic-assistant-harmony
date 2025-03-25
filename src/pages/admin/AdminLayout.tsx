import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Tags,
  History,
  Bell,
  Settings,
  HelpCircle
} from "lucide-react";

const AdminLayout = () => {
  const navItems = [
    {
      title: "Tổng quan",
      icon: LayoutDashboard,
      href: "/admin"
    },
    {
      title: "Quản lý người dùng",
      icon: Users,
      href: "/admin/users"
    },
    {
      title: "Quản lý danh mục",
      icon: Tags,
      href: "/admin/categories"
    },
    {
      title: "Lịch sử hoạt động",
      icon: History,
      href: "/admin/logs"
    },
    {
      title: "Thông báo nội bộ",
      icon: Bell,
      href: "/admin/notifications"
    },
    {
      title: "Cài đặt hệ thống",
      icon: Settings,
      href: "/admin/settings"
    },
    {
      title: "Trợ giúp",
      icon: HelpCircle,
      href: "/admin/help"
    }
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card overflow-auto">
        <div className="p-4">
          <h2 className="font-semibold mb-4">Quản trị hệ thống</h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors duration-200",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout; 