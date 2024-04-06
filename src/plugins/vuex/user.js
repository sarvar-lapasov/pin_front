import postRequest from "@/plugins/requests/postRequest";
import getRequestForUser from "../requests/getRequestForUser";
import postRequestForUser from "../requests/postRequestForUser";

export default {
    actions: {
        fetchUserToken(context, data) {
            return postRequest("/auth/login", data, 'updateTokens', context)
        },
        refreshToken(context) {
            return postRequestForUser("/auth/refresh", 'updateTokens', context)
        },
        aboutMe(context) {
            return getRequestForUser('/auth/user', 'updateUser', context)
        },
        register(context, data) {
            return postRequest('/auth/register', data)
        },
        clearTokens(ctx) {
            ctx.commit('clearTokens')
        },
    },
    mutations: {
        updateTokens(state, tokens) {
            localStorage.setItem("accessToken", tokens.data.access_token);
            state.accessToken = tokens.access_token;
            // state.user = tokens.user;
            // localStorage.setItem("user", JSON.stringify(tokens.data.user));
        },

        updateUser(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        clearTokens(state) {
            localStorage.removeItem('accessToken')
            state.accessToken = localStorage.getItem('accessToken')
        },
    },
    state: {
        accessToken: localStorage.getItem("accessToken"),

        user: localStorage.getItem("user") ?
            JSON.parse(localStorage.getItem("user")) : "",

    },
    getters: {
        isAuthenticated: (state, getters) => {
            return getters.getAccessToken.length > 0
        },
        getAccessToken(state) {
            return state.accessToken;
        },
        getUser(state) {
            return state.user;
        },
        getUserRoles(state, getters) {
            return getters.getUser.roles;
        },



    },
};