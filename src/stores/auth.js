import { defineStore } from 'pinia';
import service from "../service";
import router from "../router";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    access_token: JSON.parse(localStorage.getItem('access_token')),
    refresh_token: JSON.parse(localStorage.getItem('refresh_token')),
    returnUrl: null
  }),
  actions: {
    async login(username, password) {
      const resp = await service().post(`login`, {
        username,
        password,
        grant_type: 'password',
        client_id: '966c01ba-31b1-40a2-8f4c-fab8b1373bd7',
      });

      if (resp.data) {
        // update pinia state
        this.access_token = resp.data.access_token;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('access_token', JSON.stringify(resp.data.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(resp.data.refresh_token));

        // redirect to previous url or default to home page
        router.push(this.returnUrl || '/');
      }

    },
    logout() {
      this.access_token = null;
      this.refresh_token = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push('/login');
    }
  }
});
