import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null; 
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, username: string) => void; 
  logout: () => void;
  checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  username: null, 
  isLoading: true,

  login: (accessToken, refreshToken, username) => {
    localStorage.setItem('access', accessToken);
    localStorage.setItem('refresh', refreshToken);
    localStorage.setItem('username', username); 
    sessionStorage.setItem('access', accessToken);
    sessionStorage.setItem('refresh', refreshToken);
    sessionStorage.setItem('username', username); 
    set({ isAuthenticated: true, accessToken, refreshToken, username, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username'); 
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('username'); 
    set({ isAuthenticated: false, accessToken: null, refreshToken: null, username: null, isLoading: false });
  },

  checkAuthStatus: () => {
    const accessToken = localStorage.getItem('access') || sessionStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
    const username = localStorage.getItem('username') || sessionStorage.getItem('username'); 
    if (accessToken && refreshToken && username) {
      set({ isAuthenticated: true, accessToken, refreshToken, username, isLoading: false });
    } else {
      set({ isAuthenticated: false, accessToken: null, refreshToken: null, username: null, isLoading: false });
    }
  },
}));