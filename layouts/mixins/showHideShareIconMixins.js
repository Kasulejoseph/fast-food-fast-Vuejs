export const displayIconMixins = {
  computed: {
    showIcons() {
      return this.farmPerformance.result !== 'Below Average'
    }
  }
}
