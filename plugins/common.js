import moment from 'moment'
import Vue from 'vue'
import auth from '@/store/modules/auth'
// import store from '@/store/'

function formatTime(value) {
  if (value) return moment(value).format('DD-MM-YYYY HH:mm')
}
Vue.filter('formatTime', formatTime)

Vue.filter('bytesToSize', function (bytes) {
  const sizes = ['Bytes', 'KB', 'MB']
  if (bytes) {
    if (bytes === 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  }
})

Vue.prototype.$flattenArray = function (arr) {
  const self = this
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? self.$flattenArray(toFlatten) : toFlatten
    )
  }, [])
}

Vue.filter('formatCurrency', function (value) {
  if (!value) return 0
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

Vue.prototype.$formatCurrency = function (value) {
  return this.$options.filters.formatCurrency(value)
}

Vue.prototype.$formatNumber = function (value) {
  return value.toString().replace(/,/g, '')
}

Vue.prototype.$getPermission = function () {
  if (auth.state.profile) {
    // const authorities = JSON.parse(auth.state.profile).authorities
    const permission = 'admin'
    return permission
  }
}

Vue.prototype.$routingByPermission = function (permission) {
  switch (permission) {
    case 'admin':
      this.$router.push('/recruitment')
      break
    default:
      this.$message({
        message: 'Bạn không có quyền truy cập hệ thống này.',
        type: 'error',
      })
      this.$router.push('/login')
      break
  }
}
