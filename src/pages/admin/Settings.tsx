import { useState } from "react";
import { ChevronRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // Cài đặt mẫu
  const [settings, setSettings] = useState({
    general: {
      siteName: "Hệ thống Quản lý Văn bản CDC",
      description: "Hệ thống quản lý văn bản điện tử và điều hành tác nghiệp",
      contactEmail: "admin@cdcvn.gov.vn",
      logoUrl: "/images/logo.png",
      enablePublicPortal: true
    },
    security: {
      passwordPolicy: "medium", // basic, medium, strong
      sessionTimeout: 30, // phút
      loginAttempts: 5,
      twoFactorAuth: false,
      ipRestriction: false,
      allowedIPs: ""
    },
    notifications: {
      emailNotifications: true,
      systemNotifications: true,
      notifyOnLogin: true,
      notifyOnDocumentReceived: true,
      dailyDigest: false
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily", // daily, weekly, monthly
      backupTime: "02:00",
      retentionPeriod: 30, // ngày
      backupLocation: "local" // local, cloud
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Xử lý lưu cài đặt vào database hoặc file cấu hình
    console.log("Saving settings:", settings);
    // Hiển thị thông báo thành công
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
          <span className="text-foreground font-medium">Cài đặt hệ thống</span>
        </div>
        <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-4">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="backup">Sao lưu & Phục hồi</TabsTrigger>
        </TabsList>

        {/* Tab Cài đặt chung */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
              <CardDescription>
                Cấu hình thông tin cơ bản của hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Tên hệ thống</Label>
                  <Input 
                    id="siteName" 
                    value={settings.general.siteName}
                    onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email liên hệ</Label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea 
                    id="description" 
                    value={settings.general.description}
                    onChange={(e) => handleSettingChange('general', 'description', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">URL Logo</Label>
                  <Input 
                    id="logoUrl" 
                    value={settings.general.logoUrl}
                    onChange={(e) => handleSettingChange('general', 'logoUrl', e.target.value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enablePublicPortal">Cổng thông tin công khai</Label>
                    <div className="text-sm text-muted-foreground">
                      Cho phép xem văn bản công khai không cần đăng nhập
                    </div>
                  </div>
                  <Switch
                    id="enablePublicPortal"
                    checked={settings.general.enablePublicPortal}
                    onCheckedChange={(checked) => handleSettingChange('general', 'enablePublicPortal', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab Cài đặt bảo mật */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bảo mật</CardTitle>
              <CardDescription>
                Cấu hình các chính sách bảo mật và đăng nhập
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Chính sách mật khẩu</Label>
                  <Select 
                    value={settings.security.passwordPolicy}
                    onValueChange={(value) => handleSettingChange('security', 'passwordPolicy', value)}
                  >
                    <SelectTrigger id="passwordPolicy">
                      <SelectValue placeholder="Chọn mức độ bảo mật" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Cơ bản (ít nhất 8 ký tự)</SelectItem>
                      <SelectItem value="medium">Trung bình (chữ hoa, chữ thường, số)</SelectItem>
                      <SelectItem value="strong">Mạnh (bao gồm ký tự đặc biệt, >12 ký tự)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Thời gian hết phiên (phút)</Label>
                  <Input 
                    id="sessionTimeout" 
                    type="number"
                    min="5"
                    max="120"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Số lần đăng nhập thất bại tối đa</Label>
                  <Input 
                    id="loginAttempts" 
                    type="number"
                    min="3"
                    max="10"
                    value={settings.security.loginAttempts}
                    onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactorAuth">Xác thực hai yếu tố</Label>
                    <div className="text-sm text-muted-foreground">
                      Yêu cầu mã OTP khi đăng nhập
                    </div>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorAuth', checked)}
                  />
                </div>
                
                <div className="md:col-span-2 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ipRestriction">Giới hạn địa chỉ IP</Label>
                    <div className="text-sm text-muted-foreground">
                      Chỉ cho phép đăng nhập từ các địa chỉ IP cụ thể
                    </div>
                  </div>
                  <Switch
                    id="ipRestriction"
                    checked={settings.security.ipRestriction}
                    onCheckedChange={(checked) => handleSettingChange('security', 'ipRestriction', checked)}
                  />
                </div>
                
                {settings.security.ipRestriction && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="allowedIPs">Danh sách IP cho phép (mỗi IP trên một dòng)</Label>
                    <Textarea 
                      id="allowedIPs" 
                      placeholder="192.168.1.1&#10;10.0.0.1"
                      value={settings.security.allowedIPs}
                      onChange={(e) => handleSettingChange('security', 'allowedIPs', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab Cài đặt thông báo */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>
                Cấu hình thông báo hệ thống và email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Thông báo qua email</Label>
                    <div className="text-sm text-muted-foreground">
                      Gửi email thông báo khi có sự kiện mới
                    </div>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="systemNotifications">Thông báo hệ thống</Label>
                    <div className="text-sm text-muted-foreground">
                      Hiển thị thông báo trong ứng dụng
                    </div>
                  </div>
                  <Switch
                    id="systemNotifications"
                    checked={settings.notifications.systemNotifications}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'systemNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOnLogin">Thông báo khi đăng nhập</Label>
                    <div className="text-sm text-muted-foreground">
                      Gửi thông báo khi có đăng nhập mới vào tài khoản
                    </div>
                  </div>
                  <Switch
                    id="notifyOnLogin"
                    checked={settings.notifications.notifyOnLogin}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'notifyOnLogin', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOnDocumentReceived">Thông báo văn bản mới</Label>
                    <div className="text-sm text-muted-foreground">
                      Gửi thông báo khi nhận được văn bản mới
                    </div>
                  </div>
                  <Switch
                    id="notifyOnDocumentReceived"
                    checked={settings.notifications.notifyOnDocumentReceived}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'notifyOnDocumentReceived', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dailyDigest">Tóm tắt hàng ngày</Label>
                    <div className="text-sm text-muted-foreground">
                      Gửi email tóm tắt các sự kiện trong ngày
                    </div>
                  </div>
                  <Switch
                    id="dailyDigest"
                    checked={settings.notifications.dailyDigest}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'dailyDigest', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab Cài đặt sao lưu */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sao lưu & Phục hồi</CardTitle>
              <CardDescription>
                Cấu hình sao lưu dữ liệu tự động
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBackup">Sao lưu tự động</Label>
                    <div className="text-sm text-muted-foreground">
                      Tự động sao lưu dữ liệu theo lịch trình
                    </div>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={settings.backup.autoBackup}
                    onCheckedChange={(checked) => handleSettingChange('backup', 'autoBackup', checked)}
                  />
                </div>
                
                {settings.backup.autoBackup && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="backupFrequency">Tần suất sao lưu</Label>
                      <Select 
                        value={settings.backup.backupFrequency}
                        onValueChange={(value) => handleSettingChange('backup', 'backupFrequency', value)}
                      >
                        <SelectTrigger id="backupFrequency">
                          <SelectValue placeholder="Chọn tần suất" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Hàng ngày</SelectItem>
                          <SelectItem value="weekly">Hàng tuần</SelectItem>
                          <SelectItem value="monthly">Hàng tháng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backupTime">Thời điểm sao lưu</Label>
                      <Input 
                        id="backupTime" 
                        type="time"
                        value={settings.backup.backupTime}
                        onChange={(e) => handleSettingChange('backup', 'backupTime', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="retentionPeriod">Thời gian lưu trữ (ngày)</Label>
                      <Input 
                        id="retentionPeriod" 
                        type="number"
                        min="7"
                        max="365"
                        value={settings.backup.retentionPeriod}
                        onChange={(e) => handleSettingChange('backup', 'retentionPeriod', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backupLocation">Vị trí lưu trữ</Label>
                      <Select 
                        value={settings.backup.backupLocation}
                        onValueChange={(value) => handleSettingChange('backup', 'backupLocation', value)}
                      >
                        <SelectTrigger id="backupLocation">
                          <SelectValue placeholder="Chọn vị trí lưu trữ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Máy chủ cục bộ</SelectItem>
                          <SelectItem value="cloud">Lưu trữ đám mây</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button variant="outline">
                  Sao lưu ngay
                </Button>
                <Button variant="outline">
                  Khôi phục từ tệp
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings; 