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

type ScenarioId = "rebate" | "repairs" | "blueBadge" | "schoolAdmissions" | "wasteCollection" | "communityMeals"
type ScenarioDecision = "primary" | "alternate"
type UploadedSource = {
  name: string
  content: string
}
type ProcessNode = {
  id: string
  label: string
  gateway?: boolean
}
type AcceptanceScenario = {
  given: string
  when: string
  then: string
}
type StorySpec = {
  key: string
  title: string
  role: string
  action: string
  benefit: string
  acceptance: AcceptanceScenario[]
  requirements: string[]
}
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
  primaryProcessLabel?: string
  alternateProcessLabel?: string
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
  ambiguityWhen: string
  ambiguityThen: string
  primaryWhen: string
  boundaryWhen: string
  primaryGiven: string
  boundaryGiven: string
  policyEntity: string
  policyDescription: string
  transcriptContent: string[]
  processSteps: ProcessNode[]
  conflictStep: string
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
    benefit: "receive an eligibility decision within 1 working day",
    transcriptFile: "Workshop_Transcript.txt",
    processFile: "Process_Flow_v2.bpmn",
    transcriptMeta: "45m dialogue",
    actorSummary: "Resident · Supervisor · Finance officer",
    scopeSummary: "Submission · Eligibility · Approval",
    entitySummary: "Resident · Claim · Bank account",
    conflictTitle: "Approval conflict",
    conflictTopic: "who approves a claim",
    transcriptQuote: "Claims of £500 or less are auto-approved",
    processQuote:
      "All claims go through a five-day check and supervisor sign-off",
    primaryOption: "Auto-approve claims up to £500",
    alternateOption: "Require supervisor review for all claims",
    primaryDecision:
      "Claims of £500 or less are auto-approved, bypassing Nodes E and G",
    alternateDecision:
      "All claims go through the five-day caseworker check and supervisor sign-off",
    ambiguityTitle: "Residency period",
    ambiguityEvidence: "“a reasonable period”",
    ambiguityPrimary: "6 months",
    ambiguityAlternate: "12 months",
    ambiguityGivenPrefix: "resident in borough ≥",
    ambiguityGivenSuffix: "",
    ambiguityWhen: "I submit a complete claim",
    ambiguityThen:
      "the residency requirement is applied to the eligibility decision",
    primaryWhen: "verified claim value ≤ £500",
    boundaryWhen: "verified claim value > £500",
    primaryGiven: "a resident meets the confirmed eligibility criteria",
    boundaryGiven: "a resident meets the confirmed eligibility criteria",
    policyEntity: "Bank PII",
    policyDescription:
      "AES-256 encryption and immutable audit logs added to Definition of Done.",
    transcriptContent: [
      "Discovery workshop · 45-minute dialogue",
      "18:16 · Finance officer: “Residents should type their address and verify bank details instantly through Open Banking.”",
      "18:42 · Rebate Manager: “Claims of £500 or less should be auto-approved. Anything above that needs supervisor review.”",
      "19:01 · Caseworker: “The current flow sends every claim through a five-day manual check and supervisor sign-off.”",
      "19:05 · Business analyst: “The flow also asks everyone to upload a utility bill and bank statement. That does not match the workshop.”",
    ],
    processSteps: [
      { id: "A", label: "Resident submits claim" },
      { id: "B", label: "Upload utility bill PDF" },
      { id: "C", label: "Upload bank statement PDF" },
      { id: "D", label: "Check residency and eligibility" },
      { id: "F", label: "All claims?", gateway: true },
      { id: "E", label: "Five-day manual caseworker check" },
      { id: "G", label: "Supervisor sign-off" },
    ],
    conflictStep: "G",
    conflictTranscriptIndex: 3,
    decisionBoundary: "Claims above £500",
    decisionBoundaryThen:
      "Five-day caseworker check followed by supervisor sign-off",
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
    primaryProcessLabel: "Route emergency repairs to the on-call team",
    alternateProcessLabel: "Add all reports to the standard queue for triage",
    primaryOption: "Route emergencies to the on-call team",
    alternateOption: "Keep all reports in the standard queue",
    primaryDecision: "Emergency repairs are sent directly to the on-call team",
    alternateDecision:
      "All repair requests enter the standard queue for triage",
    ambiguityTitle: "Access notice period",
    ambiguityEvidence: "“give the tenant reasonable notice”",
    ambiguityPrimary: "24 hours",
    ambiguityAlternate: "48 hours",
    ambiguityGivenPrefix: "tenant has received",
    ambiguityGivenSuffix: " access notice",
    ambiguityWhen: "the contractor is ready to enter the property",
    ambiguityThen: "entry is scheduled only after the confirmed notice period",
    primaryWhen: "an emergency repair is reported",
    boundaryWhen: "a non-emergency repair is reported",
    primaryGiven: "a tenant reports a repair and provides the property address",
    boundaryGiven:
      "a tenant reports a repair and provides the property address",
    policyEntity: "Tenant contact data",
    policyDescription:
      "Encrypt tenant and property details, restrict access by role, and audit changes.",
    transcriptContent: [
      "Housing repairs workshop · 38-minute dialogue",
      "09:12 · Repairs manager: “If a repair is an emergency, it needs to go directly to the on-call team. A leaking ceiling cannot wait in a queue.”",
      "09:26 · Service designer: “Tenants should get a clear update when the team is assigned and when a visit is booked.”",
      "09:41 · Product owner: “We still need to agree how much notice we give tenants before entering the property.”",
    ],
    processSteps: [
      { id: "A", label: "Tenant reports a repair" },
      { id: "B", label: "Capture property and contact details" },
      { id: "C", label: "Classify repair urgency" },
      { id: "D", label: "Add request to standard queue" },
      { id: "E", label: "Assign repairs team" },
      { id: "F", label: "Notify tenant and record updates" },
    ],
    conflictStep: "D",
    conflictTranscriptIndex: 1,
    decisionBoundary: "Non-emergency repairs",
    decisionBoundaryThen:
      "The repairs coordinator reviews and assigns the request",
    securityGiven: "tenant and property details are submitted",
    securityWhen: "details are stored or accessed",
    securityThen: "details are encrypted and visible only to authorised staff",
  },
  blueBadge: {
    project: "Public Sector / Blue Badge Applications",
    storyKey: "US-302",
    storyTitle: "Apply for and track a Blue Badge",
    role: "resident",
    action: "apply for a Blue Badge and check my application status",
    benefit: "know what evidence is needed and when a decision is due",
    transcriptFile: "Blue_Badge_Workshop_Transcript.txt",
    processFile: "Blue_Badge_Application_Flow.bpmn",
    transcriptMeta: "42m dialogue",
    actorSummary: "Applicant · Assessment officer · Mobility team",
    scopeSummary: "Apply · Submit evidence · Assess · Notify",
    entitySummary: "Applicant · Health evidence · Application",
    conflictTitle: "Assessment evidence",
    conflictTopic: "which evidence is used to assess an application",
    transcriptQuote:
      "Some applicants do not have a mobility score. They should still be able to apply and send other evidence.",
    processQuote: "Reject application if score is missing",
    primaryProcessLabel:
      "Send cases without a mobility score to an assessment officer",
    alternateProcessLabel: "Require a mobility score before submission",
    primaryOption: "Route missing mobility scores to an officer",
    alternateOption: "Require a mobility score before submission",
    primaryDecision:
      "Applications without a mobility score are sent to an assessment officer",
    alternateDecision:
      "Applicants must provide a mobility score before submitting an application",
    ambiguityTitle: "Assessment update timeframe",
    ambiguityEvidence: "“Keep applicants updated regularly”",
    ambiguityPrimary: "every 10 working days",
    ambiguityAlternate: "every 15 working days",
    ambiguityGivenPrefix: "the applicant last received an update",
    ambiguityGivenSuffix: " ago",
    ambiguityWhen: "the application is still being assessed",
    ambiguityThen: "send the applicant a progress update",
    primaryWhen: "an application is submitted without a mobility score",
    boundaryWhen: "an application includes a mobility score",
    primaryGiven: "an applicant has submitted the required supporting evidence",
    boundaryGiven:
      "an applicant has submitted the required supporting evidence",
    policyEntity: "Health and identity evidence",
    policyDescription:
      "Limit access to health evidence to authorised assessment staff. Set a retention period and record access and decision changes.",
    transcriptContent: [
      "Blue Badge service workshop · 42-minute dialogue",
      "10:02 · Mobility team lead: “An assessment officer reviews the supporting evidence and records the decision.”",
      "10:14 · Customer service officer: “Some applicants do not have a mobility score. They should still be able to apply and send other evidence.”",
      "10:27 · Digital service designer: “The current form stops people at the mobility score field and does not offer another route.”",
      "10:39 · Assessment officer: “We need to tell applicants when their case is still being reviewed, not leave the status unchanged.”",
      "10:44 · Product owner: “Let us agree whether an update is due every 10 or 15 working days.”",
      "10:51 · Information governance lead: “Only the assessment team should see health evidence, and we need to define when it is deleted.”",
    ],
    processSteps: [
      { id: "A", label: "Applicant starts an application" },
      { id: "B", label: "Enter mobility score" },
      { id: "C", label: "Reject application if score is missing" },
      { id: "D", label: "Upload supporting evidence" },
      { id: "E", label: "Assessment officer reviews application" },
      { id: "F", label: "Send decision and status updates" },
    ],
    conflictStep: "C",
    conflictTranscriptIndex: 2,
    decisionBoundary: "Applications with a mobility score",
    decisionBoundaryThen:
      "Send the application to an assessment officer for review",
    securityGiven: "an applicant submits health evidence",
    securityWhen: "an officer opens or updates the application",
    securityThen:
      "only authorised assessment staff can view the evidence and access is recorded",
  },
  schoolAdmissions: {
    project: "Public Sector / School Admissions",
    storyKey: "US-417",
    storyTitle: "Submit and track a school application",
    role: "parent or carer",
    action: "submit school preferences and track the application",
    benefit: "know the application is complete and when an offer will be sent",
    transcriptFile: "School_Admissions_Workshop_Transcript.txt",
    processFile: "School_Admissions_Flow.bpmn",
    transcriptMeta: "50m dialogue",
    actorSummary: "Parent or carer · Admissions officer · School",
    scopeSummary: "Add preferences · Check details · Assess · Notify",
    entitySummary: "Child · School preference · Application",
    conflictTitle: "School preference count",
    conflictTopic: "how many school preferences an applicant can submit",
    transcriptQuote:
      "Families can list up to three schools in order of preference",
    processQuote: "The form accepts one school choice for each application",
    primaryProcessLabel: "Choose up to three schools in ranked order",
    alternateProcessLabel: "Choose one school",
    primaryOption: "Allow up to three ranked preferences",
    alternateOption: "Accept one school preference",
    primaryDecision:
      "Applicants can submit up to three schools in ranked order",
    alternateDecision: "Applicants can submit one school preference",
    ambiguityTitle: "Address evidence deadline",
    ambiguityEvidence: "“Provide proof of address before applications close”",
    ambiguityPrimary: "within 5 working days",
    ambiguityAlternate: "within 10 working days",
    ambiguityGivenPrefix: "application submitted",
    ambiguityGivenSuffix: " ago",
    ambiguityWhen: "address evidence is still missing",
    ambiguityThen: "tell the family when the address evidence must be provided",
    primaryWhen: "a parent or carer submits school preferences",
    boundaryWhen: "the parent or carer reviews the preference list",
    primaryGiven: "a parent or carer is applying for a child",
    boundaryGiven: "a parent or carer has entered school preferences",
    policyEntity: "Children's and family information",
    policyDescription:
      "Collect only details needed to process an application. Restrict access to admissions staff and set a clear retention period.",
    transcriptContent: [
      "School admissions workshop · 50-minute dialogue",
      "14:03 · Admissions manager: “Families can list up to three schools in order of preference.”",
      "14:16 · Parent representative: “We need to review the list and change the order before submitting.”",
      "14:24 · Digital product owner: “The current form only has one school choice and sends it straight to the admissions team.”",
      "14:37 · Admissions officer: “Applicants need to know if anything is missing and how long they have to provide it.”",
      "14:45 · School liaison: “The guidance says to provide proof of address before applications close, but it does not say how quickly after applying.”",
      "14:51 · Information governance lead: “Application details should only be visible to staff who need them to process the case.”",
    ],
    processSteps: [
      { id: "A", label: "Parent or carer starts application" },
      { id: "B", label: "Choose one school" },
      { id: "C", label: "Submit application" },
      { id: "D", label: "Admissions officer checks address evidence" },
      { id: "E", label: "Assess application against published criteria" },
      { id: "F", label: "Send offer or outcome" },
    ],
    conflictStep: "B",
    conflictTranscriptIndex: 1,
    decisionBoundary: "Preference list changes",
    decisionBoundaryThen:
      "Allow the parent or carer to review and reorder the selected schools before submission",
    securityGiven: "a parent or carer enters a child's application details",
    securityWhen: "an admissions officer reviews the application",
    securityThen:
      "the application is visible only to staff assigned to admissions processing",
  },
  wasteCollection: {
    project: "Public Sector / Missed Waste Collections",
    storyKey: "US-526",
    storyTitle: "Report and track a missed collection",
    role: "resident",
    action: "report a missed bin collection and check its status",
    benefit: "know whether the collection will be revisited and when",
    transcriptFile: "Missed_Collection_Workshop_Transcript.txt",
    processFile: "Waste_Collection_Report_Flow.bpmn",
    transcriptMeta: "35m dialogue",
    actorSummary: "Resident · Contact centre · Collection crew",
    scopeSummary: "Report · Check route · Assign · Update",
    entitySummary: "Resident · Property · Collection report",
    conflictTitle: "Report submission window",
    conflictTopic: "how long residents have to report a missed collection",
    transcriptQuote:
      "Residents should report a missed collection within two working days",
    processQuote:
      "The online form accepts reports up to five calendar days after collection day",
    primaryProcessLabel: "Check report date against two-working-day limit",
    alternateProcessLabel: "Check report date against five-calendar-day limit",
    primaryOption: "Use a two-working-day reporting window",
    alternateOption: "Accept reports for five calendar days",
    primaryDecision:
      "Residents can report a missed collection within two working days",
    alternateDecision:
      "Residents can report a missed collection within five calendar days",
    ambiguityTitle: "Collection status update time",
    ambiguityEvidence: "“Tell the resident when the crew is coming back”",
    ambiguityPrimary: "by 6 pm the next working day",
    ambiguityAlternate: "within 2 working days",
    ambiguityGivenPrefix: "missed collection report is",
    ambiguityGivenSuffix: " old",
    ambiguityWhen: "the report is still being reviewed",
    ambiguityThen: "tell the resident when the crew will return",
    primaryWhen: "a resident submits a report within the reporting window",
    boundaryWhen: "a resident submits a report outside the reporting window",
    primaryGiven: "a scheduled collection was not completed",
    boundaryGiven: "a scheduled collection was not completed",
    policyEntity: "Resident and property details",
    policyDescription:
      "Use the property address to check the collection route. Limit staff access to the details needed to handle the report and record changes.",
    transcriptContent: [
      "Missed collections workshop · 35-minute dialogue",
      "08:35 · Waste services manager: “Residents should report a missed collection within two working days.”",
      "08:43 · Contact centre lead: “The online form currently accepts reports for five calendar days after collection day.”",
      "08:52 · Collection supervisor: “Before assigning a revisit, check whether the crew recorded an access issue or contamination.”",
      "09:03 · Resident representative: “After I report it, I need to know whether the crew is coming back and when.”",
      "09:11 · Product owner: “The team has not agreed whether that update is due by the next evening or within two working days.”",
      "09:18 · Data protection officer: “Use the address to locate the route, but do not expose resident contact details to the whole crew.”",
    ],
    processSteps: [
      { id: "A", label: "Resident selects collection and property" },
      { id: "B", label: "Check report date against five-day limit" },
      { id: "C", label: "Check crew notes and route status" },
      { id: "D", label: "Assign a revisit if required" },
      { id: "E", label: "Notify resident of the outcome" },
    ],
    conflictStep: "B",
    conflictTranscriptIndex: 1,
    decisionBoundary: "Reports outside the selected window",
    decisionBoundaryThen:
      "Show the resident the reporting limit and provide the contact centre details",
    securityGiven: "a resident reports a missed collection",
    securityWhen: "the crew receives a revisit assignment",
    securityThen:
      "the crew sees the property and collection details required for the visit, but not unnecessary contact information",
  },
  communityMeals: {
    project: "Community Services / Food Support Grant",
    storyKey: "US-631",
    storyTitle: "Apply for a community food support grant",
    role: "community organisation coordinator",
    action: "apply for a food support grant and track its progress",
    benefit: "plan local food support using a clear funding decision",
    transcriptFile: "Community_Food_Support_Transcript.txt",
    processFile: "Community_Food_Support_Flow.bpmn",
    transcriptMeta: "48m dialogue",
    actorSummary: "Organisation coordinator · Grant officer · Finance team",
    scopeSummary: "Apply · Check eligibility · Assess · Pay",
    entitySummary: "Organisation · Grant application · Payment",
    conflictTitle: "Income eligibility check",
    conflictTopic: "how the organisation's income is checked",
    transcriptQuote:
      "The grant officer should check the latest signed accounts before deciding eligibility",
    processQuote: "Mark applications under £30,000 eligible automatically",
    primaryProcessLabel: "Grant officer reviews latest signed accounts",
    alternateProcessLabel: "Allow automatic eligibility under £30,000",
    primaryOption: "Require a grant officer to review accounts",
    alternateOption: "Auto-check applications under £30,000",
    primaryDecision:
      "A grant officer reviews the latest signed accounts before confirming eligibility",
    alternateDecision:
      "Applications under £30,000 pass the income check without a grant officer review",
    ambiguityTitle: "Grant decision timeframe",
    ambiguityEvidence: "“Tell applicants when they will hear back”",
    ambiguityPrimary: "within 15 working days",
    ambiguityAlternate: "within 20 working days",
    ambiguityGivenPrefix: "application has been waiting",
    ambiguityGivenSuffix: "",
    ambiguityWhen: "the application is still under review",
    ambiguityThen: "send the coordinator a status update",
    primaryWhen: "a complete application is received",
    boundaryWhen: "the application is missing signed accounts",
    primaryGiven: "a community organisation applies for food support funding",
    boundaryGiven: "a community organisation has started an application",
    policyEntity: "Organisation and financial records",
    policyDescription:
      "Restrict access to financial records, record staff decisions, and delete application documents when the retention period ends.",
    transcriptContent: [
      "Community Food Support workshop transcript · 48-minute dialogue",
      "13:05 · Community grants lead: “We need to help local organisations provide food parcels and community meals.”",
      "13:12 · Finance officer: “The grant officer should check the latest signed accounts before deciding eligibility.”",
      "13:19 · Programme manager: “Small organisations may not have a dedicated finance team, so we should explain what documents are accepted.”",
      "13:26 · Service designer: “The current flow marks applications under £30,000 eligible without an accounts review. That is not what we agreed.”",
      "13:34 · Community partner: “Applicants need to know whether a draft has been saved and which documents are still missing.”",
      "13:42 · Grants administrator: “Tell applicants when they will hear back, but we still need to agree the number of working days.”",
      "13:51 · Information governance lead: “Only the grants and finance teams should see the accounts. Set a retention period for the uploaded records.”",
      "14:02 · Product owner: “Record who checked eligibility and why, so the decision can be explained later.”",
    ],
    processSteps: [
      { id: "A", label: "Organisation starts an application" },
      { id: "B", label: "Upload organisation details and accounts" },
      {
        id: "C",
        label: "Mark applications under £30,000 eligible automatically",
      },
      { id: "D", label: "Income under £30,000?", gateway: true },
      { id: "E", label: "Grant officer reviews signed accounts" },
      { id: "F", label: "Finance team confirms payment details" },
      { id: "G", label: "Notify organisation of the decision" },
    ],
    conflictStep: "C",
    conflictTranscriptIndex: 6,
    decisionBoundary: "Applications missing signed accounts",
    decisionBoundaryThen:
      "Keep the application incomplete and tell the coordinator which documents are needed",
    securityGiven: "an organisation uploads signed accounts",
    securityWhen: "a grant or finance officer reviews the application",
    securityThen:
      "only authorised grant and finance staff can view the accounts, and access is recorded",
  },
}

export default function App() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("rebate")
  const scenario = scenarios[scenarioId]
  const [uploadedTranscript, setUploadedTranscript] =
    useState<UploadedSource | null>(null)
  const [uploadedBpmn, setUploadedBpmn] = useState<UploadedSource | null>(null)
  const [uploadError, setUploadError] = useState("")
  const [resolved, setResolved] = useState(false)
  const [applying, setApplying] = useState(false)
  const [readiness, setReadiness] = useState(78)
  const [tab, setTab] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)
  const [source, setSource] = useState<string | null>(null)
  const [policyOpen, setPolicyOpen] = useState(false)
  const [ambiguity, setAmbiguity] =
    useState<ScenarioDecision | "Unconfirmed" | "Clarify">("Unconfirmed")
  const [decision, setDecision] = useState<ScenarioDecision>("primary")
  const [decisionTime, setDecisionTime] = useState("")
  const [minorResolutions, setMinorResolutions] =
    useState<Record<string, "adopt" | "dismiss">>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState<"Jira" | "Azure DevOps">("Jira")
  const ambiguityConfirmed =
    ambiguity === "primary" || ambiguity === "alternate"
  const decisionDescription =
    decision === "primary"
      ? scenario.primaryDecision
      : scenario.alternateDecision
  const ambiguityValue =
    ambiguity === "primary"
      ? scenario.ambiguityPrimary
      : ambiguity === "alternate"
        ? scenario.ambiguityAlternate
        : ""
  const storyOptions: StorySpec[] =
    scenarioId === "rebate"
      ? [
          {
            key: "US-104",
            title: "Submit a rebate claim",
            role: "resident",
            action: "submit an online rebate claim",
            benefit: "receive an eligibility decision within 1 working day",
            acceptance: [
              {
                given: ambiguityConfirmed
                  ? `I have lived in the borough for at least ${ambiguityValue}`
                  : "the residency eligibility period has not been confirmed",
                when: "I submit a complete claim",
                then: ambiguityConfirmed
                  ? "I receive a claim reference and eligibility decision within 1 working day"
                  : "the claim remains a draft and cannot be submitted",
              },
              {
                given: ambiguityConfirmed
                  ? `I have lived in the borough for less than ${ambiguityValue}`
                  : "I have lived in the borough for less than the minimum residency period",
                when: "I submit a claim",
                then: "the claim is declined and the eligibility reason is shown",
              },
            ],
            requirements: ["WCAG 2.1 AA"],
          },
          {
            key: "US-105",
            title: "Apply the rebate approval rule",
            role: "council finance officer",
            action: "automatically approve eligible claims up to £500",
            benefit: "reduce manual review while protecting public funds",
            acceptance: [
              {
                given: ambiguityConfirmed
                  ? "a resident meets the confirmed eligibility criteria"
                  : "the residency eligibility period is unconfirmed",
                when: "the verified claim value is exactly £500",
                then: !ambiguityConfirmed
                  ? "no approval decision is applied until eligibility is confirmed"
                  : decision === "primary"
                    ? "the claim is auto-approved and bypasses the five-day caseworker check and supervisor sign-off"
                    : "the claim enters the five-day caseworker check and supervisor sign-off",
              },
              {
                given: ambiguityConfirmed
                  ? "a resident meets the confirmed eligibility criteria"
                  : "the residency eligibility period is unconfirmed",
                when: "the verified claim value is greater than £500",
                then: "the claim enters the five-day caseworker check and supervisor sign-off",
              },
            ],
            requirements: ["Audit every approval decision"],
          },
          {
            key: "US-106",
            title: "Capture bank details securely",
            role: "resident",
            action: "link a bank account through Open Banking",
            benefit:
              "receive an approved rebate without sharing raw account details",
            acceptance: [
              {
                given: "I choose to add a bank account",
                when: "I complete Open Banking verification",
                then: "a payment token is stored instead of a raw account number",
              },
              {
                given: "a verified bank account is displayed",
                when: "I view my payment details",
                then: "only the last four digits are displayed (****5678)",
              },
              {
                given:
                  "personal or payment data has reached its approved retention limit",
                when: "the retention period expires",
                then: "the data is securely deleted and the deletion is audited",
              },
            ],
            requirements: ["GDPR Articles 5 and 32", "WCAG 2.1 AA"],
          },
        ]
      : [
          {
            key: scenario.storyKey,
            title: scenario.storyTitle,
            role: scenario.role,
            action: scenario.action,
            benefit: scenario.benefit,
            acceptance: [
              {
                given: scenario.primaryGiven,
                when: scenario.primaryWhen,
                then: decisionDescription,
              },
              {
                given: scenario.boundaryGiven,
                when: scenario.boundaryWhen,
                then: scenario.decisionBoundaryThen,
              },
              {
                given: ambiguityConfirmed
                  ? `${scenario.ambiguityGivenPrefix} ${ambiguityValue}${scenario.ambiguityGivenSuffix}`
                  : `${scenario.ambiguityTitle.toLowerCase()} has not been confirmed`,
                when: scenario.ambiguityWhen,
                then: ambiguityConfirmed
                  ? `${scenario.ambiguityThen} (${ambiguityValue})`
                  : "hold the next step until the timeframe is confirmed",
              },
            ],
            requirements: ["GDPR Art. 32", "WCAG 2.1 AA"],
          },
        ]
  const activeStory = storyOptions[storyIndex] ?? storyOptions[0]
  const readinessTarget = !resolved ? 78 : ambiguityConfirmed ? 94 : 88
  const canExport =
    resolved && readiness >= 85 && ambiguityConfirmed && !applying
  const minorConflicts =
    scenarioId === "rebate"
      ? [
          {
            id: "CONF-02",
            node: "Node B",
            title: "Address evidence",
            transcript: "Residents type their address",
            process: "Process map requires a utility bill PDF upload",
            why: "The evidence source and the captured data are different inputs.",
          },
          {
            id: "CONF-03",
            node: "Node C",
            title: "Bank verification",
            transcript: "Verify instantly through Open Banking",
            process: "Process map requires a bank statement PDF upload",
            why: "The verification method differs between the transcript and process map.",
          },
        ]
      : []
  const totalConflictCount = 1 + minorConflicts.length
  const totalIssueCount = totalConflictCount + 1 + 2
  const reviewedMinorCount = Object.keys(minorResolutions).length
  const gatewayCount = scenario.processSteps.filter(
    (step) => step.gateway,
  ).length
  const acceptanceCriteria = activeStory.acceptance.map(
    ({ given, when, then }) => `Given ${given}; When ${when}; Then ${then}`,
  )
  const exportText = `## ${activeStory.key}: ${activeStory.title}

**As a** ${activeStory.role}  
**I want to** ${activeStory.action}  
**So that** ${activeStory.benefit}.

### Acceptance Criteria
${activeStory.acceptance
  .map(
    ({ given, when, then }, index) =>
      `#### Scenario ${index + 1}\n- **Given** ${given}\n- **When** ${when}\n- **Then** ${then}`,
  )
  .join("\n\n")}

### Definition of Done
- Audit event recorded for every status change
- Data minimisation and retention follow GDPR Article 5
- Interface meets WCAG 2.1 AA

_Source decision: CONF-01 · ${decisionDescription}._`
  const formattedExport =
    format === "Jira"
      ? exportText
      : `# Azure DevOps · User Story\n\n${exportText.replace(`## ${activeStory.key}`, `## Title: ${activeStory.key}`)}`

  const resetWorkspace = () => {
    setResolved(false)
    setApplying(false)
    setReadiness(78)
    setTab(0)
    setStoryIndex(0)
    setSource(null)
    setPolicyOpen(false)
    setAmbiguity("Unconfirmed")
    setDecision("primary")
    setDecisionTime("")
    setMinorResolutions({})
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
    setStoryIndex(0)
    setSource(null)
    setPolicyOpen(false)
    setAmbiguity("Unconfirmed")
    setDecision("primary")
    setDecisionTime("")
    setMinorResolutions({})
    setModalOpen(false)
    setCopied(false)
  }

  const handleSourceUpload = async (
    file: File | undefined,
    kind: "transcript" | "bpmn",
  ) => {
    if (!file) return
    setUploadError("")
    try {
      const content = await file.text()
      if (kind === "transcript") {
        setUploadedTranscript(null)
        if (
          file.name !== "Community_Food_Support_Transcript.txt" ||
          !content.includes("Community Food Support workshop transcript") ||
          !content.includes("latest signed accounts")
        ) {
          setUploadError(
            "Choose the supplied Community_Food_Support_Transcript.txt example file.",
          )
          return
        }
        setUploadedTranscript({ name: file.name, content })
        return
      }

      setUploadedBpmn(null)
      if (
        file.name !== "Community_Food_Support_Flow.bpmn" ||
        !/<(?:[\w.-]+:)?definitions\b/i.test(content) ||
        !content.includes("Task_AutoEligibility")
      ) {
        setUploadError(
          "Choose the supplied Community_Food_Support_Flow.bpmn example file.",
        )
        return
      }
      setUploadedBpmn({ name: file.name, content })
    } catch {
      setUploadError("Could not read the selected file. Please try again.")
    }
  }

  const clearUploadedSources = () => {
    setUploadedTranscript(null)
    setUploadedBpmn(null)
    setUploadError("")
    if (scenarioId === "communityMeals") changeScenario("rebate")
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
      setSource("Clipboard unavailable. Download the JSON instead.")
    }
    window.setTimeout(() => setCopied(false), 1800)
  }

  const downloadExport = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            key: activeStory.key,
            title: activeStory.title,
            status: "Ready for delivery",
            readiness,
            decision,
            markdown: formattedExport,
            acceptanceCriteria,
            requirements: activeStory.requirements,
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
    link.download = `${activeStory.key}-jira-export.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const communityMealsUnlocked = Boolean(uploadedTranscript && uploadedBpmn)
  const transcriptLines =
    scenarioId === "communityMeals" && uploadedTranscript
      ? uploadedTranscript.content.split(/\r?\n/).filter(Boolean)
      : scenario.transcriptContent

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
              <span className="truncate text-[var(--muted)]">
                {scenario.project}
              </span>
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
          <span className="text-[var(--line-strong)]">·</span>
          <Step
            label="Audit & policy"
            number="2"
            state="done"
            detail="2 checks"
          />
          <span className="text-[var(--line-strong)]">·</span>
          <Step label="Story draft" number="3" state="done" />
          <span className="text-[var(--line-strong)]">·</span>
          <Step
            label="Human triage"
            number="4"
            state={resolved ? "done" : "active"}
            detail={
              resolved
                ? `1 blocker resolved · ${reviewedMinorCount}/${minorConflicts.length} warnings reviewed`
                : `1 blocker · ${minorConflicts.length} warnings`
            }
          />
          <span className="text-[var(--line-strong)]">·</span>
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
                : !ambiguityConfirmed && resolved
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
            : !ambiguityConfirmed
              ? `Conflict decision recorded, but ${scenario.ambiguityTitle.toLowerCase()} still needs confirmation. Readiness ${readiness}%. Export is locked.`
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
              Review evidence. Resolve differences. Prepare backlog stories.
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Check each decision against its source before preparing the
              backlog story.
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
                const nextScenario = event.target.value as ScenarioId
                if (nextScenario in scenarios) changeScenario(nextScenario)
              }}
              className="max-w-[230px] rounded-md border-0 bg-transparent py-1 text-xs font-semibold text-[var(--ink)] focus:ring-2 focus:ring-[var(--blue)]"
            >
              <option value="rebate">Council Tax Rebate</option>
              <option value="repairs">Housing Repairs</option>
              <option value="blueBadge">Blue Badge Applications</option>
              <option value="schoolAdmissions">School Admissions</option>
              <option value="wasteCollection">Missed Waste Collections</option>
              {communityMealsUnlocked && (
                <option value="communityMeals">Community Food Support</option>
              )}
            </select>
            <span className="text-[var(--line-strong)]">/</span>{" "}
            {canExport
              ? "Ready to export"
              : resolved && !ambiguityConfirmed
                ? "Clarification needed"
                : "Working draft"}
          </div>
        </div>

        <section
          aria-labelledby="upload-example-title"
          className="mb-6 rounded-2xl border border-[var(--line)] bg-white p-5 md:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--blue)]">
                Try another example
              </p>
              <h2
                id="upload-example-title"
                className="mt-1 text-lg font-semibold"
              >
                Upload transcript and process map to load Community Food Support
              </h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                This demo loads a fixed example when both matching files are
                selected. The files are read in this browser and are not sent to
                a server.
              </p>
            </div>
            <button
              onClick={clearUploadedSources}
              disabled={!uploadedTranscript && !uploadedBpmn}
              className="text-xs font-semibold text-[var(--muted)] underline disabled:opacity-40"
            >
              Clear files
            </button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label
              htmlFor="transcript-upload"
              className="cursor-pointer rounded-xl border border-dashed border-[var(--line-strong)] bg-[var(--soft)] p-4 hover:border-[var(--blue)]"
            >
              <span className="block text-xs font-semibold">
                1. Workshop transcript (.txt)
              </span>
              <span className="mt-1 block truncate text-xs text-[var(--muted)]">
                {uploadedTranscript?.name ?? "Choose the supplied transcript"}
              </span>
              <input
                id="transcript-upload"
                type="file"
                accept=".txt,text/plain"
                className="sr-only"
                onChange={(event) =>
                  void handleSourceUpload(
                    event.currentTarget.files?.[0],
                    "transcript",
                  )
                }
              />
            </label>
            <label
              htmlFor="bpmn-upload"
              className="cursor-pointer rounded-xl border border-dashed border-[var(--line-strong)] bg-[var(--soft)] p-4 hover:border-[var(--blue)]"
            >
              <span className="block text-xs font-semibold">
                2. Process map (.bpmn)
              </span>
              <span className="mt-1 block truncate text-xs text-[var(--muted)]">
                {uploadedBpmn?.name ?? "Choose the supplied BPMN file"}
              </span>
              <input
                id="bpmn-upload"
                type="file"
                accept=".bpmn,application/xml,text/xml"
                className="sr-only"
                onChange={(event) =>
                  void handleSourceUpload(
                    event.currentTarget.files?.[0],
                    "bpmn",
                  )
                }
              />
            </label>
          </div>
          {uploadError && (
            <p
              role="alert"
              className="mt-3 text-xs font-semibold text-[var(--red)]"
            >
              {uploadError}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
            <button
              disabled={!communityMealsUnlocked}
              onClick={() => changeScenario("communityMeals")}
              className="rounded-lg bg-[var(--ink)] px-4 py-2.5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:bg-[var(--disabled)] disabled:text-[var(--muted)]"
            >
              {communityMealsUnlocked
                ? "Load Community Food Support example"
                : "Select both files to continue"}
            </button>
          </div>
          {communityMealsUnlocked && (
            <p role="status" className="mt-3 text-xs text-[var(--green-dark)]">
              Both files are ready. The Community Food Support example is ready
              to load from the workflow selector.
            </p>
          )}
        </section>

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
              meta={`${scenario.processSteps.length} nodes · ${gatewayCount} ${
                gatewayCount === 1 ? "gateway" : "gateways"
              }`}
              onClick={() => setSource("bpmn")}
            />
            <div className="my-5 border-t border-[var(--line)]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
              Extracted directory
            </p>
            <DirectoryItem
              icon="users"
              title="Actors"
              count={String(scenario.actorSummary.split(" · ").length)}
              detail={scenario.actorSummary}
            />
            <DirectoryItem
              icon="spark"
              title="Workflow areas"
              count={String(scenario.scopeSummary.split(" · ").length)}
              detail={scenario.scopeSummary}
            />
            <DirectoryItem
              icon="file"
              title="Data entities"
              count={String(scenario.entitySummary.split(" · ").length)}
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
                  `All (${totalIssueCount})`,
                  `Conflicts (${totalConflictCount})`,
                  "Ambiguities (1)",
                  "Policies (2)",
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
                          : "Blocker · Needs a decision"}
                      </StatusPill>
                      <h2 className="mt-3 text-base font-semibold">
                        {resolved
                          ? `CONF-01: ${scenario.conflictTitle}: Decision recorded`
                          : `CONF-01: ${scenario.conflictTitle}`}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                        {resolved
                          ? `${decisionDescription} adopted as the agreed rule. Process flow step updated.`
                          : `The sources disagree about ${scenario.conflictTopic}. Choose the governing rule.`}
                      </p>
                      <p className="mt-2 text-[11px] leading-5 text-[var(--muted)]">
                        Reason: the workshop account of {scenario.conflictTopic}{" "}
                        differs from the process map at Node{" "}
                        {scenario.conflictStep}.
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
                      source={`Process flow · Node ${scenario.conflictStep}`}
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
                        {applying
                          ? "Recording decision…"
                          : scenario.primaryOption}
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
                        {(["primary", "alternate"] as const).map((option) => (
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
                      <details className="mt-3 text-[11px] text-[var(--green-dark)]">
                        <summary className="cursor-pointer font-semibold">
                          Decision audit · Product Owner · {decisionTime}
                        </summary>
                        <p className="mt-2">
                          Why: Workshop evidence takes precedence over the
                          outdated process map. {decisionDescription}.
                        </p>
                        <button
                          onClick={() => {
                            setResolved(false)
                            setDecisionTime("")
                          }}
                          className="mt-2 font-semibold underline"
                        >
                          Undo decision
                        </button>
                      </details>
                    </div>
                  )}
                </IssueCard>
              )}

              {(tab === 0 || tab === 1) && (
                <>
                  {minorConflicts.map((conflict) => {
                    const resolution = minorResolutions[conflict.id]
                    const reviewed = resolution !== undefined
                    return (
                      <IssueCard
                        key={conflict.id}
                        tone={reviewed ? "green" : "amber"}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <StatusPill tone={reviewed ? "green" : "amber"}>
                            {resolution === "adopt"
                              ? "Resolved · Process map update proposed"
                              : resolution === "dismiss"
                                ? "Not an issue · Reviewer acknowledged"
                                : "Warning · Needs review"}
                          </StatusPill>
                          <span className="text-[10px] font-semibold text-[var(--muted)]">
                            {conflict.node}
                          </span>
                        </div>
                        <h3 className="mt-3 text-sm font-semibold">
                          {conflict.id}: {conflict.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                          Transcript: “{conflict.transcript}.” Process map: “
                          {conflict.process}.”
                        </p>
                        <p className="mt-2 text-[11px] text-[var(--muted)]">
                          Reason: {conflict.why}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              setMinorResolutions((current) => ({
                                ...current,
                                [conflict.id]: "adopt",
                              }))
                            }
                            aria-pressed={resolution === "adopt"}
                            className="rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2 text-xs font-semibold"
                          >
                            Adopt workshop input
                          </button>
                          <button
                            onClick={() =>
                              setMinorResolutions((current) => ({
                                ...current,
                                [conflict.id]: "dismiss",
                              }))
                            }
                            aria-pressed={resolution === "dismiss"}
                            className="rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2 text-xs font-semibold"
                          >
                            Mark as not an issue
                          </button>
                          {reviewed && (
                            <button
                              onClick={() =>
                                setMinorResolutions((current) => {
                                  const next = { ...current }
                                  delete next[conflict.id]
                                  return next
                                })
                              }
                              className="rounded-lg px-3 py-2 text-xs font-semibold text-[var(--muted)]"
                            >
                              Reopen
                            </button>
                          )}
                        </div>
                      </IssueCard>
                    )
                  })}
                </>
              )}

              {(tab === 0 || tab === 2) && (
                <IssueCard tone={ambiguityConfirmed ? "green" : "amber"}>
                  <StatusPill tone={ambiguityConfirmed ? "green" : "amber"}>
                    {ambiguityConfirmed
                      ? "Confirmed · Workshop transcript"
                      : "Unconfirmed · Workshop transcript"}
                  </StatusPill>
                  <h2 className="mt-3 text-base font-semibold">
                    AMB-02: {scenario.ambiguityTitle}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Evidence: {scenario.ambiguityEvidence}
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-[var(--muted)]">
                    Reason: the source does not define a testable threshold.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {([
                      scenario.ambiguityPrimary,
                      scenario.ambiguityAlternate,
                      "Clarify",
                    ] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          setAmbiguity(
                            option === "Clarify"
                              ? "Clarify"
                              : option === scenario.ambiguityPrimary
                                ? "primary"
                                : "alternate",
                          )
                        }
                        aria-pressed={
                          option === "Clarify"
                            ? !ambiguityConfirmed
                            : option === scenario.ambiguityPrimary
                              ? ambiguity === "primary"
                              : ambiguity === "alternate"
                        }
                        className="rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2 text-xs font-semibold hover:bg-[var(--soft)]"
                      >
                        {option === "Clarify"
                          ? "Request clarification"
                          : `Confirm ${option}`}
                      </button>
                    ))}
                    <span className="ml-auto self-center text-[11px] font-semibold text-[var(--amber-dark)]">
                      {!ambiguityConfirmed
                        ? ambiguity === "Clarify"
                          ? "Clarification requested · export blocked"
                          : "Product Owner confirmation required"
                        : `${ambiguityValue} · Product Owner confirmed`}
                    </span>
                  </div>
                  {!ambiguityConfirmed && (
                    <p className="mt-3 text-xs leading-5 text-[var(--amber-dark)]">
                      {ambiguity === "Clarify"
                        ? `Question prepared for the Product Owner: What is the required ${scenario.ambiguityTitle.toLowerCase()}?`
                        : `This value is only a suggested assumption. The Product Owner must explicitly confirm it before the story can be export-ready.`}
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
                        Data protection requirement · Review
                      </StatusPill>
                      <h2 className="mt-2 text-base font-semibold">
                        POL-01: {scenario.policyEntity}{" "}
                        <span className="font-normal text-[var(--muted)]">
                          (GDPR Art. 5 &amp; 32)
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
                        <li>
                          Collect only the personal information needed for the
                          service.
                        </li>
                        <li>
                          Limit access to staff who need the information for
                          their role.
                        </li>
                        <li>
                          Set a retention period and delete information when it
                          is no longer needed.
                        </li>
                        <li>
                          Encrypt sensitive information in storage and transit.
                        </li>
                        <li>Record access and changes to the application.</li>
                      </ul>
                      <p className="mt-2">
                        Reason: bank details are personal data. Confirm these
                        safeguards with the relevant team.
                      </p>
                    </div>
                  )}
                </IssueCard>
              )}

              {(tab === 0 || tab === 3) && (
                <>
                  <IssueCard tone="blue">
                    <div className="flex items-start gap-3">
                      <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--blue-soft)] text-[var(--blue)]">
                        <Icon name="users" />
                      </div>
                      <div>
                        <StatusPill tone="blue">
                          POL-02 · Accessibility requirement
                        </StatusPill>
                        <h2 className="mt-2 text-base font-semibold">
                          Accessibility · WCAG 2.1 AA
                        </h2>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          Keyboard-operable forms, labelled controls, screen
                          reader announcements, and sufficient contrast.
                        </p>
                        <p className="mt-2 text-[11px] text-[var(--muted)]">
                          Why included: residents use this service, including
                          people who rely on assistive technology.
                        </p>
                      </div>
                    </div>
                  </IssueCard>
                </>
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
                    : !ambiguityConfirmed
                      ? `The decision is recorded, but ${scenario.ambiguityTitle.toLowerCase()} must be confirmed. Readiness is capped at 88%.`
                      : `All blockers cleared. Export unlocks at 85%; readiness is ${readiness}%.`}
                </p>
                <details className="mt-3 rounded-lg border border-[var(--line)] bg-[var(--soft)] p-3 text-xs">
                  <summary className="cursor-pointer font-semibold">
                    Why {readiness}%? · View score breakdown
                  </summary>
                  <ul className="mt-3 space-y-2 text-[var(--muted)]">
                    <li className="flex justify-between gap-3">
                      <span>Source coverage</span>
                      <span>25 / 25</span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span>Acceptance criteria quality</span>
                      <span>23 / 23</span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span>Policy and NFR coverage</span>
                      <span>20 / 20</span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span>Blocking conflict resolved</span>
                      <span>{resolved ? "10 / 10" : "0 / 10"}</span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span>Product Owner ambiguity confirmation</span>
                      <span>{ambiguityConfirmed ? "16 / 16" : "10 / 16"}</span>
                    </li>
                    <li className="flex justify-between gap-3 border-t border-[var(--line)] pt-2">
                      <span>Estimate not supplied</span>
                      <span>0 / 6</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-[var(--muted)]">
                    Score = 25 + 23 + 20 + {resolved ? "10" : "0"} +{" "}
                    {ambiguityConfirmed ? "16" : "10"} + 0. The missing estimate
                    caps readiness at 94%.
                  </p>
                </details>
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
                {storyOptions.length > 1 && (
                  <div className="mb-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                      INVEST-sized story set · {storyOptions.length} stories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {storyOptions.map((story, index) => (
                        <button
                          key={story.key}
                          onClick={() => setStoryIndex(index)}
                          aria-pressed={storyIndex === index}
                          className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold ${
                            storyIndex === index
                              ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                              : "border-[var(--line)] bg-white text-[var(--muted)]"
                          }`}
                        >
                          <span className="block font-mono">{story.key}</span>
                          <span className="mt-1 block">{story.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-[var(--blue)]">
                    {activeStory.key}
                  </span>
                  <StatusPill tone={canExport ? "green" : "neutral"}>
                    {canExport ? "Sprint-ready" : "Draft · In review"}
                  </StatusPill>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold leading-7">
                  {activeStory.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  <strong className="text-[var(--ink)]">As a</strong>{" "}
                  {activeStory.role},{" "}
                  <strong className="text-[var(--ink)]">I want to</strong>{" "}
                  {activeStory.action}{" "}
                  <strong className="text-[var(--ink)]">so that</strong>{" "}
                  {activeStory.benefit}.
                </p>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                  Acceptance criteria · BDD
                </p>
                <div className="mt-3 space-y-3">
                  {activeStory.acceptance.map((acceptance, index) => (
                    <div
                      key={`${activeStory.key}-scenario-${index}`}
                      className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--code-bg)] font-mono text-[11px] leading-5"
                    >
                      <div className="border-b border-[var(--line)] px-3 py-2 text-[10px] font-bold uppercase tracking-[.1em] text-[var(--muted)]">
                        Scenario {index + 1}
                      </div>
                      <Criteria label="Given" value={acceptance.given} />
                      <Criteria label="When" value={acceptance.when} />
                      <Criteria
                        label="Then"
                        value={acceptance.then}
                        highlight={resolved && ambiguityConfirmed}
                      />
                    </div>
                  ))}
                </div>
                {resolved && ambiguityConfirmed && (
                  <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[var(--green-dark)]">
                    <Icon name="check" className="size-3.5" /> Acceptance
                    criteria reflect this decision
                  </div>
                )}
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                  Attached requirements
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeStory.requirements.map((requirement) => (
                    <Tag key={requirement}>✓ {requirement}</Tag>
                  ))}
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
                      : !ambiguityConfirmed
                        ? `Confirm the ${scenario.ambiguityTitle.toLowerCase()} to enable export`
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
            <span className="size-1.5 rounded-full bg-[var(--green)]" />{" "}
            Workspace changes · session only
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
                {transcriptLines.map((entry, index) => (
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
                  Example evidence for {scenario.storyKey}. Review the conflict
                  and confirm the governing rule before export.
                </p>
              </div>
            ) : source === "bpmn" ? (
              <div className="mt-8 space-y-3">
                {scenarioId !== "rebate" && (
                  <p className="rounded-lg bg-[var(--blue-soft)] p-3 text-xs leading-5 text-[var(--blue)]">
                    Flow map: {scenario.processSteps.length} nodes.{" "}
                    {resolved
                      ? `Node ${scenario.conflictStep} reflects the selected decision.`
                      : `The difference is at Node ${scenario.conflictStep}.`}
                  </p>
                )}
                {scenarioId === "rebate" && (
                  <p className="rounded-lg bg-[var(--blue-soft)] p-3 text-xs leading-5 text-[var(--blue)]">
                    Flow map: 7 nodes (A-G), 1 gateway (F).{" "}
                    {resolved
                      ? "The agreed approval decision adds explicit value-based routing."
                      : "Current flow sends every claim through manual review."}
                  </p>
                )}
                {scenario.processSteps.map((step) => {
                  const nodeConflict = step.id === scenario.conflictStep
                  const label =
                    scenarioId === "rebate" &&
                    step.id === "B" &&
                    minorResolutions["CONF-02"] === "adopt"
                      ? "Resident enters address (no utility bill upload)"
                      : scenarioId === "rebate" &&
                          step.id === "C" &&
                          minorResolutions["CONF-03"] === "adopt"
                        ? "Verify bank account through Open Banking"
                        : scenarioId === "rebate" &&
                            step.id === "E" &&
                            resolved &&
                            decision === "primary"
                          ? "Five-day caseworker check (> £500 only)"
                          : scenarioId === "rebate" &&
                              step.id === "G" &&
                              resolved &&
                              decision === "primary"
                            ? "Supervisor sign-off (> £500 only)"
                            : scenarioId === "communityMeals" &&
                                resolved &&
                                step.id === "C"
                              ? decision === "primary"
                                ? "Review signed accounts before eligibility decision"
                                : "Auto-check applications under £30,000"
                              : resolved &&
                                  step.id === scenario.conflictStep &&
                                  scenarioId !== "rebate"
                                ? decision === "primary"
                                  ? (scenario.primaryProcessLabel ?? step.label)
                                  : (scenario.alternateProcessLabel ??
                                    step.label)
                                : step.label
                  return (
                    <div
                      key={step.id}
                      className={`rounded-xl border p-4 text-sm ${
                        nodeConflict
                          ? resolved
                            ? "border-[var(--green-border)] bg-[var(--green-soft)]"
                            : "border-[var(--red-border)] bg-[var(--red-soft)]"
                          : step.gateway
                            ? "border-[var(--blue-border)] bg-[var(--blue-soft)]"
                            : "border-[var(--line)] bg-[var(--soft)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>
                          Node {step.id} · {label}
                        </span>
                        {nodeConflict && (
                          <StatusPill tone={resolved ? "green" : "red"}>
                            {resolved ? "Decision recorded" : "Conflict"}
                          </StatusPill>
                        )}
                      </div>
                      {nodeConflict && resolved && (
                        <p className="mt-3 text-xs font-semibold text-[var(--green-dark)]">
                          Adopted update: {decisionDescription}.
                        </p>
                      )}
                      {step.gateway && scenarioId === "rebate" && (
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          <div className="rounded-md border border-[var(--line)] bg-white p-2 text-xs">
                            {resolved && decision === "primary"
                              ? "≤ £500 → Auto-approve → queue payment (bypass E + G)"
                              : "All claims → Review required → Node E → Node G"}
                          </div>
                          {resolved && decision === "primary" && (
                            <div className="rounded-md border border-[var(--line)] bg-white p-2 text-xs">
                              &gt; £500 → Node E (5-day check) → Node G
                              (supervisor)
                            </div>
                          )}
                        </div>
                      )}
                      {step.gateway && scenarioId === "communityMeals" && (
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          <div className="rounded-md border border-[var(--line)] bg-white p-2 text-xs">
                            {resolved && decision === "primary"
                              ? "All applications → Grant officer reviews signed accounts"
                              : "Under £30,000 → Mark eligible without accounts review"}
                          </div>
                          <div className="rounded-md border border-[var(--line)] bg-white p-2 text-xs">
                            {resolved && decision === "primary"
                              ? "Missing accounts → Keep draft and request documents"
                              : "£30,000 or more → Grant officer reviews signed accounts"}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
                {scenarioId === "communityMeals" && uploadedBpmn && (
                  <details className="rounded-xl border border-[var(--line)] bg-white p-4">
                    <summary className="cursor-pointer text-xs font-semibold">
                      View uploaded BPMN source
                    </summary>
                    <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-[var(--soft)] p-3 text-[10px] leading-5 text-[var(--muted)]">
                      {uploadedBpmn.content}
                    </pre>
                  </details>
                )}
              </div>
            ) : source === "custom" ? (
              <div className="mt-8">
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Choose the governing rule for this example. Bespoke policy
                  drafting requires additional Product Owner review.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(["primary", "alternate"] as const).map((option) => (
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
                      : resolved && !ambiguityConfirmed
                        ? "Clarification needed"
                        : "Working draft"}
                  </p>
                  <h2
                    id="export-title"
                    className="font-display mt-1 text-2xl font-semibold"
                  >
                    {activeStory.key} formatted successfully
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    This is a draft only. No Jira issue has been created. Copy
                    or download it to add to your backlog.
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
