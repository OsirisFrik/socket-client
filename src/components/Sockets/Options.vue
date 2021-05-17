<template>
  <el-row>
    <el-col :span="24" :offset="0">
      <el-row :gutter="4">
        <el-col :span="8">
          <el-input
            v-model="props.options.path.value"
            placeholder="Path" />
        </el-col>
        <el-col :span="4">
          <el-switch
            v-model="props.options.path.active"
            class="align-switch"
            :active-value="true"
            :inactive-value="false" />
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col>
          <el-row>
            <p>Querys</p>
          </el-row>
          <el-row
            v-for="(query, index) in props.options.querys"
            :key="index"
            :gutter="4">
            <el-col :span="8">
              <el-input
                v-model="query.key"
                placeholder="Key" />
            </el-col>
            <el-col :span="12">
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
      <el-row>
        <el-col>
          <el-row>
            <p>Headers</p>
          </el-row>
          <el-row
            v-for="(header, index) in props.options.headers"
            :key="index"
            :gutter="4">
            <el-col :span="8">
              <el-input
                v-model="header.key"
                placeholder="Key" />
            </el-col>
            <el-col :span="12">
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
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts">
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
    return {
      props
    }
  }
})
</script>
