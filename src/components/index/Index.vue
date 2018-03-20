<template>
  <div class="row">
    <router-view></router-view>
    <sidebar></sidebar>
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