import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import postEdit from './modules/postEdit'
import postList from './modules/postList'

Vue.config.devtools = true
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication,
    postEdit,
    postList
  }
})

export default store
