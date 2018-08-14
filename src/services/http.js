import { showSuccessAlert, showFailedAlert } from '@/utils/alert'
import axios from 'axios'
import Spinner from 'spin'
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

function getSpinner () {
  if (http.spinner) {
    return http.spinner
  }

  var panel = document.getElementById('spin-panel')
  if (!panel) {
    panel = document.createElement('div')
    panel.id = 'spin-panel'
    panel.style.position = 'fixed'
    panel.style.left = '50%'
    panel.style.top = '50%'
    panel.style.zIndex = '1000'
    document.body.appendChild(panel)
  }

  var spinner = new Spinner({
    width: 25,
    radius: 84,
    length: 0
  })
  http.spinner = spinner
  return http.spinner
}

http.doSpin = function () {
  let spinner = getSpinner()
  let target = document.getElementById('spin-panel')
  spinner.spin(target)
}

http.cancelSpin = function () {
  getSpinner().stop()
}

export default http
