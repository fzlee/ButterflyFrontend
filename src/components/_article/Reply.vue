<template>
  <div>
    <b-modal ref="modalRef" :title="generateTitle()">
      <form class="mx-2">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <div class="form-group row">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <ValidationProvider name="email" v-slot="v" rules="required|email">
                <input class="form-control" id="email" placeholder="邮箱不会被公开" v-model="email" :class="{'is-invalid': v.errors.length}">
                <p class="text-danger">{{ v.errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group row">
            <label for="nickname" class="col-sm-2 col-form-label">昵称</label>
            <div class="col-sm-10">
              <ValidationProvider name="昵称" v-slot="v" rules="required|min:1">
                <input class="form-control" id="nickname" v-model="nickname" :class="{'is-invalid': v.errors.length}">
                <p class="text-danger">{{ v.errors[0] }}</p>
              </ValidationProvider>
            </div>

          </div>
          <div class="form-group row">
            <label for="website" class="col-sm-2 col-form-label">网站</label>
            <div class="col-sm-10">
              <ValidationProvider name="网址" v-slot="v" :rules="{regex: /^https?:\/\//}">
                <input class="form-control" id="website" v-model="website" :class="{'is-invalid': v.errors.length}">
                <p class="text-danger">{{ v.errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>

          <div class="form-group row">
            <label for="content" class="col-sm-2 col-form-label">内容</label>
            <div class="col-sm-10">
              <ValidationProvider name="网址" v-slot="v" rules="required|min:1">
                <textarea class="form-control" id="content" placeholder="200字以内" v-model="content" :class="{'is-invalid': v.errors.length}"></textarea>
                <p class="text-danger">{{ v.errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
        </ValidationObserver>
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

async function submitComment () {
  const isValid = await this.$refs.observer.validate()
  if (!isValid || this.isSubmitting) {
    return
  }

  this.isSubmitting = true

  const url = this.$route.params.url

  const data = {
    nickname: this.nickname,
    email: this.email,
    website: this.website,
    content: this.content,
    comment_id: this.comment ? this.comment.id : null
  }

  this.$http.post(`/api/articles/${url}/comments/`, data).then(() => {
    this.$emit('refreshComments')
    this.$refs.modalRef.hide()
    this.saveData()
    this.isSubmitting = false
  }, () => {
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
      content: '',
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
