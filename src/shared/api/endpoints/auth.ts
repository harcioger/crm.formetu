import { api } from '../config';

const resource = '';
export default {
  async login(email: string, password: string) {
    const resp = await api.post(`${resource}/login`, { email, password });

    return resp.data.data;
  },
  // register(payload) {
  //   return api.post(`${resource}/register`, payload).then(r => r.data.data);
  // },
  async logout() {
    return await api.post(`${resource}/logout`);
  },
  async profile() {
    const resp = api.get('profile').then(r => r.data.data);

    return resp.data.data;
  }
};
