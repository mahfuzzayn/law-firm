"use client";

import { create } from "zustand";
import type { User, Session } from "@/types";
import { loginAPI, getSessionAPI, logoutAPI } from "@/lib/api/auth";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  restoreSession: async () => {
    try {
      const session = await getSessionAPI();
      if (session) {
        set({ user: session.user, session, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, session: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, session: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    const session = await loginAPI(email, password);
    set({ user: session.user, session, isAuthenticated: true });
  },

  logout: async () => {
    await logoutAPI();
    set({ user: null, session: null, isAuthenticated: false });
  },
}));
