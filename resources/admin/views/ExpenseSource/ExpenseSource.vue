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
        { field: 'created_at', label: 'Created_at', sortable: true },
      ],

      expenseSource: computed(() => store.getters["expenseSource/data"]),

    });

    const handleAction = (event, item)=> {
      console.log({ event, item })
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
