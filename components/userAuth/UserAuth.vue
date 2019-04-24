<template>
  <div>
    <auth-modal v-if="showModal" :form-section="form" @closeModal="closeAuthModal">
      <auth-signup slot="signup" />
      <auth-login slot="login" />
      <auth-pin slot="authpin" />
      <auth-validation slot="validation" />
      <lost-pin slot="lostpin" />
      <account-code slot="accountCode" />
    </auth-modal>
  </div>
</template>

<script>
import AuthModal from '../ui/UserAuthModal.vue'
import UserAuthSignUp from './UserAuthSignUp'
import UserAuthLogIn from './UserAuthLogIn'
import LostPinRecovery from './LostPinRecovery'
import AccountCode from './AccountCode'
import BasePhoneValidation from '@/components/PhoneValidation/BasePhoneValidation'

export default {
  components: {
    'auth-modal': AuthModal,
    'auth-signup': UserAuthSignUp,
    'auth-login': UserAuthLogIn,
    'lost-pin': LostPinRecovery,
    'account-code': AccountCode,
    'auth-validation': BasePhoneValidation
  },
  data() {
    return {
      showModal: false,
      form: 'signup'
    }
  },
  created() {
    this.$nuxt.$on('showModal', (payload) => {
      this.form = payload
      this.showModal = true
    })
  },

  beforeDestroy() {
    this.$nuxt.$off('showModal')
  },
  methods: {
    closeAuthModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>

</style>
