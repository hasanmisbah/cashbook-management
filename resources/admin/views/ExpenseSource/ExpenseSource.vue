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
        :data="expenseSource"
        :action-handler="handleAction"
      />
    </div>
    <modal v-model="showModal"/>
  </div>
</template>

<script>

import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'

import { useStore } from "vuex";

import DataTable from "../../Components/Utils/DataTable";
import Modal from "../../Components/Utils/Modal";
import ButtonComp from "../../Components/Utils/ButtonComp";
import { LIST_ITEM_ACTION_DELETE, LIST_ITEM_ACTION_UPDATE, LIST_ITEM_ACTION_VIEW } from "../../utils/constants";
import Notify from "../../utils/Notify";
import { formatDate } from "../../utils/helper";

export default defineComponent({

  name: "ExpenseSource",
  components: { ButtonComp, Modal, DataTable },

  setup() {

    const store = useStore()

    const data = reactive({

      loading: false,
      showModal: false,

      columnMap: [
        { field: 'name', label: 'Name', sortable: true },
        { field: 'created_at', label: 'Created_at', sortable: true, formatter: (value) => formatDate(value)},
      ],

      expenseSource: computed(() => store.getters["expenseSource/data"]),

      selectedItem: {},

    });

    const handleDeleteAction = async () => {
      try{
        const response = await store.dispatch('expenseSource/deleteExpenseSource', data.selectedItem.id);
        Notify.success(response.data.message || 'Source successfully Deleted');
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

      }
    }

    onMounted(async () => {
      data.loading = true;
      await store.dispatch('expenseSource/getExpenseSource');
      data.loading = false;
    })
    return {
      ...toRefs(data),
      handleAction
    }
  }
})
</script>

<style scoped>

</style>
