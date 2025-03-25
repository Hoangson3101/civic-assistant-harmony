import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  SlidersHorizontal,
  Download,
  Calendar,
  RefreshCcw,
  User,
  UserCheck,
  UserX,
  File,
  FileEdit,
  FileX,
  Settings,
  Shield,
  RotateCcw,
  Info,
  Monitor,
  ArrowUpDown,
  ChevronRight
} from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";

// Dữ liệu mẫu
const MOCK_LOGS = [
  {
    id: "log-001",
    action: "login",
    actionType: "auth",
    userName: "Nguyễn Văn A",
    userRole: "Admin",
    ipAddress: "192.168.1.245",
    timestamp: "2025-06-08T08:35:12",
    status: "success",
    details: "Đăng nhập thành công vào hệ thống",
  },
  {
    id: "log-002",
    action: "document_view",
    actionType: "document",
    userName: "Trần Thị B",
    userRole: "Manager",
    ipAddress: "192.168.1.130",
    timestamp: "2025-06-08T09:12:45",
    status: "success",
    details: "Xem văn bản QD-2025-0145 về 'Quy trình xét nghiệm mới'",
    documentId: "QD-2025-0145"
  },
  {
    id: "log-003",
    action: "user_update",
    actionType: "user",
    userName: "Nguyễn Văn A",
    userRole: "Admin",
    ipAddress: "192.168.1.245",
    timestamp: "2025-06-08T10:05:30",
    status: "success",
    details: "Cập nhật thông tin người dùng: Lê Minh C",
    affectedUser: "Lê Minh C"
  },
  {
    id: "log-004",
    action: "document_create",
    actionType: "document",
    userName: "Phạm Thị D",
    userRole: "Editor",
    ipAddress: "192.168.1.175",
    timestamp: "2025-06-08T11:23:18",
    status: "success",
    details: "Tạo văn bản mới CV-2025-0089 về 'Kế hoạch triển khai tiêm chủng'",
    documentId: "CV-2025-0089"
  },
  {
    id: "log-005",
    action: "system_settings",
    actionType: "system",
    userName: "Nguyễn Văn A",
    userRole: "Admin",
    ipAddress: "192.168.1.245",
    timestamp: "2025-06-08T13:45:22",
    status: "success",
    details: "Thay đổi cấu hình hệ thống: Thời gian hết phiên từ 30 phút lên 60 phút"
  },
  {
    id: "log-006",
    action: "login",
    actionType: "auth",
    userName: "Hoàng Văn E",
    userRole: "User",
    ipAddress: "192.168.1.190",
    timestamp: "2025-06-08T14:10:05",
    status: "failed",
    details: "Đăng nhập thất bại: Sai mật khẩu (lần 2)"
  },
  {
    id: "log-007",
    action: "permission_change",
    actionType: "user",
    userName: "Nguyễn Văn A",
    userRole: "Admin",
    ipAddress: "192.168.1.245",
    timestamp: "2025-06-08T14:32:40",
    status: "success",
    details: "Thay đổi quyền người dùng: Trần Thị B từ 'Manager' thành 'Senior Manager'",
    affectedUser: "Trần Thị B"
  },
  {
    id: "log-008",
    action: "document_delete",
    actionType: "document",
    userName: "Trần Thị B",
    userRole: "Senior Manager",
    ipAddress: "192.168.1.130",
    timestamp: "2025-06-08T15:18:55",
    status: "success",
    details: "Xóa văn bản TB-2025-0076 về 'Thông báo nghỉ lễ'",
    documentId: "TB-2025-0076"
  },
  {
    id: "log-009",
    action: "logout",
    actionType: "auth",
    userName: "Phạm Thị D",
    userRole: "Editor",
    ipAddress: "192.168.1.175",
    timestamp: "2025-06-08T16:45:10",
    status: "success",
    details: "Đăng xuất khỏi hệ thống"
  },
  {
    id: "log-010",
    action: "notification_send",
    actionType: "notification",
    userName: "Nguyễn Văn A",
    userRole: "Admin",
    ipAddress: "192.168.1.245",
    timestamp: "2025-06-08T17:02:38",
    status: "success",
    details: "Gửi thông báo 'Họp giao ban tuần 24' đến 15 người dùng"
  }
];

// Thành phần hiển thị trạng thái
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "success":
      return <Badge className="bg-green-500">Thành công</Badge>;
    case "failed":
      return <Badge variant="destructive">Thất bại</Badge>;
    case "warning":
      return <Badge className="bg-yellow-500">Cảnh báo</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Thành phần hiển thị biểu tượng cho loại hành động
const ActionTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "auth":
      return <User className="h-4 w-4" />;
    case "document":
      return <File className="h-4 w-4" />;
    case "user":
      return <UserCheck className="h-4 w-4" />;
    case "system":
      return <Settings className="h-4 w-4" />;
    case "notification":
      return <Info className="h-4 w-4" />;
    default:
      return <Monitor className="h-4 w-4" />;
  }
};

// Hàm định dạng ngày giờ
const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
};

const AuditLogs = () => {
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActionType, setFilterActionType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Lọc logs theo điều kiện
  const filteredLogs = logs
    .filter((log) => {
      const matchesSearch = 
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.documentId && log.documentId.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesActionType = filterActionType === "all" || log.actionType === filterActionType;
      const matchesStatus = filterStatus === "all" || log.status === filterStatus;
      
      return matchesSearch && matchesActionType && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Đếm số lượng mỗi loại hoạt động
  const activityCounts = {
    auth: logs.filter(log => log.actionType === 'auth').length,
    document: logs.filter(log => log.actionType === 'document').length,
    user: logs.filter(log => log.actionType === 'user').length,
    system: logs.filter(log => log.actionType === 'system').length,
    notification: logs.filter(log => log.actionType === 'notification').length,
  };

  // Xử lý thay đổi sắp xếp
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Xử lý làm mới dữ liệu
  const handleRefresh = () => {
    // Trong thực tế, đây sẽ là API call để lấy dữ liệu mới
    alert("Đã làm mới dữ liệu nhật ký hoạt động");
  };

  // Xử lý xuất dữ liệu
  const handleExport = () => {
    // Trong thực tế, đây sẽ là hàm để xuất dữ liệu ra file
    alert("Xuất dữ liệu nhật ký thành công");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Lịch sử hoạt động</span>
        </div>
        <h1 className="text-2xl font-bold">Lịch sử hoạt động</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 md:items-center flex-1">
          <div className="relative flex-1">
            <Input
              placeholder="Tìm kiếm theo mô tả, người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select value={filterActionType} onValueChange={setFilterActionType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Phân hệ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="auth">Đăng nhập/Đăng xuất</SelectItem>
              <SelectItem value="document">Văn bản</SelectItem>
              <SelectItem value="user">Người dùng</SelectItem>
              <SelectItem value="system">Hệ thống</SelectItem>
              <SelectItem value="notification">Thông báo</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="success">Thành công</SelectItem>
              <SelectItem value="failed">Thất bại</SelectItem>
              <SelectItem value="warning">Cảnh báo</SelectItem>
            </SelectContent>
          </Select>

          <DateRangePicker className="w-[300px]" />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleRefresh}>
            <RefreshCcw className="h-4 w-4" />
            <span>Làm mới</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            <span>Xuất Excel</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tất cả hoạt động</TabsTrigger>
          <TabsTrigger value="auth">Đăng nhập/Xuất</TabsTrigger>
          <TabsTrigger value="document">Văn bản</TabsTrigger>
          <TabsTrigger value="user">Người dùng</TabsTrigger>
          <TabsTrigger value="system">Hệ thống</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[5%]">STT</TableHead>
                    <TableHead className="w-[10%]">
                      <div className="flex items-center space-x-1">
                        <span>Thời gian</span>
                        <Button variant="ghost" size="icon" onClick={toggleSortOrder} className="h-5 w-5">
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableHead>
                    <TableHead className="w-[15%]">Người dùng</TableHead>
                    <TableHead className="w-[10%]">Loại</TableHead>
                    <TableHead className="w-[40%]">Chi tiết hoạt động</TableHead>
                    <TableHead className="w-[10%]">Địa chỉ IP</TableHead>
                    <TableHead className="w-[10%]">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Không có hoạt động nào phù hợp với tìm kiếm
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log, index) => (
                      <TableRow key={log.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="whitespace-nowrap">{formatDateTime(log.timestamp)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{log.userName}</div>
                            <div className="text-xs text-muted-foreground">{log.userRole}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <ActionTypeIcon type={log.actionType} />
                            <span>
                              {log.actionType === "auth" && "Xác thực"}
                              {log.actionType === "document" && "Văn bản"}
                              {log.actionType === "user" && "Người dùng"}
                              {log.actionType === "system" && "Hệ thống"}
                              {log.actionType === "notification" && "Thông báo"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>
                          <StatusBadge status={log.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="auth" className="m-0">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Hiển thị hoạt động đăng nhập và đăng xuất
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="document" className="m-0">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Hiển thị hoạt động liên quan đến văn bản
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user" className="m-0">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Hiển thị hoạt động liên quan đến người dùng
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="m-0">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Hiển thị hoạt động liên quan đến hệ thống
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hoạt động xác thực</CardTitle>
            <CardDescription>Đăng nhập/Đăng xuất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityCounts.auth}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className={activityCounts.auth > 5 ? "text-green-500" : "text-yellow-500"}>
                {activityCounts.auth > 5 ? "Hoạt động bình thường" : "Ít hoạt động"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hoạt động văn bản</CardTitle>
            <CardDescription>Tạo/Sửa/Xóa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityCounts.document}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+{Math.floor(activityCounts.document * 0.2)} so với hôm qua</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quản lý người dùng</CardTitle>
            <CardDescription>Người dùng/Quyền</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityCounts.user}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span>{activityCounts.user} thay đổi</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cấu hình hệ thống</CardTitle>
            <CardDescription>Tham số/Cài đặt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityCounts.system}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span>{activityCounts.system > 0 ? "Có thay đổi cấu hình" : "Không có thay đổi"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Component Calendar Icon
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export default AuditLogs; 