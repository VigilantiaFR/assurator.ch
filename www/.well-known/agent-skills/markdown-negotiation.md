# markdown-negotiation

This skill describes content negotiation for AI agents.

- Default homepage response: HTML (`/` -> `index.html`)
- If `Accept: text/markdown`: `/` serves `/index.agent.md`
- Markdown content-type is set server-side to `text/markdown`
- Header includes `X-Markdown-Tokens`
