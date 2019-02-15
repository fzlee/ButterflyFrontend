import { showSuccessAlert, showFailedAlert } from '@/utils/alert'
import axios from 'axios'
const http = axios.create()

// before crequest
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// error handler
http.interceptors.response.use(function (response) {
  if (response.data.success !== true) {
    showFailedAlert(response.data.error.message)
    return null
  } else {
    // 非安全方法提示执行成功
    if (response.config.method !== 'get') {
      showSuccessAlert('请求成功')
    }
    return response
  }
}, function (error) {
  showFailedAlert(error)
  return Promise.reject(error)
})

export default http
