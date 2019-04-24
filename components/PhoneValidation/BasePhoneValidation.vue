<template>
  <div slot="validation">
    <div class="font-weight-bold text-center">
      Account Code
    </div>
    <div class="text-center">
      A code has been sent to your phone.
      <br>please enter the number below
    </div>
    <div>
      <form class="form-row mt-3 row ">
        <div class="col-12">
          <input
            v-model="query"
            class="form-control text-center"
            name="password"
            type="text"
            value
            placeholder="XXXX"
            required
          >
        </div> <br>
        <div v-if="erro" class="error-failure text-danger d-flex col-12 text-center">
          {{ this.display_error }}
        </div>
        <div v-else-if="token" class="text-success d-flex col-12">
          {{ this.display_success }}
        </div>
        <div v-else-if="!userId" class="error-failure text-danger">
          {{ display_err }}
        </div>
        <p />
        <button
          type="button"
          class="btn col-md-12 mt-3"
          data-dismiss="modal"
          @click="executeSearch"
        >
          <font-awesome-icon v-if="verification && iconSpin" icon="spinner" spin />
          <span v-else icon="spinner">{{ buttonTitle }}</span>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'BasePhoneValidation',
  methods: {
    executeSearch: function () {
      if (this.$store.state.signup.userAuthSignUp.userId !== null) {
        this.$store.dispatch('verifyToken', this.userPin)
      } else if (this.$store.state.signup.userAuthSignUp.userId === null) {
        this.display_err = 'Your currently not registered, please sign up.'
      }
    }
  },
  computed: {
    ...mapState({
      erro: state => state.phoneValidation.erro,
      verification: state => state.phoneValidation.verification,
      token: state => state.phoneValidation.token
    }),
    iconSpin() {
      return this.$store.state.phoneValidation.spinner
    },
    userId() {
      return this.$store.state.signup.userAuthSignUp.userId
    },
    userPin: {
      get() { return this.query },
      set(value) {
        this.query = value
      }
    },
    display_error: function () {
      const errorObject = this.erro
      let message
      if (!errorObject.success) {
        try {
          return errorObject.error.verification_code[0]
        } catch (error) {
          message = 'Invalid or Expired PIN'
          return message
        }
      } else {
        return null
      }
    },
    sendMessage: {
      get: function () {
        if (!this.$store.state.phoneValidation.erro) {
          this.$store.dispatch('sendMessage')
          return true
        }
        return false
      },
      set: function (value) {
        return value
      }
    } },
  data: function () {
    return {
      display_success: 'Success, Valid PIN.',
      buttonTitle: 'Continue',
      query: this.query,
      display_err: ''
    }
  }
}
</script>
<style scoped>
.moda {
  border-top: none;
}
.btn {
  background-color: #a3c34e;
  color: white;
}
.error-failure{
  font-size: .9em;
}
</style>
