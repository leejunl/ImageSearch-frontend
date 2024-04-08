import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: "/",
        name: "Home",
        redirect: '/search',
    },
    {
        path: "/info",
        name: "info",
        component: () => import("../views/index.vue"),
    },
    {
        path: "/search",
        name: "search",
        component: () => import("../views/search.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
