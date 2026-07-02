"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/stores/ui-store";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const { cookieConsent, acceptCookies } = useUIStore();

  return (
    <AnimatePresence>
      {!cookieConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md sm:left-auto sm:right-4"
        >
          <div className="rounded-xl border bg-card/95 p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div className="flex-1">
                <p className="text-sm font-medium">Cookies fonctionnels</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ce site utilise des cookies strictement nécessaires à son bon fonctionnement.
                </p>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={acceptCookies}>
                Refuser
              </Button>
              <Button variant="default" size="sm" onClick={acceptCookies}>
                Accepter
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
