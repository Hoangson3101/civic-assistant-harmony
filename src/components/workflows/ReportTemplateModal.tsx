import { useState } from "react";
import { FileInput, Download, X } from "lucide-react";

interface ReportTemplateModalProps {
  onClose: () => void;
}

const ReportTemplateModal = ({ onClose }: ReportTemplateModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const templates = [
    {
      id: "1",
      name: "Mẫu báo cáo tháng",
      description: "Mẫu báo cáo hoạt động hàng tháng theo quy định mới",
      format: "Excel",
      lastUpdated: "01/03/2025"
    },
    {
      id: "2",
      name: "Mẫu báo cáo quý",
      description: "Mẫu tổng hợp hoạt động theo quý",
      format: "Excel",
      lastUpdated: "01/03/2025"
    },
    {
      id: "3",
      name: "Mẫu báo cáo năm",
      description: "Mẫu báo cáo tổng kết năm",
      format: "Word",
      lastUpdated: "01/01/2025"
    },
    {
      id: "4",
      name: "Mẫu báo cáo đột xuất",
      description: "Mẫu báo cáo cho các trường hợp đặc biệt",
      format: "Excel",
      lastUpdated: "01/03/2025"
    }
  ];

  const handleDownload = (templateId: string) => {
    // Xử lý tải xuống mẫu báo cáo
    console.log("Downloading template:", templateId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Mẫu báo cáo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer ${
                selectedTemplate === template.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {template.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Định dạng: {template.format}</span>
                    <span>Cập nhật: {template.lastUpdated}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(template.id);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplateModal; 