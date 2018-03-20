<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/manager/articles">管理后台</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/manager/articles">文章管理</b-nav-item>
          <b-nav-item href="#">编辑文章</b-nav-item>
          <b-nav-item href="#">评论</b-nav-item>
          <b-nav-item href="#">链接</b-nav-item>
          <b-nav-item href="#">文件</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>