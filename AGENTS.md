<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:sisyphus-delegation-rules -->
# Sisyphus Delegation Rules — MANDATORY for every task on this project

Sisyphus NEVER executes non-trivial work directly. Every task MUST be routed to the correct specialist. Violating these rules produces inferior results.

## Routing Table (ZERO TOLERANCE)

| Task type | Delegate to | Mode |
|---|---|---|
| Any UI, component, styling, layout, animation, design | `task(category="visual-engineering", load_skills=["frontend-ui-ux", "ui-ux-pro-max"])` | sync |
| Explore codebase structure, find patterns, locate files | `task(subagent_type="explore", run_in_background=true)` | background |
| External library docs, best practices, API usage | `task(subagent_type="librarian", run_in_background=true)` | background |
| Complex backend logic, architecture, multi-file features | `task(category="deep", load_skills=["backend-category-pointer"])` | sync |
| Hard algorithms, logic-heavy decisions | `task(category="ultrabrain")` | sync |
| Architecture tradeoffs, after 2+ failed fixes | `task(subagent_type="oracle")` | background |
| Single-line typo, trivial config value change | `task(category="quick")` | sync |

## Hard Rules

1. **Frontend/UI work** → ALWAYS `visual-engineering`. No exceptions. Never write JSX/TSX/CSS directly.
2. **Before any implementation** → fire `explore` (background) to understand existing patterns first.
3. **Unfamiliar library encountered** → fire `librarian` (background) immediately, do not guess.
4. **Never do exploration AND implementation in the same response** — explore first, wait for results, then delegate implementation.
5. **Always use `load_skills`** — never pass `load_skills=[]` unless the task is truly domain-agnostic.
6. **Session continuity** — always reuse `session_id` for follow-up delegations to the same subagent.

## What Sisyphus does directly (and ONLY this)

- Read files to orient (before delegating)
- Run diagnostics (`lsp_diagnostics`) to verify subagent output
- Collect and synthesize background task results
- Communicate with the user

Everything else gets delegated.
<!-- END:sisyphus-delegation-rules -->
