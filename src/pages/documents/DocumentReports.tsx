import { useState } from "react";
import { ChevronRight, BarChart2, PieChart, Table, Calendar, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewType = "chart" | "table";
type TimeRange = "day" | "month" | "quarter" | "year";

const DocumentReports = () => {
  const [viewType, setViewType] = useState<ViewType>("chart");
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [showFilters, setShowFilters] = useState(false);

  // Dữ liệu mẫu cho biểu đồ
  const chartData = {
    totalDocuments: 156,
    byType: [
      { type: "Quyết định", count: 45 },
      { type: "Thông báo", count: 38 },
      { type: "Công văn", count: 32 },
      { type: "Hướng dẫn", count: 25 },
      { type: "Biên bản họp", count: 16 }
    ],
    byStatus: [
      { status: "Còn hiệu lực", count: 132 },
      { status: "Hết hiệu lực", count: 24 }
    ],
    byMonth: [
      { month: "T1", count: 12 },
      { month: "T2", count: 15 },
      { month: "T3", count: 18 },
      { month: "T4", count: 14 },
      { month: "T5", count: 16 },
      { month: "T6", count: 13 },
      { month: "T7", count: 11 },
      { month: "T8", count: 15 },
      { month: "T9", count: 12 },
      { month: "T10", count: 10 },
      { month: "T11", count: 9 },
      { month: "T12", count: 11 }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <a href="/" className="hover:text-foreground">Trang chủ</a>
            <ChevronRight className="h-4 w-4" />
            <a href="/documents" className="hover:text-foreground">Văn bản</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Báo cáo thống kê</span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Báo cáo thống kê văn bản</h1>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="day">Theo ngày</option>
                <option value="month">Theo tháng</option>
                <option value="quarter">Theo quý</option>
                <option value="year">Theo năm</option>
              </select>
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
              <div className="flex items-center space-x-1 bg-card rounded-lg border border-border p-1">
                <button
                  onClick={() => setViewType("chart")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewType === "chart"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                >
                  <BarChart2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewType("table")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewType === "table"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                >
                  <Table className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung báo cáo */}
      <div className="container mx-auto px-4 py-6">
        {/* Widget tổng quan */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="text-lg font-medium mb-2">Tổng số văn bản</h3>
            <p className="text-3xl font-bold text-primary">{chartData.totalDocuments}</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="text-lg font-medium mb-2">Văn bản còn hiệu lực</h3>
            <p className="text-3xl font-bold text-green-600">{chartData.byStatus[0].count}</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="text-lg font-medium mb-2">Văn bản hết hiệu lực</h3>
            <p className="text-3xl font-bold text-red-600">{chartData.byStatus[1].count}</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="text-lg font-medium mb-2">Văn bản trong tháng</h3>
            <p className="text-3xl font-bold text-blue-600">{chartData.byMonth[2].count}</p>
          </div>
        </div>

        {/* Biểu đồ hoặc bảng */}
        {viewType === "chart" ? (
          <div className="grid grid-cols-2 gap-6">
            {/* Biểu đồ phân bố theo loại văn bản */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-medium mb-4">Phân bố theo loại văn bản</h3>
              <div className="h-64 flex items-end space-x-4">
                {chartData.byType.map((item) => (
                  <div key={item.type} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/20 rounded-t"
                      style={{ height: `${(item.count / chartData.totalDocuments) * 200}px` }}
                    />
                    <span className="mt-2 text-sm text-muted-foreground">{item.type}</span>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Biểu đồ theo trạng thái */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-medium mb-4">Phân bố theo trạng thái</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-8 border-primary relative">
                  <div
                    className="absolute inset-0 bg-green-500 rounded-full"
                    style={{
                      clipPath: `polygon(50% 50%, -50% -50%, ${
                        Math.cos((chartData.byStatus[0].count / chartData.totalDocuments) * Math.PI * 2) * 100
                      }% ${
                        Math.sin((chartData.byStatus[0].count / chartData.totalDocuments) * Math.PI * 2) * 100
                      }%)`
                    }}
                  />
                </div>
                <div className="ml-8">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Còn hiệu lực ({chartData.byStatus[0].count})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span>Hết hiệu lực ({chartData.byStatus[1].count})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Biểu đồ theo thời gian */}
            <div className="col-span-2 p-6 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-medium mb-4">Số lượng văn bản theo thời gian</h3>
              <div className="h-64 flex items-end space-x-4">
                {chartData.byMonth.map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/20 rounded-t"
                      style={{ height: `${(item.count / 20) * 200}px` }}
                    />
                    <span className="mt-2 text-sm text-muted-foreground">{item.month}</span>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-card border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-medium">Loại văn bản</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Số lượng</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Còn hiệu lực</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Hết hiệu lực</th>
                </tr>
              </thead>
              <tbody>
                {chartData.byType.map((item) => (
                  <tr key={item.type} className="border-b border-border">
                    <td className="px-6 py-4 text-sm">{item.type}</td>
                    <td className="px-6 py-4 text-sm">{item.count}</td>
                    <td className="px-6 py-4 text-sm">
                      {Math.floor(item.count * 0.85)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {Math.ceil(item.count * 0.15)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentReports; 