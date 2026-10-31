#!/usr/bin/env python3
"""Export the static page's main content as a readable Markdown case file; stdlib only."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
class Exporter(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.skip = 0
        self.parts = []
        self.links = []
        self.heading = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'main': self.in_main = True
        if not self.in_main: return
        if tag in ('svg', 'script', 'style'): self.skip += 1
        if self.skip: return
        if a.get('id'): self.parts.append('\n\n<a id="' + a['id'] + '"></a>\n\n')
        if tag in ('p', 'div', 'article', 'section', 'figure', 'figcaption', 'summary', 'caption', 'dl', 'details', 'ol', 'table', 'nav'): self.parts.append('\n\n')
        if tag in ('h1', 'h2', 'h3'):
            self.parts.append('\n\n' + '#' * int(tag[1]) + ' ')
            self.heading = tag
        if tag == 'br': self.parts.append('\n')
        if tag == 'li': self.parts.append('\n\n- ')
        if tag == 'tr': self.parts.append('\n\n')
        if tag in ('th', 'td'): self.parts.append(' | ')
        if tag == 'dt': self.parts.append('\n')
        if tag == 'dd': self.parts.append(': ')
        if tag == 'strong': self.parts.append('**')
        if tag == 'code': self.parts.append('`')
        if tag == 'a':
            href = a.get('href', '')
            self.links.append(href)
            if href: self.parts.append('[')
    def handle_endtag(self, tag):
        if tag == 'main': self.in_main = False
        if not self.in_main: return
        if tag in ('svg', 'script', 'style'):
            self.skip -= 1
            return
        if self.skip: return
        if tag in ('h1', 'h2', 'h3'):
            self.parts.append('\n\n')
            self.heading = None
        if tag == 'a' and self.links:
            href = self.links.pop()
            if href: self.parts.append('](' + href + ')')
        if tag == 'strong': self.parts.append('**')
        if tag == 'code': self.parts.append('`')
        if tag in ('span', 'b', 'a'): self.parts.append(' ')
        if tag in ('p', 'li', 'article', 'section', 'summary'): self.parts.append('\n\n')
    def handle_data(self, data):
        if self.in_main and not self.skip:
            self.parts.append(re.sub(r'\s+', ' ', data))

def export():
    parser = Exporter()
    parser.feed((ROOT / 'artifacts/index.html').read_text())
    result = ''.join(parser.parts)
    result = re.sub(r'\n[ \t]+', '\n', result)
    result = re.sub(r'\n{3,}', '\n\n', result).strip()
    result = result.replace('# Who is\nSqueektoshi?', '# Who is Squeektoshi?')
    header = ('<!-- Generated from artifacts/index.html by scripts/export_case.py. -->\n\n'
              'Filed 31 October 2026 UTC. Static public-evidence case file. '
              'The website is the primary formatted edition; all citations and limits appear below.\n\n')
    (ROOT / 'artifacts/case-file.md').write_text(header + result + '\n')

if __name__ == '__main__': export()
