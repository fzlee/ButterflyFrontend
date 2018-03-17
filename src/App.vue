<template>
  <div id="app">
    <div class="main-body">
      <navbar></navbar>
      <div class="container main-content">
        <div class="row">
          <router-view></router-view>
          <router-view name="sidebar"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/_partial/NavBar.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld, 
    Navbar
  }
}
</script>

<style lang="scss">
@import './assets/style.scss';

.main-content {
  margin-top: 55px
}
</style>
