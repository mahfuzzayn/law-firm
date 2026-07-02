"use client";

import { useEffect, useState } from "react";

/**
 * Phase 1 MSW browser integration.
 * Only starts on the client — never runs on the server.
 */
export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function start() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        const { worker } = await import("@/mocks/browser");
        await worker.start({
          onUnhandledRequest: "bypass",
          quiet: true,
        });
      }
      setReady(true);
    }
    start();
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Préparation...</p>
      </div>
    );
  }

  return <>{children}</>;
}
