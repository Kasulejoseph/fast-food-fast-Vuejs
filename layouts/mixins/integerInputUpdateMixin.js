export default {
  methods: {
    handleInputChange(event) {
      const valueToNumber = parseInt(event.target.value, 10)
      const resultValue = Number.isInteger(valueToNumber) ? valueToNumber : ''
      this[event.target.name] = resultValue
      Array.isArray(this.$refs[event.target.name])
        ? this.$refs[event.target.name][0].value = resultValue
        : this.$refs[event.target.name].value = resultValue
    }
  }
}
