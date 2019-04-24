<template>
  <!-- logIn -->
  <div>
    <h5 id="confirmation-code" class="text-center mb-4">
      Send confirmation Code
    </h5>
    <form>
      <div id="phone-number" class="form-row mt-2">
        <div class="col-sm-3 col">
          <!-- <input disabled type="text" class="form-control" v-model="signupForm.country_code" placeholder="+254"> -->
          <select
            v-model="recoveryForm.country_code"
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
        <div class="col-sm-9 col">
          <input
            v-model="$v.recoveryForm.phone.$model"
            type="text"
            class="form-control"
            placeholder="0722..."
          >
        </div>
      </div>

      <!-- phone number validator-messages -->
      <div v-if="$v.recoveryForm.phone.$error" class="error-message">
        <span v-if="!$v.recoveryForm.phone.required">Phone number is required</span>
        <span v-else-if="!$v.recoveryForm.phone.integer">Phone number must be digit</span>
        <span v-else-if="!$v.recoveryForm.phone.minLength">Phone number should not be less than 9 characters</span>
        <span
          v-else-if="!$v.recoveryForm.phone.maxLength"
          class="mt-1"
        >Phone number should not be more than 10 characters</span>
      </div>
      <button class="form-control" @click.prevent="sendPhoneDetails">
        <font-awesome-icon v-if="getForgotPin.loading" icon="spinner" spin />{{ recoveryForm.buttonTitle }}
      </button>
    </form>
    <div v-if="getForgotPin.error">
      <p id="error-msg">
        {{ getForgotPin.error }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  required,
  minLength,
  integer,
  maxLength
} from 'vuelidate/lib/validators'
import listOfCountriesCodeMixins from '@/layouts/mixins/listOfCountriesCodeMixins'

export default {
  props: {
    form: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      getForgotPin: 'getForgotPin'
    })
  },
  data() {
    return {
      recoveryForm: {
        country_code: '+254',
        phone: '',
        buttonTitle: 'Send Code'
      }
    }
  },
  validations: {
    recoveryForm: {
      phone: {
        required,
        integer,
        minLength: minLength(9),
        maxLength: maxLength(10)
      }
    }
  },
  methods: {
    ...mapActions(['sendVerification']),
    sendPhoneDetails: function () {
      if (this.$v.recoveryForm.$invalid) {
        return this.$v.recoveryForm.$touch()
      }
      this.sendVerification({
        country_code: this.recoveryForm.country_code,
        phone: this.recoveryForm.phone
      })
    }
  },
  watch: {
    getForgotPin(newData, oldData) {
      if (newData.loading) {
        this.recoveryForm.buttonTitle = ''
      } else if (!newData.loading && !newData.success) {
        this.recoveryForm.buttonTitle = 'Send Code'
      }
    }
  },
  mixins: [listOfCountriesCodeMixins]
}
</script>

<style scoped>
.container-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}
img {
  width: 2rem;
  height: 2rem;
}
form {
  display: flex;
  flex-flow: column;
}
form *:not(:last-child) {
  margin-bottom: 0.5rem;
}
input {
  padding: 0.5rem;
}
button {
  padding: 0.5rem;
  background-color: #a3c34d;
  border-radius: 2;
  border: none;
  color: #fff;
  cursor: pointer;
}
button:focus {
  background-color: #a3c34e;
  border: none;
}

#col1 {
  float: left;
  width: 20%;
}

#col2 {
  float: right;
  width: 78%;
}
.two-col {
  overflow: hidden;
}
#confirmation-code {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
#error-container {
  overflow: auto;
  margin-bottom: 0px;
}
#error-container div {
  float: left;
  margin-right: 15px;
}
.error-message {
  color: red;
}
</style>
