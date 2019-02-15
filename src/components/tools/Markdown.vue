<template>
  <div class="container-fluid" style="margin-top: 40px">
    <div class="maincolumn">
        <div id="editor"></div>
    </div>
  </div>
</template>

<script>
import TuiEditor from 'tui-editor'
import 'tui-editor/dist/tui-editor-extScrollSync.js'

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
  '| @cols=2:merged |',
  '| --- | --- |',
  '| table | table |',
  '```uml',
  'partition Conductor {',
  '  (*) --> "Climbs on Platform"',
  '  --> === S1 ===',
  '  --> Bows',
  '}',
  '',
  'partition Audience #LightSkyBlue {',
  '  === S1 === --> Applauds',
  '}',
  '',
  'partition Conductor {',
  '  Bows --> === S2 ===',
  '  --> WavesArmes',
  '  Applauds --> === S2 ===',
  '}',
  '',
  'partition Orchestra #CCCCEE {',
  '  WavesArmes --> Introduction',
  '  --> "Play music"',
  '}',
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
