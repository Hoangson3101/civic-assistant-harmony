import { useState } from "react";
import { ChevronRight, Heart, Download, Share2, FileText, Calendar, Building, Tag, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const FavoriteDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title" | "type">("date");

  // Dữ liệu mẫu
  const documents = [
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
      isFavorite: true
    }
  ];

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
            <span className="text-foreground">Văn bản yêu thích</span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Văn bản yêu thích</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm trong danh sách yêu thích..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "title" | "type")}
                className="px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="date">Sắp xếp theo ngày</option>
                <option value="title">Sắp xếp theo tiêu đề</option>
                <option value="type">Sắp xếp theo loại</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách văn bản yêu thích */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium hover:text-primary cursor-pointer">
                    {doc.title}
                  </h3>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
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
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs",
                      doc.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    )}>
                      {doc.status === "active" ? "Còn hiệu lực" : "Hết hiệu lực"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {doc.summary}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Download className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteDocuments; 