import Vue from 'vue';

const installCE = require('document-register-element/pony');

// by default, the second argument is 'auto'
// but it could be also 'force'
// which ignores feature detection and force
// the polyfill version of CustomElements
installCE(global, 'force');

// console.log(BoltButton);


import App from './App.vue';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
