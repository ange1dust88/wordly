import { create } from 'zustand';

interface User {
  username: string;
  email?: string;
  isPremium?: boolean;
  balance?: number;

}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
