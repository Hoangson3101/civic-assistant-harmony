import { useParams, Link } from "react-router-dom";
import { ChevronRight, Download, ArrowLeft, FileText, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Giả lập dữ liệu chi tiết hồ sơ
const MOCK_DETAILS = {
  id: "HS123456",
  procedure: "Cấp Thẻ NVTC",
  status: "processing",
  submittedAt: "15/03/2024 09:30",
  applicant: {
    name: "Nguyễn Văn A",
    idNumber: "123456789012",
    phone: "0912345678",
    email: "nguyenvana@example.com"
  },
  documents: [
    {
      name: "Đơn xin cấp thẻ",
      status: "approved",
      note: "Đã kiểm tra và phê duyệt",
      file: "/files/don-cap-the.pdf"
    },
    {
      name: "Bản sao CMND/CCCD",
      status: "approved",
      note: "Đã kiểm tra và phê duyệt",
      file: "/files/cmnd.pdf"
    },
    {
      name: "Giấy chứng nhận tham gia công tác",
      status: "pending",
      note: "Đang chờ xác minh",
      file: "/files/chung-nhan.pdf"
    },
    {
      name: "Ảnh 3x4",
      status: "approved",
      note: "Đã kiểm tra và phê duyệt",
      file: "/files/anh.jpg"
    }
  ],
  timeline: [
    {
      date: "15/03/2024 09:30",
      action: "Tiếp nhận hồ sơ",
      user: "Nguyễn Thị B",
      note: "Hồ sơ đã được tiếp nhận và kiểm tra sơ bộ"
    },
    {
      date: "15/03/2024 14:20",
      action: "Kiểm tra hồ sơ",
      user: "Trần Văn C",
      note: "Hồ sơ đã được kiểm tra và yêu cầu bổ sung giấy tờ"
    },
    {
      date: "16/03/2024 10:15",
      action: "Thẩm định chuyên môn",
      user: "Lê Thị D",
      note: "Hồ sơ đang được thẩm định bởi phòng chuyên môn"
    }
  ],
  result: null
};

export function ProcedureDetails() {
  const { id } = useParams();
  const details = MOCK_DETAILS;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="success" className="hover-3d">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Đã duyệt
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="warning" className="hover-3d">
            <Clock className="mr-1 h-3 w-3" />
            Đang xử lý
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Thủ tục hành chính</span>
          <ChevronRight className="h-4 w-4" />
          <span>Chi tiết hồ sơ</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{details.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold heading-3d">Chi tiết hồ sơ thủ tục hành chính</h1>
          <Button variant="outline" asChild className="button-3d">
            <Link to={`/procedures/track/${details.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Thông tin hồ sơ */}
          <Card className="card-3d glass-container">
            <CardHeader>
              <CardTitle className="hover-3d">Thông tin hồ sơ</CardTitle>
              <CardDescription>
                Mã hồ sơ: {details.id} - {details.procedure}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Người nộp</h3>
                  <p className="text-lg">{details.applicant.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">CMND/CCCD</h3>
                  <p className="text-lg">{details.applicant.idNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Số điện thoại</h3>
                  <p className="text-lg">{details.applicant.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-lg">{details.applicant.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Giấy tờ đã nộp */}
          <Card className="card-3d glass-container">
            <CardHeader>
              <CardTitle className="hover-3d">Giấy tờ đã nộp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {details.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover-3d">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.note}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(doc.status)}
                      <Button variant="ghost" size="icon" asChild className="hover-3d">
                        <a href={doc.file} download>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <Card className="card-3d glass-container">
            <CardHeader>
              <CardTitle className="hover-3d">Quá trình xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-[17px] top-0 bottom-0 w-[2px] bg-muted" />
                <div className="space-y-6">
                  {details.timeline.map((event, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className="flex-none">
                        <div className="h-[9px] w-[9px] rounded-full bg-primary mt-2" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.action}</h3>
                          <time className="text-sm text-muted-foreground">
                            {event.date}
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.note}
                        </p>
                        <p className="text-sm">
                          Người xử lý: <span className="font-medium">{event.user}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d glass-container">
            <CardHeader>
              <CardTitle className="hover-3d">Kết quả</CardTitle>
            </CardHeader>
            <CardContent>
              {details.result ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border hover-3d">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Quyết định cấp thẻ</p>
                        {details.result.documentNumber && (
                          <p className="text-sm text-muted-foreground">
                            Số: {details.result.documentNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    {details.result.file && (
                      <Button variant="ghost" size="icon" asChild className="hover-3d">
                        <a href={details.result.file} download>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Hồ sơ đang được xử lý. Kết quả sẽ được cập nhật sau khi hoàn thành.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProcedureDetails; 