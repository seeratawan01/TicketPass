import axios from "axios";

export default ({ requiresAuth = false } = {}) => {
  const options = {};

  options.baseURL = "http://127.0.0.1:8000/api/";

  // Decide add token or not
  if (requiresAuth) {
    options.headers.Authorization = "Dynamic Token";
  }
  const instance = axios.create(options);

  return instance;
};
