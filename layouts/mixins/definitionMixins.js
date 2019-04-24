export const definitionMixins = {
  computed: {
    calvingDefinition() {
      return {
        'definitionHeader': 'FIRST CALVING',
        'definitionBody': `When a cow gives birth for the first time.
                          In a well managed farm, this should be at 24 months`
      }
    },
    calvingPercentage() {
      return {
        'definitionHeader': 'CALVING PERCENTAGE',
        'definitionBody': `The number of cows in percent, that successfully give birth in a year`
      }
    }
  }
}
