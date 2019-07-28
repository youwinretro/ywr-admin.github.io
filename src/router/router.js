import Vue from 'vue'
import Router from 'vue-router'

import App from '../views/App.vue'
import Dash from '../views/Dash.vue'

import Login from '../views/Login.vue'
import DashHome from '../views/Dash/DashHome.vue'
import WorkTableRoot from '../views/Dash/WorkTableRoot.vue'

import HomeApp from '../views/App/HomeApp.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: { name: 'Login' }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/app',
            name: 'App',
            component: App,
            redirect: { name: 'HomeApp' },
            children: [
                {
                    path: 'home',
                    name: 'HomeApp',
                    component: HomeApp
                },
            ]
        },
        {
            path: '/dash',
            name: 'Dash',
            component: Dash,
            redirect: { name: 'Home' },
            children: [
                {
                    path: 'home',
                    name: 'Home',
                    component: DashHome
                },
                {
                    path: 'add-games',
                    name: 'AddGames',
                    component: WorkTableRoot
                },
                {
                    path: 'edit-games',
                    name: 'EditGames',
                    component: WorkTableRoot
                },
            ]
        }

    ]
})
