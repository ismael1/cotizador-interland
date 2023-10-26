import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import simplebar from "simplebar-vue";
import VueTour from 'vue-tour'
import vco from "v-click-outside"
import * as VueGoogleMaps from "vue2-google-maps";
import i18n from './i18n'

import router from './router'
import store from '@/state/store'

import VueApexCharts from 'vue-apexcharts'
import VueStringFilter from 'vue-string-filter'
import Lightbox from 'vue-easy-lightbox'

import axios from 'axios' //instalado


import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'


Vue.use(Vuex);
Vue.use(VueAxios, axios);

//instalar 00621
//comentado
// import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '@trevoreyre/autocomplete-vue/dist/style.css' 
// Vue.use(Autocomplete)

// #autocomplit 250621
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
Vue.use(Autocomplete)

// ##agregado 260621
// import 'vue-instant/dist/vue-instant.css'
// import VueInstant from 'vue-instant/dist/vue-instant.common'
// Vue.use(VueInstant)

// import 'vue-instant/dist/vue-instant.css'
// import VueInstant from 'vue-instant'
// Vue.use(VueInstant)
// import HeyUI from "heyui"
// require("heyui/themes/index.less")
// Vue.use(HeyU)
// import HeyUI from 'heyui';
// Vue.use(HeyUI);


//axios.defaults.baseURL = 'http://127.0.0.1:8000/' //generado

axios.defaults.baseURL = 'http://sicolog.ifreight.business/' //generado

Vue.config.productionTip = false

Vue.use(vco)

// As a plugin
import VueMask from 'v-mask'
import VueQuillEditor from 'vue-quill-editor'
import VueDraggable from "vue-draggable";
Vue.use(VueDraggable);
Vue.use(VueQuillEditor)
Vue.use(VueMask);

import VueSlideBar from 'vue-slide-bar'
 
Vue.component('VueSlideBar', VueSlideBar)


//verificar esta parte
import { initFirebaseBackend } from './authUtils';

import { configureFakeBackend } from './helpers/fake-backend';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
  configureFakeBackend();
}


Vue.component('apexchart', VueApexCharts)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(require('vue-chartist'))
Vue.component('simplebar', simplebar)
Vue.use(VueStringFilter)
Vue.use(VueTour)
Vue.use(Lightbox)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
    libraries: "places"
  },
  installComponents: true
});

import "@/assets/scss/app.scss";


const stor = new Vuex.Store({
  state: {
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: axios.defaults.baseURL+'api/v1/login/',
      refreshJWT: axios.defaults.baseURL
    }
  },
  mutations: {
    updateToken(state, newToken){
      localStorage.setItem('t', newToken);
      state.jwt = newToken;
    },
    removeToken(state){
      localStorage.removeItem('t');
      state.jwt = null;
    }
  },
  actions: {
    // WE WILL ADD THIS LATER
  }
  })

// /ingresado axios
new Vue({
  router,
  store,
  stor,
  i18n,
  axios,
  render: h => h(App)
}).$mount('#app')
