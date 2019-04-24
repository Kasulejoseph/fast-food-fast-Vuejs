export default (total, values) => {
  if (values.some(v => v === '')) {
    return {
      isError: true,
      message: 'All inputs are required'
    }
  }

  if (total !== values.reduce((tot, v) => tot + v, 0)) {
    return {
      isError: true,
      message: `Inputs should sum up to ${total}`
    }
  }
  return {
    isError: false,
    message: ''
  }
}
