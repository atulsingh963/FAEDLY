"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function PromptInput({ onSend, disabled }: PromptInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="relative p-1 bg-card rounded-2xl border border-border/60 shadow-lg shadow-black/5 focus-within:ring-2 focus-within:ring-violet-500/50 transition-shadow">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything or paste a problem..."
        className="w-full max-h-[200px] bg-transparent border-0 resize-none py-3 px-4 text-sm focus:ring-0 placeholder:text-muted-foreground outline-none"
        rows={1}
        disabled={disabled}
      />
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex items-center gap-1">
          <button type="button" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors">
            <Paperclip className="h-4 w-4" />
          </button>
          <button type="button" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors">
            <ImageIcon className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className={cn(
            "p-2 rounded-xl transition-all flex items-center justify-center",
            input.trim() && !disabled 
              ? "bg-violet-600 text-white shadow-md hover:bg-violet-700 hover:scale-105" 
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
