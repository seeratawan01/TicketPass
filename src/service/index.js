import axios from "axios";
import {useAuthStore} from "../stores";
const baseUrl = `${import.meta.env.VITE_API_URL}/api/`;

export default ({requiresAuth = false} = {}) => {
    let options = {
        headers: {}
    };
    const authStore = useAuthStore();

    options.baseURL = baseUrl;

    // Decide add token or not
    if (requiresAuth) {
        options.headers.Authorization = `Bearer ${authStore.access_token}`;
    }

    const instance = axios.create(options);

    return instance;
};
