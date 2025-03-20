import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Home, FileText, Activity, Database, BookOpen } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navigationLinks = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Văn bản pháp luật", href: "/legal", icon: BookOpen },
    { name: "Kho lưu trữ", href: "/storage", icon: Database },
    { name: "Quy trình tự động", href: "/workflows", icon: Activity },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">TQ</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">
              Trợ lý CDC Tuyên Quang
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center space-x-1.5 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-primary bg-primary/10 font-bold shadow-sm scale-105 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105"
                  }`}
                >
                  <link.icon className={`h-4 w-4 transition-all duration-300 ${isActive ? "text-primary animate-pulse" : ""}`} />
                  <span className={`relative ${
                    isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full after:animate-bounce" : ""
                  }`}>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              aria-label="Search"
              className="p-2 rounded-full hover:bg-muted transition-colors duration-200 hover:scale-110 active:scale-95"
            >
              <Search className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors duration-300" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{ top: "64px", height: "calc(100vh - 64px)" }}
      >
        <div className="py-6 px-6 h-full flex flex-col">
          <div className="flex-1 space-y-3">
            {navigationLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center space-x-3 p-4 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-primary bg-primary/10 font-bold shadow-md scale-105 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105"
                  }`}
                >
                  <link.icon className={`h-5 w-5 transition-all duration-300 ${isActive ? "text-primary animate-pulse" : ""}`} />
                  <span className={`relative ${
                    isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full after:animate-bounce" : ""
                  }`}>{link.name}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-auto pt-6 border-t border-border">
            <button 
              className="w-full flex items-center justify-center space-x-2 p-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Search className="h-5 w-5" />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
