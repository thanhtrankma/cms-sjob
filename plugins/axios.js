import axios from 'axios'
import Vue from 'vue'
import store from '~/store/modules/auth'

axios.defaults.baseURL = '/'
const app = new Vue()

axios.interceptors.request.use(
  (config) => {
    const token = store.state.token
    if (token) {
      config.headers.common.Authorization = token
      // config.headers.common['token-id'] = token
      // axios.setHeader('token-id', token)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Lỗi khi kết nối tới server! ')
  },
  (error) => {
    if (error.response.status === 400) {
      // window.location = '/400'
    }
    if (error.response.status === 401) {
      if (!window.location.href.includes('/login')) window.location = '/login'
    }
    app.$message({ type: 'error', message: error.response.data.error })
    return Promise.reject(error.response)
  }
)

export default axios
