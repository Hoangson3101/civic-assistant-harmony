
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
  withFilters?: boolean;
}

const SearchBar = ({
  placeholder = "Tìm kiếm...",
  onSearch,
  withFilters = false,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-16 bg-white border border-border rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200"
            placeholder={placeholder}
          />
          
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-12 flex items-center pr-3"
            >
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground" aria-hidden="true" />
            </button>
          )}
          
          {withFilters && (
            <button
              type="button"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                isFiltersOpen ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Filter className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
        
        {withFilters && isFiltersOpen && (
          <div className="mt-3 p-4 bg-white border border-border rounded-xl shadow-sm animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Loại văn bản</label>
                <select className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm">
                  <option value="">Tất cả</option>
                  <option value="law">Luật</option>
                  <option value="decree">Nghị định</option>
                  <option value="circular">Thông tư</option>
                  <option value="decision">Quyết định</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Năm ban hành</label>
                <select className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm">
                  <option value="">Tất cả</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cơ quan ban hành</label>
                <select className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm">
                  <option value="">Tất cả</option>
                  <option value="government">Chính phủ</option>
                  <option value="ministry">Bộ Y tế</option>
                  <option value="local">UBND Tỉnh</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
