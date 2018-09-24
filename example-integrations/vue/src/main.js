import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.config.ignoredElements = [
  'bolt-button',
  'bolt-text',
  'bolt-inline-list',
  'bolt-ratio',
];

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
