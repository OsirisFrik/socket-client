<template>
  <el-container class="socket-view m-t-20">
    <el-header>
      <el-row>
        <el-col :span="12">
          <form @submit.prevent="toggleClient">
            <el-input
              v-model="socketSettings.url"
              :disabled="status"
              placeholder="Socket URL"
              clearable>
              <template #append>
                <el-button
                  v-if="!status"
                  type="success"
                  size="medium"
                  native-type="submit">
                  Connect
                </el-button>
                <el-button
                  v-else
                  size="medium"
                  @click="toggleClient">
                  Disconnect
                </el-button>
              </template>
            </el-input>
          </form>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-tabs v-model="tabActive" type="normal" tab-position="top" class="no-top">
        <el-tab-pane label="Options" name="options">
          <socket-options
            v-model:options="socketSettings.options"
            class="m-t-15" />
        </el-tab-pane>
        <el-tab-pane label="Events" name="events">
          <socket-events
            v-model:events="socketSettings.events" />
        </el-tab-pane>
        <el-tab-pane label="Emits" name="emits" class="m-r--15">
          <socket-emits
            v-model:emits="socketSettings.emits"
            :connected="status"
            @send="emitEvent" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SocketSettings } from '@/../types/index'
import SocketOptions from '@/components/Sockets/Options.vue'
import SocketEvents from '@/components/Sockets/Events.vue'
import SocketEmits from '@/components/Sockets/Emits.vue'
import Socket from '@/libs/socket'

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
      url: 'localhost:3000',
      options: {
        path: {
          value: '',
          active: false
        },
        querys: [
          {
            key: '',
            value: '',
            active: false
          }
        ],
        headers: [
          {
            key: '',
            value: '',
            active: false
          }
        ]
      },
      events: [
        {
          value: '',
          active: false
        }
      ],
      emits: [
        {
          key: '',
          value: '{}',
          valueType: 'json'
        }
      ]
    })
    const tabActive = ref('options')
    const client = new Socket(socketSettings.value.url, socketSettings.value.options)
    const status = ref(client.connected)

    client.on('connected', (val) => status.value = val)

    // Methods
    const toggleClient = () => {
      if (!client.connected) client.connect()
      else client.disconnect()
    }

    const emitEvent = (event: string, value: any) => {
      client.send(event, value)
    }

    return {
      socketSettings,
      tabActive,
      status,
      // Methods
      toggleClient,
      emitEvent
    }
  }
})
</script>
