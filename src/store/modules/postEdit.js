import { DataService } from '../../api/api'
import router from '../../router/router'

const initialState = () => {
  return {
    post: {
      id: null,
      title: '',
      description: '',
      claps: 0,
      createdAt: null,
      updatedAt: null,
      userId: null
    }
  }
}

const state = initialState()
  
const mutations = {
  setPost (state, update) {
    state.post = update
  },
  updateTitle (state, update) {
    state.post.title = update
  },
  updateText (state, update) {
    state.post.description = update
  },
  resetState (state) {
    state.post = initialState().post
  }
}

const actions = {
  async loadPost ({commit}, id) {
    let postData = await DataService.getPost(id)
    let post = await postData.data
    commit('setPost', post)
  },
  savePost ({commit}, data) {
    if(data.post.id) {
      DataService.updatePost({ ...(data.post), ...{ updatedAt: (new Date()).toISOString }}).then(() => {
        router.push({ path: '/' })
      })
    } else {
      DataService.createPost({
        title: data.post.title,
        description: data.post.description,
        claps: 0,
        createdAt: (new Date()).toISOString,
        userId: data.userId
      }).then(() => {
        router.push({ path: '/' })
      })
    }
  },
  reset ({commit}) {
    commit('resetState')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}