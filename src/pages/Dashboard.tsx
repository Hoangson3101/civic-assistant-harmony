import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Dashboard() {
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

  const recentDocuments = [
    {
      id: "1",
      title: "Báo cáo quý 1/2024",
      department: "Kế toán",
      date: "22/03/2024",
      author: {
        name: "Nguyễn Văn A",
        avatar: "/avatars/01.png"
      }
    },
    {
      id: "2",
      title: "Kế hoạch phát triển Q2/2024",
      department: "Phát triển",
      date: "20/03/2024",
      author: {
        name: "Trần Thị B",
        avatar: "/avatars/02.png"
      }
    },
    {
      id: "3",
      title: "Tài liệu kỹ thuật v2.1",
      department: "Kỹ thuật",
      date: "15/03/2024",
      author: {
        name: "Lê Văn C",
        avatar: "/avatars/03.png"
      }
    }
  ];

  const stats = [
    {
      title: "Tài liệu",
      value: "256",
      change: "+12",
      changeType: "increase",
      icon: <LineChart className="h-4 w-4" />
    },
    {
      title: "Phòng ban",
      value: "8",
      change: "+1",
      changeType: "increase",
      icon: <BarChart className="h-4 w-4" />
    },
    {
      title: "Báo cáo",
      value: "32",
      change: "+6",
      changeType: "increase",
      icon: <PieChart className="h-4 w-4" />
    }
  ];

  const activities = [
    {
      id: "1",
      action: "Tạo mới",
      document: "Báo cáo công tác tháng 3",
      time: "1 giờ trước",
      user: {
        name: "Nguyễn Văn A",
        avatar: "/avatars/01.png"
      }
    },
    {
      id: "2",
      action: "Chỉnh sửa",
      document: "Kế hoạch hành động Q2/2024",
      time: "3 giờ trước",
      user: {
        name: "Trần Thị B",
        avatar: "/avatars/02.png"
      }
    },
    {
      id: "3",
      action: "Chia sẻ",
      document: "Báo cáo tài chính",
      time: "5 giờ trước",
      user: {
        name: "Lê Văn C",
        avatar: "/avatars/03.png"
      }
    },
    {
      id: "4",
      action: "Xem",
      document: "Quy chế nội bộ",
      time: "Hôm qua",
      user: {
        name: "Phạm Thị D",
        avatar: "/avatars/04.png"
      }
    }
  ];

  const upcomingTasks = [
    {
      id: "1",
      title: "Kiểm tra báo cáo tài chính",
      due: "Hôm nay",
      priority: "Cao"
    },
    {
      id: "2",
      title: "Họp đánh giá quý 1/2024",
      due: "Ngày mai",
      priority: "Cao"
    },
    {
      id: "3",
      title: "Cập nhật tài liệu kỹ thuật",
      due: "25/03/2024",
      priority: "Trung bình"
    },
    {
      id: "4",
      title: "Triển khai kế hoạch Q2",
      due: "01/04/2024",
      priority: "Thấp"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight hover-3d">Tổng quan</h2>
          <p className="text-muted-foreground">
            Chào mừng trở lại! Dưới đây là tổng quan hoạt động hôm nay.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="button-3d">Tạo báo cáo mới</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="card-3d glass-container border-[rgba(255,255,255,0.2)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium hover-3d">
                {stat.title}
              </CardTitle>
              <div className="icon-3d bg-primary/10 text-primary p-1 rounded-full">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold hover-3d">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>{" "}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Documents */}
        <Card className="md:col-span-4 card-3d glass-container border-[rgba(255,255,255,0.2)]">
          <CardHeader>
            <CardTitle className="hover-3d">Tài liệu gần đây</CardTitle>
            <CardDescription>
              Tài liệu bạn đã xem hoặc chỉnh sửa gần đây.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between hover-3d glass-container p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 avatar-3d">
                      <AvatarImage src={doc.author.avatar} alt={doc.author.name} />
                      <AvatarFallback>{doc.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{doc.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {doc.department} • {doc.date}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="badge-3d">
                    {doc.author.name}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activities */}
        <Card className="md:col-span-3 card-3d glass-container border-[rgba(255,255,255,0.2)]">
          <CardHeader>
            <CardTitle className="hover-3d">Hoạt động gần đây</CardTitle>
            <CardDescription>
              Các hoạt động trên hệ thống gần đây.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 hover-3d"
                >
                  <Avatar className="h-8 w-8 avatar-3d">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">
                      <span className="text-primary">{activity.action}</span>{" "}
                      <span>{activity.document}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{activity.user.name}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card className="md:col-span-3 card-3d glass-container border-[rgba(255,255,255,0.2)]">
          <CardHeader>
            <CardTitle className="hover-3d">Nhiệm vụ sắp tới</CardTitle>
            <CardDescription>
              Các nhiệm vụ cần hoàn thành trong thời gian tới.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between glass-container p-3 rounded-lg hover-3d"
                >
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Hạn: {task.due}
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.priority === "Cao"
                        ? "destructive"
                        : task.priority === "Trung bình"
                        ? "secondary"
                        : "outline"
                    }
                    className="badge-3d"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Welcome Card */}
        <Card className="md:col-span-4 card-3d glass-container border-[rgba(255,255,255,0.2)]">
          <CardHeader>
            <CardTitle className="hover-3d">Chào mừng đến với Civic Harmony</CardTitle>
            <CardDescription>
              Nền tảng quản lý và lưu trữ tài liệu hiện đại.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Civic Harmony giúp bạn quản lý tài liệu, báo cáo và dữ liệu một cách hiệu quả.
                Với giao diện hiện đại và các tính năng tiên tiến, công việc quản lý dữ liệu
                trở nên dễ dàng hơn bao giờ hết.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button className="button-3d">Tìm hiểu thêm</Button>
                <Button variant="outline" className="button-3d">
                  Xem hướng dẫn
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 