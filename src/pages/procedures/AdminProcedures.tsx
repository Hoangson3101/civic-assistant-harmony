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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search, MoreHorizontal, FileText, Download, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for administrative procedures
const MOCK_PROCEDURES = [
  {
    id: "TT01",
    name: "Cấp Thẻ Nhân viên tiếp công dân",
    department: "Phòng Nội vụ",
    category: "Nhân sự",
    status: "active",
    documents: 5,
    submissions: 12
  },
  {
    id: "TT02",
    name: "Cấp phép xây dựng nhà ở riêng lẻ",
    department: "Phòng Quản lý đô thị",
    category: "Xây dựng",
    status: "active",
    documents: 8,
    submissions: 34
  },
  {
    id: "TT03",
    name: "Đăng ký kết hôn",
    department: "Phòng Tư pháp",
    category: "Hộ tịch",
    status: "active",
    documents: 4,
    submissions: 56
  },
  {
    id: "TT04",
    name: "Cấp giấy chứng nhận quyền sử dụng đất",
    department: "Phòng TN&MT",
    category: "Đất đai",
    status: "inactive",
    documents: 10,
    submissions: 18
  },
  {
    id: "TT05",
    name: "Đăng ký kinh doanh hộ cá thể",
    department: "Phòng Kinh tế",
    category: "Kinh doanh",
    status: "active",
    documents: 6,
    submissions: 27
  },
];

export function AdminProcedures() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProcedures = MOCK_PROCEDURES.filter((procedure) => {
    const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          procedure.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || procedure.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || procedure.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Extract unique categories for filter dropdown
  const categories = Array.from(new Set(MOCK_PROCEDURES.map(p => p.category)));

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold heading-3d">Quản lý Thủ tục Hành chính</h1>
        <Button className="button-3d">
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm thủ tục mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-3d glass-container">
          <CardHeader className="pb-2">
            <CardTitle className="text-base hover-3d">Tổng số thủ tục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{MOCK_PROCEDURES.length}</div>
          </CardContent>
        </Card>
        <Card className="card-3d glass-container">
          <CardHeader className="pb-2">
            <CardTitle className="text-base hover-3d">Thủ tục đang áp dụng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{MOCK_PROCEDURES.filter(p => p.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card className="card-3d glass-container">
          <CardHeader className="pb-2">
            <CardTitle className="text-base hover-3d">Tổng số hồ sơ đã tiếp nhận</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{MOCK_PROCEDURES.reduce((acc, curr) => acc + curr.submissions, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm thủ tục..."
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
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Đang áp dụng</SelectItem>
            <SelectItem value="inactive">Ngừng áp dụng</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Lĩnh vực" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="card-3d glass-container">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã thủ tục</TableHead>
                <TableHead>Tên thủ tục</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Lĩnh vực</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Giấy tờ</TableHead>
                <TableHead>Hồ sơ</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcedures.map((procedure) => (
                <TableRow key={procedure.id}>
                  <TableCell className="font-medium">{procedure.id}</TableCell>
                  <TableCell>{procedure.name}</TableCell>
                  <TableCell>{procedure.department}</TableCell>
                  <TableCell>{procedure.category}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={procedure.status === "active" ? "success" : "destructive"}
                      className="hover-3d"
                    >
                      {procedure.status === "active" ? "Đang áp dụng" : "Ngừng áp dụng"}
                    </Badge>
                  </TableCell>
                  <TableCell>{procedure.documents}</TableCell>
                  <TableCell>{procedure.submissions}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Xem chi tiết</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Quản lý thành phần</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Xuất hồ sơ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Xóa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default AdminProcedures; 