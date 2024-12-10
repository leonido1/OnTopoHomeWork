import { createRouter, createWebHistory } from 'vue-router';
import  {useAuthStore}  from '../store/auth';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SearchView from '../views/SearchView.vue';

// Define routes
const routes = [
  { path: '/', component: HomeView,  meta: { requiresAuth: true }},
  {path:'/Search',component:SearchView, meta: { requiresAuth: true }},
  { path: '/login', component: LoginView }
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to,from,next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.jwtToken) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next();
  }
});

export default router;
