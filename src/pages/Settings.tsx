import { useState } from "react";
import { ChevronRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      desktop: false,
      sound: true
    },
    privacy: {
      showOnline: true,
      showActivity: true,
      allowMessages: true
    },
    appearance: {
      theme: "system",
      fontSize: "medium",
      reduceMotion: false
    }
  });

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground breadcrumb-3d">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Cài đặt</span>
        </div>
        <h1 className="text-2xl font-bold heading-3d">Cài đặt</h1>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="notifications" className="hover-3d">Thông báo</TabsTrigger>
          <TabsTrigger value="privacy" className="hover-3d">Quyền riêng tư</TabsTrigger>
          <TabsTrigger value="appearance" className="hover-3d">Giao diện</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="card-3d glass-container">
            <CardHeader>
              <CardTitle className="hover-3d">Cài đặt thông báo</CardTitle>
              <CardDescription>
                Tùy chỉnh cách bạn nhận thông báo từ hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo qua email</Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo qua email
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo đẩy</Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo trên trình duyệt
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo máy tính</Label>
                  <p className="text-sm text-muted-foreground">
                    Hiển thị thông báo trên màn hình
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.desktop}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'desktop', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Âm thanh thông báo</Label>
                  <p className="text-sm text-muted-foreground">
                    Phát âm thanh khi có thông báo mới
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.sound}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'sound', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="card-3d glass-container">
            <CardHeader>
              <CardTitle className="hover-3d">Cài đặt quyền riêng tư</CardTitle>
              <CardDescription>
                Quản lý thông tin hiển thị với người dùng khác
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hiển thị trạng thái</Label>
                  <p className="text-sm text-muted-foreground">
                    Cho phép người khác thấy khi bạn đang online
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showOnline}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'showOnline', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hiển thị hoạt động</Label>
                  <p className="text-sm text-muted-foreground">
                    Cho phép người khác thấy hoạt động gần đây của bạn
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showActivity}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'showActivity', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cho phép nhắn tin</Label>
                  <p className="text-sm text-muted-foreground">
                    Cho phép người khác gửi tin nhắn cho bạn
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.allowMessages}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'allowMessages', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="card-3d glass-container">
            <CardHeader>
              <CardTitle className="hover-3d">Cài đặt giao diện</CardTitle>
              <CardDescription>
                Tùy chỉnh giao diện người dùng
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Giảm hiệu ứng chuyển động</Label>
                  <p className="text-sm text-muted-foreground">
                    Tắt các hiệu ứng chuyển động không cần thiết
                  </p>
                </div>
                <Switch
                  checked={settings.appearance.reduceMotion}
                  onCheckedChange={(checked) => handleSettingChange('appearance', 'reduceMotion', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Settings; 