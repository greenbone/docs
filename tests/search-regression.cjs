// SPDX-FileCopyrightText: 2026 Greenbone AG
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {JSDOM} = require('jsdom');
(async () => {
const output = process.argv[2];
const dom = new JSDOM('<div id="search-results"></div>', {
  url: 'https://docs.example/search.html?q=support+bundle', runScripts: 'outside-only',
});
const context = dom.getInternalVMContext();
context._ready = () => {};
context.localStorage.setItem('sphinx_highlight_terms', 'old query');
vm.runInContext('const SPHINX_HIGHLIGHT_ENABLED = true;', context);
for (const file of ['_static/searchtools.js', '_static/language_data.js',
                    '_static/search-phrase.js', '_static/section-index.js', '_static/section-search.js', 'searchindex.js']) {
  vm.runInContext(fs.readFileSync(path.join(output, file), 'utf8'), context, {filename: file});
}
const search = (query) => JSON.parse(vm.runInContext(
  `JSON.stringify(Search._performSearch(...Search._parseQuery(${JSON.stringify(query)})))`, context));
const target = '#downloading-an-agent-support-bundle';
let results = search('support bundle');
assert(results.some(r => r[0] === 'agents' && r[2] === target && r[6] === 'title'));
assert.equal(results.filter(r => r[0] === 'agents' && r[2] === target).length, 1);
assert.equal(results.at(-1)[6], 'title');
// Index metadata without a visible full-phrase match must not create a result.
assert(!results.some(r => r[6] === 'index'));
assert(results.some(r => r[2] === '#plural-phrasing'));
assert(!results.some(r => r[2] === '#other-diagnostics'));
assert(!results.some(r => r[2] === '#unrelated-advice'));
assert.deepEqual(search('OPENVAS BASIC').map(r => r[2]), ['#product-edition']);
assert.deepEqual(search('C++').map(r => r[2]), ['#punctuation']);
assert.deepEqual(search('support and bundle').map(r => r[2]), ['#stopword-phrase']);
assert.deepEqual(search('test test').map(r => r[2]), ['#repeated-words']);
assert.equal(search('archives diagnostic').length, 0);
assert(search('SUPPORT BUNDLE').some(r => r[2] === target));
results = search('diagnostic archives');
assert(results.some(r => r[2] === target));
assert(results.some(r => r[2] === '#other-diagnostics'));
assert(results.every(r => r[2]));
assert(search('Nestedneedle').every(r => r[2] === '#nested-diagnostics'));
assert.equal(search('Nestedneedle').length, 1);
assert.equal(search('splitneedle otherneedle').length, 0);
assert.equal(search('secretneedle').length, 0);
assert.equal(search('hiddenbranchneedle').length, 0);
assert.equal(search('nestedexcludedneedle').length, 0);
assert.equal(search('nonexistentneedle').length, 0);
assert.equal(search('').length, 0);
for (const query of ['Supportpaket', 'Support-Paket', 'Support‐Paket', 'Support‑Paket']) {
  assert.deepEqual(search(query).map(r => r[2]).sort(), ['#compound-hyphenated', '#compound-joined']);
}
assert.equal(search('Paket').length, 0);
assert.deepEqual(search('Feed Update').map(r => r[2]).sort(), ['#feed-compound', '#feed-joined']);
if (process.argv[3] === 'de') {
  assert(search('Prüfberichte').some(r => r[2] === '#other-diagnostics'));
  assert.deepEqual(search('technischer Bericht').map(r => r[2]), ['#german-forms']);
}
// The normal page index remains untouched.
assert(vm.runInContext('Search._index !== SECTION_SEARCH_INDEX', context));
// Every result must produce a snippet containing a highlighted full phrase.
// The same matcher highlights the destination's own content.
for (const query of ['support bundle', 'OPENVAS BASIC', 'diagnostic archives', 'C++', 'support and bundle', 'Support-Paket', 'Supportpaket', 'Feed Update']) {
  for (const result of search(query)) {
    const file = fs.existsSync(path.join(output, result[0] + '.html'))
      ? path.join(output, result[0] + '.html') : path.join(output, result[0], 'index.html');
    context.pageHTML = fs.readFileSync(file, 'utf8');
    context.anchor = result[2];
    context.query = query;
    const summary = vm.runInContext('Search.makeSearchSummary(pageHTML, new Set([query]), anchor)', context);
    assert(summary.querySelector('.highlighted'), `No matching snippet: ${query} ${result[2]}`);
    const highlighted = [...summary.querySelectorAll('.highlighted')].map(el => el.textContent);
    if (query === 'support bundle') assert(highlighted.every(text => /^support bundles?$/i.test(text)));
    if (query === 'OPENVAS BASIC') assert.deepEqual(highlighted, ['OPENVAS BASIC']);
  }
}
assert.equal(vm.runInContext('Search._parseQuery("support bundle")[3].size', context), 0);
// A child match must not leak into a parent's preview, nor a lone word into a snippet.
context.pageHTML = '<article role="main"><section id="outer"><p>support alone</p><section id="inner"><p>support bundle</p></section></section></article>';
assert.equal(vm.runInContext('Search.makeSearchSummary(pageHTML, new Set(["support bundle"]), "#outer").textContent', context), '');
// Verify Python's generated runs against the actual DOM walker for every section.
const index = JSON.parse(vm.runInContext('JSON.stringify(SECTION_SEARCH_INDEX)', context));
const pages = new Map();
for (const [file, key] of index.docnames.entries()) {
  const [docname, anchor] = index.targets[key];
  if (!pages.has(docname)) {
    let filename = path.join(output, docname + '.html');
    if (!fs.existsSync(filename)) filename = path.join(output, docname === 'index' ? 'index.html' : docname + '/index.html');
    pages.set(docname, new context.DOMParser().parseFromString(fs.readFileSync(filename, 'utf8'), 'text/html'));
  }
  context.sectionRoot = anchor ? pages.get(docname).getElementById(anchor.slice(1)) : pages.get(docname).querySelector('[role="main"]');
  const runs = JSON.parse(vm.runInContext('JSON.stringify(ManualSearch.textRuns(sectionRoot, true).map(nodes => nodes.map(n => n.nodeValue).join("")).filter(text => text.trim()))', context));
  assert.deepEqual(runs, index.texts[file], `Index/DOM mismatch for ${key}`);
}
// Exercise Sphinx's real asynchronous result renderer: it must not reintroduce
// individual-token highlights after our summary has been appended.
context.document.documentElement.dataset.content_root = './';
context.DOCUMENTATION_OPTIONS = {BUILDER: 'html', FILE_SUFFIX: '.html', LINK_SUFFIX: '.html', SHOW_SEARCH_SUMMARY: true};
context.fetch = async () => ({text: async () => fs.readFileSync(
  fs.existsSync(path.join(output, 'agents.html')) ? path.join(output, 'agents.html') : path.join(output, 'agents/index.html'), 'utf8')});
vm.runInContext(`Search.output = document.getElementById('search-results');
  const parsed = Search._parseQuery('support bundle');
  const rendered = Search._performSearch(...parsed).find(r => r[2] === '#plural-phrasing');
  _displayItem(rendered, parsed[1], parsed[3]);`, context);
await new Promise(resolve => setTimeout(resolve, 0));
assert.deepEqual([...context.document.querySelectorAll('#search-results .highlighted')].map(el => el.textContent), ['support bundles']);
dom.window.close();
console.log(`Search and full-phrase preview regressions passed (${process.argv[3]})`);

})().catch(error => {console.error(error); process.exitCode = 1;});
