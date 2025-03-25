import { useState } from "react";
import { ChevronRight, Heart, Download, Printer, Share2, FileText, Calendar, Building, Tag, MessageSquare, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";

interface DocumentDetailProps {
  id?: string;
}

const DocumentDetail = ({ id: propId }: DocumentDetailProps = {}) => {
  const { id: urlId } = useParams();
  const id = propId || urlId || "1"; // Fallback to "1" if neither prop nor URL param is provided
  
  const [activeTab, setActiveTab] = useState<"content" | "history" | "attachments">("content");
  const [rating, setRating] = useState<number>(0);

  // Dữ liệu mẫu
  const document = {
    id: "1",
    title: "Quyết định về việc ban hành quy trình phòng chống dịch COVID-19",
    number: "QĐ-123/2024",
    issueDate: "2024-03-15",
    issuedBy: "CDC Tuyên Quang",
    type: "Quyết định",
    status: "active",
    subject: "Y tế dự phòng",
    summary: "Ban hành quy trình phòng chống dịch COVID-19 áp dụng trong phạm vi CDC Tuyên Quang",
    content: `
      QUYẾT ĐỊNH
      Về việc ban hành quy trình phòng chống dịch COVID-19
      
      GIÁM ĐỐC TRUNG TÂM KIỂM SOÁT BỆNH TẬT TỈNH TUYÊN QUANG

      Căn cứ...
      Xét đề nghị...
      
      QUYẾT ĐỊNH:
      
      Điều 1. Ban hành kèm theo Quyết định này "Quy trình phòng chống dịch COVID-19" áp dụng trong phạm vi Trung tâm Kiểm soát bệnh tật tỉnh Tuyên Quang.
      
      Điều 2. Quyết định này có hiệu lực kể từ ngày ký.
      
      Điều 3. Các ông (bà) Trưởng các khoa, phòng và toàn thể cán bộ, viên chức, người lao động của Trung tâm chịu trách nhiệm thi hành Quyết định này./.
    `,
    history: [
      {
        version: "1.0",
        date: "2024-03-15",
        author: "Nguyễn Văn A",
        changes: "Ban hành mới"
      }
    ],
    attachments: [
      {
        id: "1",
        name: "QuyTrinh_PCD_COVID19.pdf",
        size: "2.5MB",
        type: "pdf"
      }
    ],
    notes: [
      {
        id: "1",
        user: "Trần Thị B",
        content: "Cần phổ biến quy trình này đến toàn thể cán bộ",
        date: "2024-03-16"
      }
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
            <span className="text-foreground">Chi tiết văn bản</span>
          </div>

          {/* Tiêu đề và thông tin */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{document.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>{document.number}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{document.issueDate}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Building className="h-4 w-4" />
                <span>{document.issuedBy}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Tag className="h-4 w-4" />
                <span>{document.type}</span>
              </span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                document.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}>
                {document.status === "active" ? "Còn hiệu lực" : "Hết hiệu lực"}
              </span>
            </div>
          </div>

          {/* Thanh công cụ */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Heart className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Download className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Printer className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Share2 className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-6">
          {/* Tabs và nội dung */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex space-x-1 border-b border-border">
              <button
                onClick={() => setActiveTab("content")}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "content"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Nội dung
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "history"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Lịch sử cập nhật
              </button>
              <button
                onClick={() => setActiveTab("attachments")}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "attachments"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Tài liệu đính kèm
              </button>
            </div>

            {/* Nội dung tab */}
            <div className="mt-6">
              {activeTab === "content" && (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{document.content}</pre>
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-4">
                  {document.history.map((item) => (
                    <div key={item.version} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Phiên bản {item.version}</span>
                          <span className="mx-2">•</span>
                          <span className="text-muted-foreground">{item.date}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.author}</span>
                      </div>
                      <p className="mt-2 text-sm">{item.changes}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "attachments" && (
                <div className="space-y-4">
                  {document.attachments.map((file) => (
                    <div key={file.id} className="p-4 rounded-lg border border-border flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Download className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            {/* Ghi chú */}
            <div className="space-y-4">
              <h3 className="font-semibold">Ghi chú</h3>
              <div className="space-y-4">
                {document.notes.map((note) => (
                  <div key={note.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{note.user}</span>
                      <span className="text-sm text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="mt-2 text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
              <div>
                <textarea
                  placeholder="Thêm ghi chú..."
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  rows={3}
                />
                <button className="mt-2 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Gửi ghi chú
                </button>
              </div>
            </div>

            {/* Đánh giá */}
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Đánh giá mức độ hữu ích</h3>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={cn(
                      "p-1 hover:text-yellow-500 transition-colors",
                      rating >= star ? "text-yellow-500" : "text-muted-foreground"
                    )}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
