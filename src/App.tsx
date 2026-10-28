import { useEffect, useState } from "react"

type IconName = "arrow" | "check" | "chevron" | "clock" | "close" | "copy" | "download" | "file" | "lock" | "more" | "shield" | "spark" | "users"

function Icon({
  name,
  className = "size-4",
}: {
  name: IconName
  className?: string
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 7" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h4" />
        <path d="M9 13h6M9 17h5" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8z" />
        <path d="m18.5 15 .7 2.2 1.8.8-1.8.8-.7 2.2-.7-2.2L16 18l1.8-.8z" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6" />
        <path d="M16 5a3 3 0 0 1 0 6M17 14c2.5.4 4 2.4 4 5" />
      </>
    ),
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

type ScenarioId = "rebate" | "repairs"
type ScenarioDecision = "primary" | "alternate"
type Scenario = {
  project: string
  storyKey: string
  storyTitle: string
  role: string
  action: string
  benefit: string
  transcriptFile: string
  processFile: string
  transcriptMeta: string
  actorSummary: string
  scopeSummary: string
  entitySummary: string
  conflictTitle: string
  conflictTopic: string
  transcriptQuote: string
  processQuote: string
  primaryOption: string
  alternateOption: string
  primaryDecision: string
  alternateDecision: string
  ambiguityTitle: string
  ambiguityEvidence: string
  ambiguityPrimary: string
  ambiguityAlternate: string
  ambiguityGivenPrefix: string
  ambiguityGivenSuffix: string
  primaryWhen: string
  boundaryWhen: string
  policyEntity: string
  policyDescription: string
  transcriptContent: string[]
  processSteps: string[]
  conflictStep: number
  conflictTranscriptIndex: number
  decisionBoundary: string
  decisionBoundaryThen: string
  securityGiven: string
  securityWhen: string
  securityThen: string
}

const scenarios: Record<ScenarioId, Scenario> = {
  rebate: {
    project: "Public Sector / Council Tax Rebate",
    storyKey: "US-104",
    storyTitle: "Online rebate submission & automated eligibility",
    role: "resident",
    action: "submit my rebate claim online",
    benefit: "eligible payments can be processed without delay",
    transcriptFile: "Workshop_Transcript.txt",
    processFile: "Process_Flow_v2.bpmn",
    transcriptMeta: "45m dialogue",
    actorSummary: "Resident · Supervisor · Finance officer",
    scopeSummary: "Submission · Eligibility · Approval",
    entitySummary: "Resident · Claim · Bank account",
    conflictTitle: "Approval conflict",
    conflictTopic: "who approves a claim",
    transcriptQuote: "Claims of £500 or less are auto-approved",
    processQuote: "All claims require supervisor approval",
    primaryOption: "Auto-approve claims up to £500",
    alternateOption: "Require supervisor review for all claims",
    primaryDecision: "Claims of £500 or less are automatically approved",
    alternateDecision: "Claims of £500 or less require supervisor approval",
    ambiguityTitle: "Residency period",
    ambiguityEvidence: "“a reasonable period”",
    ambiguityPrimary: "6 months",
    ambiguityAlternate: "12 months",
    ambiguityGivenPrefix: "resident in borough >",
    ambiguityGivenSuffix: "",
    primaryWhen: "claim ≤ £500",
    boundaryWhen: "claim > £500",
    policyEntity: "Bank PII",
    policyDescription:
      "AES-256 encryption and immutable audit logs added to Definition of Done.",
    transcriptContent: [
      "Discovery workshop · 45-minute dialogue",
      "18:16 · Finance officer — “We need to reduce the manual approval queue for smaller rebate claims.”",
      "18:42 · Rebate Manager — “Claims of £500 or less should be auto-approved. Anything above that needs supervisor review.”",
      "19:05 · Business analyst — “The current process flow still routes every claim to the supervisor. We need to agree the governing rule.”",
    ],
    processSteps: [
      "Resident submits claim",
      "Validate resident details",
      "Check eligibility",
      "Supervisor reviews every claim",
      "Queue payment",
      "Record audit event",
    ],
    conflictStep: 3,
    conflictTranscriptIndex: 2,
    decisionBoundary: "Claims above £500",
    decisionBoundaryThen: "Supervisor review required",
    securityGiven: "bank details are submitted",
    securityWhen: "details are stored or transmitted",
    securityThen: "details are encrypted using AES-256 and masked in logs",
  },
  repairs: {
    project: "Public Sector / Housing Repairs",
    storyKey: "US-218",
    storyTitle: "Report a repair & track its response",
    role: "tenant",
    action: "report a repair and track its progress",
    benefit: "my home is safe and I know when help will arrive",
    transcriptFile: "Repairs_Workshop_Transcript.txt",
    processFile: "Repairs_Intake_Flow.bpmn",
    transcriptMeta: "38m dialogue",
    actorSummary: "Tenant · Repairs coordinator · Contractor",
    scopeSummary: "Report · Triage · Assign · Update",
    entitySummary: "Tenant · Property · Repair request",
    conflictTitle: "Emergency repair routing",
    conflictTopic: "how emergency repairs are assigned",
    transcriptQuote: "Emergency repairs go straight to the on-call team",
    processQuote: "All new reports enter the standard queue",
    primaryOption: "Route emergencies to the on-call team",
    alternateOption: "Keep all reports in the standard queue",
    primaryDecision:
      "Emergency repairs are sent directly to the on-call team",
    alternateDecision:
      "All repair requests enter the standard queue for triage",
    ambiguityTitle: "Access notice period",
    ambiguityEvidence: "“give the tenant reasonable notice”",
    ambiguityPrimary: "24 hours",
    ambiguityAlternate: "48 hours",
    ambiguityGivenPrefix: "tenant has received",
    ambiguityGivenSuffix: " access notice",
    primaryWhen: "an emergency repair is reported",
    boundaryWhen: "a non-emergency repair is reported",
    policyEntity: "Tenant contact data",
    policyDescription:
      "Encrypt tenant and property details, restrict access by role, and audit changes.",
    transcriptContent: [
      "Housing repairs workshop · 38-minute dialogue",
      "09:12 · Repairs manager — “If a repair is an emergency, it needs to go directly to the on-call team. A leaking ceiling cannot wait in a queue.”",
      "09:26 · Service designer — “Tenants should get a clear update when the team is assigned and when a visit is booked.”",
      "09:41 · Product owner — “We still need to agree how much notice we give tenants before entering the property.”",
    ],
    processSteps: [
      "Tenant reports a repair",
      "Capture property and contact details",
      "Classify repair urgency",
      "Add request to standard queue",
      "Assign repairs team",
      "Notify tenant and record updates",
    ],
    conflictStep: 3,
    conflictTranscriptIndex: 1,
    decisionBoundary: "Non-emergency repairs",
    decisionBoundaryThen:
      "The repairs coordinator reviews and assigns the request",
    securityGiven: "tenant and property details are submitted",
    securityWhen: "details are stored or accessed",
    securityThen: "details are encrypted and visible only to authorised staff",
  },
}

export default function App() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("rebate")
  const scenario = scenarios[scenarioId]
  const [resolved, setResolved] = useState(false)
  const [applying, setApplying] = useState(false)
  const [readiness, setReadiness] = useState(78)
  const [tab, setTab] = useState(0)
  const [source, setSource] = useState<string | null>(null)
  const [policyOpen, setPolicyOpen] = useState(false)
  const [ambiguity, setAmbiguity] = useState<
    ScenarioDecision | "Clarify"
  >("primary")
  const [decision, setDecision] = useState<ScenarioDecision>("primary")
  const [decisionTime, setDecisionTime] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState<"Jira" | "Azure DevOps">("Jira")
  const readinessTarget = !resolved ? 78 : ambiguity === "Clarify" ? 82 : 94
  const canExport =
    resolved && readiness >= 85 && ambiguity !== "Clarify" && !applying
  const decisionDescription =
    decision === "primary"
      ? scenario.primaryDecision
      : scenario.alternateDecision
  const ambiguityValue =
    ambiguity === "primary"
      ? scenario.ambiguityPrimary
      : scenario.ambiguityAlternate
  const scenarioGiven =
    ambiguity === "Clarify"
      ? `${scenario.ambiguityTitle.toLowerCase()} requirement is not yet defined`
      : `${scenario.ambiguityGivenPrefix} ${ambiguityValue}${scenario.ambiguityGivenSuffix}`
  const acceptanceCriteria = [
    scenarioGiven,
    decisionDescription,
    `${scenario.decisionBoundary}: ${scenario.decisionBoundaryThen}`,
    scenario.securityThen,
    "The claim journey meets WCAG 2.1 AA",
  ]
  const exportText = `## ${scenario.storyKey} — ${scenario.storyTitle}

**As a** ${scenario.role}  
**I want to** ${scenario.action}  
**So that** ${scenario.benefit}.

### Acceptance Criteria
- **Given** ${scenarioGiven}
- **When** ${scenario.primaryWhen}
- **Then** ${decisionDescription}
- **When** ${scenario.boundaryWhen}
- **Then** ${scenario.decisionBoundaryThen}
- **Given** ${scenario.securityGiven}
- **When** ${scenario.securityWhen}
- **Then** ${scenario.securityThen}

### Definition of Done
- Audit event recorded for every status change
- Interface meets WCAG 2.1 AA

_Decision source: CONF-01 · ${decisionDescription}._`
  const formattedExport =
    format === "Jira"
      ? exportText
      : `# Azure DevOps · User Story\n\n${exportText.replace(`## ${scenario.storyKey}`, `## Title: ${scenario.storyKey}`)}`

  const resetWorkspace = () => {
    setResolved(false)
    setApplying(false)
    setReadiness(78)
    setTab(0)
    setSource(null)
    setPolicyOpen(false)
    setAmbiguity("primary")
    setDecision("primary")
    setDecisionTime("")
    setModalOpen(false)
    setCopied(false)
    setFormat("Jira")
  }

  const changeScenario = (nextScenario: ScenarioId) => {
    setScenarioId(nextScenario)
    setResolved(false)
    setApplying(false)
    setReadiness(78)
    setTab(0)
    setSource(null)
    setPolicyOpen(false)
    setAmbiguity("primary")
    setDecision("primary")
    setDecisionTime("")
    setModalOpen(false)
    setCopied(false)
  }

  useEffect(() => {
    if (!applying) return
    const timeout = window.setTimeout(() => {
      setResolved(true)
      setApplying(false)
      setDecisionTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }, 500)
    return () => window.clearTimeout(timeout)
  }, [applying])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReadiness(readinessTarget)
      return
    }
    const start = performance.now()
    const startReadiness = readiness
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 800, 1)
      setReadiness(
        Math.round(
          startReadiness + (readinessTarget - startReadiness) * progress,
        ),
      )
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [readinessTarget])

  useEffect(() => {
    if (!modalOpen && !source) return
    const previousFocus = document.activeElement as HTMLElement | null
    const dialogs = document.querySelectorAll<HTMLElement>('[role="dialog"]')
    const dialog = source
      ? document
          .getElementById("source-title")
          ?.closest<HTMLElement>('[role="dialog"]')
      : dialogs[dialogs.length - 1]
    const controls = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], input, textarea, [tabindex="0"]',
        ) ?? [],
      )
    controls()[0]?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (source) setSource(null)
        else setModalOpen(false)
      }
      if (event.key === "Tab") {
        const focusable = controls()
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      previousFocus?.focus()
    }
  }, [modalOpen, source])

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(formattedExport)
      setCopied(true)
    } catch {
      setSource("Clipboard unavailable — download JSON instead.")
    }
    window.setTimeout(() => setCopied(false), 1800)
  }

  const downloadExport = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            key: scenario.storyKey,
            title: scenario.storyTitle,
            status: "Ready for delivery",
            readiness,
            decision,
            markdown: formattedExport,
            acceptanceCriteria,
            requirements: ["GDPR Art. 32", "WCAG 2.1 AA"],
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    )
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${scenario.storyKey}-jira-export.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--ink)] text-xs font-bold text-white">
              R
            </div>
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <span className="truncate font-bold">ReqBridge</span>
              <span className="text-[var(--line-strong)]">/</span>
              <span className="truncate text-[var(--muted)]">{scenario.project}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              disabled={!canExport}
              className="disabled:bg-[var(--disabled)] disabled:text-[var(--muted)] hidden items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90 md:flex"
            >
              Export to Jira <Icon name="arrow" className="size-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1480px] items-center gap-2 overflow-x-auto px-5 py-3 text-[11px] font-semibold lg:px-8">
          <span className="mr-3 shrink-0 tracking-[.12em] text-[var(--muted)]">
            DELIVERY WORKFLOW
          </span>
          <Step label="Ingest & extract" number="1" state="done" />
          <span className="text-[var(--line-strong)]">—</span>
          <Step
            label="Audit & policy"
            number="2"
            state="done"
            detail="2 checks"
          />
          <span className="text-[var(--line-strong)]">—</span>
          <Step label="Story draft" number="3" state="done" />
          <span className="text-[var(--line-strong)]">—</span>
          <Step
            label="Human triage"
            number="4"
            state={resolved ? "done" : "active"}
            detail={resolved ? "Decision recorded" : "Review required"}
          />
          <span className="text-[var(--line-strong)]">—</span>
          <Step
            label="Backlog export"
            number="5"
            state={canExport ? "done" : "locked"}
            detail={canExport ? "Ready" : "Gated"}
          />
          <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-[var(--green-dark)] md:flex">
            <Icon name={canExport ? "check" : "clock"} className="size-3.5" />{" "}
            {applying
              ? "Recording decision"
              : canExport
                ? "Ready for delivery export"
                : ambiguity === "Clarify" && resolved
                  ? "Clarification required"
                  : resolved
                    ? "Readiness recalculating"
                    : "Human review required"}
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-[1480px] px-5 py-8 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-[var(--muted)]">
            WORKSPACE STATUS ·{" "}
            {resolved
              ? "02 / Decision verified"
              : "01 / Source conflict detected"}
          </span>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={resetWorkspace}
              className="font-semibold text-[var(--muted)]"
            >
              Reset workspace
            </button>
          </div>
        </div>
        <p role="status" className="sr-only">
          {!resolved
            ? `${scenario.conflictTitle} blocks export. Readiness ${readiness}%.`
            : ambiguity === "Clarify"
            ? `Decision recorded, but ${scenario.ambiguityTitle.toLowerCase()} clarification is pending. Readiness ${readiness}%. Export is locked.`
              : `Decision applied. Readiness ${readiness}%. Export is ${
                  canExport ? "available" : "locked"
                }.`}
        </p>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[var(--blue)]">
              Requirements to delivery
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-[-.03em] md:text-4xl">
              Resolve the gaps. Ship with confidence.
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Every decision is source-linked, reviewable and ready for your
              backlog.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full border border-[var(--line)] bg-white px-3 py-2 text-xs text-[var(--muted)] md:self-auto">
            <label className="sr-only" htmlFor="scenario-select">
              Choose a workflow example
            </label>
            <select
              id="scenario-select"
              value={scenarioId}
              onChange={(event) => {
                if (
                  event.target.value === "rebate" ||
                  event.target.value === "repairs"
                ) {
                  changeScenario(event.target.value)
                }
              }}
              className="max-w-[230px] rounded-md border-0 bg-transparent py-1 text-xs font-semibold text-[var(--ink)] focus:ring-2 focus:ring-[var(--blue)]"
            >
              <option value="rebate">Council Tax Rebate</option>
              <option value="repairs">Housing Repairs</option>
            </select>
            <span className="text-[var(--line-strong)]">/</span>{" "}
            {canExport
              ? "Ready to export"
              : resolved && ambiguity === "Clarify"
                ? "Clarification needed"
                : "Working draft"}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[250px_minmax(430px,1fr)_minmax(340px,.85fr)]">
          <aside className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <SectionLabel number="01" label="Provenance" />
            <p className="mt-7 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
              Source material · 2 files
            </p>
            <SourceFile
              name={scenario.transcriptFile}
              meta={scenario.transcriptMeta}
              onClick={() => setSource("transcript")}
            />
            <SourceFile
              name={scenario.processFile}
              meta={`${scenario.processSteps.length} steps`}
              onClick={() => setSource("bpmn")}
            />
            <div className="my-5 border-t border-[var(--line)]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
              Extracted directory
            </p>
            <DirectoryItem
              icon="users"
              title="Actors"
              count="5"
              detail={scenario.actorSummary}
            />
            <DirectoryItem
              icon="spark"
              title="Functional scope rules"
              count="8"
              detail={scenario.scopeSummary}
            />
            <DirectoryItem
              icon="file"
              title="Data entities"
              count="4"
              detail={scenario.entitySummary}
            />
          </aside>

          <section>
            <div className="rounded-2xl border border-[var(--line)] bg-white p-5 md:p-6">
              <div className="flex items-center justify-between">
                <SectionLabel number="02" label="Triage workbench" />
              </div>
              <div className="mt-5 flex gap-1 overflow-x-auto border-b border-[var(--line)] text-xs">
                {[
                  "All  (3)",
                  resolved ? "Resolved  (1)" : "Blockers  (1)",
                  "Ambiguities  (1)",
                  "Policies  (1)",
                ].map((label, index) => (
                  <button
                    key={label}
                    onClick={() => setTab(index)}
                    aria-pressed={index === tab}
                    className={`shrink-0 border-b-2 px-3 py-3 font-semibold ${
                      index === tab
                        ? "border-[var(--ink)] text-[var(--ink)]"
                        : "border-transparent text-[var(--muted)]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {(tab === 0 || tab === 1) && (
                <IssueCard tone={resolved ? "green" : "red"}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <StatusPill tone={resolved ? "green" : "red"}>
                        {resolved
                          ? "✓ Resolved · Decision recorded"
                          : "Blocker · 2 conflicting sources"}
                      </StatusPill>
                      <h2 className="mt-3 text-base font-semibold">
                        {resolved
                          ? `CONF-01: ${scenario.conflictTitle} — Decision Recorded`
                          : `CONF-01: ${scenario.conflictTitle}`}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                        {resolved
                          ? `${decisionDescription} adopted as the agreed rule. Process flow step updated.`
                          : `The sources disagree about ${scenario.conflictTopic}. Choose the governing rule.`}
                      </p>
                    </div>
                    {resolved && (
                      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--green)] text-white">
                        <Icon name="check" />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Quote
                      source="Workshop transcript"
                      text={scenario.transcriptQuote}
                      onClick={() => setSource("transcript")}
                      selected={resolved}
                    />
                    <Quote
                      source={`Process flow · Step ${String(scenario.conflictStep + 1).padStart(2, "0")}`}
                      text={scenario.processQuote}
                      onClick={() => setSource("bpmn")}
                    />
                  </div>
                  {!resolved ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        disabled={applying}
                        onClick={() => {
                          setDecision("primary")
                          setApplying(true)
                        }}
                        className="rounded-lg bg-[var(--red)] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:ring-offset-2"
                      >
                        {applying ? "Recording decision…" : scenario.primaryOption}
                      </button>
                      <button
                        disabled={applying}
                        onClick={() => {
                          setDecision("alternate")
                          setApplying(true)
                        }}
                        className="rounded-lg border border-[var(--line-strong)] bg-white px-3.5 py-2.5 text-xs font-bold"
                      >
                        {scenario.alternateOption}
                      </button>
                      <button
                        onClick={() => setSource("custom")}
                        className="rounded-lg px-3.5 py-2.5 text-xs font-bold text-[var(--muted)]"
                      >
                        Custom decision
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 rounded-lg bg-white p-1.5 ring-1 ring-[var(--line)]">
                        {(
                          ["primary", "alternate"] as const
                        ).map((option) => (
                            <button
                              key={option}
                              aria-pressed={decision === option}
                              onClick={() => {
                                setDecision(option)
                                setDecisionTime(
                                  new Date().toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }),
                                )
                              }}
                              className={`rounded-md px-3 py-2 text-xs font-semibold ${
                                decision === option
                                  ? "bg-[var(--ink)] text-white"
                                  : "text-[var(--muted)]"
                              }`}
                            >
                              {option === "primary"
                                ? scenario.primaryOption
                                : scenario.alternateOption}
                            </button>
                          ))}
                      </div>
                      <p className="mt-3 text-[11px] text-[var(--green-dark)]">
                        {decisionTime} · Product Owner adopted {decisionDescription}.
                        Decision recorded in audit history.
                      </p>
                    </div>
                  )}
                </IssueCard>
              )}

              {(tab === 0 || tab === 2) && (
                <IssueCard tone="amber">
                  <StatusPill tone="amber">
                    Ambiguity · Workshop transcript · 12:08
                  </StatusPill>
                  <h2 className="mt-3 text-base font-semibold">
                    AMB-02: {scenario.ambiguityTitle}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Evidence: {scenario.ambiguityEvidence}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(
                      [
                        scenario.ambiguityPrimary,
                        scenario.ambiguityAlternate,
                        "Clarify",
                      ] as const
                    ).map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => setAmbiguity(option)}
                          aria-pressed={ambiguity === option}
                          className="rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2 text-xs font-semibold hover:bg-[var(--soft)]"
                        >
                          {option === "Clarify" ? "Request clarification" : option}
                        </button>
                      ),
                    )}
                    <span className="ml-auto self-center text-[11px] font-semibold text-[var(--amber-dark)]">
                      {ambiguity === "Clarify"
                        ? "Clarification requested"
                        : `${ambiguityValue} · working assumption`}
                    </span>
                  </div>
                  {ambiguity === "Clarify" && (
                    <p className="mt-3 text-xs leading-5 text-[var(--amber-dark)]">
                      Question prepared for the Product Owner: What is the
                      required {scenario.ambiguityTitle.toLowerCase()}? Story
                      criteria remain blocked pending confirmation.
                    </p>
                  )}
                </IssueCard>
              )}

              {(tab === 0 || tab === 3) && (
                <IssueCard tone="blue">
                  <div className="flex items-start gap-3">
                    <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--blue-soft)] text-[var(--blue)]">
                      <Icon name="shield" />
                    </div>
                    <div>
                      <StatusPill tone="blue">
                        Inferred NFR · Automatically injected
                      </StatusPill>
                      <h2 className="mt-2 text-base font-semibold">
                        POL-01: {scenario.policyEntity}{" "}
                        <span className="font-normal text-[var(--muted)]">
                          (GDPR Art. 32)
                        </span>
                      </h2>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {scenario.policyDescription}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPolicyOpen(!policyOpen)}
                    aria-expanded={policyOpen}
                    className="mt-3 flex items-center gap-2 text-xs font-semibold text-[var(--blue)]"
                  >
                    {policyOpen ? "Hide" : "Review"} compliance details{" "}
                    <Icon name="chevron" className="size-3" />
                  </button>
                  {policyOpen && (
                    <div className="mt-3 rounded-lg bg-white p-3 text-xs leading-6 text-[var(--muted)]">
                      <strong className="text-[var(--ink)]">
                        Definition of Done · GDPR Article 32
                      </strong>
                      <ul className="ml-4 list-disc">
                        <li>AES-256 encryption for stored bank details.</li>
                        <li>Immutable audit event for every status change.</li>
                        <li>Access limited to authorised finance officers.</li>
                      </ul>
                      <p className="mt-2">
                        Inferred safeguard for banking data; included in the
                        export for review.
                      </p>
                    </div>
                  )}
                </IssueCard>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <div
              className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-500 ${
                canExport
                  ? "border-[var(--green-border)]"
                  : "border-[var(--line)]"
              }`}
            >
              <div className="p-5 md:p-6">
                <SectionLabel number="03" label="Story & BDD" />
                <div className="mt-7 flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-[var(--muted)]">
                        Readiness
                      </p>
                      <StatusPill tone={canExport ? "green" : "amber"}>
                        {canExport ? "Ready" : "Blocked"}
                      </StatusPill>
                    </div>
                    <div
                      className={`font-display mt-1 text-5xl font-semibold tracking-[-.05em] transition-colors duration-500 ${
                        canExport
                          ? "text-[var(--green)]"
                          : "text-[var(--amber)]"
                      }`}
                    >
                      {readiness}
                      <span className="ml-1 text-xl">%</span>
                    </div>
                  </div>
                  <div className="relative size-20">
                    <svg viewBox="0 0 80 80" className="-rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        fill="none"
                        stroke="var(--soft)"
                        strokeWidth="7"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        fill="none"
                        stroke={canExport ? "var(--green)" : "var(--amber)"}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={`${readiness * 2.136} 214`}
                        className="transition-all duration-700"
                      />
                    </svg>
                    <Icon
                      name={canExport ? "check" : "clock"}
                      className={`absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 ${
                        canExport
                          ? "text-[var(--green)]"
                          : "text-[var(--amber)]"
                      }`}
                    />
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                  {!resolved
                    ? `The ${scenario.conflictTitle.toLowerCase()} must be resolved before delivery.`
                    : ambiguity === "Clarify"
                      ? `The decision is recorded, but ${scenario.ambiguityTitle.toLowerCase()} rules need clarification before export.`
                      : `All blockers cleared. Export unlocks at 85%; readiness is ${readiness}%.`}
                </p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--soft)]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      canExport ? "bg-[var(--green)]" : "bg-[var(--amber)]"
                    }`}
                    style={{ width: `${readiness}%` }}
                  />
                </div>
              </div>

              <div className="border-t border-[var(--line)] p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-[var(--blue)]">
                    {scenario.storyKey}
                  </span>
                  <StatusPill tone={canExport ? "green" : "neutral"}>
                    {canExport ? "Sprint-ready" : "Draft · In review"}
                  </StatusPill>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold leading-7">
                  {scenario.storyTitle}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  <strong className="text-[var(--ink)]">As a</strong>{" "}
                  {scenario.role},{" "}
                  <strong className="text-[var(--ink)]">I want to</strong>{" "}
                  {scenario.action}{" "}
                  <strong className="text-[var(--ink)]">so that</strong>{" "}
                  {scenario.benefit}.
                </p>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                  Acceptance criteria · BDD
                </p>
                <div className="mt-3 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--code-bg)] font-mono text-[11px] leading-5">
                  <Criteria
                    label="Given"
                    value={scenarioGiven}
                  />
                  <Criteria
                    label="When"
                    value={scenario.primaryWhen}
                    highlight={resolved}
                  />
                  <Criteria
                    label="Then"
                    value={
                      !resolved
                        ? "approval outcome pending source conflict resolution"
                        : decisionDescription
                    }
                    highlight={resolved}
                  />
                  <Criteria
                    label="When"
                    value={scenario.decisionBoundary}
                    highlight={resolved}
                  />
                  <Criteria
                    label="Then"
                    value={scenario.decisionBoundaryThen}
                    highlight={resolved}
                  />
                </div>
                {resolved && ambiguity !== "Clarify" && (
                  <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[var(--green-dark)]">
                    <Icon name="spark" className="size-3.5" /> Criteria updated
                    from adopted decision
                  </div>
                )}
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                  Attached requirements
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Tag>✓ GDPR Art. 32</Tag>
                  <Tag>✓ WCAG 2.1 AA</Tag>
                </div>
              </div>

              <div className="border-t border-[var(--line)] bg-[var(--soft)] p-4">
                <button
                  disabled={!canExport}
                  onClick={() => setModalOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--ink)] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:bg-[var(--disabled)] disabled:text-[var(--muted)] disabled:shadow-none"
                >
                  <span>Export Story</span>
                  <span className="ml-auto flex items-center gap-2 text-xs font-semibold text-white/70">
                    Push to Sprint <Icon name="arrow" />
                  </span>
                </button>
                {!canExport && (
                  <p className="mt-2 text-center text-[10px] text-[var(--muted)]">
                    {!resolved
                      ? `Resolve the ${scenario.conflictTitle.toLowerCase()} to enable export`
                      : ambiguity === "Clarify"
                        ? `Resolve the ${scenario.ambiguityTitle.toLowerCase()} clarification to enable export`
                        : "Readiness must reach 85% to enable export"}
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-8 border-t border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-2 px-5 py-5 text-[11px] text-[var(--muted)] sm:flex-row lg:px-8">
          <span>Source-linked decisions. Auditable by design.</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[var(--green)]" />             Workspace changes · session only
          </span>
        </div>
      </footer>

      {source && (
        <div
          className="fixed inset-0 z-[60] flex justify-end bg-[rgba(15,23,42,.35)] backdrop-blur-sm"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setSource(null)
          }
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="source-title"
            className="h-full w-full max-w-lg overflow-auto border-l border-[var(--line)] bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--blue)]">
                  Source-linked evidence · Example workspace
                </p>
                <h2 id="source-title" className="mt-3 text-xl font-semibold">
                  {source === "transcript"
                    ? scenario.transcriptFile
                    : source === "bpmn"
                      ? scenario.processFile
                      : source === "custom"
                        ? "Record a custom decision"
                        : "Clipboard unavailable"}
                </h2>
              </div>
              <button
                autoFocus
                onClick={() => setSource(null)}
                aria-label="Close source preview"
                className="rounded-lg p-2 hover:bg-[var(--soft)]"
              >
                <Icon name="close" />
              </button>
            </div>
            {source === "transcript" ? (
              <div className="mt-8 space-y-5 text-sm leading-7 text-[var(--muted)]">
                {scenario.transcriptContent.map((entry, index) => (
                  <p
                    key={entry}
                    className={
                      index === scenario.conflictTranscriptIndex
                        ? "rounded-xl border-l-4 border-[var(--amber)] bg-[var(--amber-soft)] p-4 text-[var(--ink)]"
                        : ""
                    }
                  >
                    {entry}
                  </p>
                ))}
                <p className="border-t border-[var(--line)] pt-4 text-xs">
                  Example evidence for {scenario.storyKey}. Review the
                  conflict and confirm the governing rule before export.
                </p>
              </div>
            ) : source === "bpmn" ? (
              <div className="mt-8 space-y-3">
                {scenario.processSteps.map((step, index) => (
                  <div
                    key={step}
                    className={`rounded-xl border p-4 text-sm ${
                      index === scenario.conflictStep
                        ? resolved
                          ? "border-[var(--green-border)] bg-[var(--green-soft)]"
                          : "border-[var(--red-border)] bg-[var(--red-soft)]"
                        : "border-[var(--line)] bg-[var(--soft)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>
                        {String(index + 1).padStart(2, "0")} · {step}
                      </span>
                      {index === scenario.conflictStep && (
                        <StatusPill tone={resolved ? "green" : "red"}>
                          {resolved ? "Decision recorded" : "Conflict"}
                        </StatusPill>
                      )}
                    </div>
                    {index === scenario.conflictStep && resolved && (
                      <p className="mt-3 text-xs font-semibold text-[var(--green-dark)]">
                        Adopted update: {decisionDescription}.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : source === "custom" ? (
              <div className="mt-8">
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Choose the governing rule for this example. Bespoke policy
                  drafting requires additional Product Owner review.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(
                    ["primary", "alternate"] as const
                  ).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setDecision(option)
                        setApplying(true)
                        setSource(null)
                      }}
                      className="rounded-lg bg-[var(--ink)] px-4 py-3 text-xs font-bold text-white"
                    >
                      {option === "primary"
                        ? scenario.primaryOption
                        : scenario.alternateOption}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-8 text-sm">
                Your browser blocked clipboard access. Use Download JSON in the
                export dialog instead.
              </p>
            )}
          </section>
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[rgba(15,23,42,.54)] p-4 backdrop-blur-sm"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setModalOpen(false)
          }
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-title"
            className="my-8 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-[var(--line)] p-5 md:p-6">
              <div className="flex gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--green-soft)] text-[var(--green-dark)]">
                  <Icon name="check" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[var(--green-dark)]">
                    {canExport
                      ? "Ready to export"
                      : resolved && ambiguity === "Clarify"
                        ? "Clarification needed"
                        : "Working draft"}
                  </p>
                  <h2
                    id="export-title"
                    className="font-display mt-1 text-2xl font-semibold"
                  >
                    {scenario.storyKey} formatted successfully
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Prepared export only — no Jira issue has been created. Copy
                    or download to add to your backlog.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="grid size-9 shrink-0 place-items-center rounded-lg text-[var(--muted)] hover:bg-[var(--soft)]"
                aria-label="Close export dialog"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="p-5 md:p-6">
              <div className="mb-4 flex w-fit rounded-lg bg-[var(--soft)] p-1 text-xs font-semibold">
                {(["Jira", "Azure DevOps"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFormat(item)}
                    className={`rounded-md px-3 py-2 transition ${
                      format === item
                        ? "bg-white text-[var(--ink)] shadow-sm"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="max-h-[48vh] overflow-auto rounded-xl border border-[var(--line)] bg-[var(--code-bg)]">
                <div className="sticky top-0 flex items-center justify-between border-b border-[var(--line)] bg-[var(--code-bg)] px-4 py-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">
                    {format} Markdown preview
                  </span>
                  <span className="rounded-full border border-[var(--green-border)] bg-[var(--green-soft)] px-2 py-1 text-[10px] font-bold text-[var(--green-dark)]">
                    Validated
                  </span>
                </div>
                <pre className="whitespace-pre-wrap p-4 font-mono text-[11px] leading-5 text-[var(--code-ink)]">
                  {formattedExport}
                </pre>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-[var(--line)] bg-[var(--soft)] p-4 sm:flex-row sm:justify-end">
              <button
                onClick={downloadExport}
                className="flex items-center justify-center gap-2 rounded-xl border border-[var(--line-strong)] bg-white px-4 py-3 text-sm font-bold hover:bg-[var(--canvas)]"
              >
                <Icon name="download" /> Download JSON
              </button>
              <button
                onClick={copyExport}
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--ink)] px-4 py-3 text-sm font-bold text-white hover:opacity-90"
              >
                <Icon name={copied ? "check" : "copy"} />{" "}
                {copied ? "Copied" : "Copy to clipboard"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Step({
  label,
  number,
  state,
  detail,
}: {
  label: string
  number: string
  state: "done" | "active" | "locked"
  detail?: string
}) {
  return (
    <span
      className={`flex shrink-0 items-center gap-1.5 ${
        state === "active" ? "text-[var(--ink)]" : "text-[var(--muted)]"
      }`}
    >
      <span
        className={`grid size-4 place-items-center rounded-full text-[9px] ${
          state === "done"
            ? "bg-[var(--green-soft)] text-[var(--green-dark)]"
            : state === "active"
              ? "bg-[var(--ink)] text-white"
              : "bg-[var(--soft)]"
        }`}
      >
        {state === "done" ? (
          <Icon name="check" className="size-2.5" />
        ) : state === "locked" ? (
          <Icon name="lock" className="size-2.5" />
        ) : (
          number
        )}
      </span>
      {label}
      {detail && (
        <span className="ml-0.5 font-normal text-[var(--muted)]">
          ({detail})
        </span>
      )}
    </span>
  )
}

function SectionLabel({ number, label }: Record<"number" | "label", string>) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.13em]">
      <span className="font-mono text-[var(--blue)]">{number}</span>
      <span className="text-[var(--muted)]">{label}</span>
    </div>
  )
}

function SourceFile({
  name,
  meta,
  onClick,
}: {
  name: string
  meta: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="mt-3 flex w-full items-center gap-3 rounded-lg py-2 text-left hover:bg-[var(--soft)]"
    >
      <div className="relative grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--soft)] text-[var(--ink)]">
        <Icon name="file" className="size-4" />
        <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[var(--green)] text-white ring-2 ring-white">
          <Icon name="check" className="size-2.5" />
        </span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold">{name}</p>
        <p className="mt-0.5 text-[10px] text-[var(--muted)]">{meta}</p>
      </div>
    </button>
  )
}

function DirectoryItem({
  icon,
  title,
  count,
  detail,
}: {
  icon: IconName
  title: string
  count: string
  detail: string
}) {
  return (
    <div className="flex gap-3 border-b border-[var(--line)] py-3 last:border-0">
      <Icon
        name={icon}
        className="mt-0.5 size-4 shrink-0 text-[var(--muted)]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between text-xs font-semibold">
          <span>{title}</span>
          <span className="font-mono text-[var(--blue)]">{count}</span>
        </div>
        <p className="mt-1 truncate text-[10px] text-[var(--muted)]">
          {detail}
        </p>
      </div>
    </div>
  )
}

function IssueCard({
  tone,
  children,
}: {
  tone: "red" | "amber" | "blue" | "green"
  children: React.ReactNode
}) {
  return (
    <article
      className={`mt-4 rounded-xl border-l-[3px] p-4 md:p-5 tone-${tone}`}
    >
      {children}
    </article>
  )
}

function StatusPill({
  tone,
  children,
}: {
  tone: "red" | "amber" | "blue" | "green" | "neutral"
  children: React.ReactNode
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.1em] pill-${tone}`}
    >
      {children}
    </span>
  )
}

function Quote({
  source,
  text,
  selected,
  onClick,
}: {
  onClick: () => void
  source: string
  text: string
  selected?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-lg border p-3 transition hover:shadow-sm ${
        selected
          ? "border-[var(--green-border)] bg-[var(--green-soft)]"
          : "border-[var(--line)] bg-white"
      }`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[.1em] text-[var(--muted)]">
        {source}
      </p>
      <p className="mt-1 text-xs font-semibold">“{text}”</p>
    </button>
  )
}

function Criteria({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`grid grid-cols-[50px_1fr] border-b border-[var(--line)] px-3 py-2.5 last:border-0 transition-colors ${
        highlight ? "bg-[var(--green-soft)]" : ""
      }`}
    >
      <span className="font-bold text-[var(--blue)]">{label}</span>
      <span className="text-[var(--code-ink)]">{value}</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-[var(--line)] bg-[var(--soft)] px-2 py-1 text-[10px] font-semibold text-[var(--muted)]">
      {children}
    </span>
  )
}
