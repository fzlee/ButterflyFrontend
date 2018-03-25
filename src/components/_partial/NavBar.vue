<template>
  <div>
    <b-navbar toggleable="md" type="dark" class="bg-dark" variant="info" fixed="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">{{ brand_name }}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/articles/about">关于</b-nav-item>
          <b-nav-item href="/rss">RSS</b-nav-item>
          <b-nav-item-dropdown text="工具">
            <b-dropdown-item to="/tools/qrcode">二维码</b-dropdown-item>
            <b-dropdown-item to="/tools/markdown">Markdown</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/manager/articles">
            <span v-if="hasLogin()">Admin</span>
            <span v-else>&nbsp;</span>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="文本搜索" v-model="searchContent" @keydown.enter.prevent.native="searchWithGoogle"></b-form-input>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {hasLogin} from '@/services/auth'

function searchWithGoogle () {
  const query = `site:${location.host} ${this.searchContent}`
  let url = `https://www.google.com.hk/search?q=${encodeURIComponent(query)}`
  window.open(url, '_blank').focus()
}

export default {
  name: 'navbar',
  data () {
    return {
      brand_name: 'ifconfiger',
      searchContent: ''
    }
  },
  methods: {
    searchWithGoogle,
    hasLogin
  }
}
</script>

<style>
@import '../../../node_modules/tui-editor/dist/tui-editor-contents.min.css';
@import '../../../node_modules/highlight.js/styles/github.css';
</style>