"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
            const match = /language-(\w+)/.exec(className || "");
            const isCodeBlock = !inline && match;
            
            if (!isCodeBlock) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded-md text-violet-600 dark:text-violet-400 font-mono text-sm" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} />
            );
          },
          p({ children }) {
            return <p className="mb-4 last:mb-0">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="pl-1">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-violet-500/50 pl-4 py-1 italic bg-muted/30 rounded-r-lg mb-4">
                {children}
              </blockquote>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ language, value }: { language: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden my-4 border border-border/50 bg-[#1E1E1E]">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50 text-xs text-muted-foreground font-mono">
        <span>{language}</span>
        <button 
          onClick={handleCopy}
          className="hover:text-foreground transition-colors p-1"
          title="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: "1rem", fontSize: "0.875rem", background: "transparent" }}
        wrapLines={true}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
