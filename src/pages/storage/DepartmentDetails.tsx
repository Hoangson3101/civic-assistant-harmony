import { useState } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import { ChevronRight, Users, FileText, Settings, BarChart2, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TiltCard from "@/components/ui/tilt-card";

const departmentData = {
  "phong-ke-hoach": {
    id: "phong-ke-hoach",
    name: "Phòng Kế hoạch - Tài chính",
    description: "Phòng Kế hoạch - Tài chính có chức năng tham mưu, giúp Giám đốc Sở thực hiện quản lý nhà nước về công tác kế hoạch, tài chính, đầu tư, thống kê và quản trị cơ sở vật chất thuộc thẩm quyền của Sở.",
    memberCount: 15,
    documentCount: 250,
    createdAt: "2022-01-01",
    manager: "Nguyễn Văn A",
    avatar: "KH"
  },
  "phong-to-chuc": {
    id: "phong-to-chuc",
    name: "Phòng Tổ chức - Hành chính",
    description: "Phòng Tổ chức - Hành chính có chức năng tham mưu, giúp Giám đốc Sở thực hiện quản lý nhà nước về công tác tổ chức bộ máy, biên chế, cán bộ, công chức, viên chức và người lao động, thi đua khen thưởng, kỷ luật và quản trị hành chính của Sở.",
    memberCount: 12,
    documentCount: 180,
    createdAt: "2022-01-01",
    manager: "Trần Thị B",
    avatar: "TC"
  },
  "phong-nghiep-vu": {
    id: "phong-nghiep-vu",
    name: "Phòng Nghiệp vụ Y tế",
    description: "Phòng Nghiệp vụ Y tế có chức năng tham mưu, giúp Giám đốc Sở thực hiện quản lý nhà nước về công tác nghiệp vụ y tế, phòng chống dịch bệnh, và các hoạt động chuyên môn liên quan.",
    memberCount: 18,
    documentCount: 320,
    createdAt: "2022-01-01",
    manager: "Lê Văn C",
    avatar: "YT"
  },
  "phong-phap-che": {
    id: "phong-phap-che",
    name: "Phòng Pháp chế",
    description: "Phòng Pháp chế có chức năng tham mưu, giúp Giám đốc Sở thực hiện quản lý nhà nước về công tác pháp chế, kiểm tra, rà soát, hệ thống hóa văn bản quy phạm pháp luật thuộc lĩnh vực quản lý của Sở.",
    memberCount: 8,
    documentCount: 150,
    createdAt: "2022-01-01",
    manager: "Phạm Thị D",
    avatar: "PC"
  }
};

const DepartmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
  };
  
  // Lấy thông tin phòng ban dựa vào id
  const department = departmentData[id as keyof typeof departmentData];
  
  if (!department) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-muted-foreground">Không tìm thấy phòng ban</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" onMouseMove={handleMouseMove}>
      {/* Header */}
      <TiltCard className="glass-container p-6 rounded-xl" tiltMaxAngle={5} scale={1.01}>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
            <span className="breadcrumb-3d-item">Trang chủ</span>
            <ChevronRight className="h-4 w-4 breadcrumb-3d-separator" />
            <span className="breadcrumb-3d-item">Kho dữ liệu</span>
            <ChevronRight className="h-4 w-4 breadcrumb-3d-separator" />
            <span className="breadcrumb-3d-item">Phòng ban</span>
            <ChevronRight className="h-4 w-4 breadcrumb-3d-separator" />
            <span className="text-foreground font-medium breadcrumb-3d-item">{department.name}</span>
          </div>
        </div>
      </TiltCard>

      {/* Department Info */}
      <div className="glass-container p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg bg-primary/20 text-primary heading-3d">
                {department.avatar}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold heading-3d">{department.name}</h1>
            <p className="text-muted-foreground">{department.description}</p>
            
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 icon-3d text-blue-500" />
                <span><strong className="font-medium">{department.memberCount}</strong> thành viên</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 icon-3d text-green-500" />
                <span><strong className="font-medium">{department.documentCount}</strong> tài liệu</span>
              </div>
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2 icon-3d text-amber-500" />
                <span>Trưởng phòng: <strong className="font-medium">{department.manager}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border">
        <NavLink
          to={`/storage/department/${id}/documents`}
          className={({ isActive }) =>
            `py-2 px-4 font-medium border-b-2 hover-3d ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent hover:text-primary hover:border-primary/40"
            }`
          }
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 icon-3d" />
            <span>Tài liệu</span>
          </div>
        </NavLink>
        
        <NavLink
          to={`/storage/department/${id}/members`}
          className={({ isActive }) =>
            `py-2 px-4 font-medium border-b-2 hover-3d ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent hover:text-primary hover:border-primary/40"
            }`
          }
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 icon-3d" />
            <span>Thành viên</span>
          </div>
        </NavLink>
        
        <NavLink
          to={`/storage/department/${id}/statistics`}
          className={({ isActive }) =>
            `py-2 px-4 font-medium border-b-2 hover-3d ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent hover:text-primary hover:border-primary/40"
            }`
          }
        >
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 icon-3d" />
            <span>Thống kê</span>
          </div>
        </NavLink>
        
        <NavLink
          to={`/storage/department/${id}/settings`}
          className={({ isActive }) =>
            `py-2 px-4 font-medium border-b-2 hover-3d ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent hover:text-primary hover:border-primary/40"
            }`
          }
        >
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 icon-3d" />
            <span>Cài đặt</span>
          </div>
        </NavLink>
      </div>

      {/* Outlet for nested routes */}
      <div className="pt-4">
        <Outlet context={department} />
      </div>

      <div 
        className="fixed pointer-events-none w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
        style={{
          left: `${mousePosition.x * 50 + 50}%`,
          top: `${mousePosition.y * 50 + 50}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
          transition: 'left 0.3s ease-out, top 0.3s ease-out'
        }}
      />
    </div>
  );
};

export default DepartmentDetails; 