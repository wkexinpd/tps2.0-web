import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
// import ShowVideo from "../views/student/welcome/ShowVideo";
// import Student from "../views/student/Student";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = new VueRouter({
    routes,
    mode:'hash',
})

export default router
