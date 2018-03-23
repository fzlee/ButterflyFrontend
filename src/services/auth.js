import Cookies from 'js-cookie'

function hasLogin () {
  if (Cookies.get('g.token') === undefined) {
    return false
  }
  let user = getUser()
  if (user.role === undefined) {
    return false
  }
  return true
}

function getUser () {
  let content = Cookies.get('g.user')
  return content ? JSON.parse(content) : null
}

export {
  hasLogin
}