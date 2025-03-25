import { useState } from "react";
import { Search, Filter, Heart, Eye, Download, Printer, Share2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  number: string;
  date: string;
  organization: string;
  type: string;
  status: "active" | "inactive";
  summary: string;
  isFavorite: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

const LegalDocumentSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Quyết định về việc ban hành hướng dẫn phòng chống dịch COVID-19",
      number: "QĐ-123/2023",
      date: "2023-12-01",
      organization: "CDC Tuyên Quang",
      type: "Quyết định",
      status: "active",
      summary: "Hướng dẫn các biện pháp phòng chống dịch COVID-19 trong tình hình mới",
      isFavorite: false
    },
    // Thêm các văn bản mẫu khác
  ]);

  const categories: Category[] = [
    { id: "yte", name: "Y tế dự phòng", count: 150 },
    { id: "dich", name: "Phòng chống dịch", count: 89 },
    { id: "nhansu", name: "Nhân sự nội bộ", count: 45 },
    { id: "hanhchinh", name: "Hành chính", count: 67 },
  ];

  const documentTypes = [
    "Quyết định",
    "Thông báo",
    "Công văn",
    "Hướng dẫn",
    "Biên bản họp"
  ];

  const organizations = [
    "Bộ Y tế",
    "CDC Tuyên Quang",
    "Sở Y tế",
    "UBND Tỉnh"
  ];

  const toggleFavorite = (docId: string) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === docId ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="CDC Tuyên Quang" className="h-8" />
              <h1 className="text-2xl font-bold">Tra cứu Pháp luật</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm văn bản..."
                  className="w-96 pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <button
                onClick={() => setShowAdvancedSearch(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Tìm kiếm nâng cao</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Lĩnh vực */}
              <div>
                <h3 className="font-semibold mb-3">Lĩnh vực</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category.id]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                          }
                        }}
                        className="rounded border-border"
                      />
                      <span>{category.name}</span>
                      <span className="text-muted-foreground">({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Loại văn bản */}
              <div>
                <h3 className="font-semibold mb-3">Loại văn bản</h3>
                <div className="space-y-2">
                  {documentTypes.map(type => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-border"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cơ quan ban hành */}
              <div>
                <h3 className="font-semibold mb-3">Cơ quan ban hành</h3>
                <div className="space-y-2">
                  {organizations.map(org => (
                    <label
                      key={org}
                      className="flex items-center space-x-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-border"
                      />
                      <span>{org}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Trạng thái */}
              <div>
                <h3 className="font-semibold mb-3">Trạng thái hiệu lực</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      className="rounded-full border-border"
                    />
                    <span>Còn hiệu lực</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      className="rounded-full border-border"
                    />
                    <span>Hết hiệu lực</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-foreground">Trang chủ</a>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Tra cứu pháp luật</span>
            </div>

            {/* Document list */}
            <div className="space-y-4">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold hover:text-primary cursor-pointer">
                        {doc.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Số: {doc.number}</span>
                        <span>Ngày: {new Date(doc.date).toLocaleDateString("vi-VN")}</span>
                        <span>{doc.organization}</span>
                        <span>{doc.type}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs",
                          doc.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        )}>
                          {doc.status === "active" ? "Còn hiệu lực" : "Hết hiệu lực"}
                        </span>
                      </div>
                      <p className="text-sm">{doc.summary}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(doc.id)}
                        className={cn(
                          "p-2 rounded-full hover:bg-muted transition-colors",
                          doc.isFavorite && "text-red-500"
                        )}
                      >
                        <Heart className="h-5 w-5" fill={doc.isFavorite ? "currentColor" : "none"} />
                      </button>
                      <button className="p-2 rounded-full hover:bg-muted transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced search modal */}
      {showAdvancedSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-[800px] p-6">
            <h2 className="text-xl font-semibold mb-4">Tìm kiếm nâng cao</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Từ khóa</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Nhập từ khóa tìm kiếm..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Loại văn bản</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="">Tất cả</option>
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cơ quan ban hành</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="">Tất cả</option>
                    {organizations.map(org => (
                      <option key={org} value={org}>{org}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Từ ngày</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Đến ngày</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Trạng thái hiệu lực</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="modal-status" value="active" />
                    <span>Còn hiệu lực</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="modal-status" value="inactive" />
                    <span>Hết hiệu lực</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lĩnh vực</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center space-x-2">
                      <input type="checkbox" value={category.id} />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAdvancedSearch(false)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => setShowAdvancedSearch(false)}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDocumentSearch; 