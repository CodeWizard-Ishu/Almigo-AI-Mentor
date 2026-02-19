import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreamingBubbleProps {
  content: string;
}

export function StreamingBubble({ content }: StreamingBubbleProps) {
  return (
    <div className="flex gap-3 px-4 py-6 bg-muted/50">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
        <Bot className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <span className="text-sm font-semibold">Almigo</span>
        <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ children }) => (
                <pre className="bg-secondary rounded-lg p-4 overflow-x-auto my-3">
                  {children}
                </pre>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code
                    className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code className={cn(className, "text-sm font-mono")} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
          <span className="inline-block w-2 h-5 bg-foreground/70 animate-pulse ml-0.5 align-text-bottom" />
        </div>
      </div>
    </div>
  );
}
