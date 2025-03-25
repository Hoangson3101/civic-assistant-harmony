import { useParams, Link } from "react-router-dom";
import { ChevronRight, CheckCircle2, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ConfirmSubmission() {
  const { id } = useParams();
  
  // Giả lập dữ liệu hồ sơ đã nộp
  const submission = {
    id,
    procedure: "Cấp Thẻ NVTC",
    submittedAt: new Date().toLocaleString("vi-VN"),
    documents: [
      "Đơn xin cấp thẻ",
      "Bản sao CMND/CCCD",
      "Giấy chứng nhận tham gia công tác",
      "Ảnh 3x4"
    ]
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Thủ tục hành chính</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Xác nhận hồ sơ</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="card-3d glass-container">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl hover-3d">Hồ sơ đã được tiếp nhận</CardTitle>
            <CardDescription>
              Mã hồ sơ: <span className="font-medium">{submission.id}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Thủ tục</h3>
                <p className="text-lg">{submission.procedure}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Thời gian nộp</h3>
                <p className="text-lg">{submission.submittedAt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Giấy tờ đã nộp</h3>
                <ul className="mt-2 space-y-2">
                  {submission.documents.map((doc, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-sm">
              <p className="font-medium mb-2">Lưu ý:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Vui lòng lưu lại mã hồ sơ để tra cứu tiến độ</li>
                <li>Bạn sẽ nhận được thông báo qua email khi có cập nhật về hồ sơ</li>
                <li>Nếu cần bổ sung giấy tờ, chúng tôi sẽ liên hệ qua số điện thoại đã đăng ký</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            <Button variant="outline" asChild className="w-full sm:w-auto button-3d">
              <Link to="/procedures/submit">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Nộp hồ sơ khác
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto button-3d">
              <Link to={`/procedures/track/${submission.id}`}>
                Theo dõi tiến độ
              </Link>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ConfirmSubmission; 