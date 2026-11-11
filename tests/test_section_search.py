# SPDX-FileCopyrightText: 2026 Greenbone AG
#
# SPDX-License-Identifier: AGPL-3.0-or-later

"""Build real Sphinx fixtures and exercise the shipped JS search with Node.js."""

from copy import deepcopy
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

from sphinx.application import Sphinx

import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))
from section_search import write_section_index

ROOT = Path(__file__).resolve().parents[1]


class SectionSearchTest(unittest.TestCase):
    def test_search_in_both_languages_and_incremental_builds(self):
        for language, builder in [('en', 'html'), ('de', 'dirhtml')]:
            with self.subTest(language=language), tempfile.TemporaryDirectory() as tmp:
                source = Path(tmp) / 'source'
                source.mkdir()
                (source / 'conf.py').write_text(
                    f'import sys\nsys.path.insert(0, {str(ROOT / "src")!r})\n'
                    "extensions = ['section_search']\n"
                    "html_theme = 'furo'\n"
                    "html_js_files = ['search-phrase.js', 'search-highlight.js']\n"
                    f'templates_path = [{str(ROOT / "src/_templates")!r}]\n'
                    f'html_static_path = [{str(ROOT / "src/_static")!r}]\n'
                    f'language = {language!r}\n', encoding='utf-8',
                )
                (source / 'index.rst').write_text('''Manual
======

.. toctree::

   agents
   hidden
''', encoding='utf-8')
                (source / 'agents.rst').write_text('''Agent Guide
===========

Downloading an Agent Support Bundle
----------------------------------

Collect diagnostic archives for troubleshooting. Prüfberichte herunterladen.

Nested diagnostics
~~~~~~~~~~~~~~~~~~

Nestedneedle only belongs to this subsection.

Other diagnostics
-----------------

Collect diagnostic archives without agent logs. Prüfbericht prüfen.

.. index:: support bundle

Plural phrasing
---------------

Download support **bundles** now.

Product edition
---------------

Use OPENVAS **BASIC** for this procedure.

Unrelated advice
----------------

OPENVAS can be configured. Basically this is unrelated advice.
The support team supplies bundled software.

Split paragraph
---------------

OPENVAS

BASIC

Punctuation
-----------

C++ is a programming language.

Stopword phrase
---------------

The support and bundles example retains every word.

Repeated words
--------------

Test test test.

German forms
------------

Technische Berichte und technischen Berichten folgen Beispiele.

Feed compound
-------------

Das Feed-**Update** starten.

Feed joined
-----------

Das Feedupdate starten.

Feed unrelated
--------------

Feed und Update. Feed–Update. Vor-Feed-Update. Update Feed.

Compound joined
---------------

Ein Supportpaket herunterladen.

Compound hyphenated
-------------------

Ein Support-**Paket** herunterladen.

Markup boundaries
-----------------

.. note::

   Boundary **phrase** in an admonition.

.. list-table::

   * - firstcell
     - secondcell

.. raw:: html

   <p>raw <em>phrase</em> with &amp; entities.</p>
   <p>breakword<br>nextword</p>
   <p>hiddenword <span hidden>hidden phrase</span> nextword</p>

Split words one
---------------

splitneedle

Split words two
---------------

otherneedle

.. rst-class:: no-search

Omitted section
---------------

hiddenbranchneedle

Omitted child
~~~~~~~~~~~~~

nestedexcludedneedle
''', encoding='utf-8')
                (source / 'hidden.rst').write_text(
                    ':no-search:\n\nHidden\n======\n\nsecretneedle\n', encoding='utf-8'
                )
                output = Path(tmp) / 'html'
                app = Sphinx(str(source), str(source), str(output),
                             str(Path(tmp) / 'doctrees'), builder,
                             status=None, warning=None, freshenv=True)
                app.build()
                self.assertEqual(app.statuscode, 0)
                state = {key: deepcopy(value) for key, value in vars(app.env).items()
                         if key.startswith('_search_index_')}
                self.assertTrue(all('#' not in name for name in app.env._search_index_titles))
                write_section_index(app, None)
                self.assertEqual(state, {key: getattr(app.env, key) for key in state})
                self.check_search(output, language, fresh=True)
                # Reusing the environment must keep untouched sections indexed.
                app = Sphinx(str(source), str(source), str(output),
                             str(Path(tmp) / 'doctrees'), builder,
                             status=None, warning=None)
                app.build()
                self.check_search(output, language)
                # Deleted content must not remain in the extra index.
                page = source / 'agents.rst'
                page.write_text(page.read_text().replace('Nestedneedle', 'Replacementneedle'))
                app = Sphinx(str(source), str(source), str(output),
                             str(Path(tmp) / 'doctrees'), builder,
                             status=None, warning=None)
                app.build()
                data = (output / '_static/section-index.js').read_text()
                self.assertNotIn('nestedneedl', data.lower())
                self.assertIn('replacementneedl', data.lower())

    def check_search(self, output, language, fresh=False):
        subprocess.run([os.environ.get('NODE', 'node'), str(ROOT / 'tests/search-regression.cjs'),
                        str(output), language, 'fresh' if fresh else 'incremental'], check=True)
        subprocess.run([os.environ.get('NODE', 'node'),
                        str(ROOT / 'tests/highlight-regression.cjs'), str(output), language], check=True)
        payload = (output / '_static/section-index.js').read_text()
        index = json.loads(payload.split(' = ', 1)[1].rstrip(';\n'))
        for docname, anchor in index['targets'].values():
            page = output / f'{docname}.html'
            if not page.exists():
                page = output / (f'{docname}/index.html' if docname != 'index' else 'index.html')
            self.assertIn(f'id="{anchor[1:]}"', page.read_text())
        search_page = output / 'search.html'
        if not search_page.exists():
            search_page = output / 'search/index.html'
        html = search_page.read_text()
        self.assertEqual(html.count('language_data.js'), 1)
        self.assertLess(html.index('sphinx_highlight.js'), html.index('search-highlight.js'))
        self.assertLess(html.index('search-phrase.js'), html.index('search-highlight.js'))
        self.assertLess(html.index('searchtools.js'), html.index('section-search.js'))
        self.assertLess(html.index('section-search.js'), html.rindex('searchindex.js'))


if __name__ == '__main__':
    unittest.main()
