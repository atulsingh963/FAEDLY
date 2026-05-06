"use client";

import { motion } from "framer-motion";
import { Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw, Bookmark } from "lucide-react";
import { Message } from "@/store/useChatStore";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export function ChatBubble({ message, isLast }: { message: Message; isLast: boolean }) {
  const isAI = message.role === "assistant";
  const { user } = useAuthStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex w-full gap-4", isAI ? "justify-start" : "justify-end")}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 mt-1 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Message Content Container */}
      <div className={cn("flex flex-col max-w-[85%] sm:max-w-[75%]", isAI ? "items-start" : "items-end")}>
        <div 
          className={cn(
            "px-5 py-3.5 shadow-sm rounded-2xl",
            isAI 
              ? "bg-card border border-border/50 rounded-tl-sm text-foreground" 
              : "bg-violet-600 text-white rounded-tr-sm"
          )}
        >
          {isAI ? (
            message.content === "" ? (
              <div className="flex items-center gap-1.5 h-6">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              </div>
            ) : (
              <MarkdownRenderer content={message.content} />
            )
          ) : (
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          )}
        </div>

        {/* Message Actions (Only for AI) */}
        {isAI && message.content !== "" && (
          <div className="flex items-center gap-2 mt-2 ml-1">
            <button onClick={handleCopy} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Copy">
              <Copy className="h-3.5 w-3.5" />
            </button>
            {isLast && (
              <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Regenerate">
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Good response">
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Bad response">
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
            <div className="w-px h-3 bg-border mx-1" />
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Save Note">
              <Bookmark className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-muted flex items-center justify-center border border-border/50 text-xs font-bold shadow-sm">
          {user?.displayName?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || "U"}
        </div>
      )}
    </motion.div>
  );
}
