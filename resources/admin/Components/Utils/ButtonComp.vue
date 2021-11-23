<template>
  <button
    :class="`main-btn ${buttonType}-btn btn btn-${buttonType} btn-hover text-center`"
    :disabled="loading"
    :type="type"
  >
    <span
      v-if="loading"
      class="spinner-border spinner-border-sm mr-2"
    />
    <slot/>
  </button>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name: "ButtonComp",
  props: {

    buttonType: {
      type: String,
      default: 'primary'
    },

    type: {
      type : String,
      default: 'button'
    },

    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>

</style>
