import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Normalize newlines and split into blocks
  const blocks = content.replace(/\r\n/g, '\n').split(/\n\s*\n/);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Headers: # Title, ## Section
        if (trimmed.startsWith('#')) {
          const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
          if (match) {
            const level = match[1].length;
            const text = match[2];
            const children = renderInlineText(text);
            if (level === 1) return <h1 key={index} className="text-3xl font-bold font-sans tracking-tight text-[var(--text)] mt-6 mb-3">{children}</h1>;
            if (level === 2) return <h2 key={index} className="text-2xl font-bold font-sans tracking-tight text-[var(--text)] mt-5 mb-2">{children}</h2>;
            return <h3 key={index} className="text-xl font-bold font-sans tracking-tight text-[var(--text)] mt-4 mb-2">{children}</h3>;
          }
        }

        // 2. Blockquotes: > Quote
        if (trimmed.startsWith('>')) {
          const text = trimmed.replace(/^>\s*/gm, '');
          return (
            <blockquote key={index} className="border-l-2 border-red-500 pl-4 py-1 italic my-4 text-[var(--text-2)] bg-[var(--surface)]/40 rounded-r">
              {renderInlineText(text)}
            </blockquote>
          );
        }

        // 3. Lists: - item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const lines = trimmed.split('\n');
          return (
            <ul key={index} className="list-disc pl-5 space-y-1.5 my-2">
              {lines.map((line, lIdx) => {
                const text = line.replace(/^[-*]\s+/, '');
                return <li key={lIdx} className="text-[14px] text-[var(--text)]">{renderInlineText(text)}</li>;
              })}
            </ul>
          );
        }

        // 4. Code Blocks: ```js ... ```
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const lastLineIdx = lines.length - 1;
          const codeLines = lines.slice(1, lines[lastLineIdx].trim() === '```' ? lastLineIdx : lines.length);
          const code = codeLines.join('\n');
          return (
            <pre key={index} className="bg-[var(--code-bg)] border border-[var(--border)] p-4 rounded overflow-x-auto font-mono text-xs my-4 leading-normal">
              <code>{code}</code>
            </pre>
          );
        }

        // Default Paragraph
        return (
          <p key={index} className="text-[14.5px] leading-relaxed text-[var(--text)]">
            {renderInlineText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Helper to parse inline styles like **bold** and `code`
function renderInlineText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[var(--text)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="font-mono text-[13px] bg-[var(--code-bg)] px-1 py-0.5 rounded border border-[var(--border)] text-red-500">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
