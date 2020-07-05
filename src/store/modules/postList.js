import { DataService } from '../../api/api'

const state = {
  pagesLimit: 1,
  posts: []
}
  
const mutations = {
  setPostsList (state, update) {
    state.posts = update
  },
  clapPost (state, update) {
    state.posts = state.posts.map(post => {
      if (post.id === update.id) {
        return  { ...post, ...update }
      }
      return post
    })
  },
  setNumberOfPages (state, update) {
    state.pagesLimit = update
  }
}

const getters = {
  getPostsPaginated (state) {
    return state.posts
  },
  getNumberOfItems (state) {
    return state.pagesLimit
  }
}

const actions = {
  async loadPostsPaginated ({commit}, page) {
    let postsData = await DataService.getPosts(page)
    let header = postsData.headers.get('x-total-count')
    let posts = await postsData.data
    commit('setPostsList', posts)
    commit('setNumberOfPages', header)
  },
  addClapToPost ({commit}, post) {
    DataService.updatePost({
    id: post.id,
    claps: post.claps + 1
    }).then(resp => resp.data.then(data => {
    commit('clapPost', data)
    }))
  },
  removePost ({commit, dispatch}, payload) {
    DataService.removePost(payload.id).then(res => res.data.then(data => {
    dispatch('loadPostsPaginated', payload.page)
    })) 
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}