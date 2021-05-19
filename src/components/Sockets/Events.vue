<template>
  <el-row>
    <el-col :span="12">
      <el-row>
        <p>Events &nbsp;<i class="ri-add-line pointer" @click="addEvent"/></p>
      </el-row>
      <el-row
        v-for="(event, index) in props.events"
        :key="index"
        :gutter="12"
        class="m-b-10">
        <el-col :span=12>
          <el-input
            v-model="event.value"
            placeholder="Name" />
        </el-col>
        <el-col :span="2">
          <el-switch
            v-model="event.active"
            class="align-switch"
            :active-value="true"
            :inactive-value="false"
            inactive-text="Disabled"
            active-text="Active" />
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      HOLI
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SocketEvents',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const addEvent = () => {
      props.events.push({
        value: null,
        active: false
      })
    }

    return {
      props,
      addEvent
    }
  }
})
</script>
