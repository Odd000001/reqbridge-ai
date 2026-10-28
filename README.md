# ReqBridge AI

Compare workshop notes with process maps, record decisions, and prepare user
stories and acceptance criteria for backlog review.

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

- **Council Tax Rebate:** claim approval thresholds and residency eligibility.
- **Housing Repairs:** emergency routing and tenant access notice.
- **Blue Badge Applications:** alternative evidence, assessment routing, and
  applicant updates.
- **School Admissions:** ranked school preferences, address evidence, and
  application updates.
- **Missed Waste Collections:** report deadlines, crew checks, and revisit
  updates.

Use the example selector in the workspace to switch scenarios. These are sample
workflows with fixture evidence; exports are copied or downloaded for review.
The app does not connect to Jira or Azure DevOps.

## Upload demo files

The workspace includes a paired upload panel for a fixed Community Food Support
example. Select the provided transcript and BPMN source in the panel to load it:

- `public/demo-sources/Community_Food_Support_Transcript.txt`
- `public/demo-sources/Community_Food_Support_Flow.bpmn`

The browser reads these files locally. They are not uploaded to a server or
analysed. The supplied pair loads the prepared example and its interactive
conflict, decision, and readiness workflow.
