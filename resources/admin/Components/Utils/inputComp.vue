<template>
  <div class="input-style-1">
    <label
      v-if="!!label">{{ label }}
    </label>
    <input
      v-model="inputData"
      :class="{ 'is-invalid' : !!errorMessage }"
      :placeholder="placeHolder"
      :readonly="readOnly"
      :required="required"
      :type="type"
      class="form-control"
    />
    <div
      v-if="!!errorMessage"
      class="invalid-feedback"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
  name: "inputComp",
  emits: ['update:modelValue'],
  props: {

    modelValue: {
      required: false
    },

    errorMessage: {
      required: false
    },

    type: {
      type: String,
      default: 'text'
    },

    label: {
      type: String,
      required: false
    },

    placeHolder: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    readOnly: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      inputData: props.modelValue
    })

    watch(() => data.inputData, (nv) => {
      emit('update:modelValue', nv)
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped>

</style>
