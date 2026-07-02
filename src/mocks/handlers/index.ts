import { authHandlers } from "./auth";
import { casesHandlers } from "./cases";
import { clientsHandlers } from "./clients";
import { documentsHandlers } from "./documents";
import { billingHandlers } from "./billing";
import { teamHandlers } from "./team";
import { calendarHandlers } from "./calendar";
import { tasksHandlers } from "./tasks";
import { contactHandlers } from "./contact";

export const handlers = [
  ...authHandlers,
  ...casesHandlers,
  ...clientsHandlers,
  ...documentsHandlers,
  ...billingHandlers,
  ...teamHandlers,
  ...calendarHandlers,
  ...tasksHandlers,
  ...contactHandlers,
];
