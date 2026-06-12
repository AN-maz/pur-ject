import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeBlock({ className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <div className="my-4 text-left rounded-lg overflow-hidden text-sm w-full shadow-md">
      <SyntaxHighlighter
        language={match[1]}
        style={oneDark}
        PreTag="div"
        customStyle={{ margin: 0, padding: '1.25rem' }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    // Gaya untuk inline code (misal: `const x = 1`)
    <code className="bg-neutral-800 text-software-bright px-1.5 py-0.5 rounded font-mono text-sm border border-neutral-700" {...props}>
      {children}
    </code>
  );
}