import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  Plus, 
  Trash, 
  Edit, 
  Search, 
  SlidersHorizontal, 
  X,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Dữ liệu mẫu
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Cập nhật hệ thống 2.0",
    content: "Hệ thống sẽ được nâng cấp lên phiên bản 2.0 vào ngày 15/06/2025. Vui lòng lưu lại công việc trước thời gian này.",
    type: "system",
    status: "active",
    priority: "high",
    recipients: "all",
    createdAt: "2025-06-01T10:30:00",
    createdBy: "Admin",
    expiresAt: "2025-06-15T23:59:59",
    readCount: 87
  },
  {
    id: 2,
    title: "Hướng dẫn sử dụng tính năng mới",
    content: "Chúng tôi vừa triển khai tính năng mới trong việc quản lý văn bản. Xem hướng dẫn chi tiết tại đây.",
    type: "announcement",
    status: "active",
    priority: "medium",
    recipients: "all",
    createdAt: "2025-05-28T08:15:00",
    createdBy: "Admin",
    expiresAt: "2025-06-28T23:59:59",
    readCount: 42
  },
  {
    id: 3,
    title: "Nhắc nhở họp giao ban",
    content: "Buổi họp giao ban hàng tuần sẽ được tổ chức vào 9:00 sáng thứ Hai, ngày 09/06/2025 tại phòng họp chính.",
    type: "reminder",
    status: "active",
    priority: "medium",
    recipients: "group",
    recipientGroups: ["managers", "leads"],
    createdAt: "2025-06-05T14:45:00",
    createdBy: "Nguyễn Thu Hà",
    expiresAt: "2025-06-09T10:00:00",
    readCount: 12
  },
  {
    id: 4,
    title: "Báo cáo tháng 5/2025",
    content: "Nhắc nhở các đơn vị hoàn thiện báo cáo tháng 5/2025 trước ngày 10/06/2025.",
    type: "task",
    status: "active",
    priority: "high",
    recipients: "department",
    recipientDepartments: ["accounting", "reporting"],
    createdAt: "2025-06-03T09:00:00",
    createdBy: "Lê Văn Nam",
    expiresAt: "2025-06-10T17:00:00",
    readCount: 8
  },
  {
    id: 5,
    title: "Bảo trì hệ thống",
    content: "Hệ thống sẽ tạm ngưng hoạt động để bảo trì từ 22:00 ngày 10/06 đến 02:00 ngày 11/06/2025.",
    type: "system",
    status: "scheduled",
    priority: "high",
    recipients: "all",
    createdAt: "2025-06-05T11:30:00",
    createdBy: "Admin",
    expiresAt: "2025-06-11T02:00:00",
    readCount: 65
  },
  {
    id: 6,
    title: "Chúc mừng sinh nhật",
    content: "Ban lãnh đạo gửi lời chúc mừng sinh nhật đến các đồng nghiệp có sinh nhật trong tháng 6/2025.",
    type: "announcement",
    status: "active",
    priority: "low",
    recipients: "custom",
    recipientUsers: ["user123", "user456", "user789"],
    createdAt: "2025-06-01T00:00:00",
    createdBy: "Admin",
    expiresAt: "2025-06-30T23:59:59",
    readCount: 3
  },
  {
    id: 7,
    title: "Kế hoạch công tác tuần 24/2025",
    content: "Đã cập nhật kế hoạch công tác tuần 24/2025 trên hệ thống. Vui lòng xem và xác nhận.",
    type: "announcement",
    status: "active",
    priority: "medium",
    recipients: "all",
    createdAt: "2025-06-07T16:00:00",
    createdBy: "Trần Minh Tuấn",
    expiresAt: "2025-06-14T17:00:00",
    readCount: 54
  },
  {
    id: 8,
    title: "Chính sách bảo mật mới",
    content: "Chính sách bảo mật của hệ thống đã được cập nhật. Vui lòng đọc và xác nhận trước ngày 20/06/2025.",
    type: "system",
    status: "active",
    priority: "medium",
    recipients: "all",
    createdAt: "2025-06-06T10:00:00",
    createdBy: "Admin",
    expiresAt: "2025-06-20T23:59:59",
    readCount: 34
  }
];

// Thành phần để hiển thị trạng thái
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return <Badge variant="default" className="bg-green-500">Đang hoạt động</Badge>;
    case "scheduled":
      return <Badge variant="outline" className="text-blue-500 border-blue-500">Đã lên lịch</Badge>;
    case "expired":
      return <Badge variant="outline" className="text-muted-foreground">Đã hết hạn</Badge>;
    case "draft":
      return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Bản nháp</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Thành phần để hiển thị mức độ ưu tiên
const PriorityBadge = ({ priority }: { priority: string }) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-500">Cao</Badge>;
    case "medium":
      return <Badge className="bg-orange-500">Trung bình</Badge>;
    case "low":
      return <Badge className="bg-blue-500">Thấp</Badge>;
    default:
      return <Badge>{priority}</Badge>;
  }
};

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [newNotification, setNewNotification] = useState({
    title: "",
    content: "",
    type: "announcement",
    priority: "medium",
    recipients: "all",
    expiresAt: ""
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Xử lý tạo thông báo mới
  const handleCreateNotification = () => {
    const currentDate = new Date();
    
    const newNotificationItem = {
      id: notifications.length + 1,
      ...newNotification,
      status: "active",
      createdAt: currentDate.toISOString(),
      createdBy: "Admin", // Giả định là người dùng hiện tại
      readCount: 0
    };
    
    setNotifications([newNotificationItem, ...notifications]);
    setNewNotification({
      title: "",
      content: "",
      type: "announcement",
      priority: "medium",
      recipients: "all",
      expiresAt: ""
    });
    setIsCreateDialogOpen(false);
  };

  // Xử lý xóa thông báo
  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Lọc thông báo theo tìm kiếm và bộ lọc
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || notification.type === filterType;
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Quản trị</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Quản lý thông báo nội bộ</span>
        </div>
        <h1 className="text-2xl font-bold">Quản lý thông báo nội bộ</h1>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1">
            <Input
              placeholder="Tìm kiếm thông báo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Loại thông báo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tất cả</SelectItem>
              <SelectItem value="system">Hệ thống</SelectItem>
              <SelectItem value="update">Cập nhật</SelectItem>
              <SelectItem value="announcement">Thông báo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Thêm thông báo</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Mức độ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {notification.type === 'system' ? 'Hệ thống' : 
                     notification.type === 'update' ? 'Cập nhật' : 'Thông báo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    notification.priority === 'high' ? 'destructive' : 
                    notification.priority === 'medium' ? 'default' : 'secondary'
                  }>
                    {notification.priority === 'high' ? 'Cao' : 
                     notification.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={notification.status === 'active' ? 'success' : 'outline'}>
                    {notification.status === 'active' ? 'Đang hiển thị' : 'Đã ẩn'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(notification.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm thông báo mới</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input id="title" placeholder="Nhập tiêu đề thông báo" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea id="content" placeholder="Nhập nội dung thông báo" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Loại thông báo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại thông báo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">Hệ thống</SelectItem>
                  <SelectItem value="update">Cập nhật</SelectItem>
                  <SelectItem value="announcement">Thông báo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="priority">Mức độ ưu tiên</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mức độ ưu tiên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Cao</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="low">Thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Hủy</Button>
            <Button>Thêm mới</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationManagement; 