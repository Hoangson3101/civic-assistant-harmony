import { useState } from "react";
import { ChevronRight, Search, PlusCircle, Edit, Trash, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Dữ liệu mẫu các loại danh mục
const categoryTypes = [
  { id: "document-types", name: "Loại văn bản", items: [
    { id: "1", name: "Quyết định", description: "Quyết định từ ban lãnh đạo CDC", count: 45 },
    { id: "2", name: "Thông báo", description: "Thông báo chính thức", count: 63 },
    { id: "3", name: "Công văn", description: "Công văn đi và đến", count: 127 },
    { id: "4", name: "Hướng dẫn", description: "Tài liệu hướng dẫn quy trình", count: 18 },
    { id: "5", name: "Biên bản họp", description: "Biên bản cuộc họp nội bộ", count: 26 },
  ]},
  { id: "issuers", name: "Cơ quan ban hành", items: [
    { id: "1", name: "CDC Tuyên Quang", description: "Ban hành nội bộ CDC", count: 150 },
    { id: "2", name: "Sở Y tế", description: "Văn bản từ Sở Y tế", count: 75 },
    { id: "3", name: "Bộ Y tế", description: "Văn bản từ Bộ Y tế", count: 35 },
  ]},
  { id: "subjects", name: "Lĩnh vực", items: [
    { id: "1", name: "Y tế dự phòng", description: "Văn bản liên quan đến y tế dự phòng", count: 120 },
    { id: "2", name: "Phòng chống dịch", description: "Văn bản liên quan đến phòng chống dịch", count: 83 },
    { id: "3", name: "Nội bộ", description: "Văn bản nội bộ của CDC", count: 98 },
  ]},
  { id: "tags", name: "Nhãn đặc biệt", items: [
    { id: "1", name: "Quan trọng", description: "Văn bản cần ưu tiên xử lý", count: 25 },
    { id: "2", name: "Khẩn", description: "Văn bản cần xử lý ngay", count: 12 },
    { id: "3", name: "Mật", description: "Văn bản có tính bảo mật cao", count: 5 },
  ]},
];

const CategoryManagement = () => {
  const [activeTab, setActiveTab] = useState("document-types");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<any>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Lấy danh mục hiện tại dựa vào tab đang active
  const currentCategory = categoryTypes.find(cat => cat.id === activeTab);
  
  // Lọc và sắp xếp danh mục theo tên
  const filteredItems = currentCategory?.items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  }) || [];

  const handleAddItem = () => {
    setCurrentEditItem(null);
    setShowDialog(true);
  };

  const handleEditItem = (item: any) => {
    setCurrentEditItem(item);
    setShowDialog(true);
  };

  const handleSaveItem = () => {
    // Xử lý lưu hoặc cập nhật mục
    setShowDialog(false);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb và tiêu đề */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Quản trị</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Quản lý danh mục</span>
        </div>
        <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
      </div>

      <Tabs defaultValue="document-types" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          {categoryTypes.map(category => (
            <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
          ))}
        </TabsList>
        
        {categoryTypes.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            {/* Công cụ tìm kiếm và thêm mới */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative max-w-md">
                <Input
                  placeholder={`Tìm kiếm ${category.name.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              <Button onClick={handleAddItem} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Thêm {category.name.toLowerCase()}</span>
              </Button>
            </div>

            {/* Bảng danh sách các mục */}
            <div className="rounded-md border">
              <Table>
                <TableCaption>Danh sách {category.name.toLowerCase()} ({filteredItems.length})</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead className="cursor-pointer" onClick={toggleSortDirection}>
                      <div className="flex items-center space-x-2">
                        <span>Tên</span>
                        {sortDirection === 'asc' ? (
                          <SortAsc className="h-4 w-4" />
                        ) : (
                          <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead className="text-center">Số văn bản</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{item.count}</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                        Không tìm thấy {category.name.toLowerCase()} nào phù hợp với tìm kiếm.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Form thêm/sửa danh mục */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditItem 
                ? `Chỉnh sửa ${currentCategory?.name.toLowerCase() || "danh mục"}` 
                : `Thêm ${currentCategory?.name.toLowerCase() || "danh mục"} mới`}
            </DialogTitle>
            <DialogDescription>
              {currentEditItem 
                ? `Cập nhật thông tin ${currentCategory?.name.toLowerCase() || "danh mục"} trong hệ thống.` 
                : `Thêm ${currentCategory?.name.toLowerCase() || "danh mục"} mới vào hệ thống.`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Tên</Label>
              <Input 
                id="name" 
                className="col-span-3" 
                defaultValue={currentEditItem?.name || ''}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Mô tả</Label>
              <Textarea 
                id="description" 
                className="col-span-3" 
                rows={3}
                defaultValue={currentEditItem?.description || ''}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Hủy</Button>
            <Button onClick={handleSaveItem}>{currentEditItem ? 'Cập nhật' : 'Thêm mới'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement; 