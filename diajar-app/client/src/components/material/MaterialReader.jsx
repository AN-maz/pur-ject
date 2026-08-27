import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'

export default function MaterialReader({ content }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-3xl font-extrabold text-navy mt-8 mb-4 pb-2 border-b-2 border-slate-100" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-2xl font-bold text-navy mt-7 mb-3" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-xl font-bold text-navy mt-5 mb-2" {...props} />
        ),
        p: ({ ...props }) => <p className="mb-4 text-slate-700 leading-relaxed" {...props} />,
        ul: ({ ...props }) => <ul className="mb-4 pl-6 list-disc space-y-1" {...props} />,
        ol: ({ ...props }) => <ol className="mb-4 pl-6 list-decimal space-y-1" {...props} />,
        li: ({ ...props }) => <li className="mb-1" {...props} />,
        code: ({ inline, ...props }) => {
          if (inline) {
            return (
              <code className="px-2 py-1 bg-slate-100 text-sm rounded text-red-600 font-mono" {...props} />
            )
          }
          return <code className="block overflow-x-auto text-sm" {...props} />
        },
        pre: ({ ...props }) => (
          <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto mb-4" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic text-slate-600 my-4" {...props} />
        ),
        img: ({ ...props }) => (
          <img className="max-w-full rounded-xl my-4" {...props} />
        ),
        table: ({ ...props }) => (
          <table className="w-full border-collapse my-4 text-sm" {...props} />
        ),
        th: ({ ...props }) => <th className="border border-slate-200 px-3 py-2 text-left bg-slate-50" {...props} />,
        td: ({ ...props }) => <td className="border border-slate-200 px-3 py-2" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
