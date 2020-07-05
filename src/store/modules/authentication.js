import { AuthService } from '../../api/api'
import router from '../../router/router'

const state = {
  authError: null,
  user: {
    id: null,
    role: null
  }
}

const mutations = {
  unAuthUser (state) {
    state.user.id = null
    state.user.role = null
  },
  authUser (state, update) {
    state.user.id = update.id
    state.user.role = update.role
  },
  setAuthError (state, update) {
    state.authError = update
  },
  initUser (state) {
    if (localStorage.getItem('userId')) {
      state.user.id = localStorage.getItem('userId')
      state.user.role = localStorage.getItem('userRole')
    }
  }
}

const getters = {
  getUser (state) {
    return {id: state.user.id, role: state.user.role}
  },
  isLoggedIn (state) {
    return state.user.id ? true : false
  }
}

const actions = {
  async login ({commit}, data) {
    let userData = await (await AuthService.getUserData(data.email)).data
    if (userData[0] && `${userData[0].password}` === data.pass) {
      commit('authUser', userData[0])
      localStorage.setItem('userId', userData[0].id)
      localStorage.setItem('userRole', userData[0].role)
      router.push({ path: data.loginFrom ? data.loginFrom : '/'})
    } else {
      commit('setAuthError', 'Логин или пароль неверные')
    }
  },
  logout ({commit}) {
      localStorage.removeItem('userId')
      localStorage.removeItem('userRole')
      commit('unAuthUser')
      router.push({ path: '/auth'})
  },
  clearError ({commit}) {
    commit('setAuthError', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}