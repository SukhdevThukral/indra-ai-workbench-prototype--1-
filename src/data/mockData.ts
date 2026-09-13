/**
 * INDRA AI — SIH 2026 (SIH26117)
 * ---------------------------------------------------------------
 * ALL data in this file is simulated demo data for the fictional
 * company "Gooloo Gooloo Industries". No backend, no real AI.
 */

import {
  Activity,
  AlertTriangle,
  AlignHorizontalDistributeCenter,
  BadgeCheck,
  BrainCircuit,
  Cog,
  Database,
  Droplets,
  Factory,
  FileOutput,
  FileSearch,
  FileSignature,
  FileSpreadsheet,
  FileText,
  Gauge,
  GitCompare,
  HardHat,
  Layers,
  Radar,
  RefreshCw,
  ScanText,
  Thermometer,
  TrendingUp,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* General app constants                                               */
/* ------------------------------------------------------------------ */

export const COMPANY = "Gooloo Gooloo Industries";
export const PLANT = "Plant 2 · Cooling Water Loop B";
export const DEFAULT_DOC = "Pump_P204_Inspection_Report.pdf";
export const EQUIPMENT = "Pump P-204";
export const ANALYSIS_ID = "INDRA-2026-0117-204";

export const INSPECTION_IMAGE =
  "https://images.pexels.com/photos/7937300/pexels-photo-7937300.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

/* ------------------------------------------------------------------ */
/* Page 1 — tasks, example prompts                                     */
/* ------------------------------------------------------------------ */

export const TASKS = [
  "Inspection Analysis",
  "Maintenance Analysis",
  "Safety Review",
  "Engineering Analysis",
  "Document Summary",
  "Anomaly Detection",
];

export interface ExamplePrompt {
  text: string;
  hint: string;
  icon: LucideIcon;
}

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    text: "Analyze Pump P-204 inspection report",
    hint: "Vibration & thermal findings",
    icon: FileText,
  },
  {
    text: "Find anomalies in this maintenance report",
    hint: "Outlier detection across logs",
    icon: Radar,
  },
  {
    text: "Compare inspection findings with maintenance SOP",
    hint: "SOP-042 compliance check",
    icon: GitCompare,
  },
  {
    text: "Identify high-risk equipment conditions",
    hint: "Rank by damage likelihood",
    icon: AlertTriangle,
  },
];

/* ------------------------------------------------------------------ */
/* Processing screen                                                   */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  label: string;
  detail: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { label: "Document uploaded", detail: "14 pages received · checksum verified" },
  { label: "OCR / text extraction", detail: "INDRA-OCR v2.1 · tables & signatures parsed" },
  { label: "Image analysis", detail: "INDRA-Vision v2.1 · 2 embedded photos scanned" },
  { label: "Equipment identification", detail: "Ledger match · Pump P-204 — Cooling Water Loop B" },
  { label: "Detecting anomalies", detail: "INDRA-VibeNet v1.3 · vibration & thermal signatures" },
  { label: "Searching local knowledge", detail: "Gooloo Gooloo KB · 1,284 documents indexed" },
  { label: "Risk assessment", detail: "INDRA-RiskRank · likelihood × consequence" },
  { label: "Generating recommendations", detail: "INDRA-Analyst 7B (local) · drafting output" },
];

export const LOCAL_MODELS = [
  { name: "INDRA-OCR v2.1", role: "Layout, tables & text" },
  { name: "INDRA-VibeNet v1.3", role: "Spectral anomaly detection" },
  { name: "INDRA-Analyst 7B", role: "Local reasoning & drafting" },
];

/* ------------------------------------------------------------------ */
/* Results — observed conditions                                       */
/* ------------------------------------------------------------------ */

export type Tone = "good" | "warn" | "bad" | "neutral";

export interface Condition {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tone: Tone;
}

export const CONDITIONS: Condition[] = [
  {
    label: "Overall vibration",
    value: "8.7 mm/s RMS",
    note: "93% above normal ceiling",
    icon: Activity,
    tone: "bad",
  },
  {
    label: "Normal range",
    value: "0–4.5 mm/s RMS",
    note: "OEM steady-state band",
    icon: Gauge,
    tone: "neutral",
  },
  {
    label: "Bearing-side vibration",
    value: "Elevated",
    note: "DE housing · 2.4× baseline",
    icon: TrendingUp,
    tone: "warn",
  },
  {
    label: "Temperature",
    value: "Increasing",
    note: "71 °C · +6 °C in 48 h",
    icon: Thermometer,
    tone: "warn",
  },
  {
    label: "Leakage",
    value: "Not detected",
    note: "Seal faces visually intact",
    icon: Droplets,
    tone: "good",
  },
  {
    label: "Frequency pattern",
    value: "↑ 1× vibration",
    note: "Dominant at running speed",
    icon: Waves,
    tone: "warn",
  },
];

/* Vibration trend — 20 hourly readings (mm/s RMS, drive-end velocity) */
export const VIBRATION_DATA: { t: string; v: number }[] = [
  { t: "06:00", v: 2.3 },
  { t: "07:00", v: 2.4 },
  { t: "08:00", v: 2.5 },
  { t: "09:00", v: 2.6 },
  { t: "10:00", v: 2.9 },
  { t: "11:00", v: 3.3 },
  { t: "12:00", v: 3.8 },
  { t: "13:00", v: 4.4 },
  { t: "14:00", v: 5.1 },
  { t: "15:00", v: 5.8 },
  { t: "16:00", v: 6.4 },
  { t: "17:00", v: 7.1 },
  { t: "18:00", v: 7.6 },
  { t: "19:00", v: 8.1 },
  { t: "20:00", v: 8.4 },
  { t: "21:00", v: 8.7 },
  { t: "22:00", v: 8.6 },
  { t: "23:00", v: 8.8 },
  { t: "00:00", v: 8.9 },
  { t: "01:00", v: 8.7 },
];

export const WARNING_LIMIT = 4.5;
export const CRITICAL_LIMIT = 7.5;

/* ------------------------------------------------------------------ */
/* Results — root causes                                               */
/* ------------------------------------------------------------------ */

export interface RootCause {
  name: string;
  confidence: number;
  note: string;
  icon: LucideIcon;
}

export const ROOT_CAUSES: RootCause[] = [
  {
    name: "Bearing Wear",
    confidence: 82,
    note: "1× growth with harmonics at drive-end bearing frequencies",
    icon: Cog,
  },
  {
    name: "Shaft Misalignment",
    confidence: 71,
    note: "Elevated 1× radial with moderate axial components",
    icon: AlignHorizontalDistributeCenter,
  },
  {
    name: "Rotor Imbalance",
    confidence: 64,
    note: "Dominant 1× running-speed peak, phase-stable",
    icon: RefreshCw,
  },
  {
    name: "Foundation Looseness",
    confidence: 48,
    note: "Weak low-frequency subharmonics near 0.5×",
    icon: Layers,
  },
];

/* ------------------------------------------------------------------ */
/* Results — risk analysis                                             */
/* ------------------------------------------------------------------ */

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export interface Risk {
  label: string;
  level: RiskLevel;
  score: number; // 0–100 for the bar
  note: string;
  icon: LucideIcon;
}

export const RISKS: Risk[] = [
  {
    label: "Equipment Damage Risk",
    level: "HIGH",
    score: 86,
    note: "Progressive bearing failure likely within days if untreated",
    icon: Cog,
  },
  {
    label: "Production Disruption Risk",
    level: "MEDIUM",
    score: 57,
    note: "Cooling loop B can run on standby pump for ~6 hours",
    icon: Factory,
  },
  {
    label: "Safety Risk",
    level: "LOW",
    score: 21,
    note: "Guarding intact · no leakage · area access controlled",
    icon: HardHat,
  },
];

/* Risk matrix markers: [likelihood 1-4, impact 1-4] */
export const MATRIX_MARKERS = [
  { key: "E", label: "Equipment damage", l: 4, i: 3, color: "#ef4444" },
  { key: "P", label: "Production disruption", l: 3, i: 3, color: "#f59e0b" },
  { key: "S", label: "Safety", l: 2, i: 2, color: "#10b981" },
];

/* ------------------------------------------------------------------ */
/* Results — evidence                                                  */
/* ------------------------------------------------------------------ */

/* Rows shown in the mock document preview (increasing readings) */
export const DOC_LOG_ROWS: {
  time: string;
  vel: string;
  temp: string;
  status: "OK" | "WARN" | "HIGH";
}[] = [
  { time: "06:00", vel: "2.3", temp: "58", status: "OK" },
  { time: "09:00", vel: "2.6", temp: "59", status: "OK" },
  { time: "12:00", vel: "3.8", temp: "61", status: "OK" },
  { time: "15:00", vel: "5.8", temp: "65", status: "WARN" },
  { time: "18:00", vel: "7.6", temp: "68", status: "HIGH" },
  { time: "21:00", vel: "8.7", temp: "71", status: "HIGH" },
  { time: "00:00", vel: "8.7", temp: "71", status: "HIGH" },
];

export const EVIDENCE_CHIPS = [
  { icon: FileSearch, label: "Page reference", value: "p.3 · Table 2 — vibration log" },
  { icon: Activity, label: "Vibration reading", value: "8.7 mm/s RMS (drive-end)" },
  { icon: Thermometer, label: "Temperature trend", value: "58 °C → 71 °C in 48 h" },
];

/* ------------------------------------------------------------------ */
/* Results — local knowledge search                                    */
/* ------------------------------------------------------------------ */

export interface KnowledgeDoc {
  name: string;
  relevance: number;
  excerpt: string;
  matches: string[];
  pages: string;
}

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  {
    name: "Maintenance_SOP_042.pdf",
    relevance: 94,
    pages: "Rev 7 · 22 pages",
    excerpt:
      "§4.3 — A detailed bearing inspection is mandatory within 24 hours when a P-200 series pump exceeds 6.0 mm/s RMS. Continuous vibration monitoring must remain active until the inspection is closed out and signed.",
    matches: ["§4.3 Intervention threshold", "§2.1 Monitoring duty", "§5.4 Sign-off form"],
  },
  {
    name: "Pump_Maintenance_Manual.pdf",
    relevance: 89,
    pages: "OEM · 86 pages",
    excerpt:
      "Section 7.2 — Shaft alignment tolerance for P-200 series is 0.05 mm. Re-check soft-foot before laser alignment. Bearing kit GG-6312 is the specified drive-end replacement.",
    matches: ["§7.2 Alignment tolerance", "§3.4 Bearing kit GG-6312", "§7.5 Soft-foot check"],
  },
  {
    name: "Vibration_Standard.pdf",
    relevance: 84,
    pages: "ISO 10816 basis · 41 pages",
    excerpt:
      "The Zone C/D boundary for Group 2 machines sits at 4.5 mm/s RMS. Operation above the Zone C boundary is permissible only for limited periods while corrective action is arranged.",
    matches: ["Table 2 — Zone boundaries", "§6.1 Limited operation", "App. A — Sensor placement"],
  },
];

/* ------------------------------------------------------------------ */
/* Results — agentic workflow                                          */
/* ------------------------------------------------------------------ */

export interface WorkflowStep {
  label: string;
  icon: LucideIcon;
  duration: string;
  desc: string;
  outputs: string[];
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    label: "DOCUMENT",
    icon: FileText,
    duration: "0.4 s",
    desc: "Pump_P204_Inspection_Report.pdf received through the secure local uploader and verified against the plant ledger.",
    outputs: ["14 pages", "2 images", "3 tables"],
  },
  {
    label: "UNDERSTAND",
    icon: ScanText,
    duration: "0.9 s",
    desc: "INDRA-OCR parsed the report structure — header, vibration log, thermal log and inspector notes — into a machine-readable map.",
    outputs: ["Section map", "Equipment ledger", "Reading tables"],
  },
  {
    label: "ANALYZE",
    icon: BrainCircuit,
    duration: "1.6 s",
    desc: "Trend, baseline and spectral features were computed for every numeric series and compared with P-204's 90-day operating baseline.",
    outputs: ["Baseline delta", "Spectral features", "Trend slopes"],
  },
  {
    label: "DETECT ANOMALY",
    icon: Radar,
    duration: "1.2 s",
    desc: "VibeNet flagged drive-end vibration at 8.7 mm/s RMS — beyond the Zone C boundary — with a rising +6 °C thermal drift. No leakage signature found.",
    outputs: ["Vibration 8.7 mm/s", "ΔTemp +6 °C", "1× spectral peak"],
  },
  {
    label: "SEARCH KNOWLEDGE",
    icon: Database,
    duration: "0.8 s",
    desc: "The Gooloo Gooloo local knowledge base was queried for matching procedures, OEM limits and historical work orders.",
    outputs: ["SOP-042 · 94%", "OEM manual · 89%", "Vibration std · 84%"],
  },
  {
    label: "ASSESS RISK",
    icon: Gauge,
    duration: "0.7 s",
    desc: "INDRA-RiskRank scored consequence × likelihood across equipment, production and safety dimensions using plant-specific weightings.",
    outputs: ["Damage HIGH", "Production MEDIUM", "Safety LOW"],
  },
  {
    label: "VALIDATE",
    icon: BadgeCheck,
    duration: "0.5 s",
    desc: "Findings were cross-checked against raw OCR values and OEM limits. Confidence reconciled at 87% with no contradictory evidence.",
    outputs: ["Cross-check passed", "Confidence 87%"],
  },
  {
    label: "GENERATE OUTPUT",
    icon: FileOutput,
    duration: "1.3 s",
    desc: "INDRA-Analyst drafted the summary, approval note and corrective maintenance workbook — all rendered locally.",
    outputs: ["3 deliverables", "Priority HIGH", "24 h window"],
  },
];

/* ------------------------------------------------------------------ */
/* Results — follow-up conversation                                    */
/* ------------------------------------------------------------------ */

export interface ChatMessage {
  role: "customer" | "indra";
  text: string;
}

export const CHAT_SEED: ChatMessage[] = [
  { role: "customer", text: "What should we do with Pump P-204?" },
  {
    role: "indra",
    text: "Based on the inspection evidence and the matched maintenance procedures, Pump P-204 should undergo a detailed bearing and shaft-alignment inspection within 24 hours. The current vibration level (8.7 mm/s RMS) is above the normal operating range (0–4.5 mm/s RMS) and is still rising.",
  },
];

export const QUICK_ACTIONS = [
  "Explain Further",
  "Show Evidence",
  "Compare With SOP",
  "Generate Report",
] as const;

export const QUICK_RESPONSES: Record<string, string> = {
  "Explain Further":
    "The vibration spectrum for Pump P-204 shows a dominant peak at 1× running speed (2,980 rpm) that has grown roughly 260% over 48 hours. On centrifugal pumps this pattern usually indicates bearing wear or shaft misalignment rather than an electrical issue. A +6 °C drift at the drive-end bearing housing supports progressive mechanical degradation of the inboard bearing.",
  "Show Evidence":
    "Key evidence: (1) Page 3, Table 2 shows the last readings trending 5.8 → 7.6 → 8.7 mm/s RMS against a 4.5 mm/s limit. (2) The inspection image shows discolouration at the drive-end bearing housing, consistent with sustained heat. (3) No leakage or loose-mount signatures were found, which narrows the fault family. I have highlighted these regions in the Evidence panel above.",
  "Compare With SOP":
    "Maintenance_SOP_042 (rev 7, §4.3) requires a detailed bearing inspection within 24 hours when a P-200 series pump exceeds 6.0 mm/s RMS. Pump P-204 is at 8.7 mm/s — about 45% above the SOP intervention threshold. The OEM manual sets the alignment tolerance at 0.05 mm (§7.2). The recommended action satisfies the SOP and matches OEM section 7.2.",
  "Generate Report":
    "Report package generated locally: Inspection_Summary.pdf (executive summary), Approval_Note.docx (pre-filled for maintenance sign-off) and Maintenance_Recommendation.xlsx (parts, labour and schedule). No data left the Gooloo Gooloo network. You will find the files in Generated Deliverables below.",
};

export const DEFAULT_REPLY =
  "Based on the local analysis, Pump P-204's vibration of 8.7 mm/s RMS is 93% above its normal operating ceiling (4.5 mm/s). The pattern — dominant 1× component, rising temperature, no leakage — most strongly matches bearing wear (82% confidence). Recommendation: schedule a detailed bearing and shaft-alignment inspection within 24 hours and keep continuous vibration monitoring active.";

/* Keyword-based simulated answers for free-text questions */
export const INTENT_REPLIES: { keys: string[]; reply: string }[] = [
  {
    keys: ["temperature", "heat", "thermal", "hot"],
    reply:
      "The drive-end housing temperature rose from 58 °C to 71 °C over 48 h (+13%). That is below the 85 °C alarm limit, but the slope is abnormal and consistent with increased bearing friction. Trend alarms would trigger near 78 °C at the current rate of rise.",
  },
  {
    keys: ["when", "urgent", "how long", "shutdown", "stop"],
    reply:
      "At the current growth rate, the vibration trend reaches the 10 mm/s critical zone in roughly 30–50 hours. The SOP intervention window is 24 hours, so the inspection should be planned for the next maintenance shift. A controlled shutdown is not required immediately, but load should be reduced where possible.",
  },
  {
    keys: ["bearing", "cause", "why", "root"],
    reply:
      "The strongest hypothesis is drive-end bearing wear (82% confidence): the 1× running-speed peak with bearing-frequency harmonics is the classical signature. Shaft misalignment (71%) often co-occurs and should be checked during the same inspection window.",
  },
  {
    keys: ["safe", "safety", "risk", "danger"],
    reply:
      "Safety risk is currently LOW: guarding is intact, there is no leakage, and the area has controlled access. The dominant risk is equipment damage (HIGH). Standard permit-to-work applies for the inspection.",
  },
];

/* ------------------------------------------------------------------ */
/* Results — generated deliverables                                    */
/* ------------------------------------------------------------------ */

export interface Deliverable {
  name: string;
  kind: "pdf" | "docx" | "xlsx";
  size: string;
  desc: string;
  icon: LucideIcon;
  accent: string; // tailwind classes for the icon tile
}

export const DELIVERABLES: Deliverable[] = [
  {
    name: "Inspection_Summary.pdf",
    kind: "pdf",
    size: "2.4 MB · 2 pages",
    desc: "Executive summary of findings, sensor history and risk scoring",
    icon: FileText,
    accent: "bg-red-50 text-red-500 border-red-100",
  },
  {
    name: "Approval_Note.docx",
    kind: "docx",
    size: "148 KB · 1 page",
    desc: "Pre-filled maintenance approval note for plant sign-off",
    icon: FileSignature,
    accent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    name: "Maintenance_Recommendation.xlsx",
    kind: "xlsx",
    size: "312 KB · 3 sheets",
    desc: "Corrective work plan — parts, labour estimate and schedule",
    icon: FileSpreadsheet,
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

/* Spare-parts table shown in the XLSX preview modal */
export const PARTS_TABLE: { part: string; qty: string; cost: string; lead: string }[] = [
  { part: "Deep-groove ball bearing 6312 (drive end)", qty: "2", cost: "₹14,200", lead: "4 days" },
  { part: "Mechanical seal kit GG-MS-204", qty: "1", cost: "₹9,800", lead: "3 days" },
  { part: "Laser alignment shim pack (0.02–1 mm)", qty: "1", cost: "₹2,300", lead: "In stock" },
  { part: "Inspection labour — 2 technicians × 3 h", qty: "6 h", cost: "₹7,500", lead: "—" },
];

export const ACTION_NOTE = `
Based on the inspection evidence and the matched maintenance procedures, schedule a detailed bearing and shaft-alignment inspection within 24 hours. Continue vibration monitoring until the inspection is completed. Keep standby pump P-204B available and reduce load where possible.
`.trim();

export const RECOMMENDATION_TEXT =
  "Schedule detailed bearing and shaft alignment inspection within 24 hours. Continue vibration monitoring until inspection is completed.";
