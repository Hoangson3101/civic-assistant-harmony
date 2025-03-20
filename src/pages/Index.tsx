import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Activity, ChevronRight, Calendar, Search, HelpCircle, ArrowRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import AnimatedLayout from "@/components/AnimatedLayout";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatedLayout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16">
          <div className={`text-center space-y-6 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2 animate-pulse">
              <span>Phiên bản 1.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent animate-gradient-x">
              Trợ lý ảo Dịch vụ công
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tra cứu thông tin, quản lý quy trình và tiếp cận dịch vụ công một cách hiệu quả.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/legal"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-md active:scale-95"
              >
                <span>Tra cứu văn bản</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/workflows"
                className="group px-6 py-3 rounded-xl border border-border font-medium hover:bg-muted transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-md hover:border-primary/30 active:scale-95"
              >
                <span>Quy trình tự động</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
                { title: "Văn bản pháp luật", icon: FileText, color: "bg-blue-50 text-blue-500", link: "/legal" },
                { title: "Quy trình tự động", icon: Activity, color: "bg-violet-50 text-violet-500", link: "/workflows" },
                { title: "Kho lưu trữ", icon: Calendar, color: "bg-amber-50 text-amber-500", link: "/storage" },
                { title: "Hướng dẫn", icon: HelpCircle, color: "bg-green-50 text-green-500", link: "/" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group p-4 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center hover:bg-muted/30 hover:scale-105 hover:shadow-md active:scale-95"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon className="h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                </Link>
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
              <a href="#" className="group text-primary flex items-center space-x-1 font-medium hover:underline transition-all duration-300 hover:scale-105">
                <span>Xem tất cả</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
                  className="group p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:bg-muted/20 hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <service.icon className="h-6 w-6 transition-all duration-300 group-hover:rotate-12" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 transition-all duration-300 group-hover:text-foreground">
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-primary font-medium hover:underline transition-all duration-300 group-hover:translate-x-1"
                  >
                    <span>Tìm hiểu thêm</span>
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
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
                  className="group p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:bg-muted/20 hover:scale-[1.02] hover:shadow-md"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{item.question}</h3>
                  <p className="text-muted-foreground transition-all duration-300 group-hover:text-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AnimatedLayout>
  );
};

export default Index;
