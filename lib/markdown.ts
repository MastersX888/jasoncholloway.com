/** Minimal markdown → HTML for blog posts (static export, no runtime deps). */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Site-ready closing: Field Notes + books only (no encyclopedia announce). */
export function siteReadyMarkdown(md: string): string {
  return md
    .replace(
      /The full apparatus — tables, sources, and every grade — arrives in the Masters X Universe Encyclopedia\. Until then, /g,
      ""
    )
    .replace(
      /The full apparatus — the entry on the Ars Notoria, the notae plates, the sources, and the honest grades — arrives in the Masters X Universe Encyclopedia\. Until then, /g,
      ""
    )
    .replace(
      /Essay One of the encyclopedia, "Sound Into Form," walks this whole chain with sources graded line by line, alongside entries on the Strahov discs and Tanaka's protocols\. Until it prints, /g,
      ""
    )
    .replace(
      /The full five-tradition essay, with sources, arrives in the Masters X Universe Encyclopedia; /g,
      ""
    )
    .replace(
      /The full entry — with the parallel table and every source — arrives in the Masters X Universe Encyclopedia\. /g,
      ""
    )
    .replace(
      /The encyclopedia will shelve these side by side:[\s\S]*?That is the whole editorial method, applied to the trilogy's politics\. Until it prints, /g,
      ""
    )
    .replace(
      /The full entries — Kansas City and Quality Hill, Moreau, the church research file — arrive in the Masters X Universe Encyclopedia\. /g,
      ""
    )
    .replace(
      /Every one of those essays ran on the same rule, and it is the rule the trilogy exists to argue for: label the seam\. What was measured, what was documented, what was invented — kept distinct, kept public, kept checkable\. The full apparatus arrives in the Masters X Universe Encyclopedia from Seventh City Press\. /g,
      "Every one of those essays ran on the same rule, and it is the rule the trilogy exists to argue for: label the seam. What was measured, what was documented, what was invented — kept distinct, kept public, kept checkable. "
    )
    .replace(
      /The two-register rule that governs the encyclopedia, the Field Notes, and these essays/g,
      "The two-register rule that governs the Field Notes and these essays"
    )
    .replace(/for the encyclopedia's bibliography/g, "in the research archive")
    .replace(/the encyclopedia's entry on William Masters/g, "the Field Notes entry on William Masters")
    .replace(/the encyclopedia's honesty rule/g, "the Field Notes honesty rule")
    .replace(/the encyclopedia's job/g, "the Field Notes job")
    .replace(
      /Which brings me to the coda, and a look inside the encyclopedia project this whole series has been trailing\.[\s\S]*?A fictional document about ending secrecy deserves, of all things, transparent packaging\.\n\n/g,
      ""
    );
}

export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inParagraph = false;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    out.push(`<p class="blog-body">${inlineFormat(paragraph.join(" "))}</p>`);
    paragraph = [];
    inParagraph = false;
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
    inParagraph = true;
    paragraph.push(trimmed);
  }
  flushParagraph();
  return out.join("\n");
}
