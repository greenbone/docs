// SPDX-FileCopyrightText: 2026 Greenbone AG
//
// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {
  "use strict";

  // Carry the original phrase in each result URL, including links opened in a
  // new tab. Shared localStorage cannot reliably identify the originating query.
  const results = document.getElementById("search-results");
  const phrase = new URL(window.location.href).searchParams.get("q")?.trim();
  if (results && phrase) {
    const updateLinks = () => {
      results.querySelectorAll("li > a").forEach((link) => {
        const url = new URL(link.href);
        const effective = link.parentElement.querySelector(".context")?.dataset.highlightQuery
          || (typeof Search !== "undefined" && Search.highlightQuery) || phrase;
        url.searchParams.set("highlight", effective);
        if (link.href !== url.href) link.href = url.href;
      });
    };
    new MutationObserver(updateLinks).observe(results, {childList: true, subtree: true});
    updateLinks();
  }

  SphinxHighlight.highlightSearchWords = () => {
    localStorage.removeItem("sphinx_highlight_terms");
    if (!SPHINX_HIGHLIGHT_ENABLED) return;
    const query = new URL(window.location.href).searchParams.get("highlight")?.trim();
    const article = document.querySelector('[role="main"]');
    if (!query || !article) return;

    ManualSearch.highlight(article, ManualSearch.matcher(query));
  };
})();
