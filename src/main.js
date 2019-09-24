// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/js/rem'

Vue.config.productionTip = false

// 把封装的axios挂载到原型上
import baseJS from './api'
Vue.prototype.baseJs = baseJS

import { Button } from 'mint-ui';
Vue.component(Button.name, Button);

import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
