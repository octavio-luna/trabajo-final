import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import ToDos from './views/ToDos.vue';
import axios from 'axios';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ToDos,
  },
  //any other route will be redirected to the login page
  {
    path: '*',
    redirect: '/login',
  },
];

//If any axios request returns a 401 status code, the user will be redirected to the login page.
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  },
);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
