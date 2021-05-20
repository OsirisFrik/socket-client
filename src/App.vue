<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const darkMode = ref(true)

    onMounted(() => document.body?.classList.add('dark'))

    return {
      darkMode
    }
  }
})
</script>
