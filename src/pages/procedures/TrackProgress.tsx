import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Search, Clock, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Giả lập dữ liệu tiến độ
const MOCK_PROGRESS = {
  id: "HS123456",
  procedure: "Cấp Thẻ NVTC",
  status: "processing",
  timeline: [
    {
      id: 1,
      status: "completed",
      title: "Tiếp nhận hồ sơ",
      description: "Hồ sơ đã được tiếp nhận và kiểm tra sơ bộ",
      date: "15/03/2024 09:30",
      user: "Nguyễn Thị B"
    },
    {
      id: 2,
      status: "completed",
      title: "Kiểm tra hồ sơ",
      description: "Hồ sơ đã được kiểm tra và yêu cầu bổ sung giấy tờ",
      date: "15/03/2024 14:20",
      user: "Trần Văn C"
    },
    {
      id: 3,
      status: "current",
      title: "Thẩm định chuyên môn",
      description: "Hồ sơ đang được thẩm định bởi phòng chuyên môn",
      date: "16/03/2024 10:15",
      user: "Lê Thị D"
    },
    {
      id: 4,
      status: "pending",
      title: "Ban hành quyết định",
      description: "Chờ ban hành quyết định",
      date: null,
      user: null
    }
  ]
};

export function TrackProgress() {
  const { id } = useParams();
  const [searchId, setSearchId] = useState(id || "");
  const [progress, setProgress] = useState(MOCK_PROGRESS);

  const handleSearch = () => {
    // TODO: Gọi API tìm kiếm hồ sơ theo mã
    console.log("Searching for:", searchId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "current":
        return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />;
      case "pending":
        return <AlertCircle className="h-6 w-6 text-gray-300" />;
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
          <span className="text-foreground font-medium">Tra cứu tiến độ</span>
        </div>
        <h1 className="text-2xl font-bold heading-3d">Tra cứu tiến độ hồ sơ</h1>
      </div>

      <Card className="card-3d glass-container">
        <CardHeader>
          <CardTitle className="hover-3d">Nhập mã hồ sơ</CardTitle>
          <CardDescription>
            Nhập mã hồ sơ để tra cứu tiến độ xử lý
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Nhập mã hồ sơ (VD: HS123456)"
              className="hover-3d"
            />
            <Button onClick={handleSearch} className="button-3d">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {progress && (
        <Card className="card-3d glass-container">
          <CardHeader>
            <CardTitle className="hover-3d">Thông tin tiến độ</CardTitle>
            <CardDescription>
              Mã hồ sơ: {progress.id} - {progress.procedure}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-[17px] top-0 bottom-0 w-[2px] bg-muted" />
              
              <div className="space-y-8">
                {progress.timeline.map((step, index) => (
                  <div key={step.id} className="relative flex gap-4">
                    <div className="flex-none">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{step.title}</h3>
                        {step.date && (
                          <time className="text-sm text-muted-foreground">
                            {step.date}
                          </time>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      {step.user && (
                        <p className="text-sm">
                          Người xử lý: <span className="font-medium">{step.user}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild className="button-3d">
              <Link to="/procedures/submit">
                Nộp hồ sơ mới
              </Link>
            </Button>
            <Button asChild className="button-3d">
              <Link to={`/procedures/details/${progress.id}`}>
                <FileText className="mr-2 h-4 w-4" />
                Xem chi tiết
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

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
  );
}

export default TrackProgress; 