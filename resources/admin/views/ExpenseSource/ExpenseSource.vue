<template>
<div class="card">
  <div class="card-body" v-loading="loading">
    <data-table
      :columns="columnMap"
      :data="expenseSource"
    />
  </div>
</div>
</template>

<script>

import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'

import { useStore } from "vuex";

import DataTable from "../../Components/Utils/DataTable";

export default defineComponent({
  name: "ExpenseSource",
  components: { DataTable },
  setup() {

    const store = useStore()

    const data = reactive({

      loading: false,

      columnMap: [

        { field: 'name', label: 'Name', sortable: true },
        { field: 'created_at', label: 'Created_at', sortable: true },

      ],

      expenseSource: computed(()=> store.getters["expenseSource/data"]),

      search: '',
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
