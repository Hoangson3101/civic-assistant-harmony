import { useState } from "react";
import { Search, Filter, BookOpen, Download, Share2, Eye, Scale, Calendar, ChevronRight, Calendar as CalendarIcon, FilePlus, ArrowUpDown, BookOpenCheck, ChevronDown, ChevronUp, X } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

interface LegalDocument {
  id: string;
  title: string;
  number: string;
  type: string;
  issuedBy: string;
  issuedDate: Date;
  effectiveDate: Date;
  status: "active" | "replaced" | "expired";
  summary: string;
  tags?: string[];
  relatedDocs?: string[];
}

const LegalDocumentSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  const legalDocuments: LegalDocument[] = [
    {
      id: "1",
      title: "Luật Phòng, chống bệnh truyền nhiễm",
      number: "03/2007/QH12",
      type: "Luật",
      issuedBy: "Quốc hội",
      issuedDate: new Date("2007-11-21"),
      effectiveDate: new Date("2008-07-01"),
      status: "active",
      summary: "Quy định về phòng, chống bệnh truyền nhiễm; kiểm dịch y tế biên giới; trách nhiệm của cơ quan, tổ chức, cá nhân trong phòng, chống bệnh truyền nhiễm.",
      tags: ["Y tế", "Phòng bệnh", "Dịch bệnh"],
      relatedDocs: ["2", "3"]
    },
    {
      id: "2",
      title: "Nghị định quy định chi tiết một số điều của Luật Phòng, chống bệnh truyền nhiễm",
      number: "101/2010/NĐ-CP",
      type: "Nghị định",
      issuedBy: "Chính phủ",
      issuedDate: new Date("2010-10-30"),
      effectiveDate: new Date("2010-12-15"),
      status: "active",
      summary: "Quy định chi tiết một số điều của Luật Phòng, chống bệnh truyền nhiễm về danh mục bệnh truyền nhiễm và phân loại bệnh truyền nhiễm.",
      tags: ["Y tế", "Nghị định"],
    },
    {
      id: "3",
      title: "Thông tư hướng dẫn công tác kiểm dịch y tế biên giới",
      number: "46/2014/TT-BYT",
      type: "Thông tư",
      issuedBy: "Bộ Y tế",
      issuedDate: new Date("2014-12-05"),
      effectiveDate: new Date("2015-02-21"),
      status: "replaced",
      summary: "Hướng dẫn công tác kiểm dịch y tế tại cửa khẩu và các vùng kiểm dịch y tế trong lãnh thổ Việt Nam.",
      tags: ["Y tế", "Kiểm dịch", "Thông tư"],
    },
    {
      id: "4",
      title: "Thông tư quy định về hoạt động giám sát bệnh truyền nhiễm",
      number: "54/2015/TT-BYT",
      type: "Thông tư",
      issuedBy: "Bộ Y tế",
      issuedDate: new Date("2015-12-28"),
      effectiveDate: new Date("2016-02-15"),
      status: "active",
      summary: "Quy định về hoạt động giám sát bệnh truyền nhiễm trong lãnh thổ Việt Nam, bao gồm cả thủ tục báo cáo dịch bệnh.",
      tags: ["Y tế", "Giám sát", "Thủ tục"],
    },
    {
      id: "5",
      title: "Quyết định về việc ban hành Kế hoạch phòng chống dịch COVID-19",
      number: "2265/QĐ-UBND",
      type: "Quyết định",
      issuedBy: "UBND tỉnh Tuyên Quang",
      issuedDate: new Date("2020-08-15"),
      effectiveDate: new Date("2020-08-15"),
      status: "expired",
      summary: "Ban hành Kế hoạch phòng, chống dịch COVID-19 trên địa bàn tỉnh Tuyên Quang trong tình hình mới.",
      tags: ["COVID-19", "Kế hoạch", "Tuyên Quang"],
    },
  ];

  const filteredDocuments = legalDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const documentTypes = [
    { id: "law", label: "Luật", count: 1 },
    { id: "decree", label: "Nghị định", count: 1 },
    { id: "circular", label: "Thông tư", count: 2 },
    { id: "decision", label: "Quyết định", count: 1 },
  ];

  const issuingAuthorities = [
    { id: "congress", label: "Quốc hội", count: 1 },
    { id: "government", label: "Chính phủ", count: 1 },
    { id: "ministry", label: "Bộ Y tế", count: 2 },
    { id: "province", label: "UBND tỉnh", count: 1 },
  ];

  const years = [
    { id: "2020", label: "2020", count: 1 },
    { id: "2015", label: "2015", count: 1 },
    { id: "2014", label: "2014", count: 1 },
    { id: "2010", label: "2010", count: 1 },
    { id: "2007", label: "2007", count: 1 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-600";
      case "replaced":
        return "bg-amber-50 text-amber-600";
      case "expired":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang hiệu lực";
      case "replaced":
        return "Đã được thay thế";
      case "expired":
        return "Hết hiệu lực";
      default:
        return "Không xác định";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Thư viện Văn bản pháp luật</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Tra cứu các văn bản pháp luật, nghị định, thông tư và quyết định liên quan đến lĩnh vực y tế và phòng chống dịch bệnh.
        </p>
      </div>

      <AnimatedCard 
        className="mb-8 p-6 rounded-2xl bg-card"
        depth={4}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo số hiệu, tên văn bản hoặc nội dung..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border-none text-base focus:ring-2 focus:ring-primary focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="absolute inset-y-0 right-0 flex items-center px-4 text-primary hover:text-primary/80"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          >
            <Filter className="h-5 w-5 mr-2" />
            <span className="font-medium">Bộ lọc</span>
            {isFilterExpanded ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>
        </div>

        {isFilterExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-border">
            <div>
              <h3 className="font-medium mb-3 text-sm">Loại văn bản</h3>
              <div className="space-y-2">
                {documentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveFilter(activeFilter === type.id ? null : type.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg ${
                      activeFilter === type.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>{type.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{type.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-sm">Cơ quan ban hành</h3>
              <div className="space-y-2">
                {issuingAuthorities.map((authority) => (
                  <button
                    key={authority.id}
                    onClick={() => setActiveFilter(activeFilter === authority.id ? null : authority.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg ${
                      activeFilter === authority.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>{authority.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{authority.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-sm">Năm ban hành</h3>
              <div className="space-y-2">
                {years.map((year) => (
                  <button
                    key={year.id}
                    onClick={() => setActiveFilter(activeFilter === year.id ? null : year.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg ${
                      activeFilter === year.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>{year.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{year.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatedCard>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Kết quả tìm kiếm ({filteredDocuments.length})</h2>
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mr-2">Sắp xếp:</span>
          <button className="flex items-center text-sm">
            <span>Mới nhất</span>
            <ArrowUpDown className="h-3 w-3 ml-1" />
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <AnimatedCard
              key={doc.id}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 cursor-pointer"
              depth={5}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(doc.status)}`}>
                      {getStatusText(doc.status)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {doc.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1.5" />
                      <span>Số: {doc.number}</span>
                    </div>
                    <div className="flex items-center">
                      <Scale className="h-4 w-4 mr-1.5" />
                      <span>{doc.issuedBy}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span>Ban hành: {formatDate(doc.issuedDate)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {doc.summary}
                  </p>
                  
                  {doc.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {doc.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted/70 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="md:self-center flex md:flex-col gap-3 items-center mt-4 md:mt-0">
                  <button
                    className="text-xs py-1.5 px-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1.5" />
                    <span>Chi tiết</span>
                  </button>
                  
                  <button
                    className="text-xs py-1.5 px-3 rounded-full bg-muted hover:bg-muted/80 flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Download className="h-3 w-3 mr-1.5" />
                    <span>Tải xuống</span>
                  </button>
                </div>
              </div>
            </AnimatedCard>
          ))
        ) : (
          <div className="text-center py-12">
            <BookOpenCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Không tìm thấy văn bản</h3>
            <p className="text-muted-foreground">
              Không có văn bản nào phù hợp với tiêu chí tìm kiếm. Vui lòng thử lại với từ khóa khác.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <nav className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1.5 text-sm rounded-md ${
                page === 1
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:bg-muted flex items-center">
            <span>Tiếp</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </button>
        </nav>
      </div>

      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedCard
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-card p-6"
            depth={8}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(selectedDocument.status)}`}>
                      {getStatusText(selectedDocument.status)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {selectedDocument.type}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1">Thông tin văn bản</h2>
                </div>
              </div>
              <button 
                className="p-2 rounded-full hover:bg-muted"
                onClick={() => setSelectedDocument(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedDocument.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1.5" />
                    <span>Số: {selectedDocument.number}</span>
                  </div>
                  <div className="flex items-center">
                    <Scale className="h-4 w-4 mr-1.5" />
                    <span>{selectedDocument.issuedBy}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium mb-2">Thông tin chung</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ngày ban hành:</span>
                      <span className="font-medium">{formatDate(selectedDocument.issuedDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ngày hiệu lực:</span>
                      <span className="font-medium">{formatDate(selectedDocument.effectiveDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tình trạng:</span>
                      <span className={`font-medium ${selectedDocument.status === "active" ? "text-green-600" : selectedDocument.status === "replaced" ? "text-amber-600" : "text-red-600"}`}>
                        {getStatusText(selectedDocument.status)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Loại văn bản:</span>
                      <span className="font-medium">{selectedDocument.type}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Chủ đề và phân loại</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cơ quan ban hành:</span>
                      <span className="font-medium">{selectedDocument.issuedBy}</span>
                    </div>
                    {selectedDocument.tags && (
                      <div className="flex flex-col text-sm">
                        <span className="text-muted-foreground mb-1">Chủ đề:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedDocument.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-0.5 rounded-full bg-muted/70 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Tóm tắt nội dung</h4>
                <p className="text-sm leading-relaxed bg-muted/20 p-4 rounded-lg">
                  {selectedDocument.summary}
                </p>
              </div>
              
              {selectedDocument.relatedDocs && selectedDocument.relatedDocs.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3">Văn bản liên quan</h4>
                  <div className="space-y-2">
                    {selectedDocument.relatedDocs.map((docId) => {
                      const relatedDoc = legalDocuments.find(d => d.id === docId);
                      if (!relatedDoc) return null;
                      
                      return (
                        <div 
                          key={docId}
                          className="flex justify-between items-center p-3 bg-muted/30 rounded-lg text-sm hover:bg-muted/50 cursor-pointer"
                          onClick={() => setSelectedDocument(relatedDoc)}
                        >
                          <div>
                            <div className="font-medium">{relatedDoc.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {relatedDoc.number} - {relatedDoc.issuedBy} - {formatDate(relatedDoc.issuedDate)}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-border flex flex-wrap gap-3 justify-center">
                <AnimatedCard
                  className="p-3 rounded-lg flex items-center space-x-2 bg-primary text-primary-foreground"
                  depth={4}
                  highlight
                >
                  <button className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>Xem toàn văn</span>
                  </button>
                </AnimatedCard>
                
                <AnimatedCard
                  className="p-3 rounded-lg flex items-center space-x-2 bg-muted/50 hover:bg-muted"
                  depth={3}
                >
                  <button className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    <span>Tải xuống</span>
                  </button>
                </AnimatedCard>
                
                <AnimatedCard
                  className="p-3 rounded-lg flex items-center space-x-2 bg-muted/50 hover:bg-muted"
                  depth={3}
                >
                  <button className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    <span>Chia sẻ</span>
                  </button>
                </AnimatedCard>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}
    </div>
  );
};

export default LegalDocumentSearch;
