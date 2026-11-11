// SPDX-FileCopyrightText: 2026 Greenbone AG
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const languageData = process.argv[2]
  ? fs.readFileSync(path.join(process.argv[2], '_static/language_data.js'), 'utf8') : null;
const shared = fs.readFileSync(path.join(__dirname, '../src/_static/search-phrase.js'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, '../src/_static/search-highlight.js'), 'utf8');

function page(html, url = 'https://docs.example/en/agents.html?highlight=support+bundle#bundle') {
  const dom = new JSDOM(html, {url, runScripts: 'outside-only'});
  vm.runInContext('const SPHINX_HIGHLIGHT_ENABLED = true; const SphinxHighlight = {};', dom.getInternalVMContext());
  if (languageData) vm.runInContext(languageData, dom.getInternalVMContext());
  dom.window.localStorage.setItem('sphinx_highlight_terms', 'unrelated support');
  vm.runInContext(shared, dom.getInternalVMContext());
  vm.runInContext(script, dom.getInternalVMContext());
  return dom;
}
function highlight(dom) {
  vm.runInContext('SphinxHighlight.highlightSearchWords()', dom.getInternalVMContext());
  return [...dom.window.document.querySelectorAll('.highlighted')].map(el => el.textContent);
}

(async () => {
  let dom = page(`<nav>support bundle</nav><article role="main">
    <h2>Downloading an Agent Support Bundle</h2>
    <p>support alone; bundle alone; support bundles; presupport bundle; support bundle\u0301.</p>
    <p>support bundle, support bundle.</p>
    <p>support <strong>bundle</strong></p>
    <p>support\n  bundle and support&nbsp;bundle</p>
    <p>support</p><p>bundle</p>
    <p class="nohighlight">support bundle</p>
    <button>support bundle</button><p hidden>support bundle</p>
  </article>`);
  const before = dom.window.document.body.textContent;
  assert.deepEqual(highlight(dom), [
    'Support Bundle', ...(languageData ? ['support bundles'] : []), 'support bundle', 'support bundle', 'support ', 'bundle',
    'support\n  bundle', 'support\u00a0bundle',
  ]);
  assert.equal(dom.window.document.body.textContent, before);
  assert.equal(dom.window.document.querySelector('strong').textContent, 'bundle');
  assert.equal(dom.window.document.querySelectorAll('nav .highlighted').length, 0);
  assert.equal(dom.window.localStorage.getItem('sphinx_highlight_terms'), null);
  assert.equal(dom.window.location.hash, '#bundle');
  const count = dom.window.document.querySelectorAll('.highlighted').length;
  highlight(dom);
  assert.equal(dom.window.document.querySelectorAll('.highlighted').length, count);
  dom.window.close();

  for (const url of ['https://docs.example/agents.html', 'https://docs.example/agents.html?highlight=+++']) {
    dom = page('<article role="main"><p>support bundle</p></article>', url);
    assert.deepEqual(highlight(dom), []); // Ignore stale localStorage on normal visits.
    dom.window.close();
  }
  dom = page('<article role="main">Prüfbericht Prüfberichte Vorprüfbericht</article>',
    'https://docs.example/de/agents.html?highlight=Pr%C3%BCfbericht');
  assert.deepEqual(highlight(dom), languageData ? ['Prüfbericht', 'Prüfberichte'] : ['Prüfbericht']);
  dom.window.close();
  dom = page('<article role="main">C++ and C and C++.</article>',
    'https://docs.example/agents.html?highlight=C%2B%2B');
  assert.deepEqual(highlight(dom), ['C++', 'C++']);
  dom.window.close();

  for (const query of ['Supportpaket', 'Support-Paket', 'Support‐Paket', 'Support‑Paket']) {
    dom = page('<article role="main">Supportpaket; Support-<strong>Paket</strong>; Support‐Paket; Support‑Paket; Support\u00adpaket; Support; Paket; Support Paket; Vor-Supportpaket; Support–Paket</article>',
      'https://docs.example/agents.html?highlight=' + encodeURIComponent(query));
    assert.deepEqual(highlight(dom), ['Supportpaket', 'Support-', 'Paket', 'Support‐Paket', 'Support‑Paket', 'Support\u00adpaket']);
    dom.window.close();
  }
  dom = page('<article role="main">Feed-<strong>Update</strong>; Feedupdate; Feed Update; Feed; Update; Feed neues Update; Vor-Feed-Update; Feed–Update; Update Feed</article>',
    'https://docs.example/agents.html?highlight=Feed+Update');
  assert.deepEqual(highlight(dom), ['Feed-', 'Update', 'Feedupdate', 'Feed Update']);
  dom.window.close();
  dom = page('<article role="main">das Feed-Update starten; das Feedupdate starten; das Feed neue Update starten</article>',
    'https://docs.example/agents.html?highlight=das+Feed+Update+starten');
  assert.deepEqual(highlight(dom), ['das Feed-Update starten', 'das Feedupdate starten']);
  dom.window.close();
  if (languageData) {
    dom = page('<article role="main">support bundle; support bundles; support; bundles; support extra bundles; bundles support; support, bundles</article>');
    assert.deepEqual(highlight(dom), ['support bundle', 'support bundles']);
    dom.window.close();
    dom = page('<article role="main">support bundle; support bundles</article>',
      'https://docs.example/agents.html?highlight=support+bundles');
    assert.deepEqual(highlight(dom), ['support bundle', 'support bundles']);
    dom.window.close();
    dom = page('<article role="main">support and bundles; support bundles; support or bundles</article>',
      'https://docs.example/agents.html?highlight=support+and+bundle');
    assert.deepEqual(highlight(dom), ['support and bundles']);
    dom.window.close();
    dom = page('<article role="main">test test test</article>',
      'https://docs.example/agents.html?highlight=test+test');
    assert.deepEqual(highlight(dom), ['test test']);
    dom.window.close();
    if (process.argv[3] === 'de') {
      for (const query of ['Support-Pakete', 'Supportpaket', 'Support Pakete']) {
        dom = page('<article role="main">Supportpaket; Support-Pakete; Supportpakets; Support; Pakete</article>',
          'https://docs.example/de/agents.html?highlight=' + encodeURIComponent(query));
        assert.deepEqual(highlight(dom), ['Supportpaket', 'Support-Pakete', 'Supportpakets']);
        dom.window.close();
      }
      dom = page('<article role="main">technischer Bericht; technische Berichte; technischen Berichten; technischer; Bericht; technische neue Berichte</article>',
        'https://docs.example/de/agents.html?highlight=technischer+Bericht');
      assert.deepEqual(highlight(dom), ['technischer Bericht', 'technische Berichte', 'technischen Berichten']);
      dom.window.close();
    }
  }

  // Results arrive asynchronously. Copied/new-tab links must carry the phrase,
  // without disturbing directory-HTML paths, existing parameters or anchors.
  dom = page('<div id="search-results"></div>',
    'https://docs.example/en/search/?q=support+bundle');
  dom.window.document.getElementById('search-results').innerHTML =
    '<ul><li><a href="../agents/?existing=1#bundle">Agent guide</a></li></ul>';
  await new Promise(resolve => setTimeout(resolve, 0));
  const url = new URL(dom.window.document.querySelector('a').href);
  assert.equal(url.searchParams.get('highlight'), 'support bundle');
  assert.equal(url.searchParams.get('existing'), '1');
  assert.equal(url.pathname, '/en/agents/');
  assert.equal(url.hash, '#bundle');
  const destination = page('<article role="main">support; support bundle</article>', url.href);
  assert.deepEqual(highlight(destination), ['support bundle']);
  destination.window.close();
  dom.window.close();
  if (process.argv[2]) {
    const output = process.argv[2];
    const htmlPath = fs.existsSync(path.join(output, 'agents.html'))
      ? path.join(output, 'agents.html') : path.join(output, 'agents/index.html');
    dom = new JSDOM(fs.readFileSync(htmlPath, 'utf8'), {
      url: 'https://docs.example/agents.html?highlight=support+bundle#downloading-an-agent-support-bundle',
      runScripts: 'outside-only',
    });
    assert(dom.window.document.querySelector('script[src*="search-highlight.js"]'));
    const context = dom.getInternalVMContext();
    vm.runInContext(`const callbacks = []; const _ready = fn => callbacks.push(fn);
      const DOCUMENTATION_OPTIONS = {ENABLE_SEARCH_SHORTCUTS: false};`, context);
    assert.equal(dom.window.document.querySelectorAll('script[src*="language_data.js"]').length, 1);
    for (const file of ['sphinx_highlight.js', 'language_data.js', 'search-phrase.js', 'search-highlight.js']) {
      vm.runInContext(fs.readFileSync(path.join(output, '_static', file), 'utf8'), context);
    }
    vm.runInContext('callbacks.forEach(fn => fn())', context);
    assert.equal(dom.window.document.querySelector(
      '#downloading-an-agent-support-bundle h2 .highlighted').textContent, 'Support Bundle');
    dom.window.close();
  }
  console.log('Whole-phrase highlight DOM regressions passed');
})().catch(error => {console.error(error); process.exitCode = 1;});
