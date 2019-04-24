export default (value) => {
  if (value === '') {
    return {
      isError: true,
      message: 'Age of first calving is required'
    }
  }
  if (value < 24 || value > 40) {
    return {
      isError: true,
      message: `Invalid age of first calving, ${value}. Enter Age in months (24 - 40) `
    }
  }
  if (!Number.isInteger(value)) {
    return {
      isError: true,
      message: 'The Age of first calving should be a whole number'
    }
  }
  return {
    isError: false,
    message: ''
  }
}
