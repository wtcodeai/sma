<template>
  <div
    class="column is-4 is-offset-4 has-background-light mgt-small"
    style="margin-top: 20px"
  >
    <h2 class="title is-2">{{ pageTitle }}</h2>
    <p 
      class="subtitle is-4"
      style="margin-bottom: 5px"
    >
      Название поста
    </p>
    <input 
      v-model="postTitle"
      class="input" 
      type="text" 
    >
    <p 
      class="subtitle is-4"
      style="margin-bottom: 5px"
    >
      Текст поста
    </p>
    <textarea 
      v-model="postText"
      class="textarea" 
      rows="10"
    />
    <div 
      class="columns"
      style="margin-top: 15px"
    >
      <div class="column">
        <div class="buttons is-left">
          <b-button 
            type="is-danger"
            @click="$router.go(-1)"
          >
            Назад
          </b-button>
        </div>
      </div>
      <div class="column">
        <div class="buttons is-right">
          <b-button 
            type="is-link" 
            :disabled="postTitle.length === 0 || postText.length === 0"
            @click="savePost({ post: post, userId: getUser.id })"
          >
            Сохранить
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Post',
  computed: {
    ...mapState('postEdit', ['post']),
    ...mapGetters('authentication', ['getUser']),
    pageTitle () {
      return this.$route.params.id ? 'Обновить пост' : 'Создать пост' 
    },
    buttonTitle () {
      return this.$route.params.id ? 'Сохранить' : 'Создать'
    },
    postTitle: {
      get () {
        return this.post.title
      },
      set (val) {
        this.updateTitle(val)
      }
    }, 
    postText: {
      get () {
        return this.post.description
      },
      set (val) {
        this.updateText(val)
      }
    }
  },
  methods: {
    ...mapActions('postEdit', ['loadPost', 'savePost']),
    ...mapMutations('postEdit', ['updateTitle', 'updateText'])
  }
}
</script>