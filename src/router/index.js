import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dates from "@/views/Dates";
import Moderation from "@/views/Moderation";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dates',
    name: 'Dates',
    component: Dates
  },
  {
    path: '/moderation',
    name: 'Moderation',
    component: Moderation
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
