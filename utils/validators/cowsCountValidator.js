export default (value) => {
  if (value === '') {
    return {
      isError: true,
      message: 'Number of cows is required'
    }
  }

  if (value <= 0) {
    return {
      isError: true,
      message: 'Number of cows should be greater than 0'
    }
  }

  return {
    isError: false,
    message: ''
  }
}
