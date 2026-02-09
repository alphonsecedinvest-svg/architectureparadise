/**
 * Renders markdown-like blog content as HTML.
 * For now this handles the mock data (plain markdown string).
 * When Sanity is connected, this will be replaced with PortableText rendering.
 */

interface Props {
  content: string;
}

function parseMarkdown(md: string): string {
  return md
    // Tables — convert markdown tables to HTML
    .replace(/^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/gm, (_match, header: string, _sep: string, body: string) => {
      const headers = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th class="px-4 py-2 text-left text-sm font-semibold text-text-primary border-b border-border">${c.trim()}</th>`).join('');
      const rows = body.trim().split('\n').map((row: string) => {
        const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td class="px-4 py-2 text-sm text-text-secondary border-b border-border">${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<div class="overflow-x-auto my-6"><table class="w-full border-collapse"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    })
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-text-primary mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-text-primary mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-accent pl-4 py-2 my-4 text-text-secondary italic">$1</blockquote>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-text-secondary">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-text-secondary list-decimal">$1</li>')
    // Paragraphs (lines that aren't already HTML)
    .replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="text-text-secondary leading-relaxed mb-4">$1</p>')
    // Clean up consecutive list items into ul/ol
    .replace(/((?:<li[^>]*>[^<]*<\/li>\s*)+)/g, '<ul class="list-disc space-y-1 my-4">$1</ul>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-border" />');
}

export default function BlogContent({ content }: Props) {
  const html = parseMarkdown(content);

  return (
    <div
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
