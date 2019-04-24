<template>
  <div>
    <p class="composition">
      Date of first calving
    </p>
    <h5>What is the age at first calving?</h5>
    <div v-if="calvingDefinition" class="definition p-3">
      <i class="fas fa-info-circle" style="color:#88af00" />
      <h6>DEFINITION: {{ calvingDefinition.definitionHeader }}</h6>
      <span class="definition-body d-inline-flex">
        {{ calvingDefinition.definitionBody }}
      </span>
    </div>
    <div class="inputs">
      <span>
        <input
          ref="count"
          v-model.number="calvingResult"
          type="number"
          @keyup.enter="handleSubmit"
        ><p class="label">Months</p>
      </span>
    </div>
    <div class="error-message">
      <p>{{ validator.message }}</p>
    </div>
    <AppButton
      :disabled="isDisabled"
      @click="handleSubmit"
    >
      See Results &#x2192;
    </AppButton>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import validatorHelper from '@/utils/validators/calvingAgeValidators'
import { definitionMixins } from '@/layouts/mixins/definitionMixins.js'

export default {
  name: 'BaseCalving',

  components: {
    AppButton,
    validatorHelper
  },
  mixins: [definitionMixins],

  props: {
    ageOfCalving: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      calvingResult: this.ageOfCalving,
      validator: {
        isError: false,
        message: ''
      }
    }
  },

  computed: {
    isDisabled() {
      return this.validator.isError || this.calvingResult === 0
    }
  },

  watch: {
    calvingResult: function (value) {
      this.validator = validatorHelper(value)
    }
  },
  mounted() {
    this.$refs.count.focus()
  },

  methods: {
    handleSubmit() {
      console.log('clicked.....')
      // const tobj = this.$route.meta.metaTags
      // Object.keys(tobj).forEach(key => {
      //   if (tobj[key].property === 'og:description') {
      //     tobj[key].content = 'This decription has been changed....'
      //   }
      //   console.log(tobj[key])
      // })
      // console.log('yfgefbhf', this.$route.meta.metaTags)
      // // add a temporary variable
      // this.$router.replace({query: {temp: Date.now()}})
      // // remove the temporary variable query
      // this.$router.replace({query: {temp: undefined}})
      !this.isDisabled && this.$emit('submit', this.calvingResult)
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

  .label {
    font-size: 0.6rem;
    margin: 0;
  }

  .definition {
    background-color: #E9EFCD;
    margin: 0.8rem auto;
    max-width: 20rem;
    border-radius: 0.4rem;
    font-family: 'Comfortaa-regular';
    font-size: 0.7rem;
  }

  .definition .fa-info-circle {
    font-size: 1.1rem;
    margin-right: 0.4rem;
    color: #88af00;
  }

  .definition h6 {
    display: inline;
    font-size: 0.75rem;
    font-weight: bold;
    margin-right: 0.4rem;
  }

  .definition-body {
    font-size: 0.73rem;
    margin-top: 0.4rem;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
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
