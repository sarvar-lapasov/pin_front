import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        component: () =>
            import ("@/pages/HomePage.vue"),
        name: "Home",
    },
    {
        path: "/login",
        component: () =>
            import ("@/pages/LoginPage.vue"),
        name: "login",
    },
    {
        path: "/register",
        component: () =>
            import ("@/pages/RegisterPage.vue"),
        name: "register",
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});