import Vue from 'vue'
import Router from 'vue-router'
import UpdatePassword from './views/external/UpdatePassword.vue'
import Detail from './views/internal/Detail.vue'
import ForgetPassword from './views/external/ForgetPassword.vue'

import AddCompany from './views/internal/AddCompany.vue'
import Home from './views/internal/Home.vue'
import Login from './views/external/Login.vue'
import Profile from './views/internal/Profile.vue'
import Register from './views/external/Register.vue'
import Upgrade from './views/internal/Upgrade.vue'
import WaitingConfirmation from './views/external/WaitingConfirmation.vue'

import Dashboard from './views/internal/admin/Dashboard'
import LogsDashboard from './views/internal/admin/LogsDashboard'
import UsersDashboard from './views/internal/admin/UsersDashboard'
import routerGuards from './router-guards'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: {name: 'Home'}
        },
        {
            path: '/_=_',
            redirect: {name: 'Home'}
        },
        {
            path: '/update-password',
            name: 'UpdatePassword',
            component: UpdatePassword
        },
        {
            path: '/detail/:cnpj',
            name: 'Detail',
            component: Detail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/forget-password',
            name: 'ForgetPassword',
            component: ForgetPassword
        },
        {
            path: '/add-company',
            name: 'AddCompany',
            component: AddCompany,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/upgrade',
            name: 'Upgrade',
            component: Upgrade,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/waiting-confirmation/:action',
            name: 'WaitingConfirmation',
            component: WaitingConfirmation
        },
        {
            path: '/admin/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/admin/dashboard/logs',
            name: 'LogsDashboard',
            component: LogsDashboard
        },
        {
            path: '/admin/dashboard/users',
            name: 'UsersDashboard',
            component: UsersDashboard
        }
    ]
})

router.beforeEach(routerGuards)

export default router
