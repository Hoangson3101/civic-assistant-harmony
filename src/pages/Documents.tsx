
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DocumentCard from "@/components/DocumentCard";
import ChatBot from "@/components/ChatBot";
import AnimatedLayout from "@/components/AnimatedLayout";
import { FileText, ArrowRight, ArrowLeft } from "lucide-react";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 9;

  // Sample documents data
  const documents = [
    {
      id: 1,
      title: "Luật Phòng, chống bệnh truyền nhiễm",
      code: "03/2007/QH12",
      type: "Luật",
      date: "21/11/2007",
      organization: "Quốc hội",
      isNew: false,
      isFavorite: true,
    },
    {
      id: 2,
      title: "Nghị định về quản lý trang thiết bị y tế",
      code: "98/2021/NĐ-CP",
      type: "Nghị định",
      date: "08/11/2021",
      organization: "Chính phủ",
      isNew: true,
      isFavorite: false,
    },
    {
      id: 3,
      title: "Thông tư hướng dẫn giám sát bệnh truyền nhiễm",
      code: "54/2015/TT-BYT",
      type: "Thông tư",
      date: "28/12/2015",
      organization: "Bộ Y tế",
      isNew: false,
      isFavorite: false,
    },
    {
      id: 4,
      title: "Quyết định phê duyệt kế hoạch phòng chống dịch",
      code: "02/2022/QĐ-UBND",
      type: "Quyết định",
      date: "15/01/2022",
      organization: "UBND Tỉnh",
      isNew: true,
      isFavorite: true,
    },
    {
      id: 5,
      title: "Nghị quyết về tăng cường công tác bảo vệ sức khỏe nhân dân",
      code: "20/2021/NQ-HĐND",
      type: "Nghị quyết",
      date: "10/12/2021",
      organization: "HĐND Tỉnh",
      isNew: false,
      isFavorite: false,
    },
    {
      id: 6,
      title: "Luật Khám bệnh, chữa bệnh",
      code: "40/2009/QH12",
      type: "Luật",
      date: "23/11/2009",
      organization: "Quốc hội",
      isNew: false,
      isFavorite: true,
    },
    {
      id: 7,
      title: "Nghị định quy định chi tiết một số điều của Luật Dược",
      code: "54/2017/NĐ-CP",
      type: "Nghị định",
      date: "08/05/2017",
      organization: "Chính phủ",
      isNew: false,
      isFavorite: false,
    },
    {
      id: 8,
      title: "Thông tư quy định về quản lý chất thải y tế",
      code: "20/2021/TT-BYT",
      type: "Thông tư",
      date: "26/11/2021",
      organization: "Bộ Y tế",
      isNew: true,
      isFavorite: false,
    },
    {
      id: 9,
      title: "Quyết định về việc ban hành quy trình kỹ thuật khám bệnh",
      code: "4026/QĐ-BYT",
      type: "Quyết định",
      date: "20/09/2016",
      organization: "Bộ Y tế",
      isNew: false,
      isFavorite: false,
    },
    {
      id: 10,
      title: "Hướng dẫn tạm thời giám sát và phòng, chống COVID-19",
      code: "3638/QĐ-BYT",
      type: "Quyết định",
      date: "30/07/2021",
      organization: "Bộ Y tế",
      isNew: false,
      isFavorite: true,
    },
    {
      id: 11,
      title: "Thông tư quy định chuẩn thông tin và dữ liệu y tế điện tử",
      code: "47/2018/TT-BYT",
      type: "Thông tư",
      date: "28/12/2018",
      organization: "Bộ Y tế",
      isNew: false,
      isFavorite: false,
    },
    {
      id: 12,
      title: "Nghị định quy định về an ninh mạng",
      code: "27/2018/NĐ-CP",
      type: "Nghị định",
      date: "01/06/2018",
      organization: "Chính phủ",
      isNew: false,
      isFavorite: false,
    },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * documentsPerPage,
    currentPage * documentsPerPage
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleDocumentClick = (id: number) => {
    console.log(`Document clicked: ${id}`);
    // Navigate to document detail page or show modal
  };

  return (
    <AnimatedLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Thư viện Văn bản Pháp luật</h1>
          <p className="text-muted-foreground mt-2">
            Tra cứu văn bản pháp luật, quy định và hướng dẫn y tế
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar 
            placeholder="Tìm kiếm theo tiêu đề, số hiệu, loại văn bản..." 
            onSearch={handleSearch} 
            withFilters 
          />
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 w-max min-w-full">
            {["Tất cả", "Luật", "Nghị định", "Thông tư", "Quyết định", "Nghị quyết", "Công văn", "Hướng dẫn"].map(
              (category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        {/* Document grid */}
        {currentDocuments.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {currentDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title}
                  code={doc.code}
                  type={doc.type}
                  date={doc.date}
                  organization={doc.organization}
                  isNew={doc.isNew}
                  isFavorite={doc.isFavorite}
                  onClick={() => handleDocumentClick(doc.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 my-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${
                    currentPage === 1
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-full ${
                      currentPage === index + 1
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${
                    currentPage === totalPages
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Không tìm thấy văn bản</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Không có văn bản nào khớp với tiêu chí tìm kiếm của bạn. Hãy thử các từ khóa khác hoặc điều chỉnh bộ lọc.
            </p>
          </div>
        )}
      </div>

      {/* Chatbot */}
      <ChatBot />
    </AnimatedLayout>
  );
};

export default Documents;
