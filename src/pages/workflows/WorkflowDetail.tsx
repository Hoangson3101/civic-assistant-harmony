import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight, Download, Printer, Share2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowDetail {
  id: string;
  name: string;
  description: string;
  stats: {
    totalRecords: number;
    completedRecords: number;
    averageProcessingTime: string;
    pendingRecords: number;
    delayedRecords: number;
  };
  timeline: {
    date: string;
    records: number;
    completionRate: number;
  }[];
  notes: {
    id: string;
    user: string;
    content: string;
    date: string;
  }[];
}

const WorkflowDetail = () => {
  const { id } = useParams();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  // Dữ liệu mẫu
  const workflow: WorkflowDetail = {
    id: "1",
    name: "Giải quyết hồ sơ cấp thẻ NV tiếp cận cộng đồng",
    description: "Quy trình xử lý và cấp thẻ cho nhân viên tiếp cận cộng đồng theo quy định mới",
    stats: {
      totalRecords: 45,
      completedRecords: 38,
      averageProcessingTime: "3 ngày",
      pendingRecords: 5,
      delayedRecords: 2
    },
    timeline: [
      { date: "2025-03-01", records: 5, completionRate: 100 },
      { date: "2025-03-02", records: 8, completionRate: 87.5 },
      { date: "2025-03-03", records: 6, completionRate: 83.3 },
      { date: "2025-03-04", records: 7, completionRate: 85.7 },
      { date: "2025-03-05", records: 4, completionRate: 75 }
    ],
    notes: [
      {
        id: "1",
        user: "Nguyễn Văn A",
        content: "Cần đẩy nhanh tiến độ xử lý hồ sơ trong tuần tới",
        date: "2025-03-05 14:30"
      },
      {
        id: "2",
        user: "Trần Thị B",
        content: "Đã cập nhật quy trình theo hướng dẫn mới",
        date: "2025-03-04 09:15"
      }
    ]
  };

  const handleAddNote = () => {
    if (!noteContent.trim()) return;
    // Thêm ghi chú mới vào danh sách
    setNoteContent("");
    setShowNoteForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <a href="/" className="hover:text-foreground">Trang chủ</a>
            <ChevronRight className="h-4 w-4" />
            <a href="/workflows" className="hover:text-foreground">Báo cáo quy trình</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Chi tiết quy trình</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{workflow.name}</h1>
              <p className="text-muted-foreground">{workflow.description}</p>
            </div>
            <div className="flex space-x-2">
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
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Thống kê */}
          <div className="col-span-2 space-y-6">
            {/* Các chỉ số */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Tổng số hồ sơ</div>
                <div className="text-2xl font-bold">{workflow.stats.totalRecords}</div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Đã hoàn thành</div>
                <div className="text-2xl font-bold text-green-600">
                  {workflow.stats.completedRecords}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Thời gian trung bình</div>
                <div className="text-2xl font-bold">{workflow.stats.averageProcessingTime}</div>
              </div>
            </div>

            {/* Biểu đồ */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Biểu đồ tiến độ</h3>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg">
                <span className="text-muted-foreground">Biểu đồ sẽ được hiển thị tại đây</span>
              </div>
            </div>

            {/* Bảng dữ liệu */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Chi tiết theo ngày</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Ngày</th>
                      <th className="text-right py-3 px-4">Số hồ sơ</th>
                      <th className="text-right py-3 px-4">Tỷ lệ hoàn thành</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflow.timeline.map((item, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-3 px-4">
                          {new Date(item.date).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="text-right py-3 px-4">{item.records}</td>
                        <td className="text-right py-3 px-4">{item.completionRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Ghi chú & Bình luận */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Ghi chú & Bình luận</h3>
                <button
                  onClick={() => setShowNoteForm(true)}
                  className="flex items-center space-x-2 text-sm text-primary hover:text-primary/90"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Thêm ghi chú</span>
                </button>
              </div>

              {showNoteForm && (
                <div className="mb-4">
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Nhập ghi chú của bạn..."
                    className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={4}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setShowNoteForm(false)}
                      className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Thêm ghi chú
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {workflow.notes.map(note => (
                  <div key={note.id} className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{note.user}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(note.date).toLocaleString("vi-VN")}
                      </span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Thông tin bổ sung */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Thông tin bổ sung</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Đang xử lý</div>
                  <div className="font-medium">{workflow.stats.pendingRecords} hồ sơ</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Chậm tiến độ</div>
                  <div className="font-medium text-red-600">{workflow.stats.delayedRecords} hồ sơ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetail; 