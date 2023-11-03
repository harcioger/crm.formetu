import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const baseDomain =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://crm.formetu.ru';
const baseURL = `${baseDomain}/api`;

const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('access_token') || null,
    'Content-Type': 'application/json'
  }
});

export { api };
