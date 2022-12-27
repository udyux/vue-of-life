import './styles/main.scss';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import sprite from '@/assets/icons/sprite/sprite.svg';

fetch(sprite)
  .then(response => response.text())
  .then(sprite => document.body.insertAdjacentHTML('afterbegin', sprite));

createApp(App).use(router).mount('#app');
