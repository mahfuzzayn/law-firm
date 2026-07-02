// Phase 1 mock types — all entities are stubs
// Swapping to real backend later only replaces the fetch layer, not these types

export type Role = "admin" | "lawyer" | "staff";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  practiceAreas: string[];
  barNumber: string;
  languages: string[];
  createdAt: Date;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  clientId: string;
  clientName: string;
  practiceArea: string;
  status: CaseStatus;
  assignedLawyerId: string;
  assignedLawyerName: string;
  nextDeadline?: Date;
  openedAt: Date;
  updatedAt: Date;
  description: string;
}

export type CaseStatus =
  | "open"
  | "in_progress"
  | "pending_court"
  | "closed";

export interface CaseTimelineEvent {
  id: string;
  caseId: string;
  type: "status_change" | "note" | "document" | "deadline";
  description: string;
  createdAt: Date;
  createdBy: string;
}

export interface Client {
  id: string;
  type: "individual" | "company";
  name: string;
  email: string;
  phone: string;
  address: string;
  companyName?: string;
  siret?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  caseId?: string;
  clientId?: string;
  uploadedBy: string;
  uploadedAt: Date;
  category: string;
  url: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  caseId: string;
  caseTitle: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: Date;
  dueAt: Date;
  paidAt?: Date;
  lineItems: InvoiceLineItem[];
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export interface InvoiceLineItem {
  description: string;
  hours: number;
  rate: number;
  amount: number;
}

export interface TimeEntry {
  id: string;
  caseId: string;
  lawyerId: string;
  lawyerName: string;
  description: string;
  hours: number;
  date: Date;
  billed: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: "court_date" | "client_meeting" | "internal_deadline";
  start: Date;
  end: Date;
  caseId?: string;
  clientId?: string;
  allDay: boolean;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  assigneeId: string;
  assigneeName: string;
  caseId?: string;
  dueDate?: Date;
  createdAt: Date;
  order: number;
}

export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: Role;
  practiceAreas: string[];
  openCases: number;
  openTasks: number;
  avatar?: string;
  joinedAt: Date;
}
