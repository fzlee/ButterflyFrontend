<template>
  <div class="container" style="margin-top: 40px">
    <div class="row">
      <router-view></router-view>
      <sidebar></sidebar>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/_partial/Sidebar'

export default {
  name: 'index',
  components: {
    Sidebar
  }
}
</script>