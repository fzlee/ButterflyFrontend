<template>
  <div class="pagination">
    <div class="btn-toolbar mb-2" role="toolbar" aria-label="Toolbar with button groups" style="background-color: #fff">
      <div class="btn-group" role="group" aria-label="First group" styles="background-color: #fff">
        <button type="button" class="jump btn btn-outline-primary" @click="jumpToPage(1 - currentPage)">首页</button>
        <button type="button" class="jump btn btn-outline-primary" @click="jumpToPage(-1)">上一页</button>
        <button type="button" class="jump btn btn-outline-primary" disabled>第{{currentPage}}页</button>
        <button type="button" class="jump btn btn-outline-primary" @click="jumpToPage(1)">下一页</button>
      </div>
    </div>
  </div> 
</template>

<script>
function jumpToPage (delta) {
  console.log('sssssssssssss')
  // 到头了，不要跳转
  if (!this.hasNext && delta > 1) {
    return
  }

  let targetPage = parseInt(this.currentPage) + delta
  console.log(targetPage)
  if (targetPage >= 1) {
    this.$router.push({ 
      path: this.baseURL, 
      query: { page: targetPage }
    })
  }

  this.$emit("pagination")
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