<template>
  <div class="container-fluid">
    <div class="row">
      <div class="mx-auto">
      <b-navbar toggleable="md" style="background:#347eff" type="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/manager/articles">管理后台</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="justify-content-center">
            <b-nav-item to="/manager/articles">文章管理</b-nav-item>
            <b-nav-item to="/manager/editor">编辑文章</b-nav-item>
            <b-nav-item to="/manager/comments">评论</b-nav-item>
            <b-nav-item to="/manager/links">链接</b-nav-item>
            <b-nav-item :target="($route.path==='/manager/articles' || $route.path==='/manager/editor') ? '_blank': ''" to="/manager/medias">文件</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
function doLogout () {
  this.$http.post('/api/logout').then(() => {
    location.reload()
  })
}

export default {
  name: 'navbar',
  methods: {
    doLogout
  }
}
</script>
