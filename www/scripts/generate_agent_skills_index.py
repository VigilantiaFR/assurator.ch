#!/usr/bin/env python3

from __future__ import annotations

from hashlib import sha256
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = ROOT / ".well-known" / "agent-skills"
INDEX_PATH = SKILLS_DIR / "index.json"
BASE_URL = "https://www.assurator.ch/.well-known/agent-skills"

SKILLS = [
    ("robots-txt", "resource", "Crawl and AI crawler policy for Assurator.", "robots-txt.md"),
    ("sitemap", "resource", "Sitemap publication and regeneration workflow.", "sitemap.md"),
    ("link-headers", "resource", "Homepage Link headers for agent discovery.", "link-headers.md"),
    ("markdown-negotiation", "resource", "Markdown content negotiation for homepage requests.", "markdown-negotiation.md"),
    ("api-catalog", "resource", "API discovery metadata and references.", "api-catalog.md"),
    ("webmcp", "resource", "Browser-level WebMCP tools exposed by the homepage.", "webmcp.md"),
]


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def main() -> None:
    skills = []
    for name, kind, description, filename in SKILLS:
        file_path = SKILLS_DIR / filename
        skills.append(
            {
                "name": name,
                "type": kind,
                "description": description,
                "url": f"{BASE_URL}/{filename}",
                "sha256": digest(file_path),
            }
        )

    payload = {
        "$schema": "https://agentskills.io/schemas/agent-skills-index.v0.2.0.json",
        "skills": skills,
    }
    INDEX_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Skills index written: {INDEX_PATH}")


if __name__ == "__main__":
    main()
