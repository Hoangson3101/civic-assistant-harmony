
import { Activity, AlertCircle, CheckCircle, Clock, FileText, User } from "lucide-react";

interface WorkflowCardProps {
  title: string;
  description: string;
  status: "completed" | "inProgress" | "pending" | "delayed";
  progress: number;
  department: string;
  assignee: string;
  dueDate: string;
  onClick?: () => void;
}

const WorkflowCard = ({
  title,
  description,
  status,
  progress,
  department,
  assignee,
  dueDate,
  onClick,
}: WorkflowCardProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-50",
          label: "Hoàn thành",
        };
      case "inProgress":
        return {
          icon: Activity,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
          label: "Đang xử lý",
        };
      case "pending":
        return {
          icon: Clock,
          color: "text-amber-500",
          bgColor: "bg-amber-50",
          label: "Chờ xử lý",
        };
      case "delayed":
        return {
          icon: AlertCircle,
          color: "text-red-500",
          bgColor: "bg-red-50",
          label: "Chậm tiến độ",
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-500",
          bgColor: "bg-gray-50",
          label: "Không xác định",
        };
    }
  };

  const statusDetails = getStatusDetails();
  const StatusIcon = statusDetails.icon;

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer animate-on-scroll"
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-medium group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusDetails.bgColor} ${statusDetails.color}`}>
            <StatusIcon className="h-3.5 w-3.5" />
            <span>{statusDetails.label}</span>
          </div>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium">Tiến độ</span>
            <span className={`${status === "delayed" ? "text-red-500" : ""}`}>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                status === "completed"
                  ? "bg-green-500"
                  : status === "delayed"
                  ? "bg-red-500"
                  : "bg-primary"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 flex items-center text-xs text-muted-foreground justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <FileText className="h-3.5 w-3.5" />
              <span>{department}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-3.5 w-3.5" />
              <span>{assignee}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{dueDate}</span>
          </div>
        </div>
      </div>

      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default WorkflowCard;
