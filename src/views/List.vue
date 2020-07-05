<template>
  <section>
    <div 
      v-if="getUser.role === 'writer'"
      class="column is-4 is-offset-4"
    >
      <div class="buttons is-centered">
        <router-link 
          class="button is-success" 
          :to="{ name: 'Post', params: { userId: getUser.id }}"
        >
          Создать пост
        </router-link>
      </div>
    </div>
    <div
      v-for="post in posts" 
      v-bind:key="post.id"
      class="column is-4 is-offset-4 has-background-light mgt-small"
      style="margin-top: 20px"
    >
      <h3 class="title is-3"> {{ post.title }} </h3>
      <p> {{ post.description }} </p>
      <div 
        class="columns"
        style="margin-top: 15px"
      >
        <div class="column is-one-quarter">
          <p 
            class="has-text-grey"
            style="line-height: 35px"
          > 
            {{ getCreatedAgo(post.createdAt) }} дней назад
          </p>
        </div>
        <div class="column">
          <div class="buttons is-left">
            <b-button 
              type="is-success"
              :disabled="!isLoggedIn"
              @click="addClapToPost(post)"
            >
              <span class="is-size-4">{{ post.claps }}</span> 
              <b-icon icon="thumbs-up"></b-icon>
            </b-button>
          </div>
        </div>
        <div class="column">
          <div 
            v-if="isLoggedIn && getUser.role === 'writer' && getUser.id == post.userId"
            class="buttons is-right"
          >
            <b-button
              type="is-danger"
              @click="removePost({ id: post.id, page: currentPage })"
            >
              Удалить
            </b-button>
            <router-link 
              class="button is-link" 
              :to="{ name: 'Post', params: { userId: post.userId, id: post.id}}"
            >
              Изменить
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <b-pagination
      :total="pagesLimit"
      :current.sync="currentPage"
      :order="'is-centered'"
      :size="'is-medium'"
      :simple="true"
      :per-page="perPage"
      :icon-prev="'chevron-left'"
      :icon-next="'chevron-right'"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">
    </b-pagination>
    <hr>  
  </section>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'List',
  data () {
    return {
      perPage: 10,
      currentPage: 1
    }
  },
  computed: {
    ...mapState('postList',['posts', 'pagesLimit']),
    ...mapGetters('authentication', ['isLoggedIn', 'getUser'])
  },
  methods: {
    ...mapActions('postList', ['loadPostsPaginated', 'addClapToPost', 'removePost']),
    getCreatedAgo (date) {
      return (+(new Date()).setHours(0,0,0,0) - +(new Date(date)).setHours(0,0,0,0))/86400000
    }
  },
  created () {
    this.loadPostsPaginated(this.currentPage)
  },
  watch: {
    currentPage (val) {
      this.loadPostsPaginated(val)
    }
  }
}
</script>