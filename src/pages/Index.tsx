
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Activity, ChevronRight, Calendar, Search, HelpCircle, ArrowRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ChatBot from "@/components/ChatBot";
import AnimatedLayout from "@/components/AnimatedLayout";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatedLayout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 mt-8">
          <div className={`text-center space-y-6 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
              <span>Phiên bản 1.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Trợ lý ảo Dịch vụ công
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tra cứu thông tin, quản lý quy trình và tiếp cận dịch vụ công một cách hiệu quả.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/documents"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Tra cứu văn bản</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/workflows"
                className="px-6 py-3 rounded-xl border border-border font-medium hover:bg-muted transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Quy trình tự động</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-16">
          <div className={`transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <SearchBar placeholder="Tìm kiếm văn bản, thủ tục, quy trình..." />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Văn bản pháp luật", icon: FileText, color: "bg-blue-50 text-blue-500" },
                { title: "Quy trình tự động", icon: Activity, color: "bg-violet-50 text-violet-500" },
                { title: "Lịch làm việc", icon: Calendar, color: "bg-amber-50 text-amber-500" },
                { title: "Hướng dẫn", icon: HelpCircle, color: "bg-green-50 text-green-500" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-3`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <div className={`transition-all duration-1000 delay-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Dịch vụ thường dùng</h2>
              <a href="#" className="text-primary flex items-center space-x-1 font-medium hover:underline">
                <span>Xem tất cả</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Đăng ký kinh doanh",
                  description: "Hướng dẫn thủ tục đăng ký và cấp phép kinh doanh tại tỉnh Tuyên Quang",
                  icon: FileText,
                  color: "bg-blue-50 text-blue-500",
                },
                {
                  title: "Khai báo y tế",
                  description: "Thực hiện khai báo y tế và đăng ký tiêm chủng vắc-xin",
                  icon: Activity,
                  color: "bg-green-50 text-green-500",
                },
                {
                  title: "Thủ tục hành chính",
                  description: "Tra cứu và thực hiện các thủ tục hành chính trực tuyến",
                  icon: Search,
                  color: "bg-violet-50 text-violet-500",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    <span>Tìm hiểu thêm</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className={`transition-all duration-1000 delay-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Câu hỏi thường gặp</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Làm thế nào để đăng ký tài khoản dịch vụ công?",
                  answer: "Để đăng ký tài khoản dịch vụ công, bạn cần truy cập trang chủ và chọn 'Đăng ký', sau đó điền thông tin cá nhân và xác thực tài khoản qua tin nhắn hoặc email."
                },
                {
                  question: "Thời gian xử lý hồ sơ trực tuyến là bao lâu?",
                  answer: "Thời gian xử lý hồ sơ trực tuyến thường từ 3-5 ngày làm việc tùy theo loại thủ tục. Bạn có thể theo dõi trạng thái hồ sơ trong mục 'Quản lý hồ sơ' sau khi đăng nhập."
                },
                {
                  question: "Tôi cần những giấy tờ gì để thực hiện thủ tục trực tuyến?",
                  answer: "Các giấy tờ cần thiết thường bao gồm: CMND/CCCD, hộ khẩu, và các giấy tờ liên quan đến thủ tục cụ thể. Bạn có thể xem chi tiết trong phần mô tả của từng dịch vụ."
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </AnimatedLayout>
  );
};

export default Index;
