import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Tema ala VS Code

const MarkdownViewer = ({ content }) => {
  return (
    <div className="text-white font-sans overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-software-bright)] mt-8 mb-4 border-b border-gray-700 pb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-software-tosca)] mt-6 mb-3" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold text-[var(--color-software-teal)] mt-4 mb-2" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-200 text-base md:text-lg" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-4 text-gray-200 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-4 text-gray-200 space-y-2" {...props} />,
          li: ({node, ...props}) => <li className="pl-2" {...props} />,
          a: ({node, ...props}) => <a className="text-[var(--color-software-tosca)] hover:text-[var(--color-software-bright)] underline" target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[var(--color-software-tosca)] bg-gray-800/50 p-4 my-4 italic text-gray-300 rounded-r-lg" {...props} />,
          
          // --- FIX UNTUK GAMBAR ---
          img: ({node, ...props}) => (
            <img className="max-w-full h-auto rounded-xl my-6 border border-gray-700 shadow-lg" loading="lazy" {...props} />
          ),

          // --- FIX UNTUK TABEL ---
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-6 border border-gray-700 rounded-lg">
              <table className="w-full text-left border-collapse min-w-[600px]" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => <thead className="bg-gray-800 text-[var(--color-software-tosca)]" {...props} />,
          th: ({node, ...props}) => <th className="py-3 px-4 font-bold border-b border-gray-700" {...props} />,
          td: ({node, ...props}) => <td className="py-3 px-4 border-b border-gray-800 text-gray-300" {...props} />,
          tr: ({node, ...props}) => <tr className="hover:bg-gray-800/50 transition-colors" {...props} />,

          // --- FIX UNTUK KODE (SYNTAX HIGHLIGHTER) ---
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-xl my-4 text-sm md:text-base border border-gray-700 shadow-md"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-800 text-[var(--color-software-bright)] px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;