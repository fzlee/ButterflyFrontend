<template>
  <div class="col-md-9 maincolumn">
    <div class="bigwidget" >
      <div class="container">
        <h1 class="display-4">用户登录</h1>
        <form>
          <div class="form-group row">
            <label for="username" class="col-sm-2 col-form-label">用户名</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="username">
            </div>
          </div>
          <div class="form-group row">
            <label for="password" class="col-md-2 col-form-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="password">
            </div>
          </div>
          <div class="form-group row">
            <button class="btn btn-info mx-auto" type="button" @click.prevent="doLogin">登录</button>
          </div>
        </form>
      </div>
  </div>
  </div>
</template>

<script>
import { showFailedAlert } from '@/utils/alert'

function doLogin () {
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  this.$http.post('/api/login',
    {
      username: username,
      password: password
    }).then((response) => {
    if (response.data.success === true) {
      console.log(response.data.data)
      this.$store.commit('USER_LOGGED', response.data.data)
      this.$router.push({
        path: this.$route.query.url || '/'
      })
    } else {
      showFailedAlert('用户名密码错误')
    }
  })
}

export default {
  name: 'login',
  methods: {
    doLogin
  }
}
</script>
