import { useState } from "react";
import { ChevronRight, Heart, Download, Printer, Share2, FileText, History, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentDetail {
  id: string;
  title: string;
  number: string;
  date: string;
  organization: string;
  type: string;
  status: "active" | "inactive";
  content: string;
  attachments: {
    id: string;
    name: string;
    size: string;
    type: string;
  }[];
  history: {
    id: string;
    date: string;
    user: string;
    action: string;
    description: string;
  }[];
  isFavorite: boolean;
}

const LegalDocumentDetail = () => {
  const [activeTab, setActiveTab] = useState<"content" | "history" | "attachments">("content");
  const [document] = useState<DocumentDetail>({
    id: "1",
    title: "Quyết định về việc ban hành hướng dẫn phòng chống dịch COVID-19",
    number: "QĐ-123/2023",
    date: "2023-12-01",
    organization: "CDC Tuyên Quang",
    type: "Quyết định",
    status: "active",
    content: `
QUYẾT ĐỊNH
Về việc ban hành hướng dẫn phòng chống dịch COVID-19

Căn cứ Luật Phòng, chống bệnh truyền nhiễm ngày 21/11/2007;
Căn cứ Nghị định số 101/2010/NĐ-CP ngày 30/9/2010 của Chính phủ;
Xét đề nghị của Trưởng phòng Kế hoạch Tổng hợp,

QUYẾT ĐỊNH:

Điều 1. Ban hành kèm theo Quyết định này "Hướng dẫn phòng chống dịch COVID-19 trong tình hình mới".

Điều 2. Quyết định này có hiệu lực kể từ ngày ký.

Điều 3. Các ông/bà Trưởng các phòng, ban, đơn vị trực thuộc chịu trách nhiệm thi hành Quyết định này.`,
    attachments: [
      {
        id: "1",
        name: "huong-dan-phong-chong-dich.pdf",
        size: "2.5 MB",
        type: "PDF"
      },
      {
        id: "2",
        name: "phu-luc-kem-theo.docx",
        size: "1.8 MB",
        type: "Word"
      }
    ],
    history: [
      {
        id: "1",
        date: "2023-12-01",
        user: "Nguyễn Văn A",
        action: "Tạo mới",
        description: "Tạo văn bản mới"
      },
      {
        id: "2",
        date: "2023-12-02",
        user: "Trần Thị B",
        action: "Cập nhật",
        description: "Cập nhật nội dung Điều 2"
      }
    ],
    isFavorite: false
  });

  const [isFavorite, setIsFavorite] = useState(document.isFavorite);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Trang chủ</a>
            <ChevronRight className="h-4 w-4" />
            <a href="/legal" className="hover:text-foreground">Tra cứu pháp luật</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Chi tiết văn bản</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Document header */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-4">{document.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Số: {document.number}</span>
                <span>Ngày: {new Date(document.date).toLocaleDateString("vi-VN")}</span>
                <span>{document.organization}</span>
                <span>{document.type}</span>
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "p-2 rounded-lg border border-border hover:bg-muted transition-colors",
                  isFavorite && "text-red-500"
                )}
              >
                <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                <Printer className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("content")}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === "content"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Nội dung</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === "history"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center space-x-2">
                <History className="h-4 w-4" />
                <span>Lịch sử cập nhật</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("attachments")}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === "attachments"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center space-x-2">
                <Paperclip className="h-4 w-4" />
                <span>Tài liệu đính kèm</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="bg-card rounded-lg border border-border p-6">
          {activeTab === "content" && (
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans">{document.content}</pre>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              {document.history.map(item => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-background"
                >
                  <div className="w-32 flex-shrink-0">
                    <div className="text-sm font-medium">{new Date(item.date).toLocaleDateString("vi-VN")}</div>
                    <div className="text-sm text-muted-foreground">{item.user}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.action}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "attachments" && (
            <div className="space-y-4">
              {document.attachments.map(file => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {file.type} • {file.size}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalDocumentDetail; 