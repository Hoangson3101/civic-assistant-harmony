import { useState } from "react";
import { ChevronRight, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0912345678",
    department: "Phòng Kế hoạch - Tài chính",
    position: "Trưởng phòng",
    avatar: "/avatars/01.png"
  });

  const handleSaveProfile = () => {
    // Xử lý lưu thông tin cá nhân
    console.log("Saving profile:", profile);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Thông tin cá nhân</span>
        </div>
        <h1 className="text-2xl font-bold heading-3d">Thông tin cá nhân</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Thông tin cơ bản */}
        <Card className="md:col-span-3 card-3d glass-container">
          <CardHeader>
            <CardTitle className="hover-3d">Thông tin cơ bản</CardTitle>
            <CardDescription>
              Cập nhật thông tin cá nhân của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 avatar-3d">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute bottom-0 right-0 rounded-full button-3d"
                >
                  <Camera className="h-4 w-4 icon-3d" />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.position}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input 
                  id="name" 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="hover-3d"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="hover-3d"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input 
                  id="phone" 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="hover-3d"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Phòng ban</Label>
                <Input 
                  id="department" 
                  value={profile.department}
                  readOnly
                  className="hover-3d bg-muted"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile} className="ml-auto button-3d">
              <Save className="mr-2 h-4 w-4 icon-3d" />
              Lưu thay đổi
            </Button>
          </CardFooter>
        </Card>

        {/* Thống kê hoạt động */}
        <Card className="card-3d glass-container">
          <CardHeader>
            <CardTitle className="hover-3d">Hoạt động</CardTitle>
            <CardDescription>
              Thống kê hoạt động của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium">Văn bản đã xử lý</div>
                <div className="text-2xl font-bold">124</div>
              </div>
              <div>
                <div className="text-sm font-medium">Báo cáo đã tạo</div>
                <div className="text-2xl font-bold">45</div>
              </div>
              <div>
                <div className="text-sm font-medium">Bình luận</div>
                <div className="text-2xl font-bold">89</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserProfile; 