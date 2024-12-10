import { defineStore } from 'pinia';

interface AuthState {
  jwtToken: string | null;
  refreshToken: string | null;
}

export const  useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    jwtToken: null,
    refreshToken: null,
  }),
  persist: {
    storage: sessionStorage
  },
  actions: {
    setTokens(jwtToken: string, refreshToken: string) {
      this.jwtToken = jwtToken;
      this.refreshToken = refreshToken;
    },
    clearTokens() {
      this.jwtToken = null;
      this.refreshToken = null;
    },
  },
 
  },
);
