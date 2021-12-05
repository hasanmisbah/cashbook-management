<template>
  <modal
    v-model="showAction"
    :title="`${ isUpdating ? 'Update' : 'Create' } expense source`"
    :confirm-cv="handleDataSave"
    :confirm-button-text="`${ isUpdating ? 'Update' : 'Create' }`"
  >

    <el-form
      ref="expenseForm"
      :model="form"
      :rules="rules"
      label-width="120px"
      show-message
      status-icon
    >

      <el-form-item
        label="Name"
        prop="name"
        :error="errors.name"
      >
        <el-input v-model="form.name"/>
      </el-form-item>

    </el-form>
  </modal>
</template>

<script>
import Modal from "../Utils/Modal";
import { computed, defineComponent, reactive, toRefs, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { max, min, required } from "../../utils/validationRules";
import ExpenseSource from "../../Services/ExpenseSource";
import ErrorHelper from "../../utils/helper/ErrorHelper";
import Notify from "../../utils/Notify";
import { isEmpty } from "lodash";

export default defineComponent({

  name: "ExpenseSourceAction",

  components: { Modal },

  emits: ['update:modelValue'],

  props: {

    modelValue: {
      type: Boolean,
      default: false
    },

    currentSource: {
      type: Object,
      default: () => {}
    },

    updated: {
      type: Function,
      required: false
    }

  },

  setup(props, { emit }) {

    const store = useStore();

    const data = reactive({

      showAction: props.modelValue,

      actionTitle: 'Add new source',

      form: {
        name: '',
      },

      isUpdating: false,

      rules: {

        name: [
          required('name'),
          min(3, 'name'),
          max(35, 'name')
        ]
      },

      errors: {
        name: ''
      }
    });

    const expenseForm = ref(null);

    const handleDataSave = () => {

      expenseForm.value.validate((valid) => {

        if(!valid) {
          return
        }

        handleDataSubmit();

      })

    }

    const handleDataSubmit = async () => {

      const formData = {
        name: data.form.name
      }

      try{

        const response = data.isUpdating
          ? await store.dispatch('expenseSource/updateExpenseSource', {id : data.form.id, payload: formData})
          : await store.dispatch('expenseSource/createExpenseSource', formData)
        ;

        Notify.success(response.data.message || 'Expense source successfully saved', 'Success');

        resetForm();

        data.showAction = false;

      }catch (e) {

        ErrorHelper.mapServerError(e, (error, ex) => {
          data.errors.name = ex(error['name']);
        })

        Notify.error(e.message || 'Something went wrong', 'Error');
      }

    }

    const resetForm = () => {

      data.form = {
        name: ''
      };

      data.errors.name = ''

      expenseForm?.value?.resetFields();
    }

    const fireEvent = (event, value) => emit(event, value);

    watch(() => data.showAction, (nv) => {

      if(!nv) {

        if(props.updated instanceof Function){

          props.updated();

        }
      }

      fireEvent('update:modelValue', nv);

    })


    const makeFormData = (nv) => {

      if(isEmpty(nv)) {

        data.isUpdating = false;
        resetForm();
        return

      }

      data.isUpdating = true
      data.form = { ...nv }

    }

    watch(()=> props.currentSource, (nv) => {

      makeFormData(nv);

    })

    watch(()=> props.modelValue, (nv) => {

      data.showAction = nv;

    })

    return {
      ...toRefs(data),
      expenseForm,
      handleDataSave
    }

  }
})
</script>
