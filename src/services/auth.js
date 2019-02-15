import Cookies from 'js-cookie'

function hasLogin () {
  if (Cookies.get('b.token') === undefined) {
    return false
  }
  let user = getUser()
  if (user.role === undefined) {
    return false
  }
  return true
}

function getUser () {
  let content = Cookies.get('b.user')
  return content ? JSON.parse(content) : null
}

export {
  hasLogin
}
