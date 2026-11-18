# SPDX-FileCopyrightText: 2026 Greenbone AG
#
# SPDX-License-Identifier: AGPL-3.0-or-later

"""Index rendered section text, preserving boundaries for whole-phrase search."""

from html.parser import HTMLParser
import json
from pathlib import Path

# Keep boundaries/exclusions aligned with ManualSearch.textRuns in search-phrase.js.
BLOCKS = set('address article aside blockquote br dd div dl dt figcaption figure '
             'footer h1 h2 h3 h4 h5 h6 header hr li main nav ol p pre section table '
             'tbody td th thead tr ul'.split())
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
EXCLUDED = {'script', 'style', 'textarea', 'button', 'select', 'svg'}


class SectionTextParser(HTMLParser):
    """Collect visible text runs owned by each section, not its descendants."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.sections = {'': dict(parent=None, heading='', texts=[])}
        self.stack = [dict(tag='', main=False, excluded=False, section='', heading=False)]
        self.run = []
        self.owner = ''

    def flush(self):
        text = ''.join(self.run)
        if text.strip():
            self.sections[self.owner]['texts'].append(text)
        self.run = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        parent = self.stack[-1]
        classes = set(attrs.get('class', '').split())
        excluded = (parent['excluded'] or tag in EXCLUDED
                    or bool(classes & {'no-search', 'nohighlight', 'highlighted', 'headerlink'})
                    or 'hidden' in attrs or attrs.get('aria-hidden') == 'true')
        main = parent['main'] or attrs.get('role') == 'main'
        section = parent['section']
        if tag in BLOCKS or excluded:
            self.flush()
        if main and not excluded and tag == 'section' and attrs.get('id'):
            section = attrs['id']
            self.sections[section] = dict(parent=parent['section'], heading='', texts=[])
        if tag not in VOID:
            self.stack.append(dict(tag=tag, main=main, excluded=excluded, section=section,
                                   heading=parent['heading'] or tag in {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if tag in BLOCKS:
            self.flush()
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index]['tag'] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        frame = self.stack[-1]
        if not frame['main'] or frame['excluded']:
            return
        if self.owner != frame['section']:
            self.flush()
            self.owner = frame['section']
        self.run.append(data)
        if frame['heading']:
            self.sections[frame['section']]['heading'] += data


def write_section_index(app, exception):
    if exception is not None or app.builder.name not in {'html', 'dirhtml'}:
        return
    records = {}
    for docname in sorted(app.env.found_docs):
        metadata = app.env.metadata.get(docname, {})
        if 'no-search' in metadata or 'nosearch' in metadata:
            continue
        parser = SectionTextParser()
        # Read the actual output, including on incremental builds. This keeps
        # typography, inline markup and text boundaries identical to the browser.
        parser.feed(Path(app.builder.get_outfilename(docname)).read_text(encoding='utf-8'))
        parser.flush()
        for anchor, section in parser.sections.items():
            if not section['texts']:
                continue
            headings = []
            ancestor = anchor
            while ancestor is not None:
                item = parser.sections[ancestor]
                if item['heading'].strip():
                    headings.append(item['heading'].strip())
                ancestor = item['parent']
            title = ' > '.join(reversed(headings)) or app.env.titles[docname].astext()
            records[f'{docname}#{anchor}'] = dict(
                target=[docname, f'#{anchor}' if anchor else ''], title=title,
                heading=section['heading'].strip(), texts=section['texts'],
                filename=str(app.env.doc2path(docname, base=False)),
            )
    docnames = sorted(records)
    payload = dict(
        docnames=docnames,
        filenames=[records[name]['filename'] for name in docnames],
        titles=[records[name]['title'] for name in docnames],
        headings=[records[name]['heading'] for name in docnames],
        texts=[records[name]['texts'] for name in docnames],
        targets={name: records[name]['target'] for name in docnames},
    )
    destination = Path(app.outdir) / '_static' / 'section-index.js'
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(
        'const SECTION_SEARCH_INDEX = ' + json.dumps(payload, ensure_ascii=True) + ';\n',
        encoding='utf-8',
    )


def setup(app):
    app.connect('build-finished', write_section_index)
    return {'version': '2.0', 'parallel_read_safe': True, 'parallel_write_safe': True}
