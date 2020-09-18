// set the common for all requests stuff
import axios from "axios";

const setupAxios = () => {
  axios.defaults.baseURL = `https://jsonplaceholder.typicode.com`;
  axios.defaults.headers.Authorization = 'MY TOKEN';
  axios.defaults.headers.post['Content-Type'] = 'application/json'; // only for post requests

// add middleware
//   const requestInterceptor = axios.interceptors.request.use((requestConfig) => {
  axios.interceptors.request.use((requestConfig) => {
    return requestConfig;
  }, error => {
    console.log(`This is from request ERROR middleware: `, error);
    return Promise.reject(error);
  });
  /* axios.interceptors.request.eject(requestInterceptor); // to remove the interceptor */

  axios.interceptors.response.use((responseConfig) => {
    return responseConfig;
  }, error => {
    console.log(`This is from response ERROR middleware: `, error);
    return Promise.reject(error);
  });

  /* To create some specialized instance */
  // const someSpecialAxiosInstance = axios.create({baseURL: 'someUrl', headers: {['Content-Type']: 'text'}});
};

export {setupAxios};