import { useState } from "react";
import { 
  FolderIcon, 
  FileIcon, 
  FilePlus, 
  FolderPlus, 
  Search, 
  Grid, 
  List, 
  Download, 
  Share2, 
  Edit, 
  MoreHorizontal, 
  Star, 
  Clock, 
  Users, 
  File, 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet,
  ArrowUpRight,
  SlidersHorizontal,
  Eye,
  FileArchive
} from "lucide-react";
import AnimatedCard from "./AnimatedCard";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  fileType?: "pdf" | "doc" | "img" | "xls" | "zip" | "other";
  size?: string;
  modifiedDate: Date;
  modifiedBy: string;
  starred?: boolean;
  thumbnail?: string;
}

const FileStorageInterface = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentFolder, setCurrentFolder] = useState("Tài liệu chung");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  const breadcrumbs = ["Trang chủ", currentFolder];

  const files: FileItem[] = [
    {
      id: "1",
      name: "Tài liệu nội bộ",
      type: "folder",
      modifiedDate: new Date("2023-06-10"),
      modifiedBy: "Nguyễn Văn A",
    },
    {
      id: "2",
      name: "Văn bản pháp luật",
      type: "folder",
      modifiedDate: new Date("2023-07-15"),
      modifiedBy: "Trần Thị B",
    },
    {
      id: "3",
      name: "Biểu mẫu dịch vụ công",
      type: "folder",
      modifiedDate: new Date("2023-08-20"),
      modifiedBy: "Lê Văn C",
      starred: true,
    },
    {
      id: "4",
      name: "Báo cáo tổng kết Q2.pdf",
      type: "file",
      fileType: "pdf",
      size: "2.4 MB",
      modifiedDate: new Date("2023-09-05"),
      modifiedBy: "Phạm Thị D",
      thumbnail: "https://placehold.co/400x300/2563eb/FFFFFF?text=PDF",
    },
    {
      id: "5",
      name: "Hướng dẫn sử dụng phần mềm.docx",
      type: "file",
      fileType: "doc",
      size: "1.8 MB",
      modifiedDate: new Date("2023-09-10"),
      modifiedBy: "Nguyễn Văn A",
      thumbnail: "https://placehold.co/400x300/16a34a/FFFFFF?text=DOC",
    },
    {
      id: "6",
      name: "Biểu đồ thống kê.xlsx",
      type: "file",
      fileType: "xls",
      size: "3.2 MB",
      modifiedDate: new Date("2023-09-15"),
      modifiedBy: "Trần Thị B",
      starred: true,
      thumbnail: "https://placehold.co/400x300/ca8a04/FFFFFF?text=XLS",
    },
    {
      id: "7",
      name: "Infographic dịch vụ.png",
      type: "file",
      fileType: "img",
      size: "4.5 MB",
      modifiedDate: new Date("2023-09-20"),
      modifiedBy: "Lê Văn C",
      thumbnail: "https://placehold.co/400x300/6d28d9/FFFFFF?text=IMG",
    },
    {
      id: "8",
      name: "Tài liệu tập huấn.zip",
      type: "file",
      fileType: "zip",
      size: "12.7 MB",
      modifiedDate: new Date("2023-09-25"),
      modifiedBy: "Phạm Thị D",
      thumbnail: "https://placehold.co/400x300/475569/FFFFFF?text=ZIP",
    },
  ];

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") {
      return <FolderIcon className="h-8 w-8 text-amber-500" />;
    }
    
    switch (file.fileType) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "doc":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "img":
        return <ImageIcon className="h-8 w-8 text-purple-500" />;
      case "xls":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
      case "zip":
        return <FileArchive className="h-8 w-8 text-slate-500" />;
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileClick = (file: FileItem) => {
    if (file.type === "folder") {
      setCurrentFolder(file.name);
    } else {
      setSelectedFile(file);
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-muted/20 p-4 hidden md:block">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <File className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-bold">Kho lưu trữ</h2>
          </div>
          
          <div className="space-y-1">
            {[
              { name: "Tất cả tệp", icon: FileText },
              { name: "Gần đây", icon: Clock },
              { name: "Được gắn sao", icon: Star },
              { name: "Chia sẻ với tôi", icon: Users },
              { name: "Thùng rác", icon: File },
            ].map((item, index) => (
              <AnimatedCard
                key={index}
                className={`px-3 py-2 rounded-lg flex items-center space-x-3 cursor-pointer ${
                  item.name === "Tất cả tệp" 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
                depth={3}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </AnimatedCard>
            ))}
          </div>
          
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-medium mb-2">Thư mục của tôi</h3>
            <div className="space-y-1">
              {["Tài liệu chung", "Biểu mẫu", "Văn bản pháp luật"].map((folder, index) => (
                <AnimatedCard
                  key={index}
                  className={`px-3 py-2 rounded-lg flex items-center space-x-3 cursor-pointer ${
                    folder === currentFolder 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                  depth={2}
                >
                  <FolderIcon className="h-4 w-4" />
                  <span className="text-sm">{folder}</span>
                </AnimatedCard>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium">Nâng cấp dung lượng</h3>
                <p className="text-xs text-muted-foreground mt-1">2.4GB/5GB đã sử dụng</p>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-1.5 mt-2">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: "48%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Top navigation */}
        <div className="bg-background border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-muted-foreground">/</span>}
                  <button 
                    className={`text-sm ${
                      index === breadcrumbs.length - 1 
                        ? "font-medium" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {crumb}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex-1 max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm trong thư mục hiện tại..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-muted/50 border-none text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <AnimatedCard
              className="p-2 rounded-full hover:bg-muted transition-colors"
              depth={2}
            >
              <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </AnimatedCard>
            
            <AnimatedCard className="border border-border rounded-lg p-1 flex bg-muted/30" depth={2}>
              <button
                className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-background" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-background" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </button>
            </AnimatedCard>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="px-4 py-2 flex items-center space-x-3 border-b border-border">
          <AnimatedCard
            className="py-1.5 px-3 rounded-lg flex items-center space-x-2 bg-primary text-primary-foreground"
            depth={3}
            highlight
          >
            <button className="flex items-center">
              <FilePlus className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Tải lên</span>
            </button>
          </AnimatedCard>
          
          <AnimatedCard
            className="py-1.5 px-3 rounded-lg flex items-center space-x-2 bg-muted/50 hover:bg-muted"
            depth={2}
          >
            <button className="flex items-center">
              <FolderPlus className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Tạo thư mục</span>
            </button>
          </AnimatedCard>
        </div>
        
        {/* Files grid/list view */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFiles.map((file) => (
                <AnimatedCard
                  key={file.id}
                  className="rounded-xl overflow-hidden border border-border hover:border-primary/50 cursor-pointer"
                  depth={6}
                  onClick={() => handleFileClick(file)}
                >
                  {file.type === "file" && file.thumbnail ? (
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img 
                        src={file.thumbnail} 
                        alt={file.name} 
                        className="object-cover w-full h-full"
                      />
                      {file.starred && (
                        <div className="absolute top-2 right-2">
                          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center relative">
                      {getFileIcon(file)}
                      {file.starred && (
                        <div className="absolute top-2 right-2">
                          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sm line-clamp-1">{file.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {file.type === "file" ? file.size : "Thư mục"}
                        </p>
                      </div>
                      <button className="mt-1 p-1 rounded-full hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {file.modifiedDate.toLocaleDateString("vi-VN")}
                        </p>
                        <div className="flex space-x-1">
                          {file.type === "file" && (
                            <>
                              <button className="p-1 rounded-full hover:bg-muted">
                                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                              <button className="p-1 rounded-full hover:bg-muted">
                                <Download className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            </>
                          )}
                          <button className="p-1 rounded-full hover:bg-muted">
                            <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Tên</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Kích thước</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Sửa đổi</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Người sửa</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredFiles.map((file) => (
                    <tr 
                      key={file.id} 
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => handleFileClick(file)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {getFileIcon(file)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{file.name}</span>
                            {file.starred && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {file.type === "file" ? file.size : "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {file.modifiedDate.toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {file.modifiedBy}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          {file.type === "file" && (
                            <>
                              <button className="p-1.5 rounded-full hover:bg-muted">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button className="p-1.5 rounded-full hover:bg-muted">
                                <Download className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </>
                          )}
                          <button className="p-1.5 rounded-full hover:bg-muted">
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="p-1.5 rounded-full hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* File preview */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <AnimatedCard
            className="w-full max-w-3xl p-6 rounded-xl bg-card"
            depth={8}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedFile)}
                <div>
                  <h2 className="text-lg font-bold">{selectedFile.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedFile.size} • Cập nhật: {selectedFile.modifiedDate.toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
              <button 
                className="p-2 rounded-full hover:bg-muted"
                onClick={() => setSelectedFile(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-muted rounded-lg p-4 mb-6 flex items-center justify-center min-h-[300px]">
              {selectedFile.thumbnail ? (
                <img 
                  src={selectedFile.thumbnail} 
                  alt={selectedFile.name} 
                  className="max-h-[300px] object-contain"
                />
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  {getFileIcon(selectedFile)}
                  <span className="text-sm text-muted-foreground">Không thể tạo bản xem trước cho tệp này</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Tải xuống", icon: Download },
                { label: "Chỉnh sửa", icon: Edit },
                { label: "Chia sẻ", icon: Share2 },
                { label: "Thêm vào sao", icon: Star },
              ].map((action, index) => (
                <AnimatedCard
                  key={index}
                  className="p-3 rounded-lg flex flex-col items-center justify-center space-y-2 bg-muted/50 hover:bg-muted"
                  depth={4}
                >
                  <button className="w-full flex flex-col items-center">
                    <action.icon className="h-5 w-5 mb-1.5" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedCard>
        </div>
      )}
    </div>
  );
};

export default FileStorageInterface; 