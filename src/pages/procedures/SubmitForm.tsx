import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Upload, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Danh sách thủ tục mẫu
const procedures = [
  { id: "nvtc-cap", name: "Cấp Thẻ NVTC" },
  { id: "nvtc-thuhoi", name: "Thu Hồi Thẻ NVTC" },
  { id: "hiv-xetnghiem", name: "Cấp/Điều chỉnh Giấy chứng nhận xét nghiệm HIV" },
  { id: "tc-congbo", name: "Công bố cơ sở đủ điều kiện tiêm chủng" }
];

// Danh sách giấy tờ yêu cầu mẫu
const requiredDocuments = [
  { id: "don", name: "Đơn xin cấp thẻ", required: true, template: "/templates/don-cap-the.pdf" },
  { id: "cmnd", name: "Bản sao CMND/CCCD", required: true },
  { id: "chungchi", name: "Giấy chứng nhận tham gia công tác", required: true },
  { id: "hinhanh", name: "Ảnh 3x4 (chụp trong vòng 6 tháng)", required: true }
];

export function SubmitForm() {
  const navigate = useNavigate();
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    documents: [] as string[]
  });
  const [files, setFiles] = useState<{ [key: string]: File }>({});

  const handleFileChange = (documentId: string, file: File) => {
    setFiles(prev => ({
      ...prev,
      [documentId]: file
    }));
  };

  const handleDocumentCheck = (documentId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      documents: checked 
        ? [...prev.documents, documentId]
        : prev.documents.filter(id => id !== documentId)
    }));
  };

  const handleSubmit = async () => {
    // TODO: Xử lý gửi hồ sơ
    // Giả lập API call
    const submissionId = "HS" + Date.now();
    navigate(`/procedures/confirm/${submissionId}`);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      idNumber: "",
      phone: "",
      email: "",
      documents: []
    });
    setFiles({});
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Thủ tục hành chính</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Nộp Hồ Sơ</span>
        </div>
        <h1 className="text-2xl font-bold heading-3d">Nộp Hồ Sơ Thủ Tục Hành Chính</h1>
      </div>

      <Card className="card-3d glass-container">
        <CardHeader>
          <CardTitle className="hover-3d">Thông tin hồ sơ</CardTitle>
          <CardDescription>
            Vui lòng điền đầy đủ thông tin và đính kèm các giấy tờ theo yêu cầu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chọn thủ tục */}
          <div className="space-y-2">
            <Label htmlFor="procedure">Chọn Thủ Tục</Label>
            <Select value={selectedProcedure} onValueChange={setSelectedProcedure}>
              <SelectTrigger id="procedure" className="hover-3d">
                <SelectValue placeholder="Chọn thủ tục cần thực hiện" />
              </SelectTrigger>
              <SelectContent>
                {procedures.map(proc => (
                  <SelectItem key={proc.id} value={proc.id}>
                    {proc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Thông tin người nộp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="hover-3d"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">Số CMND/CCCD</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                className="hover-3d"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="hover-3d"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="hover-3d"
              />
            </div>
          </div>

          {/* Danh sách giấy tờ */}
          <div className="space-y-4">
            <Label>Giấy tờ yêu cầu</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredDocuments.map(doc => (
                <div key={doc.id} className="flex items-start space-x-4 p-4 rounded-lg border hover-3d">
                  <Checkbox
                    id={doc.id}
                    checked={formData.documents.includes(doc.id)}
                    onCheckedChange={(checked) => handleDocumentCheck(doc.id, checked as boolean)}
                  />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={doc.id} className="font-medium">
                      {doc.name}
                      {doc.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileChange(doc.id, file);
                        }}
                        className="text-sm"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {doc.template && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={doc.template} target="_blank" rel="noopener noreferrer">
                            Tải mẫu
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset} className="button-3d">
            <RefreshCw className="mr-2 h-4 w-4" />
            Làm lại
          </Button>
          <Button onClick={handleSubmit} className="button-3d">
            <Upload className="mr-2 h-4 w-4" />
            Nộp hồ sơ
          </Button>
        </CardFooter>
      </Card>

      <Card className="card-3d glass-container">
        <CardHeader>
          <CardTitle className="text-sm hover-3d">Hỗ trợ</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            Nếu bạn cần hỗ trợ, vui lòng liên hệ:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Hotline: 1900 xxxx</li>
            <li>Email: hotro@cdctuyenquang.gov.vn</li>
          </ul>
          <Button variant="link" asChild className="p-0">
            <a href="/huong-dan-su-dung.pdf" target="_blank">
              Xem hướng dẫn sử dụng
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default SubmitForm; 