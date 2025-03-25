import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, BarChart, LineChart, PieChart, Download, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import TiltCard from "@/components/ui/tilt-card";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("thang");
  const [searchTerm, setSearchTerm] = useState("");
  
  const reportTypes = [
    { id: "all", name: "Tất cả" },
    { id: "performance", name: "Hiệu suất" },
    { id: "financial", name: "Tài chính" },
    { id: "staff", name: "Nhân sự" },
    { id: "documents", name: "Văn bản" },
  ];

  const reports = [
    {
      id: "1",
      title: "Báo cáo tài chính quý I/2024",
      description: "Tổng hợp số liệu tài chính quý I năm 2024",
      type: "financial",
      date: "31/03/2024",
      author: "Nguyễn Văn A",
      status: "completed",
      chartType: "bar"
    },
    {
      id: "2",
      title: "Báo cáo nhân sự tháng 3/2024",
      description: "Thống kê biến động nhân sự tháng 3/2024",
      type: "staff",
      date: "31/03/2024",
      author: "Trần Thị B",
      status: "completed",
      chartType: "pie"
    },
    {
      id: "3",
      title: "Báo cáo công việc tuần 13/2024",
      description: "Tổng hợp tiến độ công việc tuần 13 năm 2024",
      type: "performance",
      date: "29/03/2024",
      author: "Lê Văn C",
      status: "completed",
      chartType: "line"
    },
    {
      id: "4",
      title: "Báo cáo tổng hợp văn bản tháng 3/2024",
      description: "Thống kê số lượng văn bản ban hành/tiếp nhận tháng 3/2024",
      type: "documents",
      date: "31/03/2024",
      author: "Phạm Thị D",
      status: "draft",
      chartType: "bar"
    },
    {
      id: "5",
      title: "Dự thảo báo cáo ngành quý I/2024",
      description: "Báo cáo tổng kết tình hình thực hiện nhiệm vụ quý I/2024",
      type: "performance",
      date: "28/03/2024",
      author: "Nguyễn Văn A",
      status: "draft",
      chartType: "line"
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getChartIcon = (chartType: string) => {
    switch (chartType) {
      case "bar":
        return <BarChart className="h-4 w-4 icon-3d" />;
      case "line":
        return <LineChart className="h-4 w-4 icon-3d" />;
      case "pie":
        return <PieChart className="h-4 w-4 icon-3d" />;
      default:
        return <BarChart className="h-4 w-4 icon-3d" />;
    }
  };

  return (
    <div className="space-y-6">
      <TiltCard className="glass-container p-6 rounded-xl" tiltMaxAngle={5} scale={1.01}>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
            <span className="breadcrumb-3d-item">Trang chủ</span>
            <ChevronRight className="h-4 w-4 breadcrumb-3d-separator" />
            <span className="text-foreground font-medium breadcrumb-3d-item">Báo cáo</span>
          </div>
          <h1 className="text-2xl font-bold heading-3d">Báo cáo</h1>
        </div>
      </TiltCard>

      <div className="flex items-center justify-between gap-4 glass-container p-4 rounded-xl">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1">
            <Input
              placeholder="Tìm kiếm báo cáo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-[rgba(255,255,255,0.2)] hover-3d"
            />
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground icon-3d" />
          </div>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px] button-3d">
              <Calendar className="h-4 w-4 mr-2 icon-3d" />
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent className="glass-container border-[rgba(255,255,255,0.2)]">
              <SelectItem value="tuan">Tuần</SelectItem>
              <SelectItem value="thang">Tháng</SelectItem>
              <SelectItem value="quy">Quý</SelectItem>
              <SelectItem value="nam">Năm</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="button-3d flex items-center gap-2 bg-primary">
          <Download className="h-4 w-4 icon-3d" />
          <span>Xuất báo cáo</span>
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="glass-container mb-4 p-1">
          {reportTypes.map(type => (
            <TabsTrigger 
              key={type.id}
              value={type.id}
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover-3d"
            >
              {type.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {reportTypes.map(type => (
          <TabsContent 
            key={type.id}
            value={type.id}
            className="mt-0"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports
                .filter(report => type.id === "all" || report.type === type.id)
                .map(report => (
                  <TiltCard
                    key={report.id}
                    className="card-3d border-border"
                  >
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center">
                          {getChartIcon(report.chartType)}
                          <CardTitle className="ml-2 text-base font-medium card-3d-title line-clamp-1">
                            {report.title}
                          </CardTitle>
                        </div>
                        <Badge variant={report.status === "completed" ? "default" : "secondary"} className="badge-3d">
                          {report.status === "completed" ? "Hoàn thành" : "Bản nháp"}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                          {report.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{report.date}</span>
                          <span className="font-medium">{report.author}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                ))}
            </div>
            
            {filteredReports.filter(report => type.id === "all" || report.type === type.id).length === 0 && (
              <div className="text-center py-10 glass-container rounded-xl">
                <p className="text-muted-foreground">Không tìm thấy báo cáo nào</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Reports; 