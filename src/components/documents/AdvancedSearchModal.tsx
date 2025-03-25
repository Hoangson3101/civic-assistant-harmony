import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface AdvancedSearchFilters {
  keyword: string;
  documentType: string[];
  issuedBy: string[];
  fromDate: string;
  toDate: string;
  status: string;
  subjects: string[];
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: AdvancedSearchFilters) => void;
}

const AdvancedSearchModal = ({ isOpen, onClose, onSearch }: AdvancedSearchModalProps) => {
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    keyword: "",
    documentType: [],
    issuedBy: [],
    fromDate: "",
    toDate: "",
    status: "all",
    subjects: []
  });

  const documentTypes = ["Quyết định", "Thông báo", "Công văn", "Hướng dẫn", "Biên bản họp"];
  const issuers = ["CDC Tuyên Quang", "Sở Y tế", "Bộ Y tế"];
  const subjectAreas = ["Y tế dự phòng", "Phòng chống dịch", "Nội bộ"];

  const handleCheckboxChange = (field: keyof AdvancedSearchFilters, value: string) => {
    const currentValues = filters[field] as string[];
    if (currentValues.includes(value)) {
      setFilters({
        ...filters,
        [field]: currentValues.filter(v => v !== value)
      });
    } else {
      setFilters({
        ...filters,
        [field]: [...currentValues, value]
      });
    }
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      documentType: [],
      issuedBy: [],
      fromDate: "",
      toDate: "",
      status: "all",
      subjects: []
    });
  };

  const handleSubmit = () => {
    onSearch(filters);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Tìm kiếm nâng cao</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Từ khóa */}
          <div className="grid gap-2">
            <Label htmlFor="keyword">Từ khóa</Label>
            <Input
              id="keyword"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            />
          </div>

          {/* Loại văn bản */}
          <div className="grid gap-2">
            <Label>Loại văn bản</Label>
            <div className="grid grid-cols-2 gap-2">
              {documentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.documentType.includes(type)}
                    onCheckedChange={() => handleCheckboxChange("documentType", type)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Cơ quan ban hành */}
          <div className="grid gap-2">
            <Label>Cơ quan ban hành</Label>
            <div className="grid grid-cols-2 gap-2">
              {issuers.map((issuer) => (
                <div key={issuer} className="flex items-center space-x-2">
                  <Checkbox
                    id={`issuer-${issuer}`}
                    checked={filters.issuedBy.includes(issuer)}
                    onCheckedChange={() => handleCheckboxChange("issuedBy", issuer)}
                  />
                  <label
                    htmlFor={`issuer-${issuer}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {issuer}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Ngày ban hành */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fromDate">Từ ngày</Label>
              <Input
                id="fromDate"
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="toDate">Đến ngày</Label>
              <Input
                id="toDate"
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
              />
            </div>
          </div>

          {/* Trạng thái hiệu lực */}
          <div className="grid gap-2">
            <Label htmlFor="status">Trạng thái hiệu lực</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Còn hiệu lực</SelectItem>
                <SelectItem value="inactive">Hết hiệu lực</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lĩnh vực */}
          <div className="grid gap-2">
            <Label>Lĩnh vực</Label>
            <div className="grid grid-cols-2 gap-2">
              {subjectAreas.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subject-${subject}`}
                    checked={filters.subjects.includes(subject)}
                    onCheckedChange={() => handleCheckboxChange("subjects", subject)}
                  />
                  <label
                    htmlFor={`subject-${subject}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {subject}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Đặt lại bộ lọc
          </Button>
          <Button onClick={handleSubmit}>Tìm kiếm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchModal; 