import { useState } from "react";
import { ChevronRight, Search, PlusCircle, Edit, Trash, CheckCircle, XCircle } from "lucide-react";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dữ liệu mẫu người dùng
const users = [
  { id: "1", name: "Nguyễn Văn A", email: "nguyenvana@cdc-tq.vn", department: "Kế hoạch tài chính", role: "admin", status: "active" },
  { id: "2", name: "Trần Thị B", email: "tranthib@cdc-tq.vn", department: "Y tế dự phòng", role: "manager", status: "active" },
  { id: "3", name: "Lê Văn C", email: "levanc@cdc-tq.vn", department: "Tổ chức hành chính", role: "member", status: "inactive" },
  { id: "4", name: "Phạm Thị D", email: "phamthid@cdc-tq.vn", department: "Y tế dự phòng", role: "manager", status: "active" },
  { id: "5", name: "Hoàng Văn E", email: "hoangvane@cdc-tq.vn", department: "Truyền thông", role: "member", status: "active" },
];

// Dữ liệu mẫu phòng ban
const departments = [
  { id: "1", name: "Y tế dự phòng" },
  { id: "2", name: "Tổ chức hành chính" },
  { id: "3", name: "Kế hoạch tài chính" },
  { id: "4", name: "Truyền thông" },
];

// Dữ liệu mẫu vai trò
const roles = [
  { id: "admin", name: "Quản trị viên" },
  { id: "manager", name: "Quản lý phòng" },
  { id: "member", name: "Thành viên" },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState<any>(null);

  // Lọc người dùng theo điều kiện tìm kiếm
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment ? user.department === filterDepartment : true;
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesStatus = filterStatus ? user.status === filterStatus : true;
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    setCurrentEditUser(null);
    setShowDialog(true);
  };

  const handleEditUser = (user: any) => {
    setCurrentEditUser(user);
    setShowDialog(true);
  };

  const handleSaveUser = () => {
    // Xử lý lưu hoặc cập nhật người dùng
    setShowDialog(false);
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
          <span className="text-foreground font-medium">Quản lý người dùng</span>
        </div>
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Danh sách người dùng</TabsTrigger>
          <TabsTrigger value="permissions">Phân quyền</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          {/* Công cụ tìm kiếm và lọc */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center flex-1">
              <div className="relative flex-1">
                <Input
                  placeholder="Tìm kiếm theo tên, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả phòng ban</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả vai trò</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Đã vô hiệu hóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleAddUser} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Thêm người dùng</span>
            </Button>
          </div>

          {/* Bảng danh sách người dùng */}
          <div className="rounded-md border">
            <Table>
              <TableCaption>Danh sách người dùng trong hệ thống</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'manager' ? 'default' : 'secondary'}>
                        {user.role === 'admin' ? 'Quản trị viên' : user.role === 'manager' ? 'Quản lý phòng' : 'Thành viên'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'success' : 'outline'}>
                        {user.status === 'active' ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Cấu hình phân quyền hệ thống</h2>
            <Button>Lưu cấu hình</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Chức năng</TableHead>
                  <TableHead className="text-center">Quản trị viên</TableHead>
                  <TableHead className="text-center">Quản lý phòng</TableHead>
                  <TableHead className="text-center">Thành viên</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Quản lý văn bản</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><XCircle className="h-5 w-5 text-red-600 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Quản lý danh mục</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><XCircle className="h-5 w-5 text-red-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><XCircle className="h-5 w-5 text-red-600 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Quản lý người dùng</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><XCircle className="h-5 w-5 text-red-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><XCircle className="h-5 w-5 text-red-600 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Xem báo cáo thống kê</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><XCircle className="h-5 w-5 text-red-600 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Quản lý quy trình</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-green-600 mx-auto" /></TableCell>
                  <TableCell className="text-center"><XCircle className="h-5 w-5 text-red-600 mx-auto" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Form thêm/sửa người dùng */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentEditUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</DialogTitle>
            <DialogDescription>
              {currentEditUser 
                ? 'Cập nhật thông tin người dùng trong hệ thống.' 
                : 'Thêm người dùng mới vào hệ thống. Hệ thống sẽ gửi email kích hoạt tài khoản cho người dùng.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Họ và tên</Label>
              <Input 
                id="name" 
                className="col-span-3" 
                defaultValue={currentEditUser?.name || ''}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input 
                id="email" 
                type="email" 
                className="col-span-3" 
                defaultValue={currentEditUser?.email || ''}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Phòng ban</Label>
              <Select defaultValue={currentEditUser?.department || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Vai trò</Label>
              <Select defaultValue={currentEditUser?.role || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Trạng thái</Label>
              <Select defaultValue={currentEditUser?.status || 'active'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Vô hiệu hóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Hủy</Button>
            <Button onClick={handleSaveUser}>{currentEditUser ? 'Cập nhật' : 'Thêm mới'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement; 