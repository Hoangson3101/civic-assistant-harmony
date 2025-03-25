import { useState } from "react";
import { Search, Upload, FileText, MoreVertical, Download, Trash, Share, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOutletContext } from "react-router-dom";

type Department = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  documentCount: number;
  createdAt: string;
  manager: string;
  avatar: string;
};

const MockFiles = [
  {
    id: "1",
    name: "Kế hoạch hoạt động năm 2024",
    type: "document",
    size: "1.5 MB",
    modifiedAt: "2024-03-28T10:00:00Z",
    modifiedBy: "Nguyễn Văn A",
    category: "Kế hoạch",
    status: "approved"
  },
  {
    id: "2",
    name: "Dự toán chi ngân sách 2024",
    type: "spreadsheet",
    size: "2.8 MB",
    modifiedAt: "2024-03-27T15:30:00Z",
    modifiedBy: "Trần Thị B",
    category: "Dự toán",
    status: "approved"
  },
  {
    id: "3",
    name: "Báo cáo tài chính Q1-2024",
    type: "spreadsheet",
    size: "4.2 MB",
    modifiedAt: "2024-03-26T09:15:00Z",
    modifiedBy: "Lê Văn C",
    category: "Báo cáo",
    status: "draft"
  },
  {
    id: "4",
    name: "Quy chế chi tiêu nội bộ",
    type: "document",
    size: "3.7 MB",
    modifiedAt: "2024-03-25T14:20:00Z",
    modifiedBy: "Phạm Thị D",
    category: "Quy chế",
    status: "approved"
  },
  {
    id: "5",
    name: "Biểu mẫu kế toán 2024",
    type: "pdf",
    size: "5.1 MB",
    modifiedAt: "2024-03-24T11:45:00Z",
    modifiedBy: "Vũ Văn E",
    category: "Biểu mẫu",
    status: "pending"
  }
];

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "kehoach", name: "Kế hoạch" },
  { id: "dutoan", name: "Dự toán" },
  { id: "baocao", name: "Báo cáo" },
  { id: "quychc", name: "Quy chế" },
  { id: "bieumau", name: "Biểu mẫu" }
];

const statuses = [
  { id: "all", name: "Tất cả" },
  { id: "approved", name: "Đã duyệt" },
  { id: "pending", name: "Chờ duyệt" },
  { id: "draft", name: "Bản nháp" }
];

const DepartmentDocuments = () => {
  const department = useOutletContext<Department>();
  const [files] = useState(MockFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                            file.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesStatus = selectedStatus === "all" || file.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-container p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-[rgba(255,255,255,0.2)] hover-3d w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground icon-3d" />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="button-3d w-full sm:w-[180px]">
                <SelectValue placeholder="Loại tài liệu" />
              </SelectTrigger>
              <SelectContent className="glass-container border-[rgba(255,255,255,0.2)]">
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="button-3d w-full sm:w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className="glass-container border-[rgba(255,255,255,0.2)]">
                {statuses.map(status => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button className="button-3d flex items-center gap-2 bg-primary w-full sm:w-auto">
          <Upload className="h-4 w-4 icon-3d" />
          <span>Tải lên</span>
        </Button>
      </div>

      {/* Documents Table */}
      <div className="table-3d rounded-xl border-[rgba(255,255,255,0.2)]">
        <Table>
          <TableHeader className="table-header-3d">
            <TableRow>
              <TableHead className="w-[30%]">Tên tài liệu</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Người sửa</TableHead>
              <TableHead>Ngày sửa đổi</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <TableRow key={file.id} className="table-row-3d">
                  <TableCell className="font-medium table-cell-3d">
                    <div className="flex items-center gap-2">
                      {file.type === 'document' && <FileText className="h-4 w-4 text-blue-500 icon-3d" />}
                      {file.type === 'spreadsheet' && <FileText className="h-4 w-4 text-green-500 icon-3d" />}
                      {file.type === 'pdf' && <FileText className="h-4 w-4 text-red-500 icon-3d" />}
                      <span className="hover-3d">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="table-cell-3d">
                    <Badge variant="outline" className="badge-3d">
                      {file.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="table-cell-3d">{file.size}</TableCell>
                  <TableCell className="table-cell-3d">{file.modifiedBy}</TableCell>
                  <TableCell className="table-cell-3d">{new Date(file.modifiedAt).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell className="table-cell-3d">
                    <Badge 
                      variant={
                        file.status === "approved" 
                          ? "default" 
                          : file.status === "pending" 
                            ? "secondary" 
                            : "outline"
                      } 
                      className="badge-3d"
                    >
                      {file.status === "approved" 
                        ? "Đã duyệt" 
                        : file.status === "pending" 
                          ? "Chờ duyệt" 
                          : "Bản nháp"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right table-cell-3d">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="button-3d">
                          <MoreVertical className="h-4 w-4 icon-3d" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-container border-[rgba(255,255,255,0.2)]">
                        <DropdownMenuItem className="hover-3d">
                          <Download className="h-4 w-4 mr-2 icon-3d" />
                          Tải xuống
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover-3d">
                          <Share className="h-4 w-4 mr-2 icon-3d" />
                          Chia sẻ
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover-3d">
                          <Trash className="h-4 w-4 mr-2 icon-3d" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <p className="text-muted-foreground">Không tìm thấy tài liệu nào</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentDocuments; 