<template>
  <el-row :gutter="4">
    <el-col :span="12">
      <el-row>
        <p>Emits &nbsp;<i class="ri-add-line pointer" @click="addEmit" /></p>
      </el-row>
      <el-row
        v-for="(emit, index) in props.emits"
        :key="index"
        :gutter="4">
        <el-col :span="10">
          <el-input
            v-model="emit.key"
            placeholder="Name" />
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="emit.valueType"
            placeholder="Value type"
            filterable>
            <el-option
              v-for="item in langOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <button class="btn" @click="selectEmit(emit)">
            <i class="ri-edit-line"></i>
          </button>
        </el-col>
        <el-col :span="2">
          <button class="btn">
            <i class="ri-send-plane-2-line" />
          </button>
        </el-col>
      </el-row>
    </el-col>
    <el-col
      v-if="editEmit"
      :span="12">
      <monaco-editor
        v-model="editEmit.value"
        :lang="editEmit.valueType" />
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import MonacoEditor from '@/components/Monaco.vue'
import { SocketEmit } from 'types'

export default defineComponent({
  name: 'SocketEmits',
  components: {
    MonacoEditor
  },
  props: {
    emits: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const langOptions = ref([
      {
        label: 'Text',
        value: 'text'
      },
      {
        label: 'JSON',
        value: 'json'
      },
      {
        label: 'Number',
        value: 'number'
      },
      {
        label: 'JavaScript',
        value: 'javascript'
      }
    ])
    const langSelect = ref('json')
    const editEmit = ref<SocketEmit | null>(null)

    // Methods
    const addEmit = () => {
      props.emits.push({
        key: null,
        value: null,
        valueType: 'json'
      })
    }

    const selectEmit = (val: SocketEmit) => editEmit.value = val

    return {
      props,
      langSelect,
      langOptions,
      editEmit,
      // Methods
      addEmit,
      selectEmit
    }
  }
})
</script>
