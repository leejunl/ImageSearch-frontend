import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: "/",
        name: "Home",
        redirect: '/login',
    },
    {
        path: "/info",
        name: "info",
        component: () => import("../views/index.vue"),
    }
    ,
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
