import { useState } from "react";
import { ChevronRight, Search, Upload, FolderOpen, FileText, MoreVertical, Download, Trash, Share, Users } from "lucide-react";
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

const mockTeams = [
  { id: "1", name: "Nhóm Kế hoạch" },
  { id: "2", name: "Nhóm Kỹ thuật" },
  { id: "3", name: "Nhóm Nghiệp vụ" }
];

const mockFiles = [
  {
    id: "1",
    name: "Kế hoạch dự án 2024.docx",
    type: "document",
    size: "3.5 MB",
    modifiedAt: "2024-03-18T10:00:00Z",
    team: "Nhóm Kế hoạch",
    modifiedBy: "Nguyễn Văn A"
  },
  {
    id: "2",
    name: "Báo cáo kỹ thuật.xlsx",
    type: "spreadsheet",
    size: "2.8 MB",
    modifiedAt: "2024-03-17T15:30:00Z",
    team: "Nhóm Kỹ thuật",
    modifiedBy: "Trần Thị B"
  },
  {
    id: "3",
    name: "Quy trình nghiệp vụ.pdf",
    type: "pdf",
    size: "4.2 MB",
    modifiedAt: "2024-03-16T09:15:00Z",
    team: "Nhóm Nghiệp vụ",
    modifiedBy: "Lê Văn C"
  }
];

const TeamStorage = () => {
  const [files] = useState(mockFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam ? file.team === selectedTeam : true;
    return matchesSearch && matchesTeam;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Kho dữ liệu</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Kho nhóm</span>
        </div>
        <h1 className="text-2xl font-bold">Kho nhóm</h1>
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
          
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn nhóm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tất cả</SelectItem>
              {mockTeams.map(team => (
                <SelectItem key={team.id} value={team.name}>
                  {team.name}
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
              <TableHead>Nhóm</TableHead>
              <TableHead>Người sửa</TableHead>
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
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {file.team}
                  </div>
                </TableCell>
                <TableCell>{file.modifiedBy}</TableCell>
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

export default TeamStorage; 