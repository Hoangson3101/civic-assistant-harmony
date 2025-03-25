import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Tags, History, Bell, Settings, HelpCircle, BarChart } from "lucide-react";
import { NavLink } from "react-router-dom";

const DashboardAdmin = () => {
  const adminModules = [
    {
      title: "Quản lý người dùng",
      icon: Users,
      description: "Quản lý tài khoản, phân quyền và thông tin người dùng",
      link: "/admin/users",
      color: "bg-blue-500"
    },
    {
      title: "Quản lý danh mục",
      icon: Tags,
      description: "Quản lý các danh mục hệ thống, phân loại văn bản, tài liệu",
      link: "/admin/categories",
      color: "bg-orange-500"
    },
    {
      title: "Lịch sử hoạt động",
      icon: History,
      description: "Theo dõi lịch sử truy cập và các thao tác trên hệ thống",
      link: "/admin/logs",
      color: "bg-violet-500"
    },
    {
      title: "Thông báo nội bộ",
      icon: Bell,
      description: "Quản lý và gửi thông báo đến người dùng trong hệ thống",
      link: "/admin/notifications",
      color: "bg-pink-500"
    },
    {
      title: "Cài đặt hệ thống",
      icon: Settings,
      description: "Cấu hình các thông số và tùy chọn hệ thống",
      link: "/admin/settings",
      color: "bg-green-500"
    },
    {
      title: "Trợ giúp",
      icon: HelpCircle,
      description: "Hướng dẫn sử dụng và trợ giúp người dùng",
      link: "/admin/help",
      color: "bg-cyan-500"
    }
  ];

  // Dữ liệu thống kê (giả lập)
  const stats = {
    users: 142,
    activeUsers: 87,
    documentsToday: 24,
    totalLogs: 1245
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quản trị hệ thống</h1>
        <p className="text-muted-foreground">
          Quản lý và cấu hình các thành phần của hệ thống
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng số người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+12</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Người dùng hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((stats.activeUsers / stats.users) * 100)}% tổng số người dùng
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Văn bản hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.documentsToday}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+5</span> so với hôm qua
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lịch sử hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalLogs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+142</span> trong 24h qua
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules">
        <TabsList className="mb-4">
          <TabsTrigger value="modules">Phân hệ quản trị</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo nhanh</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module) => (
              <NavLink to={module.link} key={module.title}>
                <Card className="h-full hover:shadow-md transition-all hover:border-primary cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full ${module.color} flex items-center justify-center text-white`}>
                        <module.icon className="h-4 w-4" />
                      </div>
                      <CardTitle>{module.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{module.description}</CardDescription>
                  </CardContent>
                </Card>
              </NavLink>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Hoạt động hệ thống</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>7 ngày qua</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end space-x-2">
                  {[40, 25, 35, 55, 70, 45, 65].map((value, i) => (
                    <div 
                      key={i} 
                      className="bg-primary/10 hover:bg-primary/20 rounded-md w-full transition-all"
                      style={{ height: `${value}%` }}
                      title={`${value} hoạt động`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <div>T2</div>
                  <div>T3</div>
                  <div>T4</div>
                  <div>T5</div>
                  <div>T6</div>
                  <div>T7</div>
                  <div>CN</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { user: "Nguyễn Văn A", action: "đã đăng nhập vào hệ thống", time: "5 phút trước" },
                  { user: "Trần Thị B", action: "đã tạo văn bản mới", time: "15 phút trước" },
                  { user: "Lê Văn C", action: "đã cập nhật danh mục", time: "30 phút trước" },
                  { user: "Phạm Thị D", action: "đã gửi thông báo mới", time: "1 giờ trước" },
                  { user: "Hoàng Văn E", action: "đã cập nhật quyền người dùng", time: "2 giờ trước" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAdmin; 