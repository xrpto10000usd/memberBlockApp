import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  userId: string | null;
  expiresAt: number | null;
  hasHydrated: boolean;
  setAuth: (token: string, userId: string ) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      expiresAt: null,
      setAuth: (token, userId) =>
        set({ token, userId, expiresAt: Date.now() + 199_000 }),

      logout: () =>
        set({ token: null, userId: null , expiresAt: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {

          if (!state) return;

          const { expiresAt } = state;

          if (expiresAt && Date.now() > expiresAt) {
             state.logout();
          }

          state.hasHydrated = true;
      }
    }
  )
);