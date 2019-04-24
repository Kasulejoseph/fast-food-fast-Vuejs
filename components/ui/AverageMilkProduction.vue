<template>
  <div>
    <p class="composition">
      {{ title }}
    </p>
    <h5>{{ header }}</h5>
    <div class="inputs">
      <span>
        <input
          ref="count"
          v-model.number="milkCount"
          type="number"
          @keyup.enter="handleSubmit"
        >
      </span>
    </div>
    <div class="error-message">
      <p>{{ validator.message }}</p>
    </div>
    <AppButton
      id="appButton"
      :disabled="isDisabled"
      @click="handleSubmit"
    >
      Next &#x2192;
    </AppButton>
    <div>
      <router-link
        v-if="!previousSectionLink"
        to="/"
      >
        &#x2190; Back to home page
      </router-link>
    </div>
    <div v-if="previousSectionLink" class="text-center">
      <a id="previousSectionLink" href="#" @click.prevent="previousSection">&#x2190; Back!</a>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'

export default {
  name: 'AverageMilkProduction',

  components: {
    AppButton
  },
  props: ['title', 'header', 'previousSectionLink', 'numOfProd'],

  data() {
    return {
      isDisabled: true,
      milkCount: '',
      validator: {
        isError: false,
        message: ''
      }
    }
  },

  watch: {
    milkCount: function (value) {
      if (value === '') {
        this.isDisabled = true
        this.validator = {
          isError: true,
          message: 'liters of milk is required'
        }
      } else if (value < 1) {
        this.isDisabled = true
        this.validator = {
          isError: true,
          message: 'liters of milk should be greater than or equal to 1'
        }
      } else if (!Number.isInteger(value)) {
        this.isDisabled = true
        this.validator = {
          isError: true,
          message: 'liters of milk should be a whole number'
        }
      } else if (value > this.numOfProd) {
        this.isDisabled = true
        this.validator = {
          isError: true,
          message: 'litres of sales should not exceed production liters, try again'
        }
      } else {
        this.isDisabled = false
        this.validator = {
          isError: false,
          message: ''
        }
      }
    }
  },
  mounted() {
    this.$refs.count.focus()
  },
  methods: {
    handleSubmit() {
      if (this.milkCount > 0) {
        !this.isDisabled && this.$emit('submitMilkCount', this.milkCount)
      }
    },
    previousSection() {
      this.$emit('backToPreviousSection')
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
