import axios from '~/plugins/axios'

export default {
  login(user) {
    return axios.post(`/api/auth-service/auth`, user)
  },
  getProvince() {
    return axios.get(`/api/user-service/places/provinces/all`)
  },
  getDistrictByProvince(province) {
    return axios.get(
      `/api/user-service/places/provinces/${province}/districts/all`
    )
  },
}
