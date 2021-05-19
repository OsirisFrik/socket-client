<template>
  <div ref="editorEl" id="editor" class="editor" />
</template>
<script lang="ts">
import { nextTick } from 'process'
import { defineComponent, ref, watch } from 'vue'

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

window.$monaco = monaco

declare global {
  interface Window {
    $editor: monaco.editor.IStandaloneCodeEditor,
    $monaco: any,
    $el: any
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
  setup(props, { emit }) {
    const editorEl = ref<HTMLElement | null>()
    let editor: monaco.editor.IStandaloneCodeEditor
    let currentVal = props.modelValue.toString()

    nextTick(() => {
      if (!editorEl.value) return

      editor = monaco.editor.create(editorEl.value, {
        value: props.modelValue,
        language: ['string', 'number'].includes(props.lang) ? '' : props.lang,
        theme: 'vs-dark',
        automaticLayout: true
      })

      editor.onDidChangeModelContent(() => {
        currentVal = editor.getValue()
        emit('update:modelValue', currentVal)
      })

      window.$editor = editor
    })

    watch(() => props.lang, (nVal) => {
      const model = editor?.getModel()

      if (model) monaco.editor.setModelLanguage(model, nVal)
    })

    watch(() => props.modelValue, (nVal) => {
      if (editor && nVal !== currentVal) {
        editor.setValue(nVal)
        currentVal = nVal
      }
    })

    return {
      props,
      editorEl
    }
  }
})
</script>
