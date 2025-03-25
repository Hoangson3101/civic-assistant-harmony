import { useState } from "react";
import { 
  Building2, FolderIcon, MoreVertical, Upload, 
  Plus, Search, UserPlus, Settings, Users, ChevronRight, FolderOpen, FileText, Download, Trash, Share 
} from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DepartmentStorage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [files] = useState([
    {
      id: "1",
      name: "Báo cáo tài chính Q1.xlsx",
      type: "spreadsheet",
      size: "4.5 MB",
      modifiedAt: "2024-03-18T10:00:00Z",
      department: "Phòng Kế hoạch - Tài chính",
      modifiedBy: "Nguyễn Văn A",
      status: "approved"
    },
    {
      id: "2",
      name: "Quy chế nội bộ.docx",
      type: "document",
      size: "2.8 MB",
      modifiedAt: "2024-03-17T15:30:00Z",
      department: "Phòng Tổ chức - Hành chính",
      modifiedBy: "Trần Thị B",
      status: "pending"
    },
    {
      id: "3",
      name: "Hướng dẫn chuyên môn.pdf",
      type: "pdf",
      size: "6.2 MB",
      modifiedAt: "2024-03-16T09:15:00Z",
      department: "Phòng Nghiệp vụ Y tế",
      modifiedBy: "Lê Văn C",
      status: "approved"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    {
      id: "dept-1",
      name: "Phòng Kế hoạch - Tài chính",
      members: 15,
      avatar: "KH",
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "dept-2",
      name: "Phòng Nghiệp vụ Y tế",
      members: 20,
      avatar: "YT",
      color: "bg-green-100 text-green-700"
    },
    {
      id: "dept-3",
      name: "Phòng Tổ chức - Hành chính",
      members: 12,
      avatar: "TC",
      color: "bg-amber-100 text-amber-700"
    }
  ];

  const folders = [
    {
      id: "folder-1",
      name: "Văn bản chung",
      items: 25
    },
    {
      id: "folder-2",
      name: "Kế hoạch năm 2024",
      items: 18
    },
    {
      id: "folder-3",
      name: "Báo cáo định kỳ",
      items: 32
    },
    {
      id: "folder-4",
      name: "Tài liệu họp",
      items: 15
    }
  ];

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment ? file.department === selectedDepartment : true;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Kho dữ liệu</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Kho phòng ban</span>
        </div>
        <h1 className="text-2xl font-bold">Kho phòng ban</h1>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1">
            <Input
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Chọn phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tất cả</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span>Tải lên</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Tên tài liệu</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Người sửa</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày sửa đổi</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {file.type === 'document' && <FileText className="h-4 w-4 text-blue-500" />}
                    {file.type === 'spreadsheet' && <FileText className="h-4 w-4 text-green-500" />}
                    {file.type === 'pdf' && <FileText className="h-4 w-4 text-red-500" />}
                    {file.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {file.type === 'document' ? 'Văn bản' :
                     file.type === 'spreadsheet' ? 'Bảng tính' : 'PDF'}
                  </Badge>
                </TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {file.department}
                  </div>
                </TableCell>
                <TableCell>{file.modifiedBy}</TableCell>
                <TableCell>
                  <Badge variant={file.status === 'approved' ? 'success' : 'warning'}>
                    {file.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(file.modifiedAt).toLocaleDateString("vi-VN")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Tải xuống
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Chia sẻ
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentStorage; 