import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/Pages/HomePage.vue'
import Scanner from '@/Pages/ScannerPage.vue'
import Login from '@/Pages/LoginPage.vue'
import Register from '@/Pages/RegisterPage.vue'
import QRCode from '@/Pages/QRCode.vue'

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
    path: '/scanner',
    name: 'Scanner',
    component: Scanner
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/qr-code',
    name: 'QRCode',
    component: QRCode
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})




router.beforeEach((to, from, next) => {

  const authPages = [
      "/scanner",
  ];

  const authRequired = authPages.includes(to.path);
  const loggedIn = localStorage.getItem("isLoggedIn");

  if (authRequired && loggedIn == "true") {
   
    return next();
  }

  if(loggedIn == 'true' && to.path == '/login'){
      return next('/scanner');
  }

  if(authRequired && !loggedIn || loggedIn == 'false' ){
    return next('/login')
  }  

  return next();

});

export default router