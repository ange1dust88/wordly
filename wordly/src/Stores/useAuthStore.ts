import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean; 
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuthStatus: () => void; 
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  isLoading: true, 

  login: (accessToken, refreshToken) => {
    localStorage.setItem('access', accessToken);
    localStorage.setItem('refresh', refreshToken);
    sessionStorage.setItem('access', accessToken);
    sessionStorage.setItem('refresh', refreshToken);
    set({ isAuthenticated: true, accessToken, refreshToken, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
    set({ isAuthenticated: false, accessToken: null, refreshToken: null, isLoading: false });
  },

  checkAuthStatus: () => {
    const accessToken = localStorage.getItem('access') || sessionStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
    if (accessToken && refreshToken) {
      set({ isAuthenticated: true, accessToken, refreshToken, isLoading: false });
    } else {
      set({ isAuthenticated: false, accessToken: null, refreshToken: null, isLoading: false });
    }
  },
}));