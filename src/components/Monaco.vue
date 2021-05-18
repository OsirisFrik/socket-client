<template>
  <div class="editor" ref="editorEl" />
</template>
<script lang="ts">
import { nextTick } from 'process'
import { defineComponent, ref, watch } from 'vue'

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

window.$monaco = monaco

declare global {
  interface Window {
    $editor: monaco.editor.IStandaloneCodeEditor,
    $monaco: any
  }
}

export default defineComponent({
  name: 'MonacoEditor',
  props: {
    modelValue: {
      value: String,
      default: '// Hi'
    },
    lang: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const editorEl = ref()
    const editor = ref<monaco.editor.IStandaloneCodeEditor>()

    nextTick(() => {
      editor.value = monaco.editor.create(editorEl.value, {
        value: props.modelValue,
        language: props.lang,
        theme: 'vs-dark'
      })

      window.$editor = editor.value
    })

    watch(() => props.lang, (nVal) => {
      const model = editor.value?.getModel()

      if (model) monaco.editor.setModelLanguage(model, nVal)
    })

    watch(() => props.modelValue, (nVal) => {
      console.log(editor.value, nVal)
      if (editor.value) editor.value.setValue(nVal || 'test')
    })

    return {
      props,
      editor,
      editorEl
    }
  }
})
</script>
