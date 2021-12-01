<template>
  <div>
    <el-table
      :data="renderedData"
      style="width: 100%"
      stripe
    >
      <el-table-column type="index" />
      <el-table-column
        v-for="( column, index ) in columns"
        :label="column.label"
        :prop="column.field"
        :key="`data-table-${ index }`"
        :sortable="column.sortable || false"
      />

      <el-table-column align="right" v-if="showSearch || showAction">

        <template #header v-if="showSearch">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>

        <template #default="scope" v-if="showAction">

          <slot name="action" :data="scope">
            <el-button v-if="showView" size="mini" @click="handleAction('view', scope.row)" plain>
              <el-icon :size="18">
                <View/>
              </el-icon>
            </el-button>

            <el-button v-if="showEdit" size="mini" @click="handleAction('edit', scope.row)" plain>
              <el-icon :size="18">
                <edit/>
              </el-icon>
            </el-button>

            <el-button v-if="showDelete" size="mini" type="danger" @click="handleAction('delete', scope.row)" plain>
              <el-icon :size="18">
                <delete/>
              </el-icon>
            </el-button>
          </slot>

        </template>
      </el-table-column>
    </el-table>
    <el-row align="center" justify="space-between" class="mt-2">
      <el-col></el-col>
      <el-col>
        <el-pagination
          background
          layout="sizes, prev, pager, next"
          :page-count="paginationCount"
          v-model:current-page="paginationIndex"
          @size-change="perPage = $event"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { Edit, Delete, View } from '@element-plus/icons'
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
    },

    showAction: {
      type: Boolean,
      default: true,
    },

    showView: {
      type: Boolean,
      default: true,
    },

    showEdit: {
      type: Boolean,
      default: true,
    },

    showDelete: {
      type: Boolean,
      default: true,
    },

    actionHandler: {
      type: Function,
      required: false
    }

  },
  components: {
    Edit, Delete, View
  },
  setup(props, {emit}){

    const data = reactive({

      tableData: computed(()=> props.data) || [],
      search: '',
      perPage: 10,
      paginationIndex: 1,
      paginationCount: computed(()=> Math.ceil((data.filteredData.length / data.perPage))),

      filteredData: computed(()=> {

        return data.tableData.filter((obj) => {

          return obj instanceof Object
            ? Object.values(obj).some((item) => item
              .toString()
              .toLowerCase()
              .includes(data.search.toString().toLowerCase()))
            : data.tableData
        });
      }),

      renderedData: computed(()=> {

        const filteredData = [...data.filteredData]

        const startIndex = data.paginationIndex > 1
          ? (data.paginationIndex * data.perPage) - data.perPage
          : 0
        ;

        const endIndex = data.perPage * data.paginationIndex

        return filteredData.slice(startIndex, endIndex)
      })
    });

    const fireEvent = (event, data) => emit(event, data);


   const handleAction = (event, item) => {

     if(props.actionHandler instanceof Function){
       props.actionHandler(event, item)
       return;
     }

     fireEvent(event, item);
   }

    return{
      ...toRefs(data),
      handleAction
    }
  }
})
</script>
