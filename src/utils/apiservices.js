// apiService.js
import axios from 'axios';
import Cookies from 'js-cookie';


const url = process.env.REACT_APP_API_BASE_URL_LOCAL
console.log("Url", url);

const apiService = axios.create({
  baseURL: url, 
});




apiService.interceptors.request.use(
  (config) => {
    const token = Cookies.get('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});



// Logout User 
// apiService.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//         Cookies.remove('token'); 
//         message.error('Session has expired. Please log in again.');
//         window.location.href = '/login';
//     }
//     if(error.response && error.response.status===500){
//       message.error("Internal Server Error")
//     }
//     return Promise.reject(error);
//   }
// );


  export default apiService;