#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations

from datetime import datetime
from pathlib import Path
import html
import json
import math
import re
import subprocess
import sys

import markdown
import yaml


ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT / "articles-md"
SITE_URL = "https://www.assurator.ch"


FRENCH_COMPARATIF = """
# Comparatif assurance prÃ©natale en Suisse 2026: guide complet

Vous disposez d'une fenÃªtre limitÃ©e pour protÃ©ger la couverture santÃ© de votre bÃ©bÃ© dÃ¨s la naissance. En Suisse, l'inscription prÃ©natale est stratÃ©gique: elle influence l'accÃ¨s Ã  l'assurance complÃ©mentaire et le coÃ»t rÃ©el de votre protection familiale.

Ce guide vous aide Ã  comparer les options 2026 avec une mÃ©thode claire: bon timing, bon niveau de couverture, et dÃ©cisions financiÃ¨res cohÃ©rentes.

## Points clÃ©s Ã  retenir

> - La pÃ©riode la plus sÃ»re pour l'inscription prÃ©natale est gÃ©nÃ©ralement entre la 20e et la 30e semaine de grossesse.
> - La LAMal de base est rÃ©glementÃ©e et identique dans ses prestations lÃ©gales, quel que soit l'assureur.
> - La vraie diffÃ©rence se joue sur la complÃ©mentaire: options, plafonds, exclusions, qualitÃ© de service.
> - Le choix de franchise (CHF 0, 100, 300, 600) a un impact fort sur le coÃ»t total sur plusieurs annÃ©es.
> - Attendre trop tard est l'erreur la plus coÃ»teuse pour les familles.

---

## Assurance prÃ©natale: de quoi parle-t-on exactement?

L'assurance prÃ©natale concerne l'assurance de l'enfant Ã  naÃ®tre, activÃ©e Ã  la naissance. Beaucoup de parents confondent avec l'assurance maternitÃ© de la mÃ¨re.

### Ne pas confondre

**Assurance maternitÃ© (mÃ¨re)**
- Couvre le suivi de grossesse et l'accouchement dans le cadre LAMal.
- S'applique aux soins mÃ©dicaux de la mÃ¨re pendant la pÃ©riode prÃ©vue par la loi.

**Assurance prÃ©natale (bÃ©bÃ©)**
- PrÃ©-inscription du bÃ©bÃ© pendant la grossesse.
- Effet Ã  la naissance.
- Permet souvent un accÃ¨s plus favorable Ã  certaines couvertures complÃ©mentaires.

---

## Quand s'inscrire?

| PÃ©riode | Action recommandÃ©e | Pourquoi |
|---|---|---|
| Semaines 1 Ã  16 | Comparer 2 Ã  3 assureurs | PrÃ©parer les dÃ©cisions sans stress |
| Semaines 17 Ã  24 | Choisir structure base + complÃ©mentaire | Analyser garanties et exclusions |
| **Semaines 20 Ã  30** | **Finaliser l'inscription** | **FenÃªtre optimale** |
| Semaines 31 Ã  38 | Finaliser immÃ©diatement si non fait | Ã‰viter tout retard |
| AprÃ¨s naissance | RÃ©gularisation possible | Conditions potentiellement moins favorables |

### Si vous attendez trop

- Questionnaires mÃ©dicaux plus stricts en complÃ©mentaire
- Acceptation moins automatique
- Exclusions possibles selon le dossier
- CoÃ»ts potentiellement plus Ã©levÃ©s dans la durÃ©e

---

## LAMal vs complÃ©mentaire: la vraie dÃ©cision

La base LAMal est commune Ã  tous les assureurs sur le pÃ©rimÃ¨tre lÃ©gal. Les diffÃ©rences majeures concernent surtout:

- Les primes
- Les plafonds de remboursement
- Les exclusions
- La qualitÃ© du service client et des remboursements

### Ce que couvre la base

- Soins essentiels
- Hospitalisation en division commune
- MÃ©dicaments et actes reconnus

### Ce que la complÃ©mentaire peut ajouter

- Division privÃ©e ou semi-privÃ©e
- Choix Ã©largi des praticiens
- Prestations additionnelles selon contrat
- Confort et options spÃ©cifiques

---

## Comparatif 2026: profils d'assureurs

### CSS

- Souvent compÃ©titif sur le budget global
- Bon Ã©quilibre prix/prestations
- VÃ©rifier les plafonds exacts par option

### Sanitas

- Parcours client clair
- Bon niveau de service
- VÃ©rifier le coÃ»t final selon votre canton

### SWICA

- RÃ©seau solide dans plusieurs rÃ©gions
- Bon compromis pour familles actives
- VÃ©rifier les conditions hors rÃ©seau

### Helsana

- Offre modulaire riche
- IntÃ©ressant pour personnaliser finement
- Attention au risque de surassurance

### Sympany

- Packs famille lisibles
- RÃ©ductions intÃ©ressantes selon la configuration
- VÃ©rifier les limites annuelles

### Zurich

- Logique multi-assurances intÃ©ressante pour certains foyers
- Possibles rabais de regroupement
- VÃ©rifier la couverture rÃ©elle avant de prioriser le prix

---

## Franchise: l'arbitrage sous-estimÃ©

La franchise basse coÃ»te plus cher en prime, mais rÃ©duit les sorties d'argent imprÃ©vues. La franchise Ã©levÃ©e baisse la prime mais augmente les dÃ©penses en cas de soins.

Pour un bÃ©bÃ© et un jeune enfant, la franchise basse est souvent plus stable budgÃ©tairement.

---

## Ã‰viter les erreurs coÃ»teuses

1. Attendre trop tard pour l'inscription.
2. Comparer uniquement la prime mensuelle.
3. Ignorer plafonds et exclusions.
4. Choisir une franchise Ã©levÃ©e sans simulation rÃ©elle.
5. NÃ©gliger le service client et les dÃ©lais de remboursement.

---

## Plan d'action

1. Comparez 3 assureurs maximum.
2. Simulez prime + franchise + reste Ã  charge.
3. VÃ©rifiez par Ã©crit les exclusions importantes.
4. Finalisez pendant la grossesse, idÃ©alement avant la 30e semaine.
5. Conservez confirmations et conditions gÃ©nÃ©rales.

---

## Conclusion

Le bon choix prÃ©natal en 2026 repose sur deux leviers: agir tÃ´t et comparer intelligemment. L'objectif n'est pas seulement de trouver la prime la plus basse, mais d'assurer un coÃ»t total maÃ®trisÃ© sur plusieurs annÃ©es, avec une couverture rÃ©ellement utile pour votre famille.
""".strip()


def french_date(date_str: str) -> str:
    months = {
        1: "janvier",
        2: "fÃ©vrier",
        3: "mars",
        4: "avril",
        5: "mai",
        6: "juin",
        7: "juillet",
        8: "aoÃ»t",
        9: "septembre",
        10: "octobre",
        11: "novembre",
        12: "dÃ©cembre",
    }
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    return f"{dt.day} {months[dt.month]} {dt.year}"


def parse_markdown(path: Path) -> tuple[dict, str]:
    raw = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, flags=re.S)
    if not m:
        raise ValueError(f"Front matter invalide: {path.name}")
    meta = yaml.safe_load(m.group(1)) or {}
    body = m.group(2).strip()
    return meta, body


def nav_html() -> str:
    return """
        <nav id="navbar" class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 h-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
                <a href="index.html" class="flex items-center gap-3">
                    <img src="logo.png" alt="Logo Assurator" class="w-10 h-10 object-contain" />
                    <span class="text-2xl font-bold text-slate-900 tracking-tight">Assurator<span class="text-brand-600">.ch</span></span>
                </a>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="index.html" class="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Assurance Maladie</a>
                    <a href="index.html" class="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Assurance Vie</a>
                    <a href="index.html#features" class="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Ã€ propos</a>
                    <a href="blog.html" class="text-sm font-medium text-brand-600">Blog</a>
                    <a href="index.html#footer" class="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Contact</a>
                </div>
                <div class="flex items-center gap-4">
                    <button class="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-lg shadow-brand-500/20">Espace Client</button>
                </div>
            </div>
        </nav>
""".rstrip()


def footer_html() -> str:
    return """
        <footer id="footer" class="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <img src="logo.png" alt="Logo Assurator" class="w-10 h-10 object-contain" />
                            <span class="text-xl font-bold text-white">Assurator<span class="text-brand-400">.ch</span></span>
                        </div>
                        <p class="text-sm text-slate-400 leading-relaxed">Le comparateur d'assurances suisse de confiance depuis 2018.</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-4">Assurances</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="index.html" class="hover:text-brand-400 transition-colors">Assurance Maladie</a></li>
                            <li><a href="assurance-lca.html" class="hover:text-brand-400 transition-colors">Assurance ComplÃ©mentaire</a></li>
                            <li><a href="assurance-prenatalite.html" class="hover:text-brand-400 transition-colors">Assurance PrÃ©natale</a></li>
                            <li><a href="assurance-animaux.html" class="hover:text-brand-400 transition-colors">Assurance Animaux</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-4">Entreprise</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="index.html#features" class="hover:text-brand-400 transition-colors">Ã€ propos</a></li>
                            <li><a href="blog.html" class="hover:text-brand-400 transition-colors">Blog</a></li>
                            <li><a href="mailto:info@assurator.ch" class="hover:text-brand-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-4">Support</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" class="hover:text-brand-400 transition-colors">Conditions d'utilisation</a></li>
                            <li><a href="#" class="hover:text-brand-400 transition-colors">Politique de confidentialitÃ©</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-sm text-slate-500">Â© 2026 Assurator.ch - Tous droits rÃ©servÃ©s</p>
                    <div class="flex gap-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition-colors"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition-colors"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition-colors"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </footer>
""".rstrip()


def page_slug(meta: dict, md_path: Path) -> str:
    slug = str(meta.get("url_slug") or "").strip().strip("/")
    if slug.startswith("blog/"):
        slug = slug[5:]
    if not slug:
        slug = re.sub(r"[^a-z0-9-]+", "-", md_path.stem.lower()).strip("-")
    return slug


def render_articles() -> list[dict]:
    articles: list[dict] = []

    for md_path in sorted(ARTICLES_DIR.glob("*.md")):
        meta, body = parse_markdown(md_path)

        if md_path.name == "comparatif-assurance-prenatale-2026-04-13.md":
            body = FRENCH_COMPARATIF

        lines = body.splitlines()
        h1 = str(meta.get("title", "")).strip()
        if lines and lines[0].startswith("# "):
            h1 = lines[0][2:].strip()
            body = "\n".join(lines[1:]).lstrip()

        title = str(meta.get("title") or h1).strip()
        if md_path.name == "comparatif-assurance-prenatale-2026-04-13.md":
            title = h1

        meta_title = str(meta.get("meta_title") or f"{title} | Assurator.ch").strip()
        if "assurator" in meta_title.lower() and "Assurator.ch" not in meta_title:
            meta_title = re.sub(r"\|\s*assurator\s*$", "| Assurator.ch", meta_title, flags=re.I)
        if "| Assurator.ch" not in meta_title:
            meta_title = f"{meta_title} | Assurator.ch"

        meta_description = str(meta.get("meta_description") or "").strip()
        published = str(meta.get("published_date") or "2026-04-14")
        updated = str(meta.get("last_updated") or published)
        author = str(meta.get("author") or "Assurator.ch")
        primary_keyword = str(meta.get("primary_keyword") or "").strip()
        secondary = meta.get("secondary_keywords") or []
        if isinstance(secondary, str):
            secondary = [secondary]
        keywords = [x for x in [primary_keyword, *secondary] if x]
        keywords_str = ", ".join(keywords)

        html_body = markdown.markdown(body, extensions=["extra", "tables", "sane_lists", "fenced_code"])
        plain_text = re.sub(r"<[^>]+>", " ", html_body)
        plain_text = re.sub(r"\s+", " ", plain_text).strip()
        declared_word_count = int(meta.get("word_count") or 0)
        word_count = declared_word_count if declared_word_count > 0 else len(plain_text.split())
        reading_time = max(4, math.ceil(word_count / 220))

        slug = page_slug(meta, md_path)
        filename = f"blog-{slug}.html"
        canonical = f"{SITE_URL}/{filename}"
        published_iso = f"{published}T08:00:00+02:00"
        updated_iso = f"{updated}T08:00:00+02:00"

        ld_json = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {"@type": "WebPage", "@id": canonical},
            "headline": title,
            "description": meta_description,
            "inLanguage": "fr-CH",
            "author": {"@type": "Organization", "name": author},
            "publisher": {
                "@type": "Organization",
                "name": "Assurator.ch",
                "logo": {"@type": "ImageObject", "url": f"{SITE_URL}/logo.png"},
            },
            "datePublished": published_iso,
            "dateModified": updated_iso,
            "keywords": keywords,
        }

        keyword_badges = "".join(
            f'<span class="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">{html.escape(k)}</span>'
            for k in keywords[:4]
        )

        page = f"""<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{html.escape(meta_title)}</title>
        <meta name="description" content="{html.escape(meta_description)}" />
        <meta name="keywords" content="{html.escape(keywords_str)}" />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href="{html.escape(canonical)}" />

        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fr_CH" />
        <meta property="og:site_name" content="Assurator.ch" />
        <meta property="og:title" content="{html.escape(title)}" />
        <meta property="og:description" content="{html.escape(meta_description)}" />
        <meta property="og:url" content="{html.escape(canonical)}" />
        <meta property="article:published_time" content="{published_iso}" />
        <meta property="article:modified_time" content="{updated_iso}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{html.escape(title)}" />
        <meta name="twitter:description" content="{html.escape(meta_description)}" />

        <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Assurator.ch" />
        <link rel="manifest" href="/icons/site.webmanifest" />

        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script>
            tailwind.config = {{
                theme: {{
                    extend: {{
                        fontFamily: {{ sans: ["Inter", "sans-serif"] }},
                        colors: {{
                            brand: {{ 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" }},
                        }},
                    }},
                }},
            }};
            window.FontAwesomeConfig = {{ autoReplaceSvg: "nest" }};
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <style>
            .article-content h2 {{ font-size: 1.5rem; line-height: 2rem; font-weight: 800; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem; }}
            .article-content h3 {{ font-size: 1.25rem; line-height: 1.75rem; font-weight: 700; color: #1e293b; margin-top: 1.5rem; margin-bottom: 0.75rem; }}
            .article-content p {{ margin-bottom: 1rem; color: #334155; }}
            .article-content ul, .article-content ol {{ margin-left: 1.25rem; margin-bottom: 1rem; color: #334155; }}
            .article-content ul {{ list-style: disc; }}
            .article-content ol {{ list-style: decimal; }}
            .article-content li {{ margin-bottom: 0.35rem; }}
            .article-content blockquote {{ background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #3b82f6; border-radius: 0.75rem; padding: 1rem 1.25rem; margin: 1.25rem 0; }}
            .article-content hr {{ margin: 2rem 0; border: 0; border-top: 1px solid #e2e8f0; }}
            .article-content table {{ width: 100%; border-collapse: collapse; overflow: hidden; border: 1px solid #e2e8f0; border-radius: 0.75rem; margin: 1.25rem 0; font-size: 0.95rem; }}
            .article-content th, .article-content td {{ padding: 0.65rem 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: left; vertical-align: top; }}
            .article-content th {{ background: #f8fafc; font-weight: 700; color: #0f172a; }}
            .article-content tr:last-child td {{ border-bottom: 0; }}
            .article-content a {{ color: #1d4ed8; text-decoration: underline; text-underline-offset: 2px; }}
            .article-content strong {{ color: #0f172a; }}
        </style>

        <script type="application/ld+json">{json.dumps(ld_json, ensure_ascii=False)}</script>
    </head>
    <body class="font-sans text-slate-800 bg-slate-50 antialiased">
{nav_html()}
        <main class="pt-28 pb-20">
            <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6 flex flex-wrap gap-2 items-center justify-between">
                    <a href="blog.html" class="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-800">
                        <i class="fa-solid fa-arrow-left"></i>
                        Retour au blog
                    </a>
                    <a href="index.html#simulator" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-700">
                        Comparer les assurances
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
                <header class="mb-8">
                    <p class="text-sm font-semibold text-brand-700 uppercase tracking-wide mb-3">Guide pratique assurance Suisse</p>
                    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">{html.escape(h1)}</h1>
                    <p class="text-slate-500 mb-4">PubliÃ© le {french_date(published)} &middot; Mis Ã  jour le {french_date(updated)} &middot; {reading_time} min de lecture</p>
                    <p class="text-lg text-slate-600">{html.escape(meta_description)}</p>
                </header>
                <div class="mb-8 flex flex-wrap gap-2">{keyword_badges}</div>
                <div class="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm article-content leading-relaxed">
                    {html_body}
                </div>
            </article>
        </main>
{footer_html()}
    </body>
</html>
"""
        (ROOT / filename).write_text(page, encoding="utf-8")

        articles.append(
            {
                "title": title,
                "description": meta_description,
                "primary_keyword": primary_keyword,
                "published": published,
                "published_fr": french_date(published),
                "filename": filename,
                "canonical": canonical,
            }
        )

    return articles


def render_blog_index(articles: list[dict]) -> None:
    articles = sorted(articles, key=lambda x: (x["published"], x["title"]), reverse=True)
    gradients = [
        "from-brand-200 via-brand-100 to-white",
        "from-cyan-200 via-sky-100 to-white",
        "from-emerald-200 via-green-100 to-white",
        "from-indigo-200 via-blue-100 to-white",
        "from-amber-200 via-yellow-100 to-white",
        "from-rose-200 via-orange-100 to-white",
        "from-violet-200 via-indigo-100 to-white",
    ]

    cards = []
    for idx, article in enumerate(articles):
        grad = gradients[idx % len(gradients)]
        label = article["primary_keyword"].title() if article["primary_keyword"] else "Article"
        cards.append(
            f"""<article class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                        <div class="h-44 bg-gradient-to-br {grad}"></div>
                        <div class="p-6 flex flex-col h-full">
                            <div class="flex items-center justify-between gap-3 mb-3">
                                <p class="text-xs font-semibold uppercase tracking-wide text-brand-700">{html.escape(label)}</p>
                                <p class="text-xs text-slate-500">{html.escape(article["published_fr"])}</p>
                            </div>
                            <h2 class="text-xl font-bold text-slate-900 mb-3">{html.escape(article["title"])}</h2>
                            <p class="text-slate-600 mb-5">{html.escape(article["description"])}</p>
                            <a href="{html.escape(article["filename"])}" class="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-800 mt-auto">
                                Lire l'article
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </article>"""
        )

    item_list = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Articles Assurator.ch",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "url": x["canonical"], "name": x["title"]}
            for i, x in enumerate(articles)
        ],
    }

    page = f"""<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blog Assurance Suisse 2026 | Assurator.ch</title>
        <meta name="description" content="Le blog Assurator.ch: conseils, comparatifs et guides pratiques sur les assurances en Suisse (maladie, prÃ©natale, voyage, animaux, famille)." />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href="{SITE_URL}/blog.html" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_CH" />
        <meta property="og:site_name" content="Assurator.ch" />
        <meta property="og:title" content="Blog Assurance Suisse 2026 | Assurator.ch" />
        <meta property="og:description" content="Guides, comparatifs et analyses pour bien choisir vos assurances en Suisse." />
        <meta property="og:url" content="{SITE_URL}/blog.html" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Assurance Suisse 2026 | Assurator.ch" />
        <meta name="twitter:description" content="Guides, comparatifs et analyses pour bien choisir vos assurances en Suisse." />

        <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Assurator.ch" />
        <link rel="manifest" href="/icons/site.webmanifest" />

        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script>
            tailwind.config = {{
                theme: {{
                    extend: {{
                        fontFamily: {{ sans: ["Inter", "sans-serif"] }},
                        colors: {{
                            brand: {{ 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" }},
                        }},
                    }},
                }},
            }};
            window.FontAwesomeConfig = {{ autoReplaceSvg: "nest" }};
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script type="application/ld+json">{json.dumps(item_list, ensure_ascii=False)}</script>
    </head>
    <body class="font-sans text-slate-800 bg-slate-50 antialiased">
{nav_html()}
        <main class="pt-28 pb-20">
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl">
                    <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 mb-4">
                        <i class="fa-solid fa-newspaper"></i>
                        Espace blog
                    </p>
                    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">Le blog Assurator.ch</h1>
                    <p class="text-lg text-slate-600">ActualitÃ©s, conseils et guides pratiques pour mieux comprendre les assurances en Suisse.</p>
                </div>
            </section>

            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {"".join(cards)}
                </div>
            </section>
        </main>
{footer_html()}
    </body>
</html>
"""
    (ROOT / "blog.html").write_text(page, encoding="utf-8")


def main() -> None:
    articles = render_articles()
    render_blog_index(articles)

    demo = ROOT / "blog-comment-choisir-sa-franchise-2026.html"
    if demo.exists():
        demo.unlink()
    subprocess.run([sys.executable, str(ROOT / "scripts" / "generate_sitemap.py")], check=True)
    subprocess.run([sys.executable, str(ROOT / "scripts" / "generate_agent_skills_index.py")], check=True)
    

    print(f"Articles gÃ©nÃ©rÃ©s: {len(articles)}")


if __name__ == "__main__":
    main()


