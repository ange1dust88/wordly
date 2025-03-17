import {create} from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  login: (accessToken, refreshToken) => set({ isAuthenticated: true, accessToken, refreshToken }),
  logout: () => set({ isAuthenticated: false, accessToken: null, refreshToken: null }),
}));

export const checkAuthStatus = () => {
  const accessToken = localStorage.getItem('access') || sessionStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
  if (accessToken && refreshToken) {
    useAuthStore.getState().login(accessToken, refreshToken);
  }
};
