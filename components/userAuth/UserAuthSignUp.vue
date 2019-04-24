<template>
  <!-- signup -->
  <div slot="signup">
    <div class="form-row">
      <div class="col">
        <input v-model="$v.signupForm.first_name.$model" type="text" class="form-control" placeholder="First Name">
      </div>
      <div class="col">
        <input v-model="$v.signupForm.last_name.$model" type="text" class="form-control" placeholder="Last Name">
      </div>
    </div>
    <!-- first_name validator-messages -->
    <div v-if="$v.signupForm.first_name.$error" class="error-message">
      <p v-if="!$v.signupForm.first_name.required" class="mt-1">
        First Name is required
      </p>
      <p v-else-if="!$v.signupForm.first_name.alpha" class="mt-1">
        First Name must be all Alphabets
      </p>
      <p v-else-if="!$v.signupForm.first_name.maxLength" class="mt-1">
        maximum length of 15 characters for First Name
      </p>
    </div>

    <!-- last_name validator-messages -->
    <div v-else-if="$v.signupForm.last_name.$error" class="error-message">
      <p v-if="!$v.signupForm.last_name.required" class="mt-1">
        Last Name is required
      </p>
      <p v-else-if="!$v.signupForm.last_name.alpha" class="mt-1">
        Last Name must be all Alphabets
      </p>
      <p v-else-if="!$v.signupForm.last_name.maxLength" class="mt-1">
        maximum length of 15 characters for Last Name
      </p>
    </div>

    <!--Phone Number fields -->
    <div id="phone-number" class="form-row mt-2">
      <div class="col-sm-3 col">
        <!-- <input disabled type="text" class="form-control" v-model="signupForm.country_code" placeholder="+254"> -->
        <select v-model="signupForm.country_code" type="text" class="form-control" placeholder="+254">
          <option v-for="codes in countryCodes" :key="codes.name">
            {{ codes.code }} {{ codes.name }}
          </option>
        </select>
      </div>
      <div class="col-sm-9 col">
        <input v-model="$v.signupForm.phone.$model" type="text" class="form-control" placeholder="0722...">
      </div>
    </div>

    <!-- phone number validator-messages -->
    <div v-if="$v.signupForm.phone.$error" class="error-message">
      <p v-if="!$v.signupForm.phone.required" class="mt-1">
        Phone number is required
      </p>
      <p v-else-if="!$v.signupForm.phone.integer" class="mt-1">
        Phone number must be an integer
      </p>
      <p v-else-if="!$v.signupForm.phone.minLength" class="mt-1">
        Phone number should not be less than 9 characters
      </p>
      <p v-else-if="!$v.signupForm.phone.maxLength" class="mt-1">
        Phone number should not be more than 10 characters
      </p>
    </div>

    <!-- Pin fields -->
    <div class="form-row">
      <div class="col-md col-sm-12 mt-2">
        <input v-model="$v.signupForm.password.$model" :type="passwordFieldType" class="form-control" placeholder="Enter 4 digit PIN">
      </div>
      <div class="col-md col-sm-12 mt-2">
        <input v-model="$v.signupForm.confirm_password.$model" :type="passwordFieldType" class="form-control" placeholder="Confirm 4 digit PIN">
      </div>
    </div>

    <input type="checkbox" class="mt-3" @click="switchPasswordVisibility"> Show Pin
    <!-- Pin validator-messages -->
    <div v-if="$v.signupForm.password.$error" class="error-message">
      <p v-if="!$v.signupForm.password.required " class="mt-1">
        PIN is required
      </p>
      <p v-else-if="!$v.signupForm.password.integer" class="mt-1">
        PIN must be an integer
      </p>
      <p v-else-if="!$v.signupForm.password.minLength" class="mt-1">
        PIN must be up to 4 characters
      </p>
      <p v-else-if="!$v.signupForm.password.maxLength" class="mt-1">
        PIN should not be more than 4 characters
      </p>
    </div>
    <!-- Confirm Pin validtor messages -->
    <p v-else-if="$v.signupForm.confirm_password.$error && !$v.signupForm.confirm_password.sameAs" class="mt-1 error-message">
      Confirm-PIN must be Same as PIN
    </p>

    <!-- Dairy options -->
    <div class="form-group mt-2">
      <select
        id="exampleFormControlSelect1"
        v-model="signupForm.account_type"
        class="form-control"
      >
        <option>I am a dairy farmer</option>
        <option>Potential farmer</option>
        <option>Input and services provider</option>
        <option>Just curious</option>
      </select>
    </div>

    <!-- County options -->
    <div class="mt-2">
      <select
        id="exampleFormControlSelect1"
        v-model="signupForm.county"
        class="form-control"
        :disabled="signupForm.country_code != '+254 Kenya'"
      >
        <option v-for="county in counties" :key="county">
          {{ county }}
        </option>
      </select>
    </div>
    <br>
    <button
      type="button"
      class="btn col-md-12"
      :disabled="signedUpUser.loading"
      @click="submitSignUpForm"
    >
      <font-awesome-icon v-if="signedUpUser && signedUpUser.loading" icon="spinner" spin />
      <div v-if="signedUpUser && !signedUpUser.loading">
        {{ buttonTitle }}
      </div>
    </button>
    <div class="mt-2 have-registration-pin text-center">
      <a @click="haveRegistrationPin">I have a registration PIN</a>
    </div>
    <p class="mt-1 error-message">
      {{ signedUpUser.errorMessage }}
    </p>
  </div>
</template>

<script>
import {
  required,
  minLength,
  integer,
  maxLength,
  sameAs,
  alpha
} from 'vuelidate/lib/validators'
import { mapState, mapGetters } from 'vuex'
import kenyaCountiesMixin from '@/layouts/mixins/kenyaCountiesMixin'
import listOfCountriesCodeMixins from '@/layouts/mixins/listOfCountriesCodeMixins'

export default {
  components: {},
  data() {
    return {
      signupForm: {
        first_name: '',
        last_name: '',
        phone: '',
        county: 'Others',
        password: '',
        confirm_password: '',
        country_code: '+254 Kenya',
        account_type: 'I am a dairy farmer'
      },
      buttonTitle: 'Send PIN',
      passwordFieldType: 'password'
    }
  },

  computed: {
    ...mapState({
      userAuthSignUp: 'userAuthSignUp'
    }),

    ...mapGetters({
      signedUpUser: 'signedUpUser'
    })
  },

  watch: {
    signupForm: {
      deep: true,
      handler() {
        this.signedUpUser.errorMessage = ''
      }
    }

  },

  methods: {
    submitSignUpForm() {
      if (this.$v.signupForm.$invalid) {
        return this.$v.signupForm.$touch()
      }
      this.signedUpUser.errorMessage = ''
      let payload = { ...this.signupForm }
      const countryCode = payload.country_code.replace(/\D/g, '')
      payload = { ...this.signupForm, country_code: `+${countryCode}` }
      this.$store.dispatch('signUpUser', payload)
      const store = this.$store
      store
        .dispatch('signUpUser', payload)
        .then(() => {
          store.dispatch('getRandomToken', payload)
        }).catch(error => error)
    },
    switchPasswordVisibility() {
      const switchfeilds = this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      return switchfeilds
    },
    haveRegistrationPin() {
      this.$store.dispatch('openValidationPage')
    }
  },

  mixins: [kenyaCountiesMixin, listOfCountriesCodeMixins],

  validations: {
    signupForm: {
      first_name: {
        required,
        alpha,
        maxLength: maxLength(15)
      },
      last_name: {
        required,
        alpha,
        maxLength: maxLength(15)
      },
      phone: {
        required,
        integer,
        minLength: minLength(9),
        maxLength: maxLength(10)
      },
      county: {
        required
      },
      password: {
        required,
        integer,
        minLength: minLength(4),
        maxLength: maxLength(4)
      },
      confirm_password: {
        sameAs: sameAs('password')
      },
      account_type: {}
    }
  }
}
</script>

<style scoped>
.btn{
  background-color:#A3C34E;
  color: white;
}
.error-message{
  color: red;
}
.have-registration-pin {
  color: rgb(79, 104, 11);
  text-decoration: underline;
  cursor: pointer
}
</style>
