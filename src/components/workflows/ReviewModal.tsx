import { useState } from "react";
import { ClipboardEdit, Check, X, AlertCircle } from "lucide-react";

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ReviewModal = ({ onClose, onSubmit }: ReviewModalProps) => {
  const [reviewData, setReviewData] = useState({
    status: "",
    comment: "",
    issues: [] as string[]
  });

  const [newIssue, setNewIssue] = useState("");

  const handleAddIssue = () => {
    if (newIssue.trim()) {
      setReviewData({
        ...reviewData,
        issues: [...reviewData.issues, newIssue.trim()]
      });
      setNewIssue("");
    }
  };

  const handleRemoveIssue = (index: number) => {
    setReviewData({
      ...reviewData,
      issues: reviewData.issues.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reviewData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Xem xét báo cáo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Trạng thái
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setReviewData({ ...reviewData, status: "approved" })}
                className={`p-4 rounded-lg border border-border flex flex-col items-center space-y-2 transition-colors ${
                  reviewData.status === "approved"
                    ? "border-green-500 bg-green-50"
                    : "hover:border-green-500/50"
                }`}
              >
                <Check className="h-6 w-6 text-green-500" />
                <span className="text-sm font-medium">Phê duyệt</span>
              </button>
              <button
                type="button"
                onClick={() => setReviewData({ ...reviewData, status: "needs_revision" })}
                className={`p-4 rounded-lg border border-border flex flex-col items-center space-y-2 transition-colors ${
                  reviewData.status === "needs_revision"
                    ? "border-yellow-500 bg-yellow-50"
                    : "hover:border-yellow-500/50"
                }`}
              >
                <ClipboardEdit className="h-6 w-6 text-yellow-500" />
                <span className="text-sm font-medium">Cần chỉnh sửa</span>
              </button>
              <button
                type="button"
                onClick={() => setReviewData({ ...reviewData, status: "rejected" })}
                className={`p-4 rounded-lg border border-border flex flex-col items-center space-y-2 transition-colors ${
                  reviewData.status === "rejected"
                    ? "border-red-500 bg-red-50"
                    : "hover:border-red-500/50"
                }`}
              >
                <X className="h-6 w-6 text-red-500" />
                <span className="text-sm font-medium">Từ chối</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nhận xét chung
            </label>
            <textarea
              value={reviewData.comment}
              onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              placeholder="Nhập nhận xét của bạn..."
              className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Vấn đề cần chỉnh sửa
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                placeholder="Nhập vấn đề cần chỉnh sửa..."
                className="flex-1 px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                onKeyPress={(e) => e.key === "Enter" && handleAddIssue()}
              />
              <button
                type="button"
                onClick={handleAddIssue}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Thêm
              </button>
            </div>
            {reviewData.issues.length > 0 && (
              <div className="space-y-2">
                {reviewData.issues.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted p-2 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{issue}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveIssue(index)}
                      className="p-1 hover:bg-background rounded-full transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 