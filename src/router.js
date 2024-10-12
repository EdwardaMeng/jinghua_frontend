// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import recommend from "@/components/Recommend.vue";
import Scripts from "@/components/Scripts.vue";
import AboutUs from "@/components/AboutUs.vue";
import FYI from "@/components/FYI.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: recommend,
        redirect: '/recommend',
    },
    {
        path: '/recommend',
        name: 'recommend',
        component: recommend,
    },
    {
        path: '/scripts',
        name: 'scripts',
        component: Scripts,
    },
    {
        path: '/aboutUs',
        name: 'aboutUs',
        component: AboutUs,
    },
    {
        path: '/fyi',
        name: 'fyi',
        component: FYI
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
