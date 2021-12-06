<template>
  <modal
    v-model="showAction"
    :title="`${ isUpdating ? 'Update' : 'Create' } expense`"
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
        label="Amount"
        prop="amount"
        :error="errors.amount"
      >
        <el-input v-model.number="form.amount"/>
      </el-form-item>

      <el-form-item
        label="Expense Source"
        prop="expenseSource"
        :error="errors.source"
      >

        <el-select
          v-model="form.expenseSource"
          placeholder="Select Expense Source"
          style="width: 100%;"
          filterable
        >
          <el-option
            label="Unknown"
            :value="null"
          />

          <el-option
            v-for="(source, index) in expenseSources"
            :label="source.name"
            :value="source.id"
            :key="`expense-source${index}`"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="Description"
        prop="description"
        :error="errors.description"
      >
        <el-input v-model="form.description"/>

      </el-form-item>

    </el-form>
  </modal>
</template>

<script>
import Modal from "../Utils/Modal";
import { computed, defineComponent, reactive, toRefs, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { integer, max, min, required } from "../../utils/validationRules";
import ExpenseSource from "../../Services/ExpenseSource";
import ErrorHelper from "../../utils/helper/ErrorHelper";
import Notify from "../../utils/Notify";
import { isEmpty } from "lodash";

export default defineComponent({

  name: "ExpenseAction",

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
    },

    expenseSource: {
      type: [Array],
      required: true,
    }

  },

  setup(props, { emit }) {

    const store = useStore();

    const data = reactive({

      showAction: props.modelValue,

      actionTitle: 'Add new source',

      expenseSources: computed(()=> props.expenseSource),

      form: {
        amount: '',
        expenseSource: '',
        description: '',
      },

      isUpdating: false,

      rules: {

        amount: [
          required('amount'),
          integer('amount'),
        ],

        description: [
          min(3, 'description'),
          max(150, 'description')
        ],

        expenseSource: [
          // min(1, 'Expense Source'),
        ]
      },

      errors: {
        amount: '',
        description: '',
        source: '',
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
        amount: data.form.amount,
        source: data.form.expenseSource,
        description: data.form.description
      }

      try{

        const response = data.isUpdating
          ? await store.dispatch('expense/updateExpense', {id : data.form.id, payload: formData})
          : await store.dispatch('expense/createExpense', formData)
        ;

        Notify.success(response.data.message || 'Expense successfully saved', 'Success');

        resetForm();

        data.showAction = false;

      }catch (e) {

        ErrorHelper.mapServerError(e, (error, ex) => {
          data.errors.amount = ex(error['name']);
          data.errors.description = ex(error['description']);
          data.errors.source = ex(error['source']);
        })

        Notify.error(e.message || 'Something went wrong', 'Error');
      }

    }

    const resetForm = () => {

      data.form = {
        amount: '',
        description: '',
        expenseSource: ''
      };

      data.errors.amount = ''
      data.errors.description = ''
      data.errors.expenseSource = ''

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
      data.form = {
        ...nv,
        expenseSource: nv?.source_id
      }

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
