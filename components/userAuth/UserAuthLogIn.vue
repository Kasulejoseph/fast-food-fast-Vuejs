<template>
  <!-- logIn -->
  <div slot="login">
    <form @submit.prevent="loginSubmit">
      <div class="m-0">
        <div id="countryCode" class="form-group">
          <select
            v-model="loginForm.country_code"
            :required="true"
            type="text"
            class="form-control"
            placeholder="+254"
          >
            <option
              v-for="codes in countryCodes"
              :key="codes.name"
              class="options"
              :value="codes.code"
            >
              {{ `${codes.code} ${codes.name}` }}
            </option>
          </select>
        </div>
        <div id="phone" class="form-group">
          <input
            v-model="$v.loginForm.phone.$model"
            type="text"
            class="form-control"
            placeholder="0722..."
          >
        </div>
      </div>
      <div v-if="$v.loginForm.phone.$error">
        <span v-if="!$v.loginForm.phone.required" class="text-danger">Phone number is required</span>
        <span
          v-else-if="!$v.loginForm.phone.integer"
          class="text-danger"
        >Phone number must be a digit</span>
        <span
          v-else-if="!$v.loginForm.phone.minLength"
          class="text-danger"
        >Phone number should not be less than 9 characters</span>
        <span
          v-else-if="!$v.loginForm.phone.maxLength"
          class="text-danger"
        >Phone number should not be more than 10 characters</span>
      </div>
      <div id="passwordNumber">
        <input
          v-model="$v.loginForm.password.$model"
          type="text"
          class="form-control"
          placeholder="4 Digit PIN Number"
        >
        <div v-if="$v.loginForm.password.$error">
          <span v-if="!$v.loginForm.password.required " class="text-danger">PIN is required</span>
          <span v-else-if="!$v.loginForm.password.integer" class="text-danger">PIN must be a digit</span>
          <span
            v-else-if="!$v.loginForm.password.minLength"
            class="text-danger"
          >PIN must be up to 4 characters</span>
          <span
            v-else-if="!$v.loginForm.password.maxLength"
            class="text-danger"
          >PIN should not be more than 4 character</span>
        </div>
      </div>
      <div id="login">
        <button class="form-control" type="submit">
          <font-awesome-icon v-if="LoginDetails.loggingIn" icon="spinner" spin />
          <span v-else icon="spinner">Log in</span>
        </button>
      </div>
      <a href="#" class="btnForgetPwd" value="Login" @click="lostPin">Help! I forgot my PIN</a>
    </form>
    <div id="error" class="text-danger">
      <p v-if="LoginDetails.loginError">
        {{ LoginDetails.loginError }}
      </p>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  integer,
  maxLength
} from 'vuelidate/lib/validators'
import kenyaCountiesMixin from '@/layouts/mixins/kenyaCountiesMixin'
import listOfCountriesCodeMixins from '@/layouts/mixins/listOfCountriesCodeMixins'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserAuthLogIn',
  data() {
    return {
      loginForm: {
        country_code: '+254',
        phone: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      LoginDetails: 'LoginDetails'
    })
  },
  watch: {
    loginForm: {
      deep: true,
      handler() {
        this.LoginDetails.loginError = ''
      }
    }
  },
  methods: {
    ...mapActions(['doLogin', 'loadSendConfirmationForm']),
    loginSubmit() {
      if (this.$v.loginForm.$invalid) {
        return this.$v.loginForm.$touch()
      }
      this.doLogin({
        country_code: this.loginForm.country_code,
        phone: this.loginForm.phone,
        password: this.loginForm.password
      })
    },
    lostPin: function () {
      this.loadSendConfirmationForm()
    }
  },
  mixins: [kenyaCountiesMixin, listOfCountriesCodeMixins],
  validations: {
    loginForm: {
      phone: {
        required,
        integer,
        minLength: minLength(9),
        maxLength: maxLength(10)
      },
      password: {
        required,
        integer,
        minLength: minLength(4),
        maxLength: maxLength(4)
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-flow: column;
}
form *:not(:last-child) {
  margin-bottom: 1rem;
}
input {
  padding: 0.5rem;
}
button {
  padding: 0.5rem;
  background-color: #a3c34e;
}
#countryCode {
  float: left;
  width: 20%;
}

#phone {
  float: right;
  width: 76%;
}
.btnForgetPwd {
  text-align: center;
}
#passwordNumber {
  margin-top: -0.4em;
}
#login {
  margin-top: -7px;
}

#login button {
  color: white;
}

#login button:focus {
  background-color: #a3c34e !important;
  border: none !important;
}
#error{
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .form-control {
    padding: 2px;
  }
}
</style>
