import axios from "axios";
import {useAuthStore} from "../stores";

export default ({requiresAuth = false} = {}) => {
    let options = {
        headers: {}
    };
    const authStore = useAuthStore();

    options.baseURL = "http://127.0.0.1:8000/api/";

    // Decide add token or not
    if (requiresAuth) {
        options.headers.Authorization = `Bearer ${authStore.access_token}`;
    }

    const instance = axios.create(options);

    return instance;
};
