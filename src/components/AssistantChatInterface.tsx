import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Paperclip, Mic, Bot, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  suggestions?: string[];
}

const AssistantChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Xin chào! Tôi là trợ lý ảo CDC Tuyên Quang. Tôi có thể giúp gì cho bạn?",
      timestamp: new Date(),
      suggestions: [
        "Hướng dẫn sử dụng kho dữ liệu",
        "Cách tải lên tài liệu",
        "Quy trình phê duyệt văn bản",
        "Tìm kiếm văn bản pháp luật"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMinimized]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Thêm tin nhắn của người dùng
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Giả lập phản hồi của trợ lý
    setTimeout(() => {
      setIsTyping(false);
      let response = "Tôi đang xử lý yêu cầu của bạn...";
      let suggestions: string[] = [];

      // Logic xử lý câu trả lời dựa trên từ khóa
      const input = inputValue.toLowerCase();
      if (input.includes("kho dữ liệu") || input.includes("tài liệu")) {
        response = "Để sử dụng kho dữ liệu, bạn có thể truy cập vào menu 'Kho dữ liệu' và chọn một trong các mục: Kho cá nhân, Kho nhóm/đội, hoặc Kho phòng/ban. Mỗi kho sẽ có các quyền truy cập khác nhau.";
        suggestions = [
          "Cách tải lên tài liệu",
          "Phân quyền truy cập",
          "Chia sẻ tài liệu"
        ];
      } else if (input.includes("văn bản") || input.includes("pháp luật")) {
        response = "Bạn có thể tra cứu văn bản pháp luật tại mục 'Tra cứu pháp luật'. Hệ thống hỗ trợ tìm kiếm theo số hiệu, tên văn bản, ngày ban hành và cơ quan ban hành.";
        suggestions = [
          "Tìm văn bản theo số hiệu",
          "Văn bản mới nhất",
          "Hướng dẫn tìm kiếm"
        ];
      } else if (input.includes("quy trình") || input.includes("phê duyệt")) {
        response = "Quy trình phê duyệt văn bản được thực hiện qua hệ thống quản lý quy trình tự động. Bạn có thể theo dõi trạng thái xử lý tại mục 'Quy trình'.";
        suggestions = [
          "Tạo quy trình mới",
          "Kiểm tra trạng thái",
          "Quy trình đang chờ"
        ];
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: response,
        timestamp: new Date(),
        suggestions
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Nút chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        )}
      </button>

      {/* Giao diện chat */}
      {isOpen && (
        <div className={cn(
          "fixed right-4 bg-background border border-border rounded-lg shadow-xl transition-all duration-300",
          isMinimized 
            ? "bottom-20 w-72 h-14" 
            : "bottom-20 w-96 h-[600px]"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Trợ lý CDC Tuyên Quang</h2>
                <div className="flex items-center space-x-1">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-muted-foreground">Đang hoạt động</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-muted rounded-md transition-colors"
            >
              {isMinimized ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Khu vực tin nhắn */}
              <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-8rem)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.type === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2",
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.suggestions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setInputValue(suggestion);
                                  if (inputRef.current) {
                                    inputRef.current.focus();
                                  }
                                }}
                                className="text-xs py-1 px-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: "2-digit", 
                            minute: "2-digit" 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"></span>
                            <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-100"></span>
                            <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-200"></span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Đang nhập...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Thanh nhập liệu */}
              <div className="p-4 border-t border-border">
                <div className="relative flex items-center">
                  <button className="absolute left-3 p-1.5 rounded-full hover:bg-muted transition-colors">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn..."
                    className="w-full pl-10 pr-10 py-2 bg-muted rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <div className="absolute right-2 flex items-center space-x-1">
                    <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
                      <Mic className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={cn(
                        "p-1.5 rounded-full transition-colors",
                        inputValue.trim()
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AssistantChatInterface; 