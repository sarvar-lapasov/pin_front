import axios from "axios";
import store from "@/plugins/vuex/store";

axios.defaults.baseURL =
    import.meta.env.VITE_APP_API_URL + "/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use((config) => {
    if (config.url !== "/auth/login") {
        config.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
    }
    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401 && error.response.data.message == 'Unauthenticated.') {
            store.dispatch('refreshToken')
                .then(() => {
                    window.location.reload();
                })
        }

        return Promise.reject(error);
    })

export default axios;