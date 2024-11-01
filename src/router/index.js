import { createRouter, createWebHistory } from 'vue-router'
import RegistroAlumnosView from '../views/RegistroAlumnosView.vue'
import RegistroDocentesView from '@/views/RegistroDocentesView.vue'
import HomeView from '@/views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/alumnos',
    name: 'alumnos',
    component: RegistroAlumnosView
  },
  {
    path: '/docentes',
    name: 'docentes',
    component: RegistroDocentesView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
