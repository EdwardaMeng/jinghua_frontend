// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import recommend from "@/components/Recommend.vue";
import Scripts from "@/components/Scripts.vue";
import AboutUs from "@/components/AboutUs.vue";
import FYI from "@/components/FYI.vue";
import Upload from "@/components/Upload.vue";
import Manage from "@/components/Manage.vue";
import DmPage from "@/components/DmPage.vue";
import Reservation from "@/components/Reservation.vue";

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
    },
    {
        path: '/upload',
        name: 'upload',
        component: Upload,
    },
    {
        path: '/manage',
        name: 'manage',
        component: Manage,
    },
    {
        path: '/DmPage',
        name: 'DmPage',
        component: DmPage,
    },
    {
        path: '/Reservation',
        name: 'Reservation',
        component: Reservation
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
