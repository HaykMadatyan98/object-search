import './assets/tailwind.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/pages/HomePage.vue';
import ProfilePage from './components/pages/ProfilePage.vue';
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/profile/:id', component: ProfilePage, props: true },
  ],
});

createApp(App).use(router).mount('#app')
