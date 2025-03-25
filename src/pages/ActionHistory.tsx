import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Clock, 
  Edit2, 
  Trash2, 
  Download, 
  Share2, 
  FileUp, 
  Filter 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function ActionHistory() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const activityTypes = [
    { value: "all", label: "Tất cả hoạt động" },
    { value: "create", label: "Tạo mới" },
    { value: "edit", label: "Chỉnh sửa" },
    { value: "delete", label: "Xóa" },
    { value: "share", label: "Chia sẻ" },
    { value: "download", label: "Tải xuống" },
    { value: "upload", label: "Tải lên" },
    { value: "view", label: "Xem" }
  ];

  const userActivities = [
    {
      id: "1",
      type: "create",
      user: {
        name: "Nguyễn Văn A",
        avatar: "/avatars/01.png",
        department: "Kế toán"
      },
      document: "Báo cáo tài chính Q1-2024",
      date: "2024-03-24T10:30:00Z",
      description: "Đã tạo tài liệu mới"
    },
    {
      id: "2",
      type: "edit",
      user: {
        name: "Trần Thị B",
        avatar: "/avatars/02.png",
        department: "Phát triển"
      },
      document: "Kế hoạch dự án XYZ",
      date: "2024-03-24T09:15:00Z",
      description: "Đã chỉnh sửa tài liệu"
    },
    {
      id: "3",
      type: "share",
      user: {
        name: "Lê Văn C",
        avatar: "/avatars/03.png",
        department: "Kỹ thuật"
      },
      document: "Tài liệu kỹ thuật v2.1",
      date: "2024-03-23T16:45:00Z",
      description: "Đã chia sẻ tài liệu với Phòng Phát triển"
    },
    {
      id: "4",
      type: "delete",
      user: {
        name: "Phạm Thị D",
        avatar: "/avatars/04.png",
        department: "Nhân sự"
      },
      document: "Quy trình cũ 2023",
      date: "2024-03-23T14:20:00Z",
      description: "Đã xóa tài liệu"
    },
    {
      id: "5",
      type: "download",
      user: {
        name: "Hoàng Văn E",
        avatar: "/avatars/05.png",
        department: "Tài chính"
      },
      document: "Báo cáo chi tiêu T2-2024",
      date: "2024-03-23T11:10:00Z",
      description: "Đã tải xuống tài liệu"
    },
    {
      id: "6",
      type: "upload",
      user: {
        name: "Nguyễn Văn A",
        avatar: "/avatars/01.png",
        department: "Kế toán"
      },
      document: "Biểu mẫu chứng từ 2024",
      date: "2024-03-22T15:30:00Z",
      description: "Đã tải lên tài liệu"
    },
    {
      id: "7",
      type: "view",
      user: {
        name: "Trần Thị B",
        avatar: "/avatars/02.png",
        department: "Phát triển"
      },
      document: "Báo cáo tổng hợp 2023",
      date: "2024-03-22T13:25:00Z",
      description: "Đã xem tài liệu"
    },
    {
      id: "8",
      type: "edit",
      user: {
        name: "Lê Văn C",
        avatar: "/avatars/03.png",
        department: "Kỹ thuật"
      },
      document: "Hướng dẫn sử dụng phần mềm",
      date: "2024-03-22T10:15:00Z",
      description: "Đã chỉnh sửa tài liệu"
    },
    {
      id: "9",
      type: "create",
      user: {
        name: "Phạm Thị D",
        avatar: "/avatars/04.png",
        department: "Nhân sự"
      },
      document: "Biên bản họp 22/03/2024",
      date: "2024-03-22T09:00:00Z",
      description: "Đã tạo tài liệu mới"
    },
    {
      id: "10",
      type: "share",
      user: {
        name: "Hoàng Văn E",
        avatar: "/avatars/05.png",
        department: "Tài chính"
      },
      document: "Dự toán ngân sách Q2-2024",
      date: "2024-03-21T16:40:00Z",
      description: "Đã chia sẻ tài liệu với Phòng Kế toán"
    }
  ];

  const systemActivities = [
    {
      id: "1",
      type: "system",
      action: "Sao lưu dữ liệu",
      description: "Sao lưu tự động hoàn tất",
      date: "2024-03-24T02:00:00Z",
      status: "success"
    },
    {
      id: "2",
      type: "system",
      action: "Cập nhật hệ thống",
      description: "Cập nhật phiên bản 2.3.5",
      date: "2024-03-23T01:30:00Z",
      status: "success"
    },
    {
      id: "3",
      type: "system",
      action: "Quét bảo mật",
      description: "Quét toàn bộ hệ thống",
      date: "2024-03-22T03:15:00Z",
      status: "success"
    },
    {
      id: "4",
      type: "system",
      action: "Tối ưu hóa cơ sở dữ liệu",
      description: "Tối ưu hóa các bảng dữ liệu",
      date: "2024-03-21T02:45:00Z",
      status: "success"
    },
    {
      id: "5",
      type: "system",
      action: "Cập nhật dữ liệu danh mục",
      description: "Cập nhật danh mục phòng ban",
      date: "2024-03-20T10:30:00Z",
      status: "warning"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "create":
        return <FileText className="h-5 w-5 text-green-500 icon-3d" />;
      case "edit":
        return <Edit2 className="h-5 w-5 text-blue-500 icon-3d" />;
      case "delete":
        return <Trash2 className="h-5 w-5 text-red-500 icon-3d" />;
      case "share":
        return <Share2 className="h-5 w-5 text-purple-500 icon-3d" />;
      case "download":
        return <Download className="h-5 w-5 text-orange-500 icon-3d" />;
      case "upload":
        return <FileUp className="h-5 w-5 text-teal-500 icon-3d" />;
      case "view":
        return <Clock className="h-5 w-5 text-gray-500 icon-3d" />;
      default:
        return <Clock className="h-5 w-5 icon-3d" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const filteredActivities = userActivities.filter(activity => {
    const matchesSearch = 
      activity.document.toLowerCase().includes(searchTerm.toLowerCase()) || 
      activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === "all" || 
      activity.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight hover-3d">Lịch sử hoạt động</h2>
          <p className="text-muted-foreground">
            Xem lại các hoạt động trên hệ thống.
          </p>
        </div>
      </div>

      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 button-3d">
          <TabsTrigger value="user" className="text-base hover-3d">Hoạt động người dùng</TabsTrigger>
          <TabsTrigger value="system" className="text-base hover-3d">Hoạt động hệ thống</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user" className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-container p-4 rounded-xl">
            <div className="relative flex-1 w-full">
              <Input
                placeholder="Tìm kiếm theo tên tài liệu, người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-transparent border-[rgba(255,255,255,0.2)] hover-3d w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground icon-3d" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="button-3d w-full sm:w-[180px]">
                  <SelectValue placeholder="Loại hoạt động" />
                </SelectTrigger>
                <SelectContent className="glass-container border-[rgba(255,255,255,0.2)]">
                  {activityTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="button-3d">
              <Filter className="h-4 w-4 mr-2 icon-3d" />
              <span>Bộ lọc nâng cao</span>
            </Button>
          </div>

          <div className="space-y-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <Card key={activity.id} className="glass-container border-[rgba(255,255,255,0.2)] card-3d overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 avatar-3d">
                            <AvatarImage src={activity.user.avatar} />
                            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium hover-3d">{activity.user.name}</span>
                          <Badge variant="outline" className="badge-3d">
                            {activity.user.department}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold hover-3d">{activity.document}</h3>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(activity.date)}</span>
                        </div>
                      </div>
                      <Badge 
                        className="badge-3d"
                        variant={
                          activity.type === "delete" 
                            ? "destructive" 
                            : activity.type === "create" 
                              ? "default" 
                              : "secondary"
                        }
                      >
                        {activityTypes.find(t => t.value === activity.type)?.label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-container border-[rgba(255,255,255,0.2)] card-3d">
                <CardContent className="flex flex-col items-center justify-center h-40">
                  <p className="text-muted-foreground">Không tìm thấy hoạt động nào</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="mt-6 space-y-6">
          <div className="space-y-4">
            {systemActivities.map((activity) => (
              <Card key={activity.id} className="glass-container border-[rgba(255,255,255,0.2)] card-3d overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary icon-3d" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-semibold hover-3d">{activity.action}</h3>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(activity.date)}</span>
                      </div>
                    </div>
                    <Badge 
                      className="badge-3d"
                      variant={activity.status === "success" ? "default" : "secondary"}
                    >
                      {activity.status === "success" ? "Thành công" : "Cảnh báo"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 