// components/MarkdownRenderer.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; 
import { Copy } from "lucide-react";

const MarkdownRenderer = ({ content }) => {
  const copyToClipboard = (code) => {
    navigator.clipboard?.writeText(code);
  };

  return (
    <div className="text-sm leading-6 text-gray-100 font-sans space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ inline, className, children, ...props }) {
            const codeString = Array.isArray(children)
              ? children.join("")
              : String(children);

            if (inline) {
              return (
                <code className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }

            const langMatch = /language-(\w+)/.exec(className || "");
            const lang = langMatch?.[1] || "text";

            return (
              <div className="relative bg-[#1e1e1e] rounded-md overflow-hidden my-2">
                <div className="flex justify-between items-center px-3 py-1.5 bg-[#2a2a2a] text-xs text-gray-300 font-mono">
                  <span>{lang}</span>
                  <button
                    onClick={() => copyToClipboard(codeString)}
                    className="hover:text-indigo-400"
                    aria-label="Copy code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="px-4 py-3 overflow-x-auto text-sm">
                  <code className="text-white">{codeString.replace(/\n$/, "")}</code>
                </pre>
              </div>
            );
          },
          p({ node, ...props }) {
            return <p className="text-gray-200" {...props} />;
          },
          h1({ node, ...props }) {
            return <h1 className="text-2xl font-bold mt-4 mb-2 text-white" {...props} />;
          },
          h2({ node, ...props }) {
            return <h2 className="text-xl font-semibold mt-3 mb-2 text-white" {...props} />;
          },
          h3({ node, ...props }) {
            return <h3 className="text-lg font-semibold mt-2 mb-1 text-white" {...props} />;
          },
          ul({ node, ...props }) {
            return <ul className="list-disc list-inside text-gray-200" {...props} />;
          },
          li({ node, ...props }) {
            return <li className="ml-4" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
