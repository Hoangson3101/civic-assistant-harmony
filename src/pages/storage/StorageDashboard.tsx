import { FileText, Users, Building2, Search, Upload, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";

const StorageDashboard = () => {
  const storageStats = [
    {
      title: "Kho cá nhân",
      description: "Lưu trữ tài liệu cá nhân",
      icon: FolderOpen,
      stats: {
        totalFiles: 125,
        totalSize: "2.5 GB",
        recentFiles: 12
      }
    },
    {
      title: "Kho nhóm",
      description: "Lưu trữ và chia sẻ tài liệu nhóm",
      icon: Users,
      stats: {
        totalFiles: 450,
        totalSize: "8.2 GB",
        recentFiles: 25
      }
    },
    {
      title: "Kho phòng ban",
      description: "Lưu trữ tài liệu phòng ban",
      icon: Building2,
      stats: {
        totalFiles: 890,
        totalSize: "15.8 GB",
        recentFiles: 45
      }
    }
  ];

  const recentFiles = [
    {
      name: "Báo cáo tháng 3.docx",
      type: "Tài liệu Word",
      size: "2.5MB",
      updatedAt: "Hôm nay, 15:30",
      owner: "Nguyễn Văn A"
    },
    {
      name: "Kế hoạch Q2.xlsx",
      type: "Bảng tính Excel",
      size: "1.8MB",
      updatedAt: "Hôm qua, 09:15",
      owner: "Trần Thị B"
    },
    {
      name: "Hướng dẫn sử dụng.pdf",
      type: "Tài liệu PDF",
      size: "5.2MB",
      updatedAt: "23/03/2024",
      owner: "Lê Văn C"
    }
  ];

  const quickActions = [
    {
      name: "Tải lên tài liệu",
      description: "Thêm file mới vào kho",
      icon: Upload,
      href: "#"
    },
    {
      name: "Tìm kiếm",
      description: "Tìm kiếm trong kho dữ liệu",
      icon: Search,
      href: "#"
    },
    {
      name: "Gần đây",
      description: "Xem các file gần đây",
      icon: Clock,
      href: "#"
    },
    {
      name: "Đánh dấu sao",
      description: "File được đánh dấu sao",
      icon: Star,
      href: "#"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="glass-container p-6 rounded-xl">
        <h1 className="text-2xl font-bold heading-3d">Tổng quan kho dữ liệu</h1>
        <p className="text-muted-foreground mt-1 hover-3d">
          Quản lý và truy cập nhanh các kho dữ liệu của bạn
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <TiltCard 
            key={index}
            tiltMaxAngle={10}
            scale={1.03}
            className="card-3d p-4 rounded-xl border border-border"
          >
            <Link
              to={action.href}
              className="group card-3d-content"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <action.icon className="h-5 w-5 text-primary card-3d-icon" />
                </div>
                <div>
                  <h3 className="font-medium card-3d-title">
                    {action.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          </TiltCard>
        ))}
      </div>

      {/* Storage Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {storageStats.map((storage) => (
          <TiltCard
            key={storage.title}
            className="card-3d border-border"
            tiltMaxAngle={15}
            perspective={1200}
          >
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium card-3d-title">
                  {storage.title}
                </CardTitle>
                <storage.icon className="h-4 w-4 text-muted-foreground card-3d-icon" />
              </CardHeader>
              <CardContent className="card-3d-content">
                <div className="text-2xl font-bold card-3d-stats">{storage.stats.totalFiles}</div>
                <p className="text-xs text-muted-foreground">
                  {storage.description}
                </p>
                <div className="mt-4 space-y-2 card-3d-stats">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Dung lượng sử dụng</span>
                    <span>{storage.stats.totalSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tài liệu mới (30 ngày)</span>
                    <span>{storage.stats.recentFiles}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        ))}
      </div>

      {/* Recent Files */}
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold heading-3d">Tài liệu gần đây</h2>
          <Link 
            to="#"
            className="text-sm text-primary hover:underline hover-3d"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="table-3d">
          <table className="w-full">
            <thead className="table-header-3d">
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 font-medium">Tên tài liệu</th>
                <th className="text-left py-3 px-4 font-medium">Loại</th>
                <th className="text-left py-3 px-4 font-medium">Kích thước</th>
                <th className="text-left py-3 px-4 font-medium">Cập nhật</th>
                <th className="text-left py-3 px-4 font-medium">Người tạo</th>
              </tr>
            </thead>
            <tbody>
              {recentFiles.map((file, index) => (
                <tr 
                  key={index}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors duration-200 table-row-3d"
                >
                  <td className="py-3 px-4 table-cell-3d">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground icon-3d" />
                      <span className="hover-3d">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground table-cell-3d">{file.type}</td>
                  <td className="py-3 px-4 text-muted-foreground table-cell-3d">{file.size}</td>
                  <td className="py-3 px-4 text-muted-foreground table-cell-3d">{file.updatedAt}</td>
                  <td className="py-3 px-4 text-muted-foreground table-cell-3d">{file.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StorageDashboard; 