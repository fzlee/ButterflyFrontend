<template>
  <div class="edit-article">
    <div class="row mx-2">
      <b-input-group>
        <b-input-group-prepend>
          <b-btn size="sm" variant="info" class="btn-raised">标题</b-btn>
        </b-input-group-prepend>
        <b-form-input v-model="article.title"></b-form-input>
      </b-input-group>
      <b-input-group>
        <b-input-group-prepend>
          <b-btn size="sm" variant="info" class="btn-raised">URL</b-btn>
        </b-input-group-prepend>
        <b-form-input
          v-model="article.url"  
          v-on:blur.native="checkURLInPlace" name="url" 
          :class="{ 'is-invalid': errors.has('url')}"></b-form-input>
      </b-input-group>
      <b-input-group>
        <b-input-group-prepend>
          <b-btn size="sm" variant="info" class="btn-raised">标签</b-btn>
        </b-input-group-prepend>
        <b-form-input placeholder="逗号隔开" v-model="article.tags"></b-form-input>
      </b-input-group>
      <b-input-group>
        <b-input-group-prepend>
          <b-btn size="sm" variant="info" class="btn-raised">meta content</b-btn>
        </b-input-group-prepend>
        <b-form-input v-model="article.metacontent"></b-form-input>
      </b-input-group>
      <b-input-group>
        <b-input-group-prepend>
          <b-btn size="sm" variant="info" class="btn-raised">密码</b-btn>
        </b-input-group-prepend>
        <b-form-input :disabled="passwordGroup.value != true" v-model="article.password"></b-form-input>
      </b-input-group>
    </div>

    <div class="row mx-2">
      <div>
        <b-button-group>
          <b-button variant="info" @click="saveArticle" class="btn-raised">提交</b-button>
          <a :href="`/articles/${article.url}?is_preview=true`" target="_blank" class="btn btn-info btn-raised">预览</a>
          <b-button variant="info" class="btn-raised">文件处理</b-button>
        </b-button-group>

        <b-dropdown :text="getGroupDisplay(displayGroup)" class="ml-2" variant="info" toggle-class="btn-raised">
          <b-dropdown-item v-for="menu in displayGroup.menus" :key="menu.value" @click="changeDropdown(displayGroup, menu)">{{menu.text}}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown :text="getGroupDisplay(originalGroup)" variant="info" toggle-class="btn-raised">
          <b-dropdown-item v-for="menu in originalGroup.menus" :key="menu.value" @click="changeDropdown(originalGroup, menu)">{{menu.text}}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown :text="getGroupDisplay(commentGroup)" variant="info" toggle-class="btn-raised">
          <b-dropdown-item v-for="menu in commentGroup.menus" :key="menu.value" @click="changeDropdown(commentGroup, menu)">{{menu.text}}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown :text="getGroupDisplay(passwordGroup)" variant="info" toggle-class="btn-raised">
          <b-dropdown-item v-for="menu in passwordGroup.menus" :key="menu.value" @click="changeDropdown(passwordGroup, menu)">{{menu.text}}</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <div class="row mx-2">
      <div class="edit-article" style="width: 100%;">
          <div id="editor">
            
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import TuiEditor from 'tui-editor'
import 'tui-editor/dist/tui-editor-extScrollSync.js'

function initEditor() {
  if (this.$route.query.url) {
    this.$http.get(`/api/articles/${this.$route.query.url}`).then((response) => {
      console.log(this.originalGroup.key)
      response.data.data.tags = this.stripTags(response.data.data.tags)
      this.article = response.data.data
      this.displayGroup.value = this.article.allow_visit
      this.displayGroup = Object.assign({}, this.displayGroup)
      this.originalGroup.value = this.article.is_original
      this.originalGroup = Object.assign({}, this.originalGroup)

      this.commentGroup.value = this.article.allow_comment
      this.commentGroup = Object.assign({}, this.commentGroup)
      this.passwordGroup.value = this.article.need_key
      this.passwordGroup = Object.assign({}, this.passwordGroup)

      this.createEditor()
    })
  } else {
    this.createEditor()
  }
}

function createEditor () {
  if (this.editor) {
    return
  }

  if (this.article && this.article.editor === 'html') {
    this.editorType = 'wysiwyg'
  }

  this.editor = new TuiEditor({
    el: document.querySelector('#editor'),
    initialEditType: this.editorType,
    height: '500px',
    previewStyle: 'vertical',
    initialValue: this.article? this.article.content : '',
    exts: ['scrollSync']
  })
}

function changeDropdown (group, menu) {
  group.value = menu.value
}

function getGroupDisplay (group) {
  for (let menu of group.menus) {
    if (menu.value === group.value) {
      return menu.text
    }
  }

  return group.value
}

function saveArticle () {
  this.article.allow_visit = this.displayGroup.value
  this.article.need_key = this.passwordGroup.value
  this.article.allow_comment = this.commentGroup.value
  this.article.is_original = this.originalGroup.value
  this.article.editor = 'markdown'
  this.article.content = this.editor.getMarkdown()

  if (this.errors.size > 0) {
    return
  }

  if (!this.article.url) {
    return
  }

  let content = Object.assign({}, this.article)

  this.$http.put('/api/articles/save', content).then((response) => {
    const article = response.data.data
    if (!this.article.id) {
      this.article.id = article.id
    }
  })
}

function stripTags (tags) {
  if (tags.startsWith(',')) {
    tags = tags.slice(1, tags.length)
  }

  if (tags.endsWith(',')) {
    tags = tags.slice(0, tags.length -1)
  }
  return tags
}

function checkURLInPlace () {
  // url 没有改变， 不检查
  this.$http.post('/api/articles/in_place',{
    url: this.article.url,
    article_id: this.article.id
  }).then((response) => {
    if (response.data.data.in_place) {
      this.errors.add('url')
    } else {
      this.errors.delete('url')
    }
    return response.data.data.in_place
  })
}

function autoSave () {
  this.timer = setInterval(this.saveArticle, 60 * 1000)  
}

export default {
  name: 'editor',
  components: {
  },
  data () {
    return {
      article: {},
      editor: null,
      editorType: 'markdown',
      timer: null,
      options: {},
      errors: new Set(),
      displayGroup: {
        value: false,
        menus: [
          {
            value: false,
            text: '不发布'
          },
          {
            value: true,
            text: '发布'
          }
        ]
      },
      originalGroup: {
        value: true,
        menus: [
          {
            value: false,
            text: '非原创'
          },
          {
            value: true,
            text: '是原创'
          }
        ]
      },
      commentGroup: {
        value: true,
        menus: [
          {
            value: false,
            text: '禁止评论'
          },
          {
            value: true,
            text: '允许评论'
          }
        ]
      },
      passwordGroup: {
        value: false,
        menus: [
          {
            value: false,
            text: '公开访问'
          },
          {
            value: true,
            text: '密码访问'
          }
        ]
      }
    }
  },
  mounted () {
    this.initEditor()
    this.autoSave()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    initEditor,
    createEditor,
    changeDropdown,
    getGroupDisplay,
    saveArticle,
    checkURLInPlace,
    stripTags,
    autoSave
  }
}
</script>

<style lang="scss" scoped>
  .btn-group {
    margin: 10px 0;
  }
</style>