
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, ChevronDown, ChevronUp, Paperclip, Mic } from "lucide-react";

interface ChatMessage {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      text: "Xin chào! Tôi là trợ lý ảo của CDC Tuyên Quang. Tôi có thể giúp gì cho bạn?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  useEffect(() => {
    if (isOpen && !isMinimized && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    // Add user message
    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputText,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputText("");
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "Tôi đang xử lý yêu cầu của bạn. Xin vui lòng đợi trong giây lát.";
      
      if (inputText.toLowerCase().includes("thủ tục")) {
        botResponse = "Để thực hiện thủ tục hành chính, bạn cần chuẩn bị giấy tờ tùy thân và đơn yêu cầu. Bạn có thể tải biểu mẫu tại mục Văn bản pháp luật.";
      } else if (inputText.toLowerCase().includes("giờ làm việc") || inputText.toLowerCase().includes("thời gian")) {
        botResponse = "CDC Tuyên Quang làm việc từ thứ Hai đến thứ Sáu, 7:30 - 17:00. Nghỉ trưa từ 11:30 - 13:30.";
      } else if (inputText.toLowerCase().includes("liên hệ") || inputText.toLowerCase().includes("địa chỉ")) {
        botResponse = "Bạn có thể liên hệ CDC Tuyên Quang tại địa chỉ: 108 Nguyễn Trãi, Tân Quang, Tuyên Quang. Điện thoại: 0207.3822.773";
      }
      
      const newBotMessage: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        text: botResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Thủ tục xin giấy phép kinh doanh?",
    "Giờ làm việc của CDC Tuyên Quang?",
    "Cách liên hệ với bộ phận hỗ trợ?",
    "Hướng dẫn nộp hồ sơ trực tuyến?"
  ];

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed right-6 bottom-6 z-40 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat with assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed right-6 bottom-24 z-30 w-full max-w-sm rounded-2xl shadow-elevated border border-border bg-card text-card-foreground overflow-hidden transition-all duration-300 transform ${
            isMinimized 
              ? "h-16" 
              : "h-[30rem] md:h-[36rem]"
          } ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Trợ lý ảo CDC Tuyên Quang</h3>
                <p className="text-xs text-muted-foreground">Trực tuyến</p>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Chat messages area */}
          {!isMinimized && (
            <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-8rem)]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-chat-bubble-appear`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs text-right mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions */}
              {messages.length <= 2 && (
                <div className="mt-6 space-y-2">
                  <p className="text-xs text-muted-foreground">Câu hỏi gợi ý:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputText(question);
                          setTimeout(() => {
                            if (inputRef.current) {
                              inputRef.current.focus();
                            }
                          }, 50);
                        }}
                        className="text-xs py-1.5 px-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat input area */}
          {!isMinimized && (
            <div className="p-4 border-t border-border bg-card">
              <div className="relative flex items-center">
                <button
                  className="absolute left-3 p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label="Attach file"
                >
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-full bg-muted border-none focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                />
                <div className="absolute right-2 flex items-center space-x-1">
                  <button
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                    aria-label="Voice input"
                  >
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={inputText.trim() === ""}
                    className={`p-1.5 rounded-full transition-colors ${
                      inputText.trim() === "" 
                        ? "text-muted-foreground" 
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
