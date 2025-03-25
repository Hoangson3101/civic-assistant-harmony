import { useState } from "react";
import { Search, UserPlus, MoreVertical, Mail, Phone, UserMinus, UserCog } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const MockMembers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    avatar: "/avatars/01.png",
    email: "nguyenvana@example.com",
    phone: "0912345678",
    role: "Trưởng phòng",
    joinedAt: "2022-01-15T08:00:00Z",
    status: "active"
  },
  {
    id: "2",
    name: "Trần Thị B",
    avatar: "/avatars/02.png",
    email: "tranthib@example.com",
    phone: "0923456789",
    role: "Phó phòng",
    joinedAt: "2022-02-20T09:30:00Z",
    status: "active"
  },
  {
    id: "3",
    name: "Lê Văn C",
    avatar: "/avatars/03.png",
    email: "levanc@example.com",
    phone: "0934567890",
    role: "Chuyên viên",
    joinedAt: "2022-03-10T10:15:00Z",
    status: "active"
  },
  {
    id: "4",
    name: "Phạm Thị D",
    avatar: "/avatars/04.png",
    email: "phamthid@example.com",
    phone: "0945678901",
    role: "Chuyên viên",
    joinedAt: "2022-04-05T11:00:00Z",
    status: "inactive"
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    avatar: "/avatars/05.png",
    email: "hoangvane@example.com",
    phone: "0956789012",
    role: "Chuyên viên",
    joinedAt: "2022-05-15T09:45:00Z",
    status: "active"
  }
];

const roles = [
  { id: "all", name: "Tất cả" },
  { id: "manager", name: "Trưởng phòng" },
  { id: "deputy", name: "Phó phòng" },
  { id: "specialist", name: "Chuyên viên" }
];

const statuses = [
  { id: "all", name: "Tất cả" },
  { id: "active", name: "Hoạt động" },
  { id: "inactive", name: "Không hoạt động" }
];

const DepartmentMembers = () => {
  const department = useOutletContext<Department>();
  const [members] = useState(MockMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    
    const matchesRole = 
      selectedRole === "all" || 
      (selectedRole === "manager" && member.role === "Trưởng phòng") ||
      (selectedRole === "deputy" && member.role === "Phó phòng") || 
      (selectedRole === "specialist" && member.role === "Chuyên viên");
    
    const matchesStatus = selectedStatus === "all" || member.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-container p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Tìm kiếm thành viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-[rgba(255,255,255,0.2)] hover-3d w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground icon-3d" />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="button-3d w-full sm:w-[180px]">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent className="glass-container border-[rgba(255,255,255,0.2)]">
                {roles.map(role => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
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
          <UserPlus className="h-4 w-4 icon-3d" />
          <span>Thêm thành viên</span>
        </Button>
      </div>

      {/* Members Table */}
      <div className="table-3d rounded-xl border-[rgba(255,255,255,0.2)]">
        <Table>
          <TableHeader className="table-header-3d">
            <TableRow>
              <TableHead className="w-[30%]">Thành viên</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow key={member.id} className="table-row-3d">
                  <TableCell className="font-medium table-cell-3d">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 avatar-3d">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="hover-3d">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="table-cell-3d">
                    <Badge variant="outline" className="badge-3d">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="table-cell-3d">{member.email}</TableCell>
                  <TableCell className="table-cell-3d">{member.phone}</TableCell>
                  <TableCell className="table-cell-3d">{new Date(member.joinedAt).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell className="table-cell-3d">
                    <Badge 
                      variant={member.status === "active" ? "default" : "secondary"} 
                      className="badge-3d"
                    >
                      {member.status === "active" ? "Hoạt động" : "Không hoạt động"}
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
                          <Mail className="h-4 w-4 mr-2 icon-3d" />
                          Gửi email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover-3d">
                          <Phone className="h-4 w-4 mr-2 icon-3d" />
                          Gọi điện
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover-3d">
                          <UserCog className="h-4 w-4 mr-2 icon-3d" />
                          Chỉnh sửa vai trò
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover-3d">
                          <UserMinus className="h-4 w-4 mr-2 icon-3d" />
                          Xóa khỏi phòng ban
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <p className="text-muted-foreground">Không tìm thấy thành viên nào</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentMembers; 