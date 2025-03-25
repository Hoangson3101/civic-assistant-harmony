import { useState } from "react";
import { Search, Filter, Download, Printer, Share2, ChevronRight, BarChart2, PieChart, LineChart, Table, Upload, FileInput, ClipboardEdit, Send, Calendar, Users, Building, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import DataInputForm from "../../components/workflows/DataInputForm";
import ReportTemplateModal from "../../components/workflows/ReportTemplateModal";
import ReviewModal from "../../components/workflows/ReviewModal";
import SubmitModal from "../../components/workflows/SubmitModal";

interface WorkflowStats {
  totalRecords: number;
  completedRecords: number;
  averageProcessingTime: string;
  pendingRecords: number;
  delayedRecords: number;
}

interface WorkflowReport {
  id: string;
  name: string;
  totalRecords: number;
  averageTime: string;
  completionRate: number;
  status: "normal" | "warning" | "danger";
  note?: string;
}

type TimeRange = "day" | "month" | "quarter" | "year";
type ChartType = "bar" | "line" | "pie";
type ViewType = "chart" | "table" | "print";

const WorkflowDashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [selectedQuarter, setSelectedQuarter] = useState("1");
  const [selectedDate, setSelectedDate] = useState("");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [viewType, setViewType] = useState<ViewType>("chart");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDataInput, setShowDataInput] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  // Thêm state cho bộ lọc mới
  const [filters, setFilters] = useState({
    status: "all",
    department: "",
    reportType: "all",
    assignee: ""
  });

  // Dữ liệu mẫu
  const stats: WorkflowStats = {
    totalRecords: 256,
    completedRecords: 180,
    averageProcessingTime: "2.5 ngày",
    pendingRecords: 56,
    delayedRecords: 20
  };

  const reports: WorkflowReport[] = [
    {
      id: "1",
      name: "Giải quyết hồ sơ cấp thẻ NV tiếp cận cộng đồng",
      totalRecords: 45,
      averageTime: "3 ngày",
      completionRate: 85,
      status: "normal",
      note: "Hoạt động ổn định"
    },
    {
      id: "2",
      name: "Quy trình phê duyệt văn bản nội bộ",
      totalRecords: 78,
      averageTime: "1.5 ngày",
      completionRate: 92,
      status: "normal",
      note: "Hiệu suất tốt"
    },
    {
      id: "3",
      name: "Quy trình xử lý báo cáo dịch tễ",
      totalRecords: 34,
      averageTime: "4 ngày",
      completionRate: 65,
      status: "warning",
      note: "Cần cải thiện thời gian xử lý"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="CDC Tuyên Quang" className="h-8" />
              <h1 className="text-2xl font-bold">Báo cáo Quy trình</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm báo cáo..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors",
                  showFilters 
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary hover:text-primary"
                )}
              >
                <Filter className="h-5 w-5" />
                <span>Bộ lọc</span>
              </button>
            </div>
          </div>

          {/* Bộ lọc mở rộng */}
          {showFilters && (
            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Trạng thái</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Đang xử lý</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="delayed">Chậm tiến độ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Đơn vị</label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Tất cả đơn vị</option>
                    <option value="dept1">Phòng Kế hoạch</option>
                    <option value="dept2">Phòng Nghiệp vụ</option>
                    <option value="dept3">Phòng CNTT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Loại báo cáo</label>
                  <select
                    value={filters.reportType}
                    onChange={(e) => setFilters({ ...filters, reportType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">Tất cả loại</option>
                    <option value="monthly">Báo cáo tháng</option>
                    <option value="quarterly">Báo cáo quý</option>
                    <option value="yearly">Báo cáo năm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Người phụ trách</label>
                  <select
                    value={filters.assignee}
                    onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Tất cả</option>
                    <option value="user1">Nguyễn Văn A</option>
                    <option value="user2">Trần Thị B</option>
                    <option value="user3">Lê Văn C</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Thanh công cụ */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowDataInput(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
              >
                <FileInput className="h-5 w-5" />
                <span>Nhập dữ liệu</span>
              </button>

              <button
                onClick={() => setShowTemplate(true)}
                className="px-4 py-2 bg-card text-card-foreground border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Mẫu báo cáo</span>
              </button>

              <button
                onClick={() => setShowReview(true)}
                className="px-4 py-2 bg-card text-card-foreground border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors flex items-center space-x-2"
              >
                <ClipboardEdit className="h-5 w-5" />
                <span>Xem xét</span>
              </button>

              <button
                onClick={() => setShowSubmit(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Nộp báo cáo</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="bg-card rounded-lg border border-border p-1 flex space-x-1">
                <button
                  onClick={() => setViewType("chart")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewType === "chart" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                >
                  <BarChart2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewType("table")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewType === "table" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                >
                  <Table className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewType("print")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewType === "print" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                >
                  <Printer className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "bg-primary text-primary-foreground"
                )}>
                  <FileInput className="h-5 w-5" />
                </div>
                <span className="text-sm mt-2">Nhập dữ liệu</span>
              </div>
              <div className="flex-1 h-1 bg-border mx-2">
                <div className="h-full bg-primary w-1/4"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                  <Upload className="h-5 w-5" />
                </div>
                <span className="text-sm mt-2">Mẫu báo cáo</span>
              </div>
              <div className="flex-1 h-1 bg-border mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                  <ClipboardEdit className="h-5 w-5" />
                </div>
                <span className="text-sm mt-2">Xem xét</span>
              </div>
              <div className="flex-1 h-1 bg-border mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                  <Send className="h-5 w-5" />
                </div>
                <span className="text-sm mt-2">Nộp báo cáo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-6">
          {/* Sidebar - Bộ lọc */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Khoảng thời gian */}
              <div>
                <h3 className="font-semibold mb-3">Khoảng thời gian</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="timeRange"
                      value="day"
                      checked={timeRange === "day"}
                      onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                      className="rounded-full border-border"
                    />
                    <span>Theo ngày</span>
                  </label>
                  {timeRange === "day" && (
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  )}

                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="timeRange"
                      value="month"
                      checked={timeRange === "month"}
                      onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                      className="rounded-full border-border"
                    />
                    <span>Theo tháng</span>
                  </label>
                  {timeRange === "month" && (
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month.toString().padStart(2, "0")}>
                            Tháng {month}
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {[2024, 2025, 2026].map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="timeRange"
                      value="quarter"
                      checked={timeRange === "quarter"}
                      onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                      className="rounded-full border-border"
                    />
                    <span>Theo quý</span>
                  </label>
                  {timeRange === "quarter" && (
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={selectedQuarter}
                        onChange={(e) => setSelectedQuarter(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {[1, 2, 3, 4].map(quarter => (
                          <option key={quarter} value={quarter}>
                            Quý {quarter}
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {[2024, 2025, 2026].map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="timeRange"
                      value="year"
                      checked={timeRange === "year"}
                      onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                      className="rounded-full border-border"
                    />
                    <span>Theo năm</span>
                  </label>
                  {timeRange === "year" && (
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {[2024, 2025, 2026].map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Nút thao tác */}
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Xem báo cáo
                </button>
                <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  Đặt lại bộ lọc
                </button>
              </div>
            </div>
          </div>

          {/* Nội dung chính */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-foreground">Trang chủ</a>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Báo cáo quy trình</span>
              {timeRange === "month" && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">Tháng {selectedMonth}/{selectedYear}</span>
                </>
              )}
            </div>

            {/* Dashboard tổng quan */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Tổng số hồ sơ</div>
                <div className="text-2xl font-bold">{stats.totalRecords}</div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Đã hoàn thành</div>
                <div className="text-2xl font-bold text-green-600">{stats.completedRecords}</div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Thời gian trung bình</div>
                <div className="text-2xl font-bold">{stats.averageProcessingTime}</div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Đang xử lý</div>
                <div className="text-2xl font-bold text-blue-600">{stats.pendingRecords}</div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Chậm tiến độ</div>
                <div className="text-2xl font-bold text-red-600">{stats.delayedRecords}</div>
              </div>
            </div>

            {/* Tabs chuyển đổi */}
            <div className="border-b border-border mb-6">
              <div className="flex space-x-6">
                <button
                  onClick={() => setViewType("chart")}
                  className={cn(
                    "pb-3 text-sm font-medium border-b-2 transition-colors",
                    viewType === "chart"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <BarChart2 className="h-4 w-4" />
                    <span>Biểu đồ</span>
                  </div>
                </button>
                <button
                  onClick={() => setViewType("table")}
                  className={cn(
                    "pb-3 text-sm font-medium border-b-2 transition-colors",
                    viewType === "table"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <Table className="h-4 w-4" />
                    <span>Bảng số liệu</span>
                  </div>
                </button>
                <button
                  onClick={() => setViewType("print")}
                  className={cn(
                    "pb-3 text-sm font-medium border-b-2 transition-colors",
                    viewType === "print"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <Printer className="h-4 w-4" />
                    <span>Báo cáo in</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Nội dung tab */}
            <div className="bg-card rounded-lg border border-border p-6">
              {viewType === "chart" && (
                <div>
                  {/* Công cụ biểu đồ */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setChartType("bar")}
                        className={cn(
                          "p-2 rounded-lg border border-border transition-colors",
                          chartType === "bar" && "bg-primary text-primary-foreground"
                        )}
                      >
                        <BarChart2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setChartType("line")}
                        className={cn(
                          "p-2 rounded-lg border border-border transition-colors",
                          chartType === "line" && "bg-primary text-primary-foreground"
                        )}
                      >
                        <LineChart className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setChartType("pie")}
                        className={cn(
                          "p-2 rounded-lg border border-border transition-colors",
                          chartType === "pie" && "bg-primary text-primary-foreground"
                        )}
                      >
                        <PieChart className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Khu vực biểu đồ */}
                  <div className="h-[400px] flex items-center justify-center border border-dashed border-border rounded-lg">
                    <span className="text-muted-foreground">
                      Biểu đồ sẽ được hiển thị tại đây
                    </span>
                  </div>
                </div>
              )}

              {viewType === "table" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4">STT</th>
                        <th className="text-left py-3 px-4">Tên quy trình</th>
                        <th className="text-right py-3 px-4">Số lượng hồ sơ</th>
                        <th className="text-right py-3 px-4">Thời gian TB</th>
                        <th className="text-right py-3 px-4">Tỷ lệ hoàn thành</th>
                        <th className="text-left py-3 px-4">Trạng thái</th>
                        <th className="text-left py-3 px-4">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report, index) => (
                        <tr key={report.id} className="border-b border-border">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{report.name}</td>
                          <td className="text-right py-3 px-4">{report.totalRecords}</td>
                          <td className="text-right py-3 px-4">{report.averageTime}</td>
                          <td className="text-right py-3 px-4">{report.completionRate}%</td>
                          <td className="py-3 px-4">
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs",
                              report.status === "normal" && "bg-green-100 text-green-700",
                              report.status === "warning" && "bg-yellow-100 text-yellow-700",
                              report.status === "danger" && "bg-red-100 text-red-700"
                            )}>
                              {report.status === "normal" && "Bình thường"}
                              {report.status === "warning" && "Cần chú ý"}
                              {report.status === "danger" && "Chậm trễ"}
                            </span>
                          </td>
                          <td className="py-3 px-4">{report.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {viewType === "print" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-bold">BÁO CÁO QUY TRÌNH CÔNG VIỆC</h2>
                    <p className="text-muted-foreground">
                      Kỳ báo cáo: Tháng {selectedMonth} năm {selectedYear}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">I. Thống kê chung</h3>
                    <table className="w-full border border-border">
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-2 px-4 border-r border-border">Tổng số hồ sơ</td>
                          <td className="py-2 px-4">{stats.totalRecords}</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-4 border-r border-border">Đã hoàn thành</td>
                          <td className="py-2 px-4">{stats.completedRecords}</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-4 border-r border-border">Thời gian trung bình</td>
                          <td className="py-2 px-4">{stats.averageProcessingTime}</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-4 border-r border-border">Đang xử lý</td>
                          <td className="py-2 px-4">{stats.pendingRecords}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r border-border">Chậm tiến độ</td>
                          <td className="py-2 px-4">{stats.delayedRecords}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h3 className="font-semibold">II. Chi tiết theo quy trình</h3>
                    <table className="w-full border border-border">
                      <thead>
                        <tr className="border-b border-border bg-muted">
                          <th className="text-left py-2 px-4 border-r border-border">STT</th>
                          <th className="text-left py-2 px-4 border-r border-border">Tên quy trình</th>
                          <th className="text-right py-2 px-4 border-r border-border">Số lượng</th>
                          <th className="text-right py-2 px-4 border-r border-border">Thời gian TB</th>
                          <th className="text-right py-2 px-4 border-r border-border">Tỷ lệ HT</th>
                          <th className="text-left py-2 px-4">Ghi chú</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map((report, index) => (
                          <tr key={report.id} className="border-b border-border">
                            <td className="py-2 px-4 border-r border-border">{index + 1}</td>
                            <td className="py-2 px-4 border-r border-border">{report.name}</td>
                            <td className="text-right py-2 px-4 border-r border-border">
                              {report.totalRecords}
                            </td>
                            <td className="text-right py-2 px-4 border-r border-border">
                              {report.averageTime}
                            </td>
                            <td className="text-right py-2 px-4 border-r border-border">
                              {report.completionRate}%
                            </td>
                            <td className="py-2 px-4">{report.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 text-right">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      In báo cáo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDataInput && (
        <DataInputForm
          onClose={() => setShowDataInput(false)}
          onSubmit={(data) => {
            console.log("Data input:", data);
            setShowDataInput(false);
          }}
        />
      )}

      {showTemplate && (
        <ReportTemplateModal
          onClose={() => setShowTemplate(false)}
        />
      )}

      {showReview && (
        <ReviewModal
          onClose={() => setShowReview(false)}
          onSubmit={(data) => {
            console.log("Review data:", data);
            setShowReview(false);
          }}
        />
      )}

      {showSubmit && (
        <SubmitModal
          onClose={() => setShowSubmit(false)}
          onSubmit={(data) => {
            console.log("Submit data:", data);
            setShowSubmit(false);
          }}
        />
      )}
    </div>
  );
};

export default WorkflowDashboard; 