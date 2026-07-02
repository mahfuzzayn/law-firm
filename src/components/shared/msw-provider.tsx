"use client";

import { useEffect, useRef } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return;

    import("@/mocks/browser")
      .then(({ worker }) =>
        worker.start({ onUnhandledRequest: "bypass", quiet: true }),
      )
      .then(() => console.log("[MSW] Mock Service Worker started"))
      .catch((err) =>
        console.warn("[MSW] Failed to start — APIs use fallback", err),
      );
  }, []);

  return <>{children}</>;
}
