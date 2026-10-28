# ReqBridge AI

ReqBridge AI turns workshop notes and process flows into source-linked,
compliance-aware user stories. Review conflicting evidence, resolve ambiguous
requirements, and prepare a validated story for backlog export.

## Run locally

Requirements: Node.js 22 or newer and npm.

In PowerShell, from the project directory:

```powershell
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1
```

Open the localhost URL printed by Vite (by default, `http://localhost:5173/`).
Use `npm.cmd run build` to create a production build.

## Example workflows

- **Council Tax Rebate** — claim approval thresholds and residency eligibility.
- **Housing Repairs** — emergency routing and tenant access notice.

Use the example selector in the workspace to switch scenarios. These are sample
workflows with fixture evidence; exports are copied or downloaded for review.
The app does not connect to Jira or Azure DevOps.
