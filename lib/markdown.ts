/** Minimal markdown → HTML for blog posts (static export, no runtime deps). */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Site-ready copy: Field Notes + books only. The encyclopedia is unannounced, so
 * any sentence naming it is dropped before render as a guard against drafts that
 * reintroduce the CTA. Paragraphs left empty by the filter are removed.
 */
export function siteReadyMarkdown(md: string): string {
  const mentionsUnannounced = (sentence: string) =>
    /Masters X Universe Encyclopedia/i.test(sentence);

  return md
    .split("\n")
    .map((line) => {
      if (!mentionsUnannounced(line)) return line;
      const kept = line
        .split(/(?<=[.!?])\s+/)
        .filter((sentence) => !mentionsUnannounced(sentence))
        .join(" ")
        .trim();
      return kept;
    })
    .filter((line, i, lines) => {
      const isBlank = line.trim() === "";
      return !(isBlank && lines[i - 1]?.trim() === "");
    })
    .join("\n");
}

export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    out.push(`<p class="blog-body">${inlineFormat(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const inlineFormat = (text: string): string => {
    let s = escapeHtml(text);
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
    s = s.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>'
    );
    return s;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") {
      flushParagraph();
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushParagraph();
      out.push(`<h1 class="blog-h1">${inlineFormat(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      out.push(`<h2 class="blog-h2">${inlineFormat(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      out.push(`<h3 class="blog-h3">${inlineFormat(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed === "---") {
      flushParagraph();
      out.push('<hr class="blog-hr" />');
      continue;
    }
    if (trimmed.startsWith("*") && trimmed.endsWith("*") && !trimmed.startsWith("**")) {
      flushParagraph();
      out.push(`<p class="blog-dek">${inlineFormat(trimmed.slice(1, -1))}</p>`);
      continue;
    }
    paragraph.push(trimmed);
  }
  flushParagraph();
  return out.join("\n");
}
