import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

// import axios from 'axios'
// import {useAuthStore} from './stores/auth'
// import router from './router'

// const axiosApiInstance = axios.create()

// const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

// axiosApiInstance.interceptors.request.use((config) => {
//   const url = config.url
//   if (!url.includes('signInWithPassword') && !url.includes('signUp')) {
//     const authStore = useAuthStore()
//     let params = new URLSearchParams()
//     params.append('auth', authStore.userInfo.token)
//     config.params = params
//   }
//   return config
// })

// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const authStore = useAuthStore()
//   const originalRequest = error.config
//   if (error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     try {
//       const newTokens = await axios.post(
//         `https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
//           grant_type: 'refresh_token',
//           refresh_token: JSON.parse(localStorage.getItem('userTokens')).refreshToken
//         }
//       )
//       console.log('newToken', newTokens.data);
//       authStore.userInfo.token = newTokens.data.access_token
//       authStore.userInfo.refreshToken = newTokens.data.refresh_token
//       localStorage.setItem('userTokens', JSON.stringify({
//         token: newTokens.data.access_token,
//         refreshToken: newTokens.data.refresh_token
//       }))
//     } catch (err) {
//       console.log(err);
//       localStorage.removeItem('userTokens')
//       router.push('/signin')
//       authStore.userInfo.token = ''
//       authStore.userInfo.refreshToken = ''
//     }
//   }
//   console.log(error);
// })

// export default axiosApiInstance
