import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { CodeBlock } from './CodeBlock';

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

export function SlideViewer({ markdownContent, darkMode, isPrint = false }) {
  const Container = isPrint ? 'div' : motion.div;
  const Ol = isPrint ? 'ol' : motion.ol;
  const Li = isPrint ? 'li' : motion.li;
  const Tbody = isPrint ? 'tbody' : motion.tbody;
  const Tr = isPrint ? 'tr' : motion.tr;

  const containerProps = isPrint ? {} : {
    key: markdownContent,
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' }
  };

  return (
    <Container
      {...containerProps}
      className={`w-full flex flex-col justify-start items-center transition-colors duration-300 ${
        isPrint 
          ? 'h-auto overflow-visible p-12 bg-white text-neutral-900' 
          : `h-full p-8 lg:p-12 overflow-y-auto scrollbar-thin ${
              darkMode ? 'bg-neutral-950 text-white scrollbar-thumb-neutral-800' : 'bg-neutral-50 text-neutral-900 scrollbar-thumb-neutral-300'
            }`
      }`}
    >
      <div className="max-w-3xl w-full text-left my-auto pt-6 pb-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className={`text-4xl lg:text-5xl font-extrabold text-center mb-8 tracking-tight ${
                isPrint ? 'text-software-teal' : darkMode ? 'text-software-bright' : 'text-software-teal'
              }`}>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className={`text-2xl lg:text-3xl font-bold border-b pb-2 mb-6 w-full ${
                isPrint ? 'text-software-teal border-neutral-300' : darkMode ? 'text-software-tosca border-software-teal/30' : 'text-software-teal border-neutral-200'
              }`}>{children}</h2>
            ),
            p: ({ children }) => (
              <p className={`text-lg lg:text-xl leading-relaxed my-3 ${
                isPrint ? 'text-neutral-800' : darkMode ? 'text-neutral-200' : 'text-neutral-800'
              }`}>{children}</p>
            ),
            
            ol: ({ children }) => (
              <Ol variants={listContainerVariants} initial={isPrint ? "show" : "hidden"} animate="show" className="flex flex-col gap-3.5 my-4 max-w-2xl mx-auto w-full group/list">
                {children}
              </Ol>
            ),
            
            li: ({ node, ordered, index, children }) => {
              if (ordered) {
                return (
                  <Li 
                    variants={listItemVariants}
                    className={`rounded-xl p-3.5 shadow-sm flex items-center gap-4 border text-left w-full list-none ${
                      isPrint 
                        ? 'bg-white border-neutral-300 text-neutral-800' 
                        : `transition-all duration-300 group-hover/list:opacity-40 hover:!opacity-100 hover:scale-[1.02] ${
                            darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-800 shadow-neutral-100'
                          }`
                    }`}
                  >
                    <div className="bg-software-teal text-white font-bold px-3 py-1 rounded-lg text-sm font-mono tracking-wider shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 text-base font-bold leading-tight">
                      {children}
                    </div>
                  </Li>
                );
              }
              return (
                <li className={`flex items-start gap-2.5 text-left my-2 text-base md:text-lg ${
                  isPrint ? 'text-neutral-800' : darkMode ? 'text-neutral-200' : 'text-neutral-700'
                } ${!isPrint && 'transition-all duration-300 group-hover/list:opacity-40 hover:!opacity-100'}`}>
                  <span className={`inline-block w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${
                    isPrint ? 'bg-software-teal' : darkMode ? 'bg-software-bright shadow-[0_0_8px_rgba(57,255,90,0.6)]' : 'bg-software-tosca'
                  }`}></span>
                  <span>{children}</span>
                </li>
              );
            },

            table: ({ children }) => (
              <div className={`w-full overflow-x-auto my-6 rounded-2xl border ${
                isPrint ? 'border-neutral-300 bg-white' : darkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-white shadow-sm'
              }`}>
                <table className="w-full text-left border-collapse">{children}</table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className={`border-b ${
                isPrint ? 'bg-neutral-100 text-software-teal border-neutral-300' : darkMode ? 'bg-neutral-900 text-software-bright border-neutral-800' : 'bg-neutral-100 text-software-teal border-neutral-200'
              }`}>{children}</thead>
            ),
            th: ({ children }) => <th className="p-4 text-sm md:text-base font-extrabold uppercase tracking-wider border-r border-neutral-400/10 last:border-r-0">{children}</th>,
            
            tbody: ({ children }) => (
              <Tbody variants={listContainerVariants} initial={isPrint ? "show" : "hidden"} animate="show" className="group/table">
                {children}
              </Tbody>
            ),
            td: ({ children }) => <td className="p-4 text-sm md:text-base border-b border-neutral-400/10 border-r border-neutral-400/10 last:border-r-0 align-top">{children}</td>,
            tr: ({ children }) => (
              <Tr 
                variants={listItemVariants}
                className={isPrint ? 'text-neutral-700' : `transition-all duration-300 group-hover/table:opacity-35 hover:!opacity-100 ${
                  darkMode ? 'text-neutral-300 hover:bg-neutral-800/40' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {children}
              </Tr>
            ),

            blockquote: ({ children }) => (
              <div className={`border rounded-xl p-4 my-6 text-left shadow-md text-sm md:text-base ${
                isPrint 
                  ? 'bg-neutral-50 border-neutral-300 text-neutral-800' 
                  : darkMode 
                    ? 'bg-gradient-to-r from-software-teal/10 to-neutral-900/20 border-software-teal/40 text-neutral-200' 
                    : 'bg-amber-500/5 border-amber-500/30 text-neutral-800 shadow-sm'
              }`}>
                {children}
              </div>
            ),

            strong: ({ children }) => <strong className="text-software-tosca font-extrabold">{children}</strong>,
            ul: ({ children }) => <ul className="flex flex-col my-2 max-w-2xl w-full group/list">{children}</ul>,
            code: (props) => <CodeBlock {...props} darkMode={isPrint ? false : darkMode} />
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </Container>
  );
}