import { useState } from "react";
import { ChevronRight, Search, Upload, FolderOpen, FileText, MoreVertical, Download, Trash, Share } from "lucide-react";
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
import TiltCard from "@/components/ui/tilt-card";

const mockFiles = [
  {
    id: "1",
    name: "Báo cáo tháng 3.docx",
    type: "document",
    size: "2.5 MB",
    modifiedAt: "2024-03-18T10:00:00Z",
    shared: false
  },
  {
    id: "2",
    name: "Kế hoạch Q2.xlsx",
    type: "spreadsheet",
    size: "1.8 MB",
    modifiedAt: "2024-03-17T15:30:00Z",
    shared: true
  },
  {
    id: "3",
    name: "Tài liệu dự án.pdf",
    type: "pdf",
    size: "5.2 MB",
    modifiedAt: "2024-03-16T09:15:00Z",
    shared: false
  }
];

const PersonalStorage = () => {
  const [files] = useState(mockFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6" onMouseMove={handleMouseMove}>
      <TiltCard className="glass-container p-6 rounded-xl" tiltMaxAngle={5} scale={1.01}>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
            <span className="breadcrumb-3d-item">Trang chủ</span>
            <ChevronRight className="h-4 w-4 breadcrumb-3d-separator" />
            <span className="breadcrumb-3d-item">Kho dữ liệu</span>
            <ChevronRight className="h-4 w-4 breadcrumb-3d-separator" />
            <span className="text-foreground font-medium breadcrumb-3d-item">Kho cá nhân</span>
          </div>
          <h1 className="text-2xl font-bold heading-3d">Kho cá nhân</h1>
        </div>
      </TiltCard>

      <div className="flex items-center justify-between gap-4 glass-container p-4 rounded-xl">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1">
            <Input
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-[rgba(255,255,255,0.2)] hover-3d"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground icon-3d" />
          </div>
        </div>
        
        <Button className="button-3d flex items-center gap-2 bg-primary">
          <Upload className="h-4 w-4 icon-3d" />
          <span>Tải lên</span>
        </Button>
      </div>

      <div className="table-3d rounded-xl border-[rgba(255,255,255,0.2)]">
        <Table>
          <TableHeader className="table-header-3d">
            <TableRow>
              <TableHead className="w-[40%]">Tên tài liệu</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Ngày sửa đổi</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file) => (
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
                    {file.type === 'document' ? 'Văn bản' :
                     file.type === 'spreadsheet' ? 'Bảng tính' : 'PDF'}
                  </Badge>
                </TableCell>
                <TableCell className="table-cell-3d">{file.size}</TableCell>
                <TableCell className="table-cell-3d">{new Date(file.modifiedAt).toLocaleDateString("vi-VN")}</TableCell>
                <TableCell className="table-cell-3d">
                  <Badge variant={file.shared ? "default" : "secondary"} className="badge-3d">
                    {file.shared ? "Đã chia sẻ" : "Riêng tư"}
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
            ))}
          </TableBody>
        </Table>
      </div>

      <div 
        className="fixed pointer-events-none w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
        style={{
          left: `${mousePosition.x * 50 + 50}%`,
          top: `${mousePosition.y * 50 + 50}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
          transition: 'left 0.3s ease-out, top 0.3s ease-out'
        }}
      />
    </div>
  );
};

export default PersonalStorage; 