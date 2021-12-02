<template>
  <button
    class="btn btn-hover text-center"
    :class=" `${mainBtn ? 'main-btn' : ''} ${outlined ? 'btn-outline-'+buttonType : 'btn-'+buttonType}`"
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

    mainBtn:{
      type: Boolean,
      default: true
    },

    type: {
      type : String,
      default: 'button'
    },

    loading: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    }
  }
})
</script>
