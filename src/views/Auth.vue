<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <section>
      <div class="column is-2 is-offset-5">
        <InputWithValidation 
          rules="required|email" 
          type="email" 
          label="Email" 
          v-model="email"
        />
        <InputWithValidation
          rules="required"
          type="password"
          label="Пароль"
          vid="password"
          v-model="pass"
          @input="clearError()"
        />
        <p 
          v-if="authError"
          class="has-text-danger"
        > 
          {{ authError }} 
        </p>
        <b-button 
          type="is-primary"
          @click="passes(tryLogIn)"
        >
          Войти
        </b-button>
      </div>
    </section>
  </ValidationObserver>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import validationMixin from '../mixins/validationMixin'
import { extend } from 'vee-validate'
import { ValidationObserver } from "vee-validate";
import { required, email } from 'vee-validate/dist/rules'
import InputWithValidation from '../components/InputWithValidation'

extend("required", {
  ...required,
  message: "Поле обязательно"
});

extend("email", {
  ...email,
  message: "Невалидный e-mail"
});

export default {
  name: 'Auth',
  components: {
    InputWithValidation,
    ValidationObserver
  },
  mixins: [validationMixin],
  data () {
    return {
      formErrors: [],
      email: null,
      pass: null
    }
  },
  created () {
    this.$on('formUpdate', () => {
      this.clearError()
    })
  },
  computed: {
    ...mapState('authentication', ['authError'])
  },
  methods: {
    ...mapActions('authentication', ['login', 'clearError']),
    tryLogIn () {
      this.login({email: this.email, pass: this.pass, loginFrom: this.$route.query.from})
    }
  }
}
</script>