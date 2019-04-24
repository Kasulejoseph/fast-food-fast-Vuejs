export default (quantity) => {
  if (quantity === '') {
    return {
      isError: true,
      message: 'Quantity is required'
    }
  }

  if (quantity <= 0) {
    return {
      isError: true,
      message: 'Quantity should be greater than 0'
    }
  }

  if (quantity > 50) {
    return {
      isError: true,
      message: 'Quantity shouldn\'t be greater than 50'
    }
  }

  return {
    isError: false,
    message: ''
  }
}
