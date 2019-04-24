<template>
  <div>
    <p class="composition">
      {{ title }}
    </p>
    <h5>{{ heading }}</h5>
    <div class="inputs">
      <span>
        <input
          ref="cowsCount"
          type="text"
          :value="cowsCount"
          name="cowsCount"
          autocomplete="off"
          @keyup.enter="handleSubmit"
          @input="handleInputChange"
        >
      </span>
    </div>
    <div class="error-message">
      <p>{{ validator.message }}</p>
    </div>
    <AppButton
      :disabled="isDisabled"
      @click="handleSubmit"
    >
      Get Started &#x2192;
    </AppButton>
    <div>
      <router-link to="/">
        &#x2190; {{ routerNote }}
      </router-link>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import validatorHelper from '@/utils/validators/cowsCountValidator'
import integerInputUpdateMixin from '@/mixins/integerInputUpdateMixin'

export default {
  name: 'CowsCount',

  components: {
    AppButton
  },

  mixins: [integerInputUpdateMixin],

  props: {
    numberOfCows: {
      type: Number,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    heading: {
      type: String,
      required: true
    },

    routerNote: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      cowsCount: this.numberOfCows,
      validator: {
        isError: false,
        message: ''
      }
    }
  },

  computed: {
    isDisabled() {
      return this.validator.isError || this.cowsCount === 0
    }
  },

  watch: {
    cowsCount: function (value) {
      this.validator = validatorHelper(value)
    }
  },

  mounted() {
    this.$refs.cowsCount.focus()
  },

  methods: {
    handleSubmit() {
      !this.isDisabled && this.$emit('submit', { numberOfCows: this.cowsCount })
    }
  }
}
</script>

<style scoped>
  * {
    color:#580010;
    box-sizing: border-box;
    line-height: 1.6;
  }

  .composition {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }

  .inputs {
    display: flex;
    justify-content: center;
    margin: 2rem 0 1rem;
  }

  .inputs span {
    display: inline-block;
    flex-basis: 7rem;
    border-right: 0.03rem solid #eee;
  }

  .inputs :last-child {
    border: none;
  }

  input {
    outline: none;
    border: none;
    text-align: center;
    color: #88af00;
    font-size: 2.4rem;
    caret-color: #000;
    margin: 0;
    padding: 0;
    width: 98%;
    margin-left: -1px;
    font-family: 'Comfortaa-Regular', 'Avenir';
    margin-bottom: -1rem;
  }

  h5 {
    min-width: 16rem;
    width: 80%;
    max-width: 28rem;
    margin: auto;
  }

  a {
    display: inline-block;
    color: #88af00;
    font-size: 0.87rem;
    margin-top: 1rem;
  }

  a:hover {
    color: #88af00;
  }

  .error-message {
    font-size: 0.75rem;
    height: 2.2rem;
  }

  .error-message * {
    color: #ff0000;
    margin: 0;
  }

  @media only screen and (max-width: 400px) {
    h5 {
      font-size: 1.05rem;
    }

    input {
      font-size: 2.1rem;
    }
  }
</style>
