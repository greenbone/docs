![Greenbone Logo](https://www.greenbone.net/wp-content/uploads/greenbone-logo-2025-300x77.png)

# Documentation for the Greenbone Community Edition

The documentation is build automatically via GitHub Actions and available at
[https://greenbone.github.io/docs/](https://greenbone.github.io/docs/)

## Requirements

For a manual build locally Python >= 3.9 and [uv] is required.

## Install uv

The project requires [uv]. See [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)
for detailed instructions for installing uv.

A simple method to install uv is to use [pipx]. pipx can be installed with
the following command on Debian based systems:

```sh
sudo apt install pipx
```

Install uv using pipx

```sh
python3 -m pipx install uv
```

## Manual Build

After installing [uv], the docs can be built with:

```sh
uv run make html
```

To open the generated HTML docs with Firefox you can run:

```sh
firefox _build/html/index.html
```

## Auto Rebuild

Alternatively it is possible to start a local HTTP server that automatically
rebuilds the docs on every file change:

```sh
uv run make livehtml
```

To open the served docs with Firefox you can run:

```sh
firefox http://127.0.0.1:8000
```

## Writing Content

The documentation uses [Sphinx](https://www.sphinx-doc.org/) in conjunction with
[myst](https://myst-parser.readthedocs.io) to create the HTML content. Each
document uses [Markdown](https://en.wikipedia.org/wiki/Markdown) with
[extended syntax](https://myst-parser.readthedocs.io/en/latest/intro.html#extend-markdown-with-myst-syntax)
to integrate with Docutils and Sphinx. All Markdown files are in the [src](./src) folder or one of its sub-folders.

The entry point is the [index.md](./src/index.md) file. It contains a [toctree directive](https://myst-parser.readthedocs.io/en/latest/syntax/organising_content.html#using-toctree-to-include-other-documents-as-children)
to reference and include other Markdown files.

When a Pull Request is reviewed and merged, the HTML content is built
automatically and published afterwards to [https://greenbone.github.io/docs/](https://greenbone.github.io/docs/)
via a GitHub Actions [workflow](.github/workflows/github-pages.yml).

For viewing the HTML content during development, please take a look at the
[auto rebuild](#auto-rebuild) and/or [manual build](#manual-build) sections in
this README.

[uv]: https://docs.astral.sh/uv/
[pipx]: https://pipx.pypa.io/stable/

## HTML Search

The `section_search` extension builds a section-level index from rendered
HTML and directory HTML pages. `src/_templates/search.html` loads it only on the
search page. Each section stores its own contiguous text runs, excluding child
sections, hidden content and content marked `no-search` or `nohighlight`.

`src/_static/search-phrase.js` supplies one language-aware whole-phrase matcher for
result selection, preview snippets and destination highlighting. All query words
must occur next to each other in the original order within a text run. Words
split across paragraphs, table cells or child sections do not form a match.
Partial-word matches, isolated index keywords and synthetic breadcrumb text
cannot independently create a result. Matching section headings are ranked
first, with no minimum query-to-heading length ratio.

`src/_static/section-search.js` links each result to the matching section heading and
builds the preview around an actual full-phrase match. Sphinx's individual-token
preview highlighting is disabled. The index is regenerated on every HTML build,
including incremental builds, without changing Sphinx's own index. No external
search service is needed. Other output formats are unchanged.

The integration depends on Sphinx's JavaScript search API. When updating Sphinx or
Furo, run the search regression tests (Node.js 24 and the uv dependencies are
required):

```sh
npm ci --prefix tests --ignore-scripts
npm test --prefix tests
uv run python -m unittest discover -s tests -v
```

The tests build English HTML and German directory HTML fixtures and check title
matches, section links, nested sections, language stemming and incremental builds.

Search-result links carry the original query in a `highlight` URL parameter.
On destination pages, `search-highlight.js` compares whole words using the same
language-specific Sphinx stemmer as the search. All query words must match in
order and next to each other, including stopwords. Thus `support bundle` also
highlights `support bundles`, but not standalone `support` or `bundle`, or words
separated by additional words or punctuation. Stemming is heuristic, not full
linguistic lemmatization. Internal hyphens are normalized before stemming:
`Support-Paket` and `Supportpaket` match in both directions, including German
inflections such as `Support-Pakete`. ASCII hyphens, Unicode hyphens, nonbreaking
hyphens and soft hyphens are supported; en/em dashes remain boundaries.
Adjacent query words can also match a complete compound: `Feed Update` finds
`Feed Update`, `Feed-Update` and `Feedupdate`. All query words must still match in
order, without extra words or partial-compound matches. This does not perform
arbitrary compound splitting: a joined query does not infer spaces in the text.
The original spelling is preserved in highlights, including across inline markup.
Queries containing other punctuation (such as `C++`) retain
literal phrase matching. `src/_templates/page.html` loads the language data on
chapter pages; the search page continues to load it exactly once via Furo.
Inline formatting and whitespace differences are supported. Highlighting stays
inside the article, does not cross paragraph boundaries, and does not affect
normal visits without this parameter. The phrase also survives opening a result
in a new tab. Search-result snippets use the same whole-phrase highlighting.

### Automatic prefix fallback

Search first uses the normal complete-phrase matcher, including stemming and
compound spelling variants. Only if it returns zero results across the entire
manual does search automatically retry plain word queries as prefixes: `authenti`
becomes `authenti*`, and `supp bund` becomes `supp* bund*`. No second click is
needed. All query words must still match adjacently and in order. Existing normal
results suppress fallback entirely; no prefix results are mixed into them.
Previews and copied/new-tab result links carry the effective query so destination
highlighting uses the same matching mode. Punctuation queries are not broadened.

### Explicit prefix search

Append `*` to a word to search for its literal prefix, case-insensitively:
`authenti*` finds `authentifiziert` and `Authentifizierung`. Prefixes are not
stemmed; ordinary words retain stemming. `support bund*` still requires the
complete adjacent phrase, so `bundled` alone cannot produce a result.
The complete matched word/phrase is highlighted in previews and destination pages.
A wildcard applies to one complete word (including a hyphenated compound), not
to arbitrary text between words. Compound joining remains supported for ordinary
query words, but not across wildcard-bearing query words. Only a single trailing
asterisk on a nonempty word is an operator; other punctuation retains literal matching.
