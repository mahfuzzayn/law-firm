import { faker } from "@faker-js/faker/locale/fr";
import type {
  User,
  Case,
  Client,
  Document,
  Invoice,
  TimeEntry,
  CalendarEvent,
  Task,
  TeamMember,
  CaseTimelineEvent,
} from "@/types";

faker.seed(42);

// --- Helpers ---

const practiceAreas = [
  "Droit des affaires",
  "Droit civil",
  "Droit numérique",
  "Droit du travail",
  "Droit immobilier",
  "Droit de la famille",
  "Droit fiscal",
  "Droit de la propriété intellectuelle",
  "Droit des contrats",
  "Droit de la concurrence",
] as const;

const caseStatuses: Case["status"][] = [
  "open",
  "in_progress",
  "pending_court",
  "closed",
];

// --- Seeded data stores (mutable, for in-memory session mutations) ---

export let users: User[] = [];
export let cases: Case[] = [];
export let clients: Client[] = [];
export let documents: Document[] = [];
export let invoices: Invoice[] = [];
export let timeEntries: TimeEntry[] = [];
export let calendarEvents: CalendarEvent[] = [];
export let tasks: Task[] = [];
export let caseTimelines: Map<string, CaseTimelineEvent[]> = new Map();

// --- Generators ---

function generateUsers(count: number): User[] {
  const roles: User["role"][] = ["admin", "lawyer", "staff"];
  return Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: roles[i % 3],
    avatar: faker.image.avatar(),
    practiceAreas: faker.helpers.arrayElements([...practiceAreas], 2),
    barNumber: `BAR-${faker.string.alphanumeric(6).toUpperCase()}`,
    languages: faker.helpers.arrayElements(["Français", "English", "Español", "Deutsch"], 2),
    createdAt: faker.date.past({ years: 5 }),
  }));
}

function generateClients(count: number): Client[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(["individual", "company"] as const),
    name: faker.company.name(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "international" }),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, France`,
    companyName: faker.helpers.maybe(() => faker.company.name()) ?? undefined,
    siret: faker.helpers.maybe(() => faker.string.numeric(14)) ?? undefined,
    notes: faker.helpers.maybe(() => faker.lorem.sentence()) ?? undefined,
    createdAt: faker.date.past({ years: 3 }),
    updatedAt: faker.date.recent(),
  }));
}

function generateCases(
  count: number,
  userList: User[],
  clientList: Client[],
): Case[] {
  return Array.from({ length: count }, () => {
    const lawyer = faker.helpers.arrayElement(
      userList.filter((u) => u.role === "admin" || u.role === "lawyer"),
    );
    const client = faker.helpers.arrayElement(clientList);
    return {
      id: faker.string.uuid(),
      caseNumber: `DOS-${faker.date.recent().getFullYear()}-${faker.string.numeric(4)}`,
      title: faker.helpers.arrayElement([
        `Contentieux ${faker.company.catchPhraseNoun()}`,
        `Consultation sur ${faker.company.buzzPhrase()}`,
        `Litige ${faker.location.city()}`,
        `Dossier ${faker.person.lastName()} contre ${faker.person.lastName()}`,
      ]),
      clientId: client.id,
      clientName: client.name,
      practiceArea: faker.helpers.arrayElement([...practiceAreas]),
      status: faker.helpers.arrayElement(caseStatuses),
      assignedLawyerId: lawyer.id,
      assignedLawyerName: lawyer.name,
      nextDeadline: faker.helpers.maybe(() => faker.date.soon({ days: 30 })) ?? undefined,
      openedAt: faker.date.past({ years: 2 }),
      updatedAt: faker.date.recent(),
      description: faker.lorem.paragraph(),
    };
  });
}

function generateDocuments(
  count: number,
  caseList: Case[],
  clientList: Client[],
  userList: User[],
): Document[] {
  const docTypes = ["PDF", "DOCX", "XLSX", "PNG", "JPEG"];
  const categories = ["contrat", "correspondance", "preuve", "facture", "note"];
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: `${faker.hacker.noun().replace(/\s/g, "_")}.${faker.helpers.arrayElement(["pdf", "docx", "xlsx"])}`,
    type: faker.helpers.arrayElement(docTypes),
    size: faker.number.int({ min: 10000, max: 5000000 }),
    caseId: faker.helpers.maybe(() => faker.helpers.arrayElement(caseList).id) ?? undefined,
    clientId: faker.helpers.maybe(() => faker.helpers.arrayElement(clientList).id) ?? undefined,
    uploadedBy: faker.helpers.arrayElement(userList).name,
    uploadedAt: faker.date.recent({ days: 90 }),
    category: faker.helpers.arrayElement(categories),
    url: `https://mock-storage.example.com/documents/${faker.string.uuid()}`,
  }));
}

function generateInvoices(
  count: number,
  clientList: Client[],
  caseList: Case[],
): Invoice[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    invoiceNumber: `FACT-${faker.date.recent().getFullYear()}-${faker.string.numeric(4)}`,
    clientId: faker.helpers.arrayElement(clientList).id,
    clientName: faker.helpers.arrayElement(clientList).name,
    caseId: faker.helpers.arrayElement(caseList).id,
    caseTitle: faker.helpers.arrayElement(caseList).title,
    amount: faker.number.int({ min: 500, max: 50000 }),
    status: faker.helpers.arrayElement(["draft", "sent", "paid", "overdue"] as const),
    issuedAt: faker.date.recent({ days: 60 }),
    dueAt: faker.date.soon({ days: 30 }),
    paidAt: faker.helpers.maybe(() => faker.date.recent()) ?? undefined,
    lineItems: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      description: faker.lorem.sentence(),
      hours: faker.number.float({ min: 1, max: 20, fractionDigits: 1 }),
      rate: faker.number.int({ min: 150, max: 500 }),
      amount: 0, // computed below
    })).map((item) => ({
      ...item,
      amount: Math.round(item.hours * item.rate * 100) / 100,
    })),
  }));
}

function generateTimeEntries(
  count: number,
  caseList: Case[],
  userList: User[],
): TimeEntry[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    caseId: faker.helpers.arrayElement(caseList).id,
    lawyerId: faker.helpers.arrayElement(userList).id,
    lawyerName: faker.helpers.arrayElement(userList).name,
    description: faker.lorem.sentence(),
    hours: faker.number.float({ min: 0.5, max: 8, fractionDigits: 1 }),
    date: faker.date.recent({ days: 30 }),
    billed: faker.datatype.boolean(0.6),
  }));
}

function generateCalendarEvents(
  count: number,
  caseList: Case[],
  clientList: Client[],
): CalendarEvent[] {
  return Array.from({ length: count }, () => {
    const eventType = faker.helpers.arrayElement([
      "court_date",
      "client_meeting",
      "internal_deadline",
    ] as const);
    const start = faker.date.soon({ days: 60 });
    const end = new Date(start.getTime() + 60 * 60 * 1000); // +1h
    return {
      id: faker.string.uuid(),
      title: faker.helpers.arrayElement([
        "Audience au tribunal",
        "Réunion client",
        "Date limite de dépôt",
        "Consultation téléphonique",
        "Réunion d'équipe",
      ]),
      description: faker.helpers.maybe(() => faker.lorem.sentence()) ?? undefined,
      type: eventType,
      start,
      end,
      caseId: faker.helpers.maybe(() => faker.helpers.arrayElement(caseList).id) ?? undefined,
      clientId: faker.helpers.maybe(() => faker.helpers.arrayElement(clientList).id) ?? undefined,
      allDay: faker.datatype.boolean(0.2),
      color:
        eventType === "court_date"
          ? "var(--color-destructive)"
          : eventType === "client_meeting"
            ? "var(--color-accent)"
            : "var(--color-primary)",
    };
  });
}

function generateTasks(
  count: number,
  userList: User[],
  caseList: Case[],
): Task[] {
  return Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    title: faker.helpers.arrayElement([
      "Préparer les conclusions",
      "Relire le contrat",
      "Contacter le client",
      "Envoyer la facture",
      "Mettre à jour le dossier",
      "Préparer l'audience",
      "Recherche juridique",
      "Rédiger la note d'honoraires",
    ]),
    description: faker.helpers.maybe(() => faker.lorem.sentence()) ?? undefined,
    status: faker.helpers.arrayElement(["todo", "in_progress", "review", "done"] as const),
    priority: faker.helpers.arrayElement(["low", "medium", "high"] as const),
    assigneeId: faker.helpers.arrayElement(userList).id,
    assigneeName: faker.helpers.arrayElement(userList).name,
    caseId: faker.helpers.maybe(() => faker.helpers.arrayElement(caseList).id) ?? undefined,
    dueDate: faker.helpers.maybe(() => faker.date.soon({ days: 14 })) ?? undefined,
    createdAt: faker.date.recent({ days: 30 }),
    order: i,
  }));
}

function generateTeamMembers(userList: User[]): TeamMember[] {
  return userList.map((u) => ({
    id: faker.string.uuid(),
    userId: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    practiceAreas: u.practiceAreas,
    openCases: faker.number.int({ min: 0, max: 15 }),
    openTasks: faker.number.int({ min: 0, max: 10 }),
    avatar: u.avatar,
    joinedAt: u.createdAt,
  }));
}

// --- Initialize all data ---

export function seedData() {
  users = generateUsers(8);
  clients = generateClients(30);
  cases = generateCases(25, users, clients);
  documents = generateDocuments(50, cases, clients, users);
  invoices = generateInvoices(20, clients, cases);
  timeEntries = generateTimeEntries(40, cases, users);
  calendarEvents = generateCalendarEvents(15, cases, clients);
  tasks = generateTasks(25, users, cases);
  // Team members
  const teamMembers = generateTeamMembers(users);

  // Case timelines
  for (const c of cases) {
    caseTimelines.set(
      c.id,
      Array.from({ length: faker.number.int({ min: 2, max: 6 }) }, () => ({
        id: faker.string.uuid(),
        caseId: c.id,
        type: faker.helpers.arrayElement([
          "status_change",
          "note",
          "document",
          "deadline",
        ] as CaseTimelineEvent["type"][]),
        description: faker.lorem.sentence(),
        createdAt: faker.date.recent({ days: 60 }),
        createdBy: faker.helpers.arrayElement(users).name,
      })),
    );
  }

  return { users, cases, clients, documents, invoices, timeEntries, calendarEvents, tasks, teamMembers, caseTimelines };
}

// Seed immediately on module load
seedData();
