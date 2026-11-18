// SPDX-FileCopyrightText: 2026 Greenbone AG
//
// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {
  "use strict";

  const parseQuery = Search._parseQuery;
  Search._parseQuery = (query) => {
    const parsed = parseQuery(query);
    // Carry the original phrase to asynchronous summaries, not individual stems.
    parsed[1] = new Set([query]);
    // Sphinx would otherwise highlight each query word separately after fetch.
    parsed[3] = new Set();
    return parsed;
  };

  const performSearch = (query) => {
    const matches = ManualSearch.matcher(query);
    const index = SECTION_SEARCH_INDEX;
    const results = [];
    index.docnames.forEach((key, file) => {
      // Test actual contiguous text, not a bag of stemmed words. Index keywords,
      // object names and title substrings must not bypass this requirement.
      if (!index.texts[file].some((text) => matches(text).length)) return;
      const titleMatch = matches(index.headings[file]).length > 0;
      const [docname, anchor] = index.targets[key];
      const result = [
        docname, index.titles[file], anchor, null,
        titleMatch ? Scorer.title + 1 : Scorer.term,
        index.filenames[file], titleMatch ? SearchResultKind.title : SearchResultKind.text,
      ];
      if (Scorer.score) result[4] = Scorer.score(result);
      results.push(result);
    });
    // Sphinx renders from the end of the array, highest score first.
    return results.sort(_orderResultsByScoreThenName);
  };

  Search._performSearch = (query, summaryQueries) => {
    let effectiveQuery = query;
    let results = performSearch(query);
    if (!results.length) {
      const prefixQuery = ManualSearch.prefixQuery(query);
      if (prefixQuery !== query) {
        effectiveQuery = prefixQuery;
        results = performSearch(prefixQuery);
      }
    }
    // Keep the effective phrase with this request for asynchronous previews.
    if (summaryQueries) {
      summaryQueries.clear();
      summaryQueries.add(effectiveQuery);
    }
    Search.highlightQuery = effectiveQuery;
    return results;
  };

  Search.makeSearchSummary = (html, queries, anchor) => {
    const matches = ManualSearch.matcher([...queries][0] || "");
    const page = new DOMParser().parseFromString(html, "text/html");
    const root = anchor ? page.getElementById(anchor.slice(1)) : page.querySelector('[role="main"]');
    const summary = document.createElement("p");
    summary.className = "context";
    summary.dataset.highlightQuery = [...queries][0] || "";
    if (!root) return summary;
    for (const nodes of ManualSearch.textRuns(root, true)) {
      const text = nodes.map((node) => node.nodeValue).join("");
      const found = matches(text);
      if (!found.length) continue;
      let start = Math.max(0, found[0].index - 80);
      let end = Math.min(text.length, found[0].index + found[0][0].length + 160);
      // Do not manufacture word-boundary matches by cutting through a token.
      while (start > 0 && !/\s/u.test(text[start - 1])) start--;
      while (end < text.length && !/\s/u.test(text[end])) end++;
      summary.textContent = (start ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
      if (SPHINX_HIGHLIGHT_ENABLED) ManualSearch.highlight(summary, matches);
      break;
    }
    return summary;
  };
})();
