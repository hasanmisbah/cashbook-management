<template>
  <el-table
    :data="renderedData"
    style="width: 100%"
  >
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Name" prop="name" />

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
        >
          Edit
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: "DataTable",
  props: {

    columns: {
      type: [Array, Object]
    },

    data: {
      type: [Array, Object]
    },

    showSearch: {
      type: Boolean,
      default: true,
    }

  },
  setup(){
    const data = reactive({
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'John',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Morgan',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Jessy',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
      search: '',
      renderedData: computed(()=> {
        return data.tableData.filter( (item) => {
          return !data.search || item.name.toLowerCase().includes(data.search.toLowerCase())
        })
      })
    });

    function handleEdit(index, row) {
      console.log(index, row)
    }

    function handleDelete(index, row) {
      console.log(index, row)
    }

    return{
      ...toRefs(data),
      handleEdit,
      handleDelete
    }
  }
})
</script>

<style scoped>

</style>
