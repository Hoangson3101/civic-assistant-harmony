import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Eye, Calendar, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

// Giả lập dữ liệu lịch sử hồ sơ
const MOCK_HISTORY = [
  {
    id: "HS123456",
    procedure: "Cấp Thẻ NVTC",
    submittedDate: "15/03/2024",
    status: "completed",
    result: "approved",
    completedDate: "20/03/2024"
  },
  {
    id: "HS123457",
    procedure: "Đăng ký kết hôn",
    submittedDate: "16/03/2024",
    status: "completed",
    result: "approved",
    completedDate: "18/03/2024"
  },
  {
    id: "HS123458",
    procedure: "Cấp phép xây dựng",
    submittedDate: "17/03/2024",
    status: "processing",
    result: null,
    completedDate: null
  },
  {
    id: "HS123459",
    procedure: "Đăng ký kinh doanh",
    submittedDate: "10/03/2024",
    status: "completed",
    result: "rejected",
    completedDate: "16/03/2024"
  },
  {
    id: "HS123460",
    procedure: "Cấp giấy chứng nhận quyền sử dụng đất",
    submittedDate: "05/03/2024",
    status: "completed",
    result: "approved",
    completedDate: "15/03/2024"
  },
  {
    id: "HS123461",
    procedure: "Cấp Thẻ NVTC",
    submittedDate: "01/03/2024",
    status: "completed",
    result: "approved",
    completedDate: "10/03/2024"
  },
  {
    id: "HS123462",
    procedure: "Đăng ký kết hôn",
    submittedDate: "28/02/2024",
    status: "completed",
    result: "approved",
    completedDate: "05/03/2024"
  }
];

export function ProcedureHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "submittedDate",
    direction: "desc"
  });

  // Xử lý sắp xếp
  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Lọc và sắp xếp dữ liệu
  const filteredAndSortedHistory = [...MOCK_HISTORY]
    .filter((record) => {
      const matchesSearch = 
        record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.procedure.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || record.status === statusFilter;
      const matchesResult = resultFilter === "all" || record.result === resultFilter;
      
      return matchesSearch && matchesStatus && matchesResult;
    })
    .sort((a, b) => {
      const { key, direction } = sortConfig;
      
      if (a[key] === null) return 1;
      if (b[key] === null) return -1;
      
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  // Helper function để hiển thị trạng thái
  const getStatusBadge = (status: string, result: string | null) => {
    if (status === "processing") {
      return (
        <Badge variant="warning" className="hover-3d">
          Đang xử lý
        </Badge>
      );
    } else if (status === "completed") {
      if (result === "approved") {
        return (
          <Badge variant="success" className="hover-3d">
            Đã duyệt
          </Badge>
        );
      } else if (result === "rejected") {
        return (
          <Badge variant="destructive" className="hover-3d">
            Từ chối
          </Badge>
        );
      }
    }
    return null;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold heading-3d">Lịch sử hồ sơ đã nộp</h1>
        <p className="text-muted-foreground">
          Quản lý và theo dõi tất cả hồ sơ bạn đã nộp
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo mã hồ sơ hoặc tên thủ tục..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="processing">Đang xử lý</SelectItem>
            <SelectItem value="completed">Đã hoàn thành</SelectItem>
          </SelectContent>
        </Select>
        <Select value={resultFilter} onValueChange={setResultFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Kết quả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả kết quả</SelectItem>
            <SelectItem value="approved">Đã duyệt</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="card-3d glass-container">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("id")}>
                    <span>Mã hồ sơ</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Tên thủ tục</TableHead>
                <TableHead className="w-[150px]">
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("submittedDate")}>
                    <span>Ngày nộp</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="w-[150px]">
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort("completedDate")}>
                    <span>Ngày hoàn thành</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="w-[120px]">Trạng thái</TableHead>
                <TableHead className="text-right">Chi tiết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.procedure}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {record.submittedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.completedDate ? (
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {record.completedDate}
                      </div>
                    ) : (
                      <span className="text-muted-foreground italic">Chưa hoàn thành</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(record.status, record.result)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="hover-3d">
                      <Link to={`/procedures/details/${record.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProcedureHistory; 