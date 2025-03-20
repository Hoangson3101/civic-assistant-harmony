
import { useState } from "react";
import { Filter, PlusCircle, ArrowUpDown, Clock, CheckCircle, BarChart } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import WorkflowCard from "@/components/WorkflowCard";
import ChatBot from "@/components/ChatBot";
import AnimatedLayout from "@/components/AnimatedLayout";

const Workflows = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"all" | "pending" | "inProgress" | "completed" | "delayed">("all");

  // Sample workflows data
  const workflows = [
    {
      id: 1,
      title: "Báo cáo dịch tễ hàng tháng",
      description: "Tổng hợp số liệu giám sát dịch tễ và gửi báo cáo cho Bộ Y tế theo định kỳ hàng tháng.",
      status: "completed" as const,
      progress: 100,
      department: "Phòng Dịch tễ",
      assignee: "Nguyễn Văn A",
      dueDate: "15/06/2023",
    },
    {
      id: 2,
      title: "Quy trình mua sắm trang thiết bị y tế",
      description: "Xử lý yêu cầu mua sắm trang thiết bị phục vụ hoạt động khám chữa bệnh và phòng dịch.",
      status: "inProgress" as const,
      progress: 60,
      department: "Phòng TCKT",
      assignee: "Trần Thị B",
      dueDate: "30/07/2023",
    },
    {
      id: 3,
      title: "Phê duyệt kế hoạch phòng chống dịch",
      description: "Xây dựng và phê duyệt kế hoạch phòng chống dịch bệnh truyền nhiễm năm 2023.",
      status: "pending" as const,
      progress: 30,
      department: "Ban Giám đốc",
      assignee: "Lê Văn C",
      dueDate: "01/08/2023",
    },
    {
      id: 4,
      title: "Báo cáo kiểm kê thuốc và vật tư",
      description: "Thực hiện kiểm kê thuốc, vật tư y tế tại các kho và báo cáo kết quả theo quy định.",
      status: "delayed" as const,
      progress: 45,
      department: "Phòng Dược",
      assignee: "Phạm Thị D",
      dueDate: "10/06/2023",
    },
    {
      id: 5,
      title: "Xử lý và phê duyệt đơn xin nghỉ phép",
      description: "Quy trình xử lý và phê duyệt đơn xin nghỉ phép của nhân viên y tế.",
      status: "completed" as const,
      progress: 100,
      department: "Phòng Tổ chức",
      assignee: "Hoàng Văn E",
      dueDate: "05/07/2023",
    },
    {
      id: 6,
      title: "Thanh toán chi phí hoạt động quý 2",
      description: "Tổng hợp và thanh toán các khoản chi phí hoạt động trong quý 2 năm 2023.",
      status: "inProgress" as const,
      progress: 75,
      department: "Phòng TCKT",
      assignee: "Đỗ Thị F",
      dueDate: "15/07/2023",
    },
    {
      id: 7,
      title: "Cập nhật cơ sở dữ liệu bệnh nhân",
      description: "Thực hiện rà soát và cập nhật thông tin bệnh nhân trong hệ thống quản lý.",
      status: "pending" as const,
      progress: 15,
      department: "Phòng CNTT",
      assignee: "Ngô Văn G",
      dueDate: "30/07/2023",
    },
    {
      id: 8,
      title: "Đánh giá chất lượng phòng xét nghiệm",
      description: "Đánh giá định kỳ chất lượng hoạt động của phòng xét nghiệm theo tiêu chuẩn ISO.",
      status: "delayed" as const,
      progress: 50,
      department: "Phòng QLCL",
      assignee: "Trịnh Văn H",
      dueDate: "01/07/2023",
    },
  ];

  const filteredWorkflows = workflows
    .filter((workflow) =>
      workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((workflow) => view === "all" || workflow.status === view);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleWorkflowClick = (id: number) => {
    console.log(`Workflow clicked: ${id}`);
    // Navigate to workflow detail page or show modal
  };

  // Stats
  const stats = [
    {
      title: "Tổng quy trình",
      value: workflows.length,
      icon: BarChart,
      color: "bg-blue-50 text-blue-500",
    },
    {
      title: "Đang xử lý",
      value: workflows.filter((w) => w.status === "inProgress").length,
      icon: Clock,
      color: "bg-amber-50 text-amber-500",
    },
    {
      title: "Hoàn thành",
      value: workflows.filter((w) => w.status === "completed").length,
      icon: CheckCircle,
      color: "bg-green-50 text-green-500",
    },
  ];

  return (
    <AnimatedLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Quản lý Quy trình tự động</h1>
          <p className="text-muted-foreground mt-2">
            Theo dõi và quản lý các quy trình tự động hóa báo cáo và thủ tục hành chính
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <SearchBar 
            placeholder="Tìm kiếm quy trình, người phụ trách..." 
            onSearch={handleSearch} 
          />
          
          <div className="flex justify-between mt-4">
            <div className="flex space-x-2">
              {[
                { id: "all", label: "Tất cả" },
                { id: "pending", label: "Chờ xử lý" },
                { id: "inProgress", label: "Đang xử lý" },
                { id: "completed", label: "Hoàn thành" },
                { id: "delayed", label: "Chậm tiến độ" },
              ].map((status) => (
                <button
                  key={status.id}
                  onClick={() => setView(status.id as any)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    view === status.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button className="px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center space-x-1">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Lọc</span>
              </button>
              <button className="px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center space-x-1">
                <ArrowUpDown className="h-4 w-4" />
                <span className="text-sm">Sắp xếp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add new workflow button */}
        <div className="mb-8">
          <button className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>Tạo quy trình mới</span>
          </button>
        </div>

        {/* Workflows grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {filteredWorkflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              title={workflow.title}
              description={workflow.description}
              status={workflow.status}
              progress={workflow.progress}
              department={workflow.department}
              assignee={workflow.assignee}
              dueDate={workflow.dueDate}
              onClick={() => handleWorkflowClick(workflow.id)}
            />
          ))}
        </div>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </AnimatedLayout>
  );
};

export default Workflows;
