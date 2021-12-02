<template>
  <div class="card">
    <div v-loading="loading" class="card-body">
      <data-table
        :columns="columnMap"
        :data="expenseSource"
      />
    </div>
    <el-button @click="showModal = !showModal">show modal</el-button>
    <modal v-model="showModal"/>
  </div>
</template>

<script>

import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'

import { useStore } from "vuex";

import DataTable from "../../Components/Utils/DataTable";
import Modal from "../../Components/Utils/Modal";

export default defineComponent({

  name: "ExpenseSource",
  components: { Modal, DataTable },

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

    onMounted(async () => {
      data.loading = true;
      await store.dispatch('expenseSource/getExpenseSource');
      data.loading = false;
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style scoped>

</style>
