import { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart2, 
  History, 
  Settings, 
  User, 
  Menu,
  Search,
  Database,
  Building2,
  FileBox,
  LogOut,
  BellDot
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const gradient = `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`;

  const navItems = [
    {
      title: "Trang chủ",
      icon: LayoutDashboard,
      href: "/"
    },
    {
      title: "Báo cáo",
      icon: BarChart2,
      href: "/reports"
    },
    {
      title: "Lịch sử hoạt động",
      icon: History,
      href: "/action-history"
    },
    {
      title: "Kho dữ liệu chung",
      icon: Database,
      href: "/storage"
    },
    {
      title: "Kho phòng ban",
      icon: Building2,
      href: "/storage/department/finance"
    },
    {
      title: "Cài đặt",
      icon: Settings,
      href: "/settings"
    }
  ];

  return (
    <div className="flex h-screen flex-col" style={{ background: gradient }}>
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-4 glass-header">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden button-3d"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5 icon-3d" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <FileBox className="h-6 w-6 text-primary icon-3d" />
            <h1 className="text-xl font-bold hidden md:block text-primary">CIVIC HARMONY</h1>
          </Link>
          
          <div className="hidden md:flex ml-8 lg:ml-16 relative">
            <Input
              type="search"
              placeholder="Tìm kiếm tài liệu, báo cáo..."
              className="w-[300px] lg:w-[400px] pl-10 bg-transparent border-[rgba(255,255,255,0.2)] hover-3d"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground icon-3d" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="button-3d relative">
            <BellDot className="h-5 w-5 icon-3d" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="button-3d relative flex items-center gap-2 hover:bg-transparent">
                <Avatar className="h-8 w-8 avatar-3d">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>ND</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block font-medium hover-3d">Nguyễn Văn A</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-container border-[rgba(255,255,255,0.2)]">
              <DropdownMenuLabel className="hover-3d">Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.1)]" />
              <DropdownMenuItem className="hover-3d">
                <User className="mr-2 h-4 w-4 icon-3d" />
                <Link to="/profile">Thông tin cá nhân</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover-3d">
                <Settings className="mr-2 h-4 w-4 icon-3d" />
                <Link to="/settings">Cài đặt</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.1)]" />
              <DropdownMenuItem className="hover-3d">
                <LogOut className="mr-2 h-4 w-4 icon-3d" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "h-full w-14 md:w-64 border-r border-[rgba(255,255,255,0.1)] glass-sidebar transition-all",
            isMobileMenuOpen ? "absolute z-50 inset-y-0 left-0" : "hidden md:block"
          )}
        >
          <nav className="h-full py-4 flex flex-col">
            <div className="px-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors duration-200 button-3d",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-[rgba(255,255,255,0.05)]"
                    )
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3 md:mr-2 icon-3d" />
                  <span className="hidden md:inline truncate hover-3d">{item.title}</span>
                </NavLink>
              ))}
            </div>
            
            <div className="mt-auto px-3">
              <Button variant="outline" className="w-full justify-start button-3d">
                <LogOut className="h-5 w-5 mr-3 md:mr-2 icon-3d" />
                <span className="hidden md:inline hover-3d">Đăng xuất</span>
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 