import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight, faThumbsUp, faExclamationCircle, faCheck } from "@fortawesome/free-solid-svg-icons"
import 'buefy/dist/buefy.css'
import router from './router/router'
import store from './store/store'

library.add(faAngleLeft, faAngleRight, faThumbsUp, faExclamationCircle, faCheck)

Vue.component('vue-fontawesome', FontAwesomeIcon);
Vue.use(Buefy, { 
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fa'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
