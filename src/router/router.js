import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../views/Auth.vue'
import List from '../views/List.vue'
import Post from '../views/Post.vue'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
      meta: {
        reload: true,
      },
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      beforeEnter (to, from, next) {
        if (store.getters['authentication/isLoggedIn']) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/:userId/post/:id?',
      name: 'Post',
      component: Post,
      beforeEnter (to, from, next) {
        if (store.getters['authentication/isLoggedIn'] && store.getters['authentication/getUser'].role == 'writer') {
          if (to.params.id && store.getters['authentication/getUser'].id == to.params.userId) {
            store.dispatch('postEdit/loadPost', to.params.id).then(() => {
              next()    
            })
          } else if (store.getters['authentication/getUser'].id == to.params.userId) {
            store.dispatch('postEdit/reset')
            next()
          } else {
            next({ path: '/'})
          }
        } else {
          next({ path: '/auth?from=' + to.path })
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('authentication/initUser')
  next()
})

export default router