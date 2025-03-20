
import { Download, FileText, ExternalLink, Star, Clock } from "lucide-react";

interface DocumentCardProps {
  title: string;
  code: string;
  type: string;
  date: string;
  organization: string;
  isNew?: boolean;
  isFavorite?: boolean;
  onClick?: () => void;
}

const DocumentCard = ({
  title,
  code,
  type,
  date,
  organization,
  isNew = false,
  isFavorite = false,
  onClick,
}: DocumentCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer animate-on-scroll"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-xs font-medium text-muted-foreground">{type}</p>
              <p className="text-xs text-muted-foreground">•</p>
              <p className="text-xs text-muted-foreground">{code}</p>
            </div>
            <h3 className="text-base font-medium mt-1 group-hover:text-primary transition-colors duration-200">{title}</h3>
          </div>
        </div>

        {isNew && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Mới
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1.5">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <FileText className="h-4 w-4" />
          <span>{organization}</span>
        </div>
      </div>

      <div className="h-0 group-hover:h-10 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-4 flex items-center justify-between">
        <div className="space-x-2">
          <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <Star className={`h-4 w-4 ${isFavorite ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <Download className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <button className="flex items-center space-x-1 text-xs font-medium text-primary hover:underline transition-colors">
          <span>Xem chi tiết</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
