<template>
  <div class="pagination " style="width: 100%">
    <div class="btn-toolbar mb-2 mx-auto" role="toolbar">
      <div class="btn-group" role="group">
        <button type="button" class="jump btn btn-raised btn-info" @click="jumpToPage(1 - currentPage)">首页</button>
        <button type="button" class="jump btn btn-raised btn-info" @click="jumpToPage(-1)">上一页</button>
        <button type="button" class="jump btn btn-raised btn-info" disabled>第{{currentPage}}页</button>
        <button type="button" class="jump btn btn-raised btn-info" @click="jumpToPage(1)">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
function jumpToPage (delta) {
  // 到头了，不要跳转
  if (!this.hasNext && delta > 1) {
    return
  }

  let targetPage = parseInt(this.currentPage) + delta
  if (targetPage >= 1) {
    this.$router.push({
      path: this.baseURL,
      query: { page: targetPage }
    })
  }

  this.$emit('pagination')
}

export default {
  name: 'pagination',
  props: ['baseURL', 'hasNext'],
  computed: {
    currentPage () {
      return this.$route.query.page || 1
    },
    hasPrevious () {
      return this.currentPage > 1
    }
  },
  methods: {
    jumpToPage
  }
}
</script>
