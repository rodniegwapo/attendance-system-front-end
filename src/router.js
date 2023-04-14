import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Pages/HomePage.vue'
import About from '@/Pages/AboutPage.vue'
import Login from '@/Pages/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router