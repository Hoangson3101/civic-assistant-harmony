import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, ChevronDown, ChevronUp, Paperclip, Mic, Bot, Sparkles, HelpCircle, AlertCircle, FileText } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

interface ChatMessage {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
  isLoading?: boolean;
  attachments?: string[];
  actions?: {
    label: string;
    icon?: React.ElementType;
    onClick: () => void;
  }[];
}

const AssistantChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "faq" | "documents">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      text: "Xin chào! Tôi là trợ lý ảo CDC Tuyên Quang. Tôi có thể giúp gì cho bạn về các dịch vụ công?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  
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
    
    // Hiệu ứng đang nhập
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      
      let botResponse = "Tôi đang xử lý yêu cầu của bạn. Xin vui lòng đợi trong giây lát.";
      let actions = [];
      
      if (inputText.toLowerCase().includes("thủ tục")) {
        botResponse = "Để thực hiện thủ tục hành chính, bạn cần chuẩn bị giấy tờ tùy thân và đơn yêu cầu. Bạn có thể tải biểu mẫu tại mục Văn bản pháp luật.";
        actions = [
          {
            label: "Xem biểu mẫu",
            icon: FileText,
            onClick: () => console.log("Xem biểu mẫu")
          },
          {
            label: "Hướng dẫn thủ tục",
            icon: HelpCircle,
            onClick: () => console.log("Xem hướng dẫn")
          }
        ];
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
        actions: actions
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const faqItems = [
    {
      question: "Làm thế nào để đăng ký tài khoản dịch vụ công?",
      answer: "Để đăng ký tài khoản dịch vụ công, bạn cần truy cập trang chủ và chọn 'Đăng ký', sau đó điền thông tin cá nhân và xác thực tài khoản qua tin nhắn hoặc email."
    },
    {
      question: "Thời gian xử lý hồ sơ trực tuyến là bao lâu?",
      answer: "Thời gian xử lý hồ sơ trực tuyến thường từ 3-5 ngày làm việc tùy theo loại thủ tục. Bạn có thể theo dõi trạng thái hồ sơ trong mục 'Quản lý hồ sơ' sau khi đăng nhập."
    },
    {
      question: "Tôi cần những giấy tờ gì để thực hiện thủ tục trực tuyến?",
      answer: "Các giấy tờ cần thiết thường bao gồm: CMND/CCCD, hộ khẩu, và các giấy tờ liên quan đến thủ tục cụ thể. Bạn có thể xem chi tiết trong phần mô tả của từng dịch vụ."
    },
    {
      question: "Làm thế nào để theo dõi trạng thái hồ sơ đã nộp?",
      answer: "Bạn có thể theo dõi trạng thái hồ sơ bằng cách đăng nhập vào tài khoản dịch vụ công, sau đó vào mục 'Theo dõi hồ sơ' và nhập mã hồ sơ đã được cấp."
    },
  ];

  const suggestedQuestions = [
    "Thủ tục xin giấy phép kinh doanh?",
    "Giờ làm việc của CDC Tuyên Quang?",
    "Cách liên hệ với bộ phận hỗ trợ?",
    "Hướng dẫn nộp hồ sơ trực tuyến?"
  ];

  const documents = [
    { title: "Hướng dẫn nộp hồ sơ trực tuyến", type: "PDF", size: "1.2 MB" },
    { title: "Mẫu đơn đăng ký kinh doanh", type: "DOCX", size: "0.8 MB" },
    { title: "Quy trình xử lý hồ sơ", type: "PDF", size: "2.5 MB" },
    { title: "Các loại phí và lệ phí", type: "PDF", size: "0.5 MB" },
  ];

  return (
    <>
      {/* Chat button */}
      <AnimatedCard
        className="fixed right-6 bottom-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl flex items-center justify-center"
        depth={8}
        highlight
      >
        <button
          onClick={toggleChat}
          className="w-full h-full rounded-full flex items-center justify-center"
          aria-label="Chat with assistant"
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <div className="relative">
              <MessageSquare className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </div>
          )}
        </button>
      </AnimatedCard>

      {/* Chat window */}
      {isOpen && (
        <AnimatedCard 
          className={`fixed right-6 bottom-24 z-30 w-full max-w-sm rounded-2xl bg-card text-card-foreground overflow-hidden transition-all duration-500 ${
            isMinimized 
              ? "h-16" 
              : "h-[32rem] md:h-[38rem]"
          }`}
          depth={2}
        >
          {/* Chat header */}
          <div className="relative flex items-center justify-between p-4 border-b border-border backdrop-blur-sm bg-primary/5">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50"></div>
            <div className="flex items-center space-x-3 z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 p-0.5">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm">Trợ lý ảo CDC Tuyên Quang</h3>
                <div className="flex items-center space-x-1">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-xs text-muted-foreground">Đang hoạt động</p>
                </div>
              </div>
            </div>
            <div className="flex items-center z-10">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-full hover:bg-background/80 transition-colors"
                aria-label={isMinimized ? "Mở rộng" : "Thu nhỏ"}
              >
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Tab navigation */}
          {!isMinimized && (
            <div className="border-b border-border">
              <div className="flex">
                {[
                  { id: "chat" as const, label: "Trò chuyện", icon: MessageSquare },
                  { id: "faq" as const, label: "Hỏi đáp", icon: HelpCircle },
                  { id: "documents" as const, label: "Tài liệu", icon: FileText },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center space-x-2 relative ${
                      activeTab === tab.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    } transition-all duration-200`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isMinimized && activeTab === "chat" && (
            <>
              {/* Chat messages area */}
              <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-13rem)] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                    >
                      <AnimatedCard
                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          message.type === "user"
                            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                            : "bg-muted/50 backdrop-blur-sm"
                        }`}
                        depth={3}
                      >
                        <p className="text-sm">{message.text}</p>
                        
                        {message.actions && message.actions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.actions.map((action, index) => (
                              <button
                                key={index}
                                onClick={action.onClick}
                                className="inline-flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm border border-border transition-colors"
                              >
                                {action.icon && <action.icon className="h-3.5 w-3.5" />}
                                <span>{action.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-right mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </AnimatedCard>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <AnimatedCard
                        className="max-w-[85%] px-4 py-3 rounded-2xl bg-muted/50 backdrop-blur-sm"
                        depth={3}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <span className="w-2 h-2 rounded-full bg-primary/30 animate-typing"></span>
                            <span className="w-2 h-2 rounded-full bg-primary/30 animate-typing animation-delay-200"></span>
                            <span className="w-2 h-2 rounded-full bg-primary/30 animate-typing animation-delay-400"></span>
                          </div>
                          <span className="text-xs text-muted-foreground">Trợ lý đang nhập...</span>
                        </div>
                      </AnimatedCard>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested questions */}
                {messages.length <= 2 && (
                  <div className="mt-6 space-y-2">
                    <p className="text-xs text-muted-foreground flex items-center space-x-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Câu hỏi gợi ý:</span>
                    </p>
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
                          className="text-xs py-1.5 px-3 rounded-full bg-muted hover:bg-muted/80 backdrop-blur-sm border border-border transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Chat input area */}
              <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm">
                <div className="relative flex items-center">
                  <button
                    className="absolute left-3 p-1.5 rounded-full hover:bg-muted transition-colors"
                    aria-label="Đính kèm tệp"
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
                    className="w-full pl-10 pr-10 py-3 rounded-full bg-muted/50 border-none focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  />
                  <div className="absolute right-2 flex items-center space-x-1">
                    <button
                      className="p-1.5 rounded-full hover:bg-muted transition-colors"
                      aria-label="Nhập bằng giọng nói"
                    >
                      <Mic className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <AnimatedCard
                      className={`p-1.5 rounded-full transition-colors ${
                        inputText.trim() === "" 
                          ? "bg-muted/50 text-muted-foreground" 
                          : "bg-primary text-primary-foreground"
                      }`}
                      depth={5}
                      highlight={inputText.trim() !== ""}
                    >
                      <button
                        onClick={handleSendMessage}
                        disabled={inputText.trim() === ""}
                        aria-label="Gửi tin nhắn"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </AnimatedCard>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* FAQ Content */}
          {!isMinimized && activeTab === "faq" && (
            <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-8rem)] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <AnimatedCard 
                    key={index}
                    className="p-4 rounded-xl bg-muted/30 backdrop-blur-sm"
                    depth={3}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="min-w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <HelpCircle className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1.5">{faq.question}</h4>
                        <p className="text-xs text-muted-foreground">{faq.answer}</p>
                        <button 
                          className="mt-2 text-xs text-primary font-medium flex items-center space-x-1"
                          onClick={() => {
                            setActiveTab("chat");
                            setInputText(faq.question);
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                        >
                          <span>Hỏi thêm</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          )}
          
          {/* Documents Content */}
          {!isMinimized && activeTab === "documents" && (
            <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-8rem)] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <AnimatedCard 
                    key={index}
                    className="p-4 rounded-xl bg-muted/30 backdrop-blur-sm"
                    depth={3}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="min-w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{doc.title}</h4>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{doc.type}</span>
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                        </div>
                        <div className="flex items-center space-x-3 mt-2">
                          <button className="text-xs text-primary font-medium flex items-center space-x-1">
                            <span>Tải xuống</span>
                            <ChevronDown className="h-3 w-3" />
                          </button>
                          <button className="text-xs text-muted-foreground font-medium flex items-center space-x-1">
                            <span>Xem trước</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          )}
        </AnimatedCard>
      )}
    </>
  );
};

export default AssistantChatInterface; 