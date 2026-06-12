import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeBlock({ className, children, darkMode, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  const codeText = String(children).replace(/\n$/, '');

  return match ? (
    <div className="my-4 text-left rounded-lg overflow-hidden text-sm w-full shadow-md">
      <SyntaxHighlighter
        language={match[1]}
        style={oneDark}
        PreTag="div"
        customStyle={{ margin: 0, padding: '1.25rem' }}
        {...props}
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  ) : (
    // SEKARANG INLINE CODE MENYESUAIKAN MODE (Jauh lebih soft di Light Mode)
    <code className={`px-1.5 py-0.5 rounded font-mono text-xs md:text-sm border transition-all duration-300 ${
      darkMode 
        ? 'bg-neutral-800 text-software-bright border-neutral-700' 
        : 'bg-neutral-100 text-software-teal border-neutral-200/80 font-semibold shadow-xs'
    }`} {...props}>
      {children}
    </code>
  );
}