import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/components/ui/button";
import { motion } from "framer-motion";
import { SendHorizonal, Bot, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { toast } from "sonner";
import { useChat } from "../context/ChatContext";
import { parseMessageBlocks } from "../helper/messageParser.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";
import StartConversation from "./StartConvo";
import { Textarea } from "./components/ui/textarea";

const Main = () => {
  const auth = useAuth();
  const chat = useChat();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const scrollToBottom = () => {
      const container = chatContainerRef.current;
      if (!container) return;
      const shouldAutoScroll =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        200;
      if (shouldAutoScroll) {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      } else {
        container.scrollTop = container.scrollHeight;
      }
    };
    const timeout = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timeout);
  }, [chat.messages]);

  const handleSend = async (inputText, currentConvoId) => {
    if (!inputText.trim()) return;
    const userMessage = { role: "user", content: inputText };
    const loadingMessage = { role: "assistant", content: "Giving Response..." };
    const updatedMessages = [...chat.messages, userMessage, loadingMessage];
    chat.setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      await chat.startOrContinueConvo(inputText, currentConvoId);
    } catch {
      toast.error("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  const handleNewConvo = () => {
    try {
      chat.setCurrentConvoId("");
      chat.setMessages("");
      navigate("/new-chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full font-manrope max-w-4xl mx-auto">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4 px-4 pt-20 pb-6 scrollbar-hide"
      >
        {chat.messages ? (
          chat.messages.map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex gap-3 items-start max-w-[92%] sm:max-w-[80%] ${
                message.role === "user" ? "ml-auto flex-row-reverse" : ""
              }`}
            >
              <div className="shrink-0">
                {message.role === "user" ? (
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={auth.user?.profilePic} alt="Profile" />
                    <AvatarFallback>
                      {auth.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Bot className="text-green-400 w-7 h-7 mt-1" />
                )}
              </div>

              <div
                className={`w-full p-3 rounded-xl text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-900 text-gray-100"
                }`}
              >
                {parseMessageBlocks({ messageObj: message.content }).map(
                  (block, i) =>
                    block.type === "code" ? (
                      <pre
                      key={i}
                      className="relative overflow-x-auto pt-8 p-3 rounded-md bg-gray-950"
                    >
                      {/* Header (language + copy button) */}
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-3 py-2 bg-gray-800 rounded-t-md text-xs text-gray-300">
                        <span className="uppercase font-mono">{block.language || "text"}</span>
                        <button
                          className="flex items-center text-md gap-1 hover:text-white transition"
                          onClick={() => {
                            navigator.clipboard.writeText(block.content);
                            toast.success("Copied to clipboard!");
                          }}
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                    
                      <SyntaxHighlighter
                        style={coldarkDark}
                        language={block.language || "text"}
                        wrapLines
                        customStyle={{ background: "transparent", margin: 0 }}
                      >
                        {block.content}
                      </SyntaxHighlighter>
                    </pre>
                    
                    ) : (
                      <div
                        key={i}
                        className="prose prose-invert max-w-full break-words overflow-x-auto text-[16px] leading-loose 
                        prose-p:my-3 prose-li:my-2 prose-ol:my-2 prose-ul:my-2
                        [&_table]:w-full [&_table]:border [&_table]:border-gray-700 [&_table]:rounded-md [&_table]:border-separate [&_table]:border-spacing-0
                        [&_th]:bg-gray-800 [&_th]:text-white [&_th]:px-4 [&_th]:py-2 [&_th]:border [&_th]:border-gray-700
                        [&_td]:px-4 [&_td]:py-2 [&_td]:border [&_td]:border-gray-700
                        [&_th:first-child]:rounded-tl-md [&_th:last-child]:rounded-tr-md
                        [&_tr:last-child>td:first-child]:rounded-bl-md [&_tr:last-child>td:last-child]:rounded-br-md"
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {block.content}
                        </ReactMarkdown>
                      </div>
                    )
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <StartConversation />
        )}
      </div>

      {/* Sticky Input Field */}
      <div className="sticky bottom-0 z-10 w-full px-4 py-3">
        <div className="flex items-center gap-3 w-full">
          <div className="relative w-full">
            <Textarea
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  handleSend(input, chat.currentConvoId);
                }
              }}
              className="w-full bg-gray-800 border border-gray-600 text-white pr-12"
            />
            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md transition ${
                input.trim()
                  ? "text-indigo-500 hover:bg-gray-700"
                  : "text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => handleSend(input, chat.currentConvoId)}
              disabled={!input.trim()}
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>

          <Button
            variant="ghost"
            className="bg-indigo-500 hover text-white px-4 py-2 rounded-md"
            onClick={handleNewConvo}
          >
            <span className="hidden sm:inline">✨ New Chat</span>
            <span className="sm:hidden text-xl font-bold">+</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
