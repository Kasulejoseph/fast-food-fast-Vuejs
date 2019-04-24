<template>
  <!-- logIn -->
  <div id="pin">
    <form>
      <h2 v-if="accountCodeForm.hide ===false && accountCodeForm.code===accountCodeForm.verif" id="account-code">
        Change your Pin
      </h2>
      <p v-if="accountCodeForm.hide ===false && accountCodeForm.code===accountCodeForm.verif" id="code-sent">
        Please enter your new pin below!
      </p>
      <h2 v-if="accountCodeForm.hide===true" id="account-code">
        Account Code
      </h2>
      <p v-if="accountCodeForm.hide===true" id="code-sent">
        A Code has been sent to your phone.
      </p>
      <p v-if="accountCodeForm.hide===true" id="enter-pin">
        please enter the code below
      </p>
      <div class="two-col">
        <input
          v-if="accountCodeForm.hide===true"
          id="col2"
          v-model="accountCodeForm.code"
          required
          type="number"
          class="form-control"
          placeholder="XXXX"
        >
      </div>

      <div v-if="accountCodeForm.hide ===false && accountCodeForm.code!==accountCodeForm.verif">
        <p id="account-code">
          Try again please!
        </p>
      </div>

      <div class="two-col">
        <input
          v-if="accountCodeForm.hide ===false && accountCodeForm.code!==accountCodeForm.verif"
          id="col2"
          v-model="accountCodeForm.code"
          required
          type="number"
          class="form-control"
          placeholder="XXXX"
        >
      </div>

      <div>
        <button v-if="accountCodeForm.hide ===false && accountCodeForm.code!==accountCodeForm.verif" class="form-control" @click.prevent="checkVerification">
          <font-awesome-icon v-if="getForgotPin.loading" icon="spinner" spin />Enter
        </button>
      </div>

      <div id="enter">
        <button v-if="accountCodeForm.hide===true" class="form-control" @click.prevent="checkVerification">
          <font-awesome-icon v-if="getForgotPin.loading" icon="spinner" spin />Enter
        </button>
      </div>

      <div class="two-col">
        <input
          v-if="accountCodeForm.code.length !=0 && accountCodeForm.code===accountCodeForm.verif "
          id="col2"
          v-model="$v.accountCodeForm.pin.$model"
          required
          type="password"
          class="form-control"
        >
      </div>

      <div v-if="$v.accountCodeForm.pin.$error" class="error-message">
        <p v-if="!$v.accountCodeForm.pin.required" class="mt-1">
          Pin is required
        </p>
        <p v-else-if="!$v.accountCodeForm.pin.integer" class="mt-1">
          Pin must be a digit
        </p>
        <p v-else-if="!$v.accountCodeForm.pin.minLength" class="mt-1">
          Pin should not be less than 4 characters
        </p>
        <p v-else-if="!$v.accountCodeForm.pin.maxLength" class="mt-1">
          Pin should not be more than 4 characters
        </p>
      </div>
      <div>
        <button v-if="accountCodeForm.hide ===false && accountCodeForm.code===accountCodeForm.verif" class="form-control" @click.prevent="getCode">
          <font-awesome-icon v-if="getForgotPin.loading" icon="spinner" spin />{{ accountCodeForm.buttonTitle }}
        </button>
      </div>
    </form>
    <div v-if="accountCodeForm.hide ===false && accountCodeForm.code!==accountCodeForm.verif">
      <p id="error-msg">
        Enter a valid code
      </p>
    </div>

    <div v-if="getForgotPin.error">
      <p id="error-msg">
        {{ getForgotPin.error }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {
  required,
  minLength,
  integer,
  maxLength
} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      accountCodeForm: {
        code: '',
        error: '',
        pin: '',
        verif: '',
        hide: true,
        buttonTitle: 'Continue'
      }
    }
  },
  computed: {
    ...mapState(['verification_code']),
    ...mapGetters({
      getForgotPin: 'getForgotPin'
    })
  },
  validations: {
    accountCodeForm: {
      pin: {
        required,
        integer,
        minLength: minLength(4),
        maxLength: maxLength(4)
      }
    }
  },
  watch: {
    getForgotPin(newData, oldData) {
      if (newData.loading) {
        this.accountCodeForm.buttonTitle = ''
      } else if (!newData.loading && !newData.success) {
        this.accountCodeForm.buttonTitle = 'Continue'
      }
    }
  },
  methods: {
    ...mapActions(['accountCode']),
    getCode: function () {
      if (this.$v.accountCodeForm.$invalid) {
        return this.$v.accountCodeForm.$touch()
      } else {
        this.accountCode(this.accountCodeForm.pin)
      }
    },
    checkVerification: function () {
      this.accountCodeForm.verif = this.getForgotPin.verification_code
      this.accountCodeForm.hide = false
    }
  }
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
      margin-bottom: 1rem;
    }

  button {
      padding: 0.5rem;
      background-color: #a3c34e;
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
    text-align: center;
    width: 100%;
}

#col3 {
    text-align: center;
    width: 100%;
    margin-top:-20px
}
#error-msg {
  color:crimson
}
.two-col{
  overflow: hidden;
}
#account-code{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;
    color: #5f697a;
    text-align: center;
}
#pin{
 align-content: center
}
#code-sent{
    text-align: center;
    font-size: 14px;
}

#enter-pin{
    text-align: center;
    font-size: 14px;
    margin-top:-15px;
}
#enter{
  margin-top:-26px
}
.error-message{
  color: red;
}
</style>
