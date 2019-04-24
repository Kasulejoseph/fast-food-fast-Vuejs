export default (salesPerformance) => {
  if (salesPerformance >= 94) {
    return {
      result: 'Amazing!',
      message: 'You are doing pretty well! But you can always do better.',
      socials: true
    }
  } else if (salesPerformance >= 85) {
    return {
      result: 'Er..Ok',
      message: 'You are doing Ok, but you can do way better!',
      socials: true
    }
  } else {
    // anything less than 85
    return {
      result: 'Below Average',
      message: 'Your farm can perform so much better!',
      socials: false
    }
  }
}
