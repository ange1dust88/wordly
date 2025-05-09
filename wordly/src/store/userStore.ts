import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  email?: string;
  premium?: boolean;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null }); 
        localStorage.removeItem('user-storage'); 
      },
    }),
    {
      name: 'user-storage', 
      partialize: (state) => ({ user: state.user }), 
    }
  )
);

export default useUserStore;
