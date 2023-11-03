import { defineStore } from 'pinia';
import authApi from '../repositories/auth';

export const useCounterStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    profile: {}
  }),

  getters: {
    loggedIn: state => state.token !== null,
    user: state => state.profile
  },

  actions: {
    async loadProfile() {
      try {
        const resp = await authApi.profile();
        // setPermissions(resp.permissions);
        this.profile = resp;
      } catch (err) {
        throw Error(err);
      }
    }
  }
});
