import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import App from './App.vue'
import store from './store'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

const routes = [
  { path: '/', name: 'MainView', component: () => import('./views/MainView.vue') },
  { path: '/login', name: 'LoginView', component: () => import('./views/auth/LoginView.vue') },
  {
    path: '/register',
    name: 'RegisterView',
    component: () => import('./views/auth/RegisterView.vue')
  },
  {
    path: '/post',
    name: 'CreatePostView',
    component: () => import('./views/post/CreatePostView.vue')
  },
  {
    path: '/post/:id',
    name: 'PostDetailView',
    component: () => import('./views/post/PostDetailView.vue')
  }
]

const router = createRouter({ routes, history: createWebHistory() })

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated

  if (!isAuthenticated && !['/login', '/register'].includes(to.path)) {
    next('/login')
  } else {
    next()
  }
})

store.dispatch('checkAuthentication').then(() => {
  createApp(App).use(router).use(store).use(vuetify).mount('#app')
})
