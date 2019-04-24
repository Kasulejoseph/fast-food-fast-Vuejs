export default (performance) => {
  if (performance < 26) {
    return {
      performance,
      result: 'Excellent!',
      message: "You're doing pretty well! But you can always do better."
    }
  }
  if (performance <= 28) {
    return {
      performance,
      result: 'Er.. Ok',
      message: "You're doing Ok, but you can do way better!"
    }
  }
  return {
    performance,
    result: 'Below Average',
    message: 'Your farm can perform so much better!'
  }
}
