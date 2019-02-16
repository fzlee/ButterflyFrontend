<template>
  <div id="app">
    <div class="main-body">
      <navbar></navbar>
      <div class="separator" style="padding-top:40px"></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/_partial/NavBar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import './assets/style.scss';

.main-content {
  margin-top: 40px
}
</style>
