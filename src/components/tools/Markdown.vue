<template>
  <div class="container-fluid" style="margin-top: 40px">
    <div class="maincolumn">
        <div id="editor"></div>
    </div>
  </div>
</template>

<script>
// code block highlight
import TuiEditor from 'tui-editor'
import 'tui-editor/dist/tui-editor-extScrollSync.js'
require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css') // editor ui
require('tui-editor/dist/tui-editor-contents.css') // editor content
require('highlight.js/styles/github.css')

const content = [
  '![image](https://cloud.githubusercontent.com/assets/389021/16107646/9729e556-33d8-11e6-933f-5b09fa3a53bb.png)',
  '# Heading 1',
  '## Heading 2',
  '    code block',
  '```js',
  'console.log("fenced code block");',
  '```',
  '[link](https://nhnent.github.io/tui.editor/)',
  '> block quote',
  '---',
  'horizontal line',
  '***',
  '`code`, *italic*, **bold**, ~~strikethrough~~, <span style="color:#e11d21">Red color</span>',
  '```'
].join('\n')

function createEditor () {
  this.editor = new TuiEditor({
    el: document.querySelector('#editor'),
    initialEditType: this.editorType,
    height: '600px',
    previewStyle: 'vertical',
    initialValue: content,
    exts: ['scrollSync']
  })
}

export default {
  name: 'markdown',
  mounted () {
    this.createEditor()
    this.$store.commit('setTitle', 'ifconfiger-Markdown')
  },
  methods: {
    createEditor
  }
}
</script>
