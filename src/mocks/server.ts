import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Used for tests/SSR — currently unused in Phase 1
export const server = setupServer(...handlers);
