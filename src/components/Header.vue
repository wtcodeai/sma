<template>
  <b-navbar class="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://pbs.twimg.com/profile_images/900395592312029185/rb4SW1qp_400x400.jpg"
          alt="Medium test"
        >
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link 
            v-if="!isLoggedIn && $route.name !== 'Auth'" 
            class="button is-light" 
            to="/auth"
          >
            Войти
          </router-link>
          <a 
            v-if="isLoggedIn"
            class="button is-primary"
            @click="logout()"
          >
            <strong>Выйти</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  components: {
  },
  data () {
    return {
      isLogged: false,
      userId: null,
      userRole: null
    }
  },
  computed: {
    ...mapGetters('authentication', ['isLoggedIn', 'getUser'])
  },
  methods: {
    ...mapActions('authentication', ['logout']),
  }
}
</script>