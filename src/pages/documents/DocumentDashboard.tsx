import { useState } from "react";
import { Search, Filter, ChevronRight, FileText, Calendar, Building, Tag, Heart, Download, Share2, Grid, List, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import AdvancedSearchModal from "@/components/documents/AdvancedSearchModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Document {
  id: string;
  title: string;
  number: string;
  issueDate: string;
  issuedBy: string;
  type: string;
  status: "active" | "inactive";
  subject: string;
  summary: string;
  isFavorite: boolean;
}

const DocumentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [viewType, setViewType] = useState<"grid" | "list">("list");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  // Dữ liệu mẫu
  const documents: Document[] = [
    {
      id: "1",
      title: "Quyết định về việc ban hành quy trình phòng chống dịch COVID-19",
      number: "QĐ-123/2024",
      issueDate: "2024-03-15",
      issuedBy: "CDC Tuyên Quang",
      type: "Quyết định",
      status: "active",
      subject: "Y tế dự phòng",
      summary: "Ban hành quy trình phòng chống dịch COVID-19 áp dụng trong phạm vi CDC Tuyên Quang",
      isFavorite: false
    },
    {
      id: "2",
      title: "Thông báo về lịch họp giao ban tháng 3/2024",
      number: "TB-45/2024",
      issueDate: "2024-03-10",
      issuedBy: "CDC Tuyên Quang",
      type: "Thông báo",
      status: "active",
      subject: "Nội bộ",
      summary: "Thông báo lịch họp giao ban định kỳ tháng 3/2024 cho các phòng ban",
      isFavorite: true
    },
    {
      id: "3",
      title: "Hướng dẫn triển khai công tác y tế dự phòng năm 2024",
      number: "HD-67/2024",
      issueDate: "2024-02-28",
      issuedBy: "Sở Y tế",
      type: "Hướng dẫn",
      status: "active",
      subject: "Y tế dự phòng",
      summary: "Hướng dẫn chi tiết việc triển khai các hoạt động y tế dự phòng trong năm 2024",
      isFavorite: false
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb & Công cụ */}
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Trang chủ</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Văn bản</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Văn bản</h1>
            {/* Tìm kiếm */}
            <div className="relative ml-8">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm văn bản theo tiêu đề, số hiệu..."
                className="w-[400px] pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button
              variant="link"
              onClick={() => setShowAdvancedSearch(true)}
              className="text-sm"
            >
              Tìm kiếm nâng cao
            </Button>
            <Button
              variant={showFilters ? "secondary" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Bộ lọc</span>
            </Button>
          </div>

          {/* Chế độ xem */}
          <div className="flex items-center space-x-1 bg-card rounded-lg border border-border p-1">
            <Button 
              variant={viewType === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewType("grid")}
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button 
              variant={viewType === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewType("list")}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container pb-10">
        <div className="flex space-x-6">
          {/* Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0 space-y-6">
              {/* Loại văn bản */}
              <div>
                <h3 className="font-medium mb-2">Loại văn bản</h3>
                <div className="space-y-2">
                  {["Quyết định", "Thông báo", "Công văn", "Hướng dẫn", "Biên bản họp"].map((category) => (
                    <Button
                      key={category}
                      variant={category === selectedCategory ? "secondary" : "ghost"}
                      onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                      className="w-full justify-start text-sm font-normal h-9"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chủ đề/Lĩnh vực */}
              <div>
                <h3 className="font-medium mb-2">Chủ đề/Lĩnh vực</h3>
                <div className="space-y-2">
                  {["Y tế dự phòng", "Phòng chống dịch", "Nội bộ"].map((subject) => (
                    <Button
                      key={subject}
                      variant={subject === selectedSubject ? "secondary" : "ghost"}
                      onClick={() => setSelectedSubject(subject === selectedSubject ? null : subject)}
                      className="w-full justify-start text-sm font-normal h-9"
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Cơ quan ban hành */}
              <div>
                <h3 className="font-medium mb-2">Cơ quan ban hành</h3>
                <div className="space-y-2">
                  {["CDC Tuyên Quang", "Sở Y tế", "Bộ Y tế"].map((issuer) => (
                    <Button
                      key={issuer}
                      variant={issuer === selectedIssuer ? "secondary" : "ghost"}
                      onClick={() => setSelectedIssuer(issuer === selectedIssuer ? null : issuer)}
                      className="w-full justify-start text-sm font-normal h-9"
                    >
                      {issuer}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bộ lọc nâng cao */}
              <div className="space-y-4">
                <h3 className="font-medium">Bộ lọc nâng cao</h3>
                
                {/* Ngày ban hành */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Từ ngày</label>
                  <Input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Đến ngày</label>
                  <Input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  />
                </div>

                {/* Trạng thái */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Trạng thái</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "all" | "active" | "inactive")}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">Tất cả</option>
                    <option value="active">Còn hiệu lực</option>
                    <option value="inactive">Hết hiệu lực</option>
                  </select>
                </div>

                {/* Nút áp dụng & đặt lại */}
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    Áp dụng
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Đặt lại
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Danh sách văn bản */}
          <div className="flex-1">
            <div className={cn(
              "grid gap-4",
              viewType === "grid" ? "grid-cols-2" : "grid-cols-1"
            )}>
              {documents.map((doc) => (
                <Card
                  key={doc.id}
                  className={cn(
                    "p-4 hover:border-primary transition-colors",
                    viewType === "grid" ? "flex flex-col" : "flex items-start"
                  )}
                >
                  <div className="flex-1">
                    <h3 className="font-medium hover:text-primary cursor-pointer">
                      {doc.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{doc.number}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{doc.issueDate}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{doc.issuedBy}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Tag className="h-4 w-4" />
                        <span>{doc.type}</span>
                      </span>
                      <Badge variant={doc.status === "active" ? "success" : "destructive"}>
                        {doc.status === "active" ? "Còn hiệu lực" : "Hết hiệu lực"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {doc.summary}
                    </p>
                  </div>
                  <div className={cn(
                    "flex items-center space-x-2",
                    viewType === "grid" ? "mt-4" : "ml-4"
                  )}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Heart className={cn(
                        "h-5 w-5",
                        doc.isFavorite ? "fill-red-500 text-red-500" : ""
                      )} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Phân trang */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Hiển thị 1-10 trong tổng số 100 văn bản
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Trước
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="px-3 py-2">...</span>
                <Button variant="outline" size="sm">
                  10
                </Button>
                <Button variant="outline" size="sm">
                  Sau
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal tìm kiếm nâng cao */}
      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onSearch={(filters) => {
          console.log("Applying filters:", filters);
          setShowAdvancedSearch(false);
        }}
      />
    </div>
  );
};

export default DocumentDashboard; 