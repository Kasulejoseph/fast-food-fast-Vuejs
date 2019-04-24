export default (componentsPropList, componentViewDetails = []) => {
  return {
    data() {
      return {
        activeComponentIndex: 0
      }
    },

    computed: {
      activeComponentName() {
        return Object.keys(componentsPropList[this.activeComponentIndex])[0]
      },

      activeComponentPropsNames() {
        return componentsPropList[this.activeComponentIndex][this.activeComponentName]
      },

      /**
       * returns an object containing the active component's props values
       */
      propsObject() {
        const propsObject = componentViewDetails[this.activeComponentIndex]
          ? { ...componentViewDetails[this.activeComponentIndex][this.activeComponentName] }
          : {}

        this.activeComponentPropsNames.reduce((contentObj, dataName) => {
          contentObj[dataName] = this[dataName]
          return contentObj
        }, propsObject)

        return propsObject
      }
    },

    methods: {
      /**
       * updates the state with the active component submitted values
       * and sets the next component to be the active component
       */
      handleSubmit(paramsList) {
        this.activeComponentPropsNames.forEach((dataName) => {
          this[dataName] = typeof paramsList[dataName] === 'undefined' ? this[dataName] : paramsList[dataName]
        })
        this.activeComponentIndex += 1
      },

      /**
       * sets the active component to the previous or the first component
       * if the current active component is the last component
       */
      handleChangeStage() {
        this.activeComponentIndex = (this.activeComponentIndex - 1) % (Object.keys(componentsPropList).length - 2)
      }
    }
  }
}
