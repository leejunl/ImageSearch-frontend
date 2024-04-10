import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: "/",
        name: "Home",
        redirect: '/info',
    },
    {
        path: "/info",
        name: "info",
        component: () => import("../views/index.vue"),
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
