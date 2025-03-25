import { useState } from "react";
import { ChevronRight, Search, Upload, FolderOpen, FileText, MoreVertical, Download, Trash, Share, Database, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TiltCard from "@/components/ui/tilt-card";

const MockFiles = [
  {
    id: "1",
    name: "Công văn số 123/CV-UBND",
    type: "document",
    size: "1.5 MB",
    modifiedAt: "2024-03-28T10:00:00Z",
    category: "Công văn",
    accessLevel: "public",
    department: "UBND Thành phố"
  },
  {
    id: "2",
    name: "Quyết định số 45/QĐ-UBND",
    type: "document",
    size: "2.8 MB",
    modifiedAt: "2024-03-27T15:30:00Z",
    category: "Quyết định",
    accessLevel: "internal",
    department: "UBND Thành phố"
  },
  {
    id: "3",
    name: "Kế hoạch phát triển KT-XH 2024",
    type: "spreadsheet",
    size: "4.2 MB",
    modifiedAt: "2024-03-26T09:15:00Z",
    category: "Kế hoạch",
    accessLevel: "internal",
    department: "Sở KH-ĐT"
  },
  {
    id: "4",
    name: "Báo cáo tài chính Q1-2024",
    type: "spreadsheet",
    size: "3.7 MB",
    modifiedAt: "2024-03-25T14:20:00Z",
    category: "Báo cáo",
    accessLevel: "internal",
    department: "Sở Tài chính"
  },
  {
    id: "5",
    name: "Thông tư số 12/2024/TT-BTC",
    type: "pdf",
    size: "5.1 MB",
    modifiedAt: "2024-03-24T11:45:00Z",
    category: "Thông tư",
    accessLevel: "public",
    department: "Bộ Tài chính"
  }
];

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "congvan", name: "Công văn" },
  { id: "quyetdinh", name: "Quyết định" },
  { id: "kehoach", name: "Kế hoạch" },
  { id: "baocao", name: "Báo cáo" },
  { id: "thongtu", name: "Thông tư" }
];

const departments = [
  { id: "all", name: "Tất cả" },
  { id: "ubnd", name: "UBND Thành phố" },
  { id: "sokhdt", name: "Sở KH-ĐT" },
  { id: "sotaichinh", name: "Sở Tài chính" },
  { id: "botaichinh", name: "Bộ Tài chính" }
];

const CommonStorage = () => {
  const [files] = useState(MockFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           file.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || 
                             file.department.toLowerCase().includes(selectedDepartment.toLowerCase());
    const matchesAccessLevel = selectedTab === "all" || 
                               (selectedTab === "public" && file.accessLevel === "public") ||
                               (selectedTab === "internal" && file.accessLevel === "internal");
    
    return matchesSearch && matchesCategory && matchesDepartment && matchesAccessLevel;
  });

  const stats = {
    totalFiles: files.length,
    publicFiles: files.filter(f => f.accessLevel === "public").length,
    internalFiles: files.filter(f => f.accessLevel === "internal").length,
    departments: [...new Set(files.map(f => f.department))].length,
    categories: [...new Set(files.map(f => f.category))].length,
  };

  return (
    <div className="space-y-6" onMouseMove={handleMouseMove}>
      <TiltCard className="glass-container p-6 rounded-xl" tiltMaxAngle={5} scale={1.01}>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
            <span className="breadcrumb-3d-item">Trang chủ</span>
            <ChevronRight className="h-4 w-4 breadcrumb-3d-separator" />
            <span className="text-foreground font-medium breadcrumb-3d-item">Kho dữ liệu chung</span>
          </div>
          <h1 className="text-2xl font-bold heading-3d">Kho dữ liệu chung</h1>
        </div>
      </TiltCard>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <TiltCard className="card-3d">
          <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium card-3d-title">Tổng văn bản</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold card-3d-stats flex items-center gap-2">
                <Database className="h-5 w-5 text-primary card-3d-icon" />
                {stats.totalFiles}
              </div>
            </CardContent>
          </Card>
        </TiltCard>
        
        <TiltCard className="card-3d">
          <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium card-3d-title">Văn bản công khai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold card-3d-stats">{stats.publicFiles}</div>
            </CardContent>
          </Card>
        </TiltCard>
        
        <TiltCard className="card-3d">
          <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium card-3d-title">Văn bản nội bộ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold card-3d-stats">{stats.internalFiles}</div>
            </CardContent>
          </Card>
        </TiltCard>
        
        <TiltCard className="card-3d">
          <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium card-3d-title">Đơn vị</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold card-3d-stats">{stats.departments}</div>
            </CardContent>
          </Card>
        </TiltCard>
        
        <TiltCard className="card-3d">
          <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium card-3d-title">Loại văn bản</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold card-3d-stats">{stats.categories}</div>
            </CardContent>
          </Card>
        </TiltCard>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-container p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Tìm kiếm văn bản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-[rgba(255,255,255,0.2)] hover-3d w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground icon-3d" />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="button-3d w-full sm:w-[180px]">
                <SelectValue placeholder="Loại văn bản" />
              </SelectTrigger>
              <SelectContent className="glass-container border-[rgba(255,255,255,0.2)]">
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="button-3d w-full sm:w-[180px]">
                <SelectValue placeholder="Đơn vị" />
              </SelectTrigger>
              <SelectContent className="glass-container border-[rgba(255,255,255,0.2)]">
                {departments.map(department => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button className="button-3d flex items-center gap-2 bg-primary w-full sm:w-auto">
          <Filter className="h-4 w-4 icon-3d" />
          <span>Lọc nâng cao</span>
        </Button>
      </div>

      {/* Tabs & Table */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="glass-container mb-4 p-1">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover-3d"
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger 
            value="public"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover-3d"
          >
            Văn bản công khai
          </TabsTrigger>
          <TabsTrigger 
            value="internal"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover-3d"
          >
            Văn bản nội bộ
          </TabsTrigger>
        </TabsList>
        
        <div className="table-3d rounded-xl border-[rgba(255,255,255,0.2)]">
          <Table>
            <TableHeader className="table-header-3d">
              <TableRow>
                <TableHead className="w-[40%]">Tên văn bản</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Kích thước</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Ngày cập nhật</TableHead>
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
                    <TableCell className="table-cell-3d">{file.department}</TableCell>
                    <TableCell className="table-cell-3d">{new Date(file.modifiedAt).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell className="table-cell-3d">
                      <Badge 
                        variant={file.accessLevel === "public" ? "default" : "secondary"} 
                        className="badge-3d"
                      >
                        {file.accessLevel === "public" ? "Công khai" : "Nội bộ"}
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
                    <p className="text-muted-foreground">Không tìm thấy văn bản nào phù hợp với tìm kiếm</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Tabs>

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

export default CommonStorage; 