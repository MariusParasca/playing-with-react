import axios from 'axios';

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

instance.defaults.headers.common["Authorization"] = "Auth Token FROM instance";

// instance.interceptors.request...

export default instance;