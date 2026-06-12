import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';

export function SlideViewer({ markdownContent }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 lg:p-12 text-white overflow-y-auto">
      <div className="max-w-3xl w-full text-left">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="text-4xl lg:text-5xl font-extrabold text-software-bright text-center mb-6 tracking-tight">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl lg:text-3xl font-bold text-software-tosca border-b border-software-teal/30 pb-2 mb-4 w-full">{children}</h2>,
            p: ({ children }) => <p className="text-lg lg:text-xl text-neutral-200 leading-relaxed my-3">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-lg lg:text-xl text-neutral-300 my-4 pl-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-lg lg:text-xl text-neutral-300 my-4 pl-2">{children}</ol>,
            li: ({ children }) => <li className="marker:text-software-tosca">{children}</li>,
            strong: ({ children }) => <strong className="text-software-tosca font-bold">{children}</strong>,
            code: CodeBlock
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}