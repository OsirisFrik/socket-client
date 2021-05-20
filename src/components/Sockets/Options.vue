<template>
  <el-row>
    <el-col :span="24" :offset="0">
      <el-row :gutter="4">
        <el-col :span="12">
          <el-row :gutter="12">
            <el-col :span="12">
              <el-input
                v-model="props.options.path.value"
                placeholder="Path" />
            </el-col>
            <el-col :span="12">
              <el-switch
                v-model="props.options.path.active"
                :active-value="true"
                :inactive-value="false"
                class="align-switch" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col>
          <el-row>
            <p>Querys &nbsp;<i class="ri-add-line pointer" @click="addOptions('querys')" /></p>
          </el-row>
          <el-row
            v-for="(query, index) in props.options.querys"
            :key="index"
            :gutter="12"
            class="m-b-10">
            <el-col :span="8">
              <el-input
                v-model="query.key"
                placeholder="Key" />
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="query.value"
                placeholder="Value" />
            </el-col>
            <el-col :span="4">
              <el-switch
                v-model="query.active"
                :active-value="true"
                :inactive-value="false"
                class="align-switch" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="4">
        <el-col :span="24">
          <el-row>
            <p>Headers &nbsp;<i class="ri-add-line pointer" @click="addOptions('headers')" /></p>
          </el-row>
          <el-row
            v-for="(header, index) in props.options.headers"
            :key="index"
            :gutter="12"
            class="m-b-10">
            <el-col :span="4">
              <el-input
                v-model="header.key"
                placeholder="Key" />
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="header.value"
                placeholder="Value" />
            </el-col>
            <el-col :span="4">
              <el-switch
                v-model="header.active"
                :active-value="true"
                :inactive-value="false"
                class="align-switch" />
            </el-col>
            <el-col :span="6">
              <el-switch
                v-model="header.auth"
                :active-value="true"
                :inactive-value="false"
                class="align-switch"
                inactive-text="Extra header"
                active-text="Auth header"
                @change="authHeader(header, index)" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { ValueKey } from '@/../types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SocketOptions',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const authHeader = (headerEdited: ValueKey, index: number) => {
      const header = props.options.headers.findIndex((item: ValueKey, i: number) => i !== index && item.auth)

      if (header > -1) props.options.headers[header].auth = false
    }

    const addOptions = (type: 'headers' | 'querys') => props.options[type].push({
      key: '',
      value: '',
      active: false
    })

    return {
      props,
      // Methods
      authHeader,
      addOptions
    }
  }
})
</script>
