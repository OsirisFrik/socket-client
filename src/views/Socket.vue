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
        <el-tab-pane label="Options" name="options">
          <socket-options v-model:options="socketSettings.options" />
        </el-tab-pane>
        <el-tab-pane label="Events" name="events">
          <socket-events v-model:events="socketSettings.events" />
        </el-tab-pane>
        <el-tab-pane label="Emits" name="emits">
          <socket-emits v-model:emits="socketSettings.emits" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import SocketOptions from '@/components/Sockets/Options.vue'
import SocketEvents from '@/components/Sockets/Events.vue'
import SocketEmits from '@/components/Sockets/Emits.vue'
import { SocketSettings } from '@/../types/index'

export default defineComponent({
  name: 'Socket',
  components: {
    SocketOptions,
    SocketEvents,
    SocketEmits
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
      },
      events: [
        {
          value: null,
          active: false
        }
      ],
      emits: [
        {
          key: null,
          value: '{}',
          valueType: 'json'
        }
      ]
    })
    const tabActive = ref('emits')

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
