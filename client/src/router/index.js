import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Error from '../views/Error.vue'
import Game from '../components/Game.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
      path: '/error',
      name: 'Error',
      component: Error
  },
  {
      path: '/room/:roomid',
      name: 'Room',
      component: Game
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
