
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

export default function LegalDocumentDetail() {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Văn bản pháp luật</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Chi tiết văn bản #{id}</span>
        </div>
        <h1 className="text-2xl font-bold heading-3d">Chi tiết văn bản pháp luật</h1>
      </div>
      
      <Card className="card-3d glass-container">
        <CardHeader>
          <CardTitle className="hover-3d">Văn bản số #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Thông tin chi tiết về văn bản pháp luật sẽ hiển thị ở đây.</p>
        </CardContent>
      </Card>
    </div>
  );
}
