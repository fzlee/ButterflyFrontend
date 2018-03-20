<template>
  <div class="row">
    <div class="edit-article" style="width: 100%; margin: 0 10px">
        <div id="editor">
          
        </div>
    </div>
  </div>
</template>

<script>
import TuiEditor from 'tui-editor'

function initEditor() {
  if (this.$route.query.url) {
    this.$http.get(`/api/articles/${this.$route.query.url}`).then((response) => {
      console.log
      this.article = response.data.data
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

  let editorType = 'markdown'
  if (this.article && this.article.editor === 'html') {
    editorType = 'wysiwyg'
  }

  this.editor = new TuiEditor({
    el: document.querySelector('#editor'),
    initialEditType: editorType,
    height: '500px',
    previewStyle: 'vertical',
    initialValue: this.article? this.article.content: ''
  })
}

export default {
  name: 'editor',
  components: {
  },
  data () {
    return {
      article: null,
      editor: null
    }
  },
  created () {
    this.initEditor()
  },
  methods: {
    initEditor,
    createEditor
  }
}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/codemirror/lib/codemirror.css';
@import '../../../node_modules/tui-editor/dist/tui-editor.min.css';
@import '../../../node_modules/tui-editor/dist/tui-editor-contents.min.css';
@import '../../../node_modules/highlight.js/styles/github.css';
</style>