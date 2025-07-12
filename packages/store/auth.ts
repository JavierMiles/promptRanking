import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@repo/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username: string) => {
        const user: User = {
          id: `user_${Date.now()}`,
          username,
          createdAt: new Date(),
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 