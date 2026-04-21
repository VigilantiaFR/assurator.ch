#!/usr/bin/env python3

from __future__ import annotations

from datetime import UTC, datetime
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
SITE_URL = "https://www.assurator.ch"
OUTPUT = ROOT / "sitemap.xml"

CANONICAL_RE = re.compile(r'<link\s+rel="canonical"\s+href="([^"]+)"', flags=re.IGNORECASE)

EXCLUDED = {"merci.html"}


def resolve_url(path: Path) -> str:
    content = path.read_text(encoding="utf-8", errors="ignore")
    match = CANONICAL_RE.search(content)
    if match:
        return match.group(1).strip()

    if path.name == "index.html":
        return f"{SITE_URL}/"

    return f"{SITE_URL}/{path.name}"


def lastmod(path: Path) -> str:
    ts = datetime.fromtimestamp(path.stat().st_mtime, tz=UTC)
    return ts.date().isoformat()


def build() -> str:
    html_paths = sorted(p for p in ROOT.glob("*.html") if p.name not in EXCLUDED)

    entries = []
    seen = set()
    for path in html_paths:
        loc = resolve_url(path)
        if loc in seen:
            continue
        seen.add(loc)
        entries.append(
            "  <url>\n"
            f"    <loc>{loc}</loc>\n"
            f"    <lastmod>{lastmod(path)}</lastmod>\n"
            "  </url>"
        )

    body = "\n".join(entries)
    return (
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
        "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
        f"{body}\n"
        "</urlset>\n"
    )


def main() -> None:
    OUTPUT.write_text(build(), encoding="utf-8")
    print(f"Sitemap written: {OUTPUT}")


if __name__ == "__main__":
    main()
