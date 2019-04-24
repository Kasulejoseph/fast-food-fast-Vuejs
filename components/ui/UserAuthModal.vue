<template>
  <div class="mb-4">
    <!-- Modal -->
    <transition name="modal">
      <div class="modal-mask">
        <span
          id="cm"
          slot="close"
          aria-hidden="true"
          class="close-modal"
          @click="closeModal"
        >&times;</span>
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  id="signupButton"
                  type="button"
                  :class="[
                    { 'active': form ==='login',
                      'inActive': (form !=='signup' && form !=='login')}
                  ]"
                  class="col-md-6"
                  @click="switchForm('signup')"
                >
                  Sign up
                </button>
                <button
                  id="loginButton"
                  type="button"
                  :class="[
                    'loginButton',
                    {'active': form ==='signup',
                     'inActive': (form !=='signup' && form !=='login')}
                  ]"
                  class="col-md-6"
                  @click="switchForm('login')"
                >
                  Login
                </button>
              </div>
              <div class="modal-body">
                <!-- <keep-alive>
                  <component v-bind:is="form"></component>
                </keep-alive> -->
                <div v-if="form ==='login'">
                  <slot name="login" />
                </div>
                <div v-if="form ==='signup'" class="signup">
                  <slot name="signup" />
                </div>
                <div v-if="form ==='validation'">
                  <slot name="validation" />
                </div>
                <div v-if="form ==='lostpin'">
                  <slot name="lostpin" />
                </div>
                <div v-if="form ==='accountCode'">
                  <slot name="accountCode" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import UserAuthSignUp from '../userAuth/UserAuthSignUp'
// import UserAuthLogIn from '../userAuth/UserAuthLogIn'

export default {
  data() {
    return {
      form: this.formSection,
      buttonTitle: 'Send Pin'
    }
  },

  computed: {
    ...mapGetters({
      signedUpUser: 'signedUpUser',
      LoginDetails: 'LoginDetails',
      getForgotPin: 'getForgotPin'
    })
  },
  watch: {
    signedUpUser(newData, oldData) {
      if (newData.success) {
        this.form = 'validation'
      }
    },
    getForgotPin(newData, oldData) {
      if (newData.forgotpin) {
        this.form = newData.forgotpin
      } else if (oldData === 'lostpin') {
        this.form = 'accountCode'
      }
    }
  },
  updated() {
    // this.form =this.getForgotPin
  },
  methods: {
    switchForm(form) {
      this.form = form
      this.LoginDetails.loginError = ''
    },
    closeModal() {
      this.$emit('closeModal')
    }
  },
  props: ['formSection']
}
</script>

<style scoped>

.modal2 {
  background-color: rgba(214, 240, 45, 0.8);
}
.modal-content {
  margin-top: 40%;
  border-radius: 7px;
}

.modal-header {
  padding: 0;
  border: none;
}
.modal-header button {
  border-radius: 0;
  background-color: #4a4a4a;
  color: white;
  padding-top: 12px;
  border: none;
}
.modal-header button:focus {
  outline: none;
}
.modal-footer {
  border-top: none;
}
.signup button {
  background-color: #a3c34e;
  color: white;
}
.modal-dialog {
  max-width: 400px;
}
.modal-content {
  border-radius: 7px;
}
.active {
  padding-bottom: 5px;
}
.inActive {
  padding: 8px;
}
.close-modal {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 40px;
  color: black;
  padding-right: 10px;
  cursor: pointer;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(214, 240, 45, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.2s ease;
}
#loginButton {
  border-top-right-radius: 5px;
}
#signupButton {
  border-top-left-radius: 5px;
}
@media only screen and (max-width: 400px) {
  .modal-mask{
    display: block;
    overflow: auto;
  }
  .modal-content{
    margin-top: 3rem
  }
}

</style>
