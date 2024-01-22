import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import App2View from '../views/App2View.vue'
import Details from '../views/Details.vue'
import Create from '../views/Create.vue'
import TagView from '../views/TagView.vue'
import RealtimeView from '../views/RealtimeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/app2',
    name: 'app2',
    component: App2View
  },
  {
    path: '/post/:id',
    name: 'Details',
    component: Details,
    props: true,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    props: true,
  },
  {
    path: '/tag/:tag',
    name: 'Tag',
    component: TagView,
    props: true,
  },
  {
    path: '/realtime',
    name: 'Realtime',
    component: RealtimeView,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
