<template>
<div></div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useStore } from "vuex";
export default defineComponent({
  name: "ExpenseSource",

  setup(){
    const store = useStore()
    const data = reactive({

    });

    onMounted(async ()=> {
      await store.dispatch('expenseSource/getExpenseSource');
    })
  }
})
</script>

<style scoped>

</style>
