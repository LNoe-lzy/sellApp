// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Seller from './components/seller/seller';
import Localcart from './components/localcart/localcart';

import './common/stylus/icon.styl';
import store from './store';

Vue.use(VueRouter);
Vue.use(VueResource);

// let app = Vue.extend(App);

const routes = [
  {path: '/seller/:sellerid', name: 'seller', component: Seller},
  {path: '/cart', component: Localcart}
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
});

