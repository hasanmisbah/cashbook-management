<template>

  <el-dialog
    v-model="showModal"
    destroy-on-close
    modal
  >
    <template #title v-if="!!title">

      <h1>{{ title }}</h1>

      <el-divider style="margin-bottom: 0; margin-top: 10px" />

    </template>

    <template #default>
      <slot/>
    </template>

    <template #footer v-if="showConfirmButton || showCancelButton">
      <el-divider style="margin-top: 0; margin-bottom: 10px" />

      <div class="d-flex justify-content-end gap-2" style="width: 100%">

        <button-comp
          v-if="showCancelButton"
          @click="handleCancel"
          :main-btn="false"
          outlined
          :disabled="confirming"
        >
          {{ cancelButtonText }}
        </button-comp>

        <button-comp
          v-if="showConfirmButton"
          @click="handleConfirm"
          :main-btn="false"
          :loading="confirming"
          :disabled="confirming"
        >
          {{ confirmButtonText }}
        </button-comp>

      </div>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, watch, toRefs } from "vue";
import ButtonComp from "./ButtonComp";

export default {
  name: "Modal",
  components: { ButtonComp },
  emits: ['update:modelValue'],
  props: {

    modelValue: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      required: false,
    },

    confirmButtonText: {
      type: String,
      default: 'Confirm'
    },

    cancelButtonText: {
      type: String,
      default: 'Cancel'
    },

    showConfirmButton: {
      type: Boolean,
      default: true
    },

    showCancelButton: {
      type: Boolean,
      default: true
    },

    confirmCv: {
      type: Function,
      required: false
    },

    cancelCv:{
      type: Function,
      required: false
    }

  },

  setup(props, { emit }){

    const data = reactive({
      showModal: props.modelValue,
      confirming: false
    });

    const fireEvent = (event, value) => emit(event, value)

    watch(()=> data.showModal, (nv) => {
      fireEvent('update:modelValue', nv)
    })

    const handleConfirm = async () => {

      if(props.confirmCv instanceof Function){
        data.confirming = true
        await props.confirmCv()
        data.confirming = true
      }

      fireEvent('update:modelValue', false);
    };

    const handleCancel = async () => {

      if(props.cancelCv instanceof Function){
        await props.cancelCv()
      }

      fireEvent('update:modelValue', false);
    }

    watch(()=> props.modelValue, (nv)=>{
      data.showModal = nv;
    })

    return {
      ...toRefs(data),
      handleConfirm,
      handleCancel
    }
  }
}
</script>

<style scoped>

</style>
