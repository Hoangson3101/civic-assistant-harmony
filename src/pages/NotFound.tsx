import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4 heading-3d">404</h1>
      <h2 className="text-2xl font-semibold mb-2 heading-3d">Không tìm thấy trang</h2>
      <p className="text-muted-foreground mb-8">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Button asChild className="button-3d">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-4 w-4 icon-3d" />
          <span>Quay về trang chủ</span>
        </Link>
      </Button>
    </div>
  );
}

export default NotFound;
