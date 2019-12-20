<template>
  <div>
    <b-modal ref="modalRef" :title="generateTitle()">
      <form class="mx-2">
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Email</label>
           <div class="col-sm-10">
             <input class="form-control" id="email" placeholder="邮箱不会被公开" v-model="email" :class="{ 'is-invalid': email.length === 0 }">
           </div>
        </div>
        <div class="form-group row">
          <label for="nickname" class="col-sm-2 col-form-label">昵称</label>
           <div class="col-sm-10">
             <input class="form-control" id="nickname" :class="{ 'is-invalid': nickname.length === 0 }" v-model="nickname">
           </div>
        </div>
        <div class="form-group row">
          <label for="website" class="col-sm-2 col-form-label">网站</label>
           <div class="col-sm-10">
             <input class="form-control" id="website" placeholder="网站不会被公开" v-model="website">
           </div>
        </div>

        <div class="form-group row">
          <label for="content" class="col-sm-2 col-form-label">内容</label>
           <div class="col-sm-10">
             <textarea class="form-control" id="content" placeholder="200字以内"></textarea>
           </div>
        </div>
      </form>
      <div slot="modal-footer" class="w-100">
        <button class="btn btn-secondary float-right mx-1" @click="$refs.modalRef.hide()">关闭</button>
        <button class="btn float-right mx-1" :class="{'btn-secondary': isSubmitting, 'btn-info': !isSubmitting}" @click="submitComment">
          <span v-if="!isSubmitting">提交</span>
          <span v-else>提交中...</span>
        </button>
     </div>
    </b-modal>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

function generateTitle () {
  if (this.comment) {
    return '回复' + this.comment.nickname
  } else {
    return '留言'
  }
}

function showModal (comment) {
  this.comment = comment
  this.$refs.modalRef.show()
}

function saveData () {
  // 保存信息到cookie
  Cookies.set('nickname', this.nickname)
  Cookies.set('website', this.website)
  Cookies.set('email', this.email)
}

function loadData () {
  this.nickname = Cookies.get('nickname') || ''
  this.website = Cookies.get('website') || ''
  this.email = Cookies.get('email') || ''
}

function validateForm () {
  return this.nickname.length > 0 && this.email.length > 0
}

function submitComment () {
  if (!this.validateForm() || this.isSubmitting) {
    return
  }
  this.isSubmitting = true

  const url = this.$route.params.url

  const data = {
    nickname: this.nickname,
    email: this.email,
    website: this.website,
    content: document.querySelector('#content').value,
    comment_id: this.comment ? this.comment.id : null
  }

  this.$http.post(`/api/articles/${url}/comments/`, data).then(() => {
    this.$emit('refreshComments')
    this.$refs.modalRef.hide()
    this.saveData()
    this.isSubmitting = false
  })
}

export default {
  name: 'reply',
  data () {
    return {
      comment: null,
      nickname: '',
      website: '',
      email: '',
      isSubmitting: false
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    generateTitle,
    showModal,
    saveData,
    loadData,
    validateForm,
    submitComment
  }
}
</script>
