// SPDX-FileCopyrightText: 2026 Greenbone AG
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// One matcher for result selection, previews and destination highlighting.
const ManualSearch = {
  matcher: (query) => {
    // Reuse the page language's Sphinx stemmer, but retain every query word
    // (including stopwords), its order and adjacency. Adjacent query words
    // may also form one complete compound in the text.
    if (!query.trim()) return () => [];
    query = query.trim();
    const stemmer = typeof Stemmer === "undefined" ? null : new Stemmer();
    const cache = new Map();
    const stem = (word) => {
      // Normalize compound spelling before stemming, retaining original offsets.
      const normalized = word.normalize("NFC").toLowerCase().replace(/[-\u2010\u2011\u00ad]/gu, "");
      if (!cache.has(normalized)) cache.set(normalized, stemmer ? stemmer.stemWord(normalized) : normalized);
      return cache.get(normalized);
    };
    const wordPattern = /[\p{L}\p{M}\p{N}_]+(?:[-\u2010\u2011\u00ad][\p{L}\p{M}\p{N}_]+)*/gu;
    const wordPhrase = new RegExp(`^${wordPattern.source}(?:\\s+${wordPattern.source})*$`, "u");
    const queryWords = wordPhrase.test(query) ? query.split(/\s+/) : null;
    const queryGroups = queryWords && queryWords.map((_, start) =>
      queryWords.slice(start).map((_, offset) =>
        stem(queryWords.slice(start, start + offset + 1).join(""))));
    // Queries containing punctuation (e.g. C++) keep literal phrase matching.
    const escaped = query.split(/\s+/).map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    ).join("\\s+");
    const pattern = new RegExp(`(?<![\\p{L}\\p{M}\\p{N}_])${escaped}(?![\\p{L}\\p{M}\\p{N}_])`, "giu");
    return (text) => {
      if (!queryWords) return [...text.matchAll(pattern)];
      const words = [...text.matchAll(wordPattern)];
      const matches = [];
      for (let i = 0; i < words.length; i++) {
        // Align one or more adjacent query words with each complete text word.
        // Never start/end inside a hyphenated compound or skip query words.
        const failed = new Set();
        const align = (queryIndex, textIndex) => {
          if (queryIndex === queryWords.length) return textIndex;
          if (textIndex >= words.length) return null;
          const key = `${queryIndex}:${textIndex}`;
          if (failed.has(key)) return null;
          if (textIndex > i) {
            const previous = words[textIndex - 1];
            if (!/^\s+$/u.test(text.slice(previous.index + previous[0].length, words[textIndex].index))) return null;
          }
          const actual = stem(words[textIndex][0]);
          for (let count = 1; count <= queryWords.length - queryIndex; count++) {
            if (queryGroups[queryIndex][count - 1] !== actual) continue;
            const end = align(queryIndex + count, textIndex + 1);
            if (end !== null) return end;
          }
          failed.add(key);
          return null;
        };
        const end = align(0, i);
        if (end === null) continue;
        const first = words[i];
        const last = words[end - 1];
        matches.push({index: first.index, 0: text.slice(first.index, last.index + last[0].length)});
        i = end - 1;
      }
      return matches;
    };
  },

  textRuns: (root, ownSection = false) => {
    const blocks = new Set([
      "ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "BR", "DD", "DIV", "DL", "DT",
      "FIGCAPTION", "FIGURE", "FOOTER", "H1", "H2", "H3", "H4", "H5", "H6",
      "HEADER", "HR", "LI", "MAIN", "NAV", "OL", "P", "PRE", "SECTION", "TABLE",
      "TBODY", "TD", "TH", "THEAD", "TR", "UL",
    ]);
    const runs = [];
    let run = [];
    const flush = () => {
      if (run.length) runs.push(run);
      run = [];
    };
    const visit = (node) => {
      if (ownSection && node !== root && node.nodeType === Node.ELEMENT_NODE
          && node.tagName === "SECTION" && node.id) {
        flush();
        return;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        run.push(node);
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      if (node.matches('script, style, textarea, button, select, svg, .no-search, .nohighlight, .highlighted, .headerlink, [hidden], [aria-hidden="true"]')) {
        flush();
        return;
      }
      const block = blocks.has(node.tagName);
      if (block) flush();
      node.childNodes.forEach(visit);
      if (block) flush();
    };
    visit(root);
    flush();

    return runs;
  },

  highlight: (root, findMatches) => {
    for (const nodes of ManualSearch.textRuns(root)) {
      const text = nodes.map((node) => node.nodeValue).join("");
      const matches = findMatches(text);
      let offset = text.length;
      // Work backwards so splitting text nodes cannot invalidate earlier offsets.
      for (const node of nodes.toReversed()) {
        offset -= node.length;
        const end = offset + node.length;
        for (const match of matches.toReversed()) {
          const start = Math.max(offset, match.index);
          const stop = Math.min(end, match.index + match[0].length);
          if (start >= stop) continue;
          const marked = node.splitText(start - offset);
          marked.splitText(stop - start);
          const span = document.createElement("span");
          span.className = "highlighted";
          marked.replaceWith(span);
          span.appendChild(marked);
        }
      }
    }
  },
};
