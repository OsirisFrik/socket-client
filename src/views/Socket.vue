<template>
  <el-container class="socket-view">
    <el-header>
      <el-row>
        <el-col :span="12">
          <el-input
            v-model="socketSettings.url"
            placeholder="Socket URL"
            clearable />
        </el-col>
        <el-col :span="4">
          <el-button
            type="success"
            size="medium"
            @click="toggleConnection">
            Connect
          </el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-tabs v-model="tabActive" type="normal" tab-position="top">
        <el-tab-pane label="options" name="options">
          <SocketOptions v-model:options="socketSettings.options" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import SocketOptions from '@/components/Sockets/Options.vue'

interface ValueKey {
  key: string | null
  value: string | null
  active: boolean | null
}

interface SocketSettings {
  url: string | null
  options: {
    path?: Omit<ValueKey, 'key'>
    querys?: ValueKey[]
    headers?: ValueKey[]
  }
}

export default defineComponent({
  name: 'Socket',
  components: {
    SocketOptions
  },
  setup() {
    // Data
    const socketSettings = ref<SocketSettings>({
      url: null,
      options: {
        path: {
          value: null,
          active: false
        },
        querys: [
          {
            key: null,
            value: null,
            active: false
          }
        ],
        headers: [
          {
            key: null,
            value: null,
            active: false
          }
        ]
      }
    })
    const tabActive = ref('options')

    // Methods
    const toggleConnection = () => console.log(socketSettings.value)

    return {
      socketSettings,
      tabActive,
      // Methods
      toggleConnection
    }
  }
})
</script>
