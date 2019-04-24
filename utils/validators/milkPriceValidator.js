export default (value) => {
  if (value === '') {
    return {
      isError: true,
      message: 'Price is required'
    }
  }

  if (value <= 0) {
    return {
      isError: true,
      message: 'Price should be greater than 0'
    }
  }

  return {
    isError: false,
    message: ''
  }
}
