import axios from 'axios'

export const baseUrl = 'https://beta.cowsoko.com'

class AxiosCalls {
  static get(path) {
    return axios.get(`${baseUrl}/${path}`)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error
      })
  }
}

export default AxiosCalls
