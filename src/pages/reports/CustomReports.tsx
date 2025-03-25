
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomReports() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Báo cáo tùy chỉnh</span>
        </div>
        <h1 className="text-2xl font-bold heading-3d">Báo cáo tùy chỉnh</h1>
      </div>
      
      <Card className="card-3d glass-container">
        <CardHeader>
          <CardTitle className="hover-3d">Tạo báo cáo mới</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Tạo và quản lý các báo cáo tùy chỉnh theo nhu cầu của bạn.</p>
        </CardContent>
      </Card>
    </div>
  );
}
