"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Plus, BookOpen, ChevronDown } from "lucide-react";

import { useChatStore } from "@/store/useChatStore";
import { simulateAIResponse } from "@/lib/ai/mockEngine";
import { ChatBubble } from "@/components/tutor/ChatBubble";
import { PromptInput } from "@/components/tutor/PromptInput";
import { Button } from "@/components/ui/button";

const SUBJECTS = ["Mathematics", "Physics", "Computer Science", "Biology", "Chemistry"];

const SUGGESTED_PROMPTS = [
  { title: "Explain photosynthesis", subject: "Biology" },
  { title: "Solve quadratic equations", subject: "Mathematics" },
  { title: "Explain Newton's laws", subject: "Physics" },
  { title: "Explain recursion", subject: "Computer Science" },
];

export default function AITutorPage() {
  const { 
    sessions, 
    activeSessionId, 
    currentSubject, 
    isTyping, 
    setSubject, 
    createSession, 
    setActiveSession, 
    addMessage 
  } = useChatStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeSession?.messages, isTyping]);

  const handleSend = async (content: string) => {
    let sessionId = activeSessionId;
    if (!sessionId) {
      sessionId = createSession(currentSubject);
    }

    addMessage(sessionId, {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: Date.now()
    });

    await simulateAIResponse(content, currentSubject, sessionId);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8 bg-background overflow-hidden">
      
      {/* Tutor Sidebar (History) */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-r border-border/50 bg-muted/10 flex-shrink-0 overflow-hidden flex flex-col"
          >
            <div className="p-4">
              <Button 
                onClick={() => createSession(currentSubject)}
                className="w-full justify-start gap-2 bg-card hover:bg-muted border border-border/50 text-foreground shadow-sm"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <div className="px-3 pb-2 pt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Chats
              </div>
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setActiveSession(session.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-3 truncate group ${
                    activeSessionId === session.id 
                      ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium" 
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <MessageSquare className={`h-4 w-4 flex-shrink-0 ${activeSessionId === session.id ? "" : "opacity-50"}`} />
                  <span className="truncate">{session.title}</span>
                </button>
              ))}
              {sessions.length === 0 && (
                <div className="px-3 py-4 text-sm text-muted-foreground text-center italic">
                  No conversations yet.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative">
        
        {/* Top Header */}
        <div className="h-14 border-b border-border/50 flex items-center justify-between px-4 bg-background/95 backdrop-blur z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <path d="M9 3v18"/>
              </svg>
            </button>
            <div className="font-semibold text-sm">FAEDLY Tutor</div>
          </div>
          
          {/* Subject Selector */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted border border-border/50 rounded-lg text-sm font-medium transition-colors">
              <BookOpen className="h-4 w-4 text-violet-500" />
              {currentSubject}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
              {SUBJECTS.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubject(sub)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${currentSubject === sub ? "text-violet-500 font-medium" : ""}`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto space-y-8 pb-4">
            
            {!activeSession || activeSession.messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center mt-20 sm:mt-32 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">How can I help you learn today?</h2>
                <p className="text-muted-foreground max-w-md mb-10">
                  I&apos;m your personal AI tutor. Ask me to explain concepts, help with homework, or quiz you on any topic.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt.title)}
                      className="p-4 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 hover:border-violet-500/30 transition-all text-left flex flex-col gap-2 group"
                    >
                      <span className="text-xs font-medium text-violet-500">{prompt.subject}</span>
                      <span className="text-sm font-medium group-hover:text-violet-600 dark:group-hover:text-violet-400">{prompt.title} →</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              activeSession.messages.map((msg, index) => (
                <ChatBubble 
                  key={msg.id} 
                  message={msg} 
                  isLast={index === activeSession.messages.length - 1 && msg.role === "assistant"} 
                />
              ))
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gradient-to-t from-background via-background to-transparent border-t border-border/10">
          <div className="max-w-3xl mx-auto">
            <PromptInput onSend={handleSend} disabled={isTyping} />
            <div className="text-center mt-3">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                FAEDLY AI can make mistakes. Verify important information.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
