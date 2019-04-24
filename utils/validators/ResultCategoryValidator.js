class ResultCategory {
  getPerformance(value) {
    return value
  }
  getTitle(result, message) {
    return {
      result,
      message
    }
  }
  goodCategoryCheck(value) {
    const goodCategoryThreshold = 20
    if (value >= goodCategoryThreshold) {
      return this.getTitle(
        'Excellent!',
        'You\'re doing pretty well but you can do better!'
      )
    }
  }
  averageCategoryCheck(value) {
    const averageCategoryRange = value >= 11 && value <= 19
    if (averageCategoryRange) {
      return this.getTitle(
        'Err.. Ok..',
        'You\'re doing fine, but you can always do better',
        this.performance
      )
    }
  }
  poorCategoryCheck(value) {
    const poorCategoryRange = value <= 10
    if (poorCategoryRange) {
      return this.getTitle(
        'Below Average',
        'Your farm can perform so much better!'
      )
    }
  }
}

export const resultCategory = new ResultCategory()
