import { useState } from "react";
import { ChevronRight, Search, Plus, Minus, ExternalLink, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dữ liệu mẫu FAQ
const faqs = [
  {
    id: "1",
    question: "Làm thế nào để tạo văn bản mới?",
    answer: "Để tạo văn bản mới, bạn nhấp vào nút \"Tạo văn bản\" ở góc trên bên phải của màn hình Văn bản đi. Sau đó, điền các thông tin cần thiết vào form và chọn \"Lưu\" hoặc \"Phát hành\" tùy vào nhu cầu.",
    category: "documents"
  },
  {
    id: "2",
    question: "Làm thế nào để tìm kiếm văn bản?",
    answer: "Để tìm kiếm văn bản, bạn có thể sử dụng thanh tìm kiếm ở đầu mỗi trang. Nhập từ khóa liên quan đến văn bản cần tìm. Bạn cũng có thể sử dụng tính năng tìm kiếm nâng cao để lọc theo ngày, loại văn bản, người tạo, v.v.",
    category: "documents"
  },
  {
    id: "3",
    question: "Làm thế nào để thêm người dùng mới?",
    answer: "Để thêm người dùng mới, truy cập vào mục Quản trị > Quản lý người dùng. Nhấp vào nút \"Thêm người dùng\" và điền đầy đủ thông tin cần thiết. Sau đó chọn vai trò phù hợp và nhấp \"Lưu\" để hoàn tất.",
    category: "users"
  },
  {
    id: "4",
    question: "Làm thế nào để đặt lại mật khẩu?",
    answer: "Nếu bạn quên mật khẩu, có thể nhấp vào liên kết \"Quên mật khẩu\" trên trang đăng nhập. Nếu bạn là quản trị viên và muốn đặt lại mật khẩu cho người dùng khác, hãy vào mục Quản lý người dùng, tìm tài khoản cần đặt lại và chọn tùy chọn đặt lại mật khẩu.",
    category: "users"
  },
  {
    id: "5",
    question: "Làm thế nào để cấu hình thông báo?",
    answer: "Để cấu hình thông báo, vào mục Quản trị > Cài đặt > Thông báo. Tại đây bạn có thể bật/tắt các loại thông báo khác nhau, bao gồm thông báo qua email, thông báo hệ thống, và cài đặt tần suất nhận thông báo.",
    category: "settings"
  },
  {
    id: "6",
    question: "Hệ thống hỗ trợ những loại văn bản nào?",
    answer: "Hệ thống hỗ trợ nhiều loại văn bản khác nhau như công văn, quyết định, thông báo, báo cáo, kế hoạch, và nhiều loại khác. Quản trị viên có thể thêm hoặc chỉnh sửa các loại văn bản trong phần Quản lý danh mục.",
    category: "documents"
  },
];

// Dữ liệu mẫu hướng dẫn sử dụng
const userGuides = [
  {
    id: "1",
    title: "Hướng dẫn sử dụng cơ bản",
    description: "Tổng quan về các tính năng và cách sử dụng hệ thống",
    link: "/docs/basic-guide.pdf"
  },
  {
    id: "2",
    title: "Quản lý văn bản",
    description: "Hướng dẫn chi tiết về cách tạo, phê duyệt và quản lý văn bản",
    link: "/docs/document-management.pdf"
  },
  {
    id: "3",
    title: "Hướng dẫn cho quản trị viên",
    description: "Quản lý người dùng, phân quyền và cài đặt hệ thống",
    link: "/docs/admin-guide.pdf"
  },
  {
    id: "4",
    title: "Xử lý công việc và luồng quy trình",
    description: "Xử lý công việc được giao và quy trình phê duyệt",
    link: "/docs/workflow-guide.pdf"
  },
];

// Dữ liệu mẫu video
const videoTutorials = [
  {
    id: "1",
    title: "Giới thiệu tổng quan hệ thống",
    duration: "5:23",
    thumbnail: "/images/tutorials/overview.jpg",
    link: "https://example.com/videos/system-overview"
  },
  {
    id: "2",
    title: "Hướng dẫn tạo và phát hành văn bản",
    duration: "8:45",
    thumbnail: "/images/tutorials/create-document.jpg",
    link: "https://example.com/videos/document-creation"
  },
  {
    id: "3",
    title: "Quản lý người dùng và phân quyền",
    duration: "7:12",
    thumbnail: "/images/tutorials/user-management.jpg",
    link: "https://example.com/videos/user-management"
  },
  {
    id: "4",
    title: "Cấu hình thông báo và cài đặt cá nhân",
    duration: "4:58",
    thumbnail: "/images/tutorials/notifications.jpg",
    link: "https://example.com/videos/notification-settings"
  },
];

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  
  // Lọc FAQ theo tìm kiếm
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Lọc hướng dẫn theo tìm kiếm
  const filteredGuides = userGuides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Lọc video theo tìm kiếm
  const filteredVideos = videoTutorials.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb và tiêu đề */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Trang chủ</span>
          <ChevronRight className="h-4 w-4" />
          <span>Quản trị</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Trợ giúp</span>
        </div>
        <h1 className="text-2xl font-bold">Trung tâm trợ giúp</h1>
      </div>

      {/* Tìm kiếm */}
      <div className="relative max-w-xl mx-auto">
        <Input
          placeholder="Tìm kiếm câu hỏi, hướng dẫn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="faq">Câu hỏi thường gặp</TabsTrigger>
          <TabsTrigger value="guides">Hướng dẫn sử dụng</TabsTrigger>
          <TabsTrigger value="videos">Video hướng dẫn</TabsTrigger>
        </TabsList>

        {/* Tab câu hỏi thường gặp */}
        <TabsContent value="faq" className="mt-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start">
                        <HelpCircle className="h-5 w-5 mr-2 shrink-0 text-primary" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Không tìm thấy câu hỏi phù hợp với tìm kiếm của bạn.
              </div>
            )}
            
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-medium">Không tìm thấy câu trả lời cho câu hỏi của bạn?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Vui lòng liên hệ với bộ phận hỗ trợ kỹ thuật qua email <a href="mailto:support@cdcvn.gov.vn" className="text-primary underline">support@cdcvn.gov.vn</a> hoặc số điện thoại <a href="tel:+84123456789" className="text-primary">0123 456 789</a>.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Tab hướng dẫn sử dụng */}
        <TabsContent value="guides" className="mt-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Tài liệu hướng dẫn sử dụng</h2>
            {filteredGuides.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredGuides.map((guide) => (
                  <Card key={guide.id}>
                    <CardHeader>
                      <CardTitle>{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" className="w-full flex items-center gap-2" asChild>
                        <a href={guide.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span>Xem tài liệu</span>
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Không tìm thấy tài liệu hướng dẫn phù hợp với tìm kiếm của bạn.
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab video hướng dẫn */}
        <TabsContent value="videos" className="mt-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Video hướng dẫn</h2>
            {filteredVideos.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="overflow-hidden rounded-lg border bg-card">
                    <div className="relative aspect-video bg-muted">
                      <img 
                        src={video.thumbnail || "https://placehold.co/640x360?text=Thumbnail"} 
                        alt={video.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                      <Button variant="ghost" size="sm" className="mt-2 flex items-center gap-2" asChild>
                        <a href={video.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span>Xem video</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Không tìm thấy video hướng dẫn phù hợp với tìm kiếm của bạn.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help; 