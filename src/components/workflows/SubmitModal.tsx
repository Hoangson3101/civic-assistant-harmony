import { useState } from "react";
import { Send, X, Check } from "lucide-react";

interface SubmitModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const SubmitModal = ({ onClose, onSubmit }: SubmitModalProps) => {
  const [submitData, setSubmitData] = useState({
    destination: "",
    submissionType: "",
    confirmChecklist: {
      dataVerified: false,
      formatChecked: false,
      reviewCompleted: false,
      attachmentsReady: false
    }
  });

  const destinations = [
    {
      id: "cdc",
      name: "Cổng thông tin CDC Trung ương",
      description: "Nộp báo cáo lên hệ thống CDC Trung ương"
    },
    {
      id: "ministry",
      name: "Bộ Y tế",
      description: "Nộp báo cáo cho Bộ Y tế"
    },
    {
      id: "province",
      name: "UBND Tỉnh",
      description: "Nộp báo cáo cho Ủy ban Nhân dân Tỉnh"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(submitData.confirmChecklist).every(value => value)) {
      onSubmit(submitData);
    }
  };

  const allChecked = Object.values(submitData.confirmChecklist).every(value => value);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Nộp báo cáo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nơi nhận báo cáo
            </label>
            <div className="space-y-2">
              {destinations.map((dest) => (
                <label
                  key={dest.id}
                  className={`block p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors ${
                    submitData.destination === dest.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="destination"
                      value={dest.id}
                      checked={submitData.destination === dest.id}
                      onChange={(e) =>
                        setSubmitData({ ...submitData, destination: e.target.value })
                      }
                      className="mt-1"
                    />
                    <div className="ml-3">
                      <div className="font-medium">{dest.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {dest.description}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Hình thức nộp
            </label>
            <select
              value={submitData.submissionType}
              onChange={(e) =>
                setSubmitData({ ...submitData, submissionType: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">Chọn hình thức nộp</option>
              <option value="api">Nộp qua API tự động</option>
              <option value="email">Gửi qua email</option>
              <option value="manual">Nộp thủ công</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Danh sách kiểm tra trước khi nộp</h3>
            <div className="space-y-2">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={submitData.confirmChecklist.dataVerified}
                  onChange={(e) =>
                    setSubmitData({
                      ...submitData,
                      confirmChecklist: {
                        ...submitData.confirmChecklist,
                        dataVerified: e.target.checked
                      }
                    })
                  }
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Kiểm tra dữ liệu</div>
                  <div className="text-sm text-muted-foreground">
                    Tôi đã kiểm tra và xác nhận tính chính xác của dữ liệu báo cáo
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={submitData.confirmChecklist.formatChecked}
                  onChange={(e) =>
                    setSubmitData({
                      ...submitData,
                      confirmChecklist: {
                        ...submitData.confirmChecklist,
                        formatChecked: e.target.checked
                      }
                    })
                  }
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Định dạng báo cáo</div>
                  <div className="text-sm text-muted-foreground">
                    Báo cáo đã được định dạng theo đúng mẫu quy định
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={submitData.confirmChecklist.reviewCompleted}
                  onChange={(e) =>
                    setSubmitData({
                      ...submitData,
                      confirmChecklist: {
                        ...submitData.confirmChecklist,
                        reviewCompleted: e.target.checked
                      }
                    })
                  }
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Xem xét và phê duyệt</div>
                  <div className="text-sm text-muted-foreground">
                    Báo cáo đã được xem xét và phê duyệt bởi người có thẩm quyền
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={submitData.confirmChecklist.attachmentsReady}
                  onChange={(e) =>
                    setSubmitData({
                      ...submitData,
                      confirmChecklist: {
                        ...submitData.confirmChecklist,
                        attachmentsReady: e.target.checked
                      }
                    })
                  }
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Tài liệu đính kèm</div>
                  <div className="text-sm text-muted-foreground">
                    Đã đính kèm đầy đủ các tài liệu cần thiết
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!allChecked || !submitData.destination || !submitData.submissionType}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                allChecked && submitData.destination && submitData.submissionType
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              } transition-colors`}
            >
              <Send className="h-5 w-5" />
              <span>Nộp báo cáo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitModal; 