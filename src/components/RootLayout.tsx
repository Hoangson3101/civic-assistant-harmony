import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FileText, Home, BarChart, Clock, Settings, User, Users, Tags, History, Bell, HelpCircle, Menu, LayoutDashboard, FolderOpen, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssistantChatInterface from "./AssistantChatInterface";
import { useState, useEffect } from "react";
import ThreeDScene from "./3d/ThreeDScene";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RootLayout = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const mainNavItems = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Văn bản", href: "/documents", icon: FileText },
    { name: "Báo cáo", href: "/reports", icon: BarChart },
  ];

  const storageNavItems = [
    { name: "Kho dữ liệu chung", href: "/storage", icon: Database },
    { name: "Kho cá nhân", href: "/storage/personal", icon: FolderOpen },
    { name: "Kho nhóm", href: "/storage/team", icon: FolderOpen },
    { name: "Kho phòng ban", href: "/storage/department", icon: FolderOpen },
  ];

  const adminNavItems = [
    { name: "Quản lý người dùng", href: "/admin/users", icon: Users },
    { name: "Quản lý danh mục", href: "/admin/categories", icon: Tags },
    { name: "Lịch sử hoạt động", href: "/admin/logs", icon: History },
    { name: "Thông báo nội bộ", href: "/admin/notifications", icon: Bell },
    { name: "Cài đặt hệ thống", href: "/admin/settings", icon: Settings },
    { name: "Trợ giúp", href: "/admin/help", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex">
      {/* 3D Background Scene */}
      <ThreeDScene />

      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:block glass-container z-10 backdrop-blur-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-sidebar-foreground heading-3d">CIVIC ASSISTANT</h2>
        </div>
        
        <nav className="space-y-6 px-4">
          <div className="space-y-2">
            <h3 className="px-2 text-sm font-medium text-sidebar-foreground/60">Chính</h3>
            {mainNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover-3d ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`
                }
                style={{
                  transform: `translateZ(${mousePosition.x * 5}px)`,
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <item.icon className="h-4 w-4 icon-3d" />
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="px-2 text-sm font-medium text-sidebar-foreground/60">Kho dữ liệu</h3>
            {storageNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover-3d ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`
                }
                style={{
                  transform: `translateZ(${mousePosition.x * 5}px)`,
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <item.icon className="h-4 w-4 icon-3d" />
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="px-2 text-sm font-medium text-sidebar-foreground/60">Quản trị</h3>
            {adminNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover-3d ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`
                }
                style={{
                  transform: `translateZ(${mousePosition.x * 5}px)`,
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <item.icon className="h-4 w-4 icon-3d" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 md:hidden button-3d z-20"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-sidebar animate-in slide-in-from-left glass-container">
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-sidebar-foreground heading-3d">CIVIC ASSISTANT</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileMenu(false)}
                className="button-3d"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="space-y-6 px-4">
              <div className="space-y-2">
                <h3 className="px-2 text-sm font-medium text-sidebar-foreground/60">Chính</h3>
                {mainNavItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover-3d ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`
                    }
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <item.icon className="h-4 w-4 icon-3d" />
                    {item.name}
                  </NavLink>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="px-2 text-sm font-medium text-sidebar-foreground/60">Kho dữ liệu</h3>
                {storageNavItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover-3d ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`
                    }
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <item.icon className="h-4 w-4 icon-3d" />
                    {item.name}
                  </NavLink>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="px-2 text-sm font-medium text-sidebar-foreground/60">Quản trị</h3>
                {adminNavItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover-3d ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`
                    }
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <item.icon className="h-4 w-4 icon-3d" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto glass-container">
        <div className="container mx-auto py-6">
          <Outlet />
        </div>
      </main>

      {/* Chat interface */}
      <AssistantChatInterface />
    </div>
  );
};

export default RootLayout; 