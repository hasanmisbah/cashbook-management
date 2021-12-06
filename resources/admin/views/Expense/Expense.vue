<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center" style="width: 100%">
      <h5 class="card-title mb-0">All Sources</h5>
      <button-comp :main-btn="false" @click="showModal = !showModal">
        Add New Source
      </button-comp>
    </div>
    <div v-loading="loading" class="card-body">
      <data-table
        :columns="columnMap"
        :data="expenses"
        :action-handler="handleAction"
      />
    </div>
    <expense-action
      :expense-source="expenseSources"
      :current-source="selectedItem"
      v-model="showModal"
      :updated="handleActionClose"
    />
  </div>
</template>

<script>

import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'

import { useStore } from "vuex";

import DataTable from "../../Components/Utils/DataTable";
import ButtonComp from "../../Components/Utils/ButtonComp";
import { LIST_ITEM_ACTION_DELETE, LIST_ITEM_ACTION_UPDATE } from "../../utils/constants";
import Notify from "../../utils/Notify";
import { formatDate, formatDateTime, formatMoney } from "../../utils/helper";
import ExpenseSourceAction from "../../Components/ExpenseSource/ExpenseSourceAction";
import ExpenseAction from "../../Components/Expense/ExpenseAction";

export default defineComponent({

  name: "ExpenseSource",
  components: { ExpenseAction, ExpenseSourceAction, ButtonComp, DataTable },

  setup() {

    const store = useStore()

    const data = reactive({

      loading: computed(()=> store.getters["expense/loading"]),

      showModal: false,

      columnMap: [
        { field: 'source', label: 'Source', sortable: true },
        { field: 'description', label: 'Description', sortable: true },
        { field: 'amount', label: 'Amount', sortable: true, formatter: (value) => formatMoney(value) },
        { field: 'created_at', label: 'Created At', sortable: true, formatter: (value) => formatDateTime(value)},
      ],

      expenses: computed(() => store.getters["expense/data"]),
      expenseSources: computed(()=> store.getters["expenseSource/data"]),

      selectedItem: {},

    });

    const handleDeleteAction = async () => {
      try{
        const response = await store.dispatch('expense/deleteExpense', data.selectedItem.id);
        Notify.success(response.data.message || 'Expense successfully Deleted');
      }catch (e) {
        Notify.error(e.message || 'Something went wrong');
      }
    }

    const handleAction = (event, item)=> {

      data.selectedItem = item;

      if(event === LIST_ITEM_ACTION_DELETE){

        Notify.confirm({
          confirmCv: handleDeleteAction,
          cancelCv: () => data.selectedItem = {}
        });
      }

      if(event === LIST_ITEM_ACTION_UPDATE){
        data.showModal = true;
      }
    }

    const handleActionClose = () => data.selectedItem = {}

    onMounted(async () => {
      if(!store.getters["expense/hasData"]){
        await store.dispatch('expense/getExpense');
      }
    })
    return {
      ...toRefs(data),
      handleAction,
      handleActionClose
    }
  }
})
</script>
