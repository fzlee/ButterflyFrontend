function showAlert (type, message, duration = 3000) {
  const template = `<div class="alert alert-${type} alert-global" role="alert" 
  style="z-index:2000; position:fixed; top: 3px; left: 50%; transform: translate(-50%, 0);"
  >${message}</div>`
  let alert = document.createElement('div')
  alert.innerHTML = template
  alert = alert.children[0]
  alert.onclick = closeAlert.bind(this, alert)
  document.body.appendChild(alert)
  setTimeout(() => {
    alert.classList.add('active')
  }, 10)
  alert.timeout = setTimeout(() => {
    closeAlert(alert)
  }, duration)
}

function closeAlert (alert) {
  clearTimeout(alert.timeout)
  alert.classList.remove('active')
  setTimeout(() => {
    document.body.removeChild(alert)
  }, 300)
}

function showSuccessAlert (message, duration = 3000) {
  return showAlert('success', message, duration)
}

function showFailedAlert (message, duration = 3000) {
  return showAlert('danger', message, duration)
}

export {
  showSuccessAlert, showFailedAlert
}
