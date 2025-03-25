import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  User, 
  Users, 
  Building2,
  ChevronRight
} from "lucide-react";

const StorageLayout = () => {
  const navItems = [
    {
      title: "Tổng quan",
      icon: LayoutDashboard,
      href: "/storage"
    },
    {
      title: "Kho cá nhân",
      icon: User,
      href: "/storage/personal"
    },
    {
      title: "Kho nhóm/đội",
      icon: Users,
      href: "/storage/team"
    },
    {
      title: "Kho phòng/ban",
      icon: Building2,
      href: "/storage/department"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Kho dữ liệu</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Tổng quan</span>
        </div>
        <h1 className="text-2xl font-bold">Kho dữ liệu</h1>
      </div>

      <div className="h-[calc(100vh-4rem)] flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-border bg-card">
          <div className="p-4">
            <h2 className="font-semibold mb-4">Kho dữ liệu</h2>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/storage"}
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
    </div>
  );
};

export default StorageLayout; 