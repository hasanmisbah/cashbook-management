<template>
  <div>
    <el-table
      :data="renderedData"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index"/>

      <el-table-column
        v-for="( column, index ) in columns"
        :key="`data-table-${ index }`"
        :label="column.label"
        :prop="column.field"
        :sortable="column.sortable || false"
      >

        <template #default="{ row }">
          {{ handlePropFormatting(column, row) }}
        </template>

      </el-table-column>

      <el-table-column v-if="showSearch || showAction" align="right">

        <template v-if="showSearch" #header>
          <el-input v-model="search" placeholder="Type to search" size="mini"/>
        </template>

        <template v-if="showAction" #default="scope">

          <slot :data="scope" name="action">

            <el-button
              v-if="showView"
              plain
              size="mini"
              @click="handleAction(LIST_ITEM_ACTION_VIEW, scope.row)"
            >
              <el-icon :size="18">
                <View/>
              </el-icon>
            </el-button>

            <el-button
              v-if="showPrint"
              plain size="mini"
              @click="handleAction(LIST_ITEM_ACTION_PRINT, scope.row)"
            >
              <el-icon :size="18">
                <Printer/>
              </el-icon>
            </el-button>

            <el-button
              v-if="showStatusUpdate"
              plain
              size="mini"
              @click="handleAction(LIST_ITEM_ACTION_UPDATE_STATUS, scope.row)"
            >
              <el-icon :size="18">
                <Connection/>
              </el-icon>
            </el-button>

            <el-button
              v-if="showEdit"
              plain
              size="mini"
              @click="handleAction(LIST_ITEM_ACTION_UPDATE, scope.row)"
            >
              <el-icon :size="18">
                <edit/>
              </el-icon>
            </el-button>

            <el-button
              v-if="showDelete"
              plain
              size="mini"
              type="danger"
              @click="handleAction(LIST_ITEM_ACTION_DELETE, scope.row)"
            >
              <el-icon :size="18">
                <delete/>
              </el-icon>
            </el-button>
          </slot>

        </template>
      </el-table-column>
    </el-table>
    <el-row align="center" class="mt-2" justify="space-between">
      <el-col></el-col>
      <el-col>
        <el-pagination
          v-model:current-page="paginationIndex"
          :page-count="pageCount"
          background
          layout="sizes, prev, pager, next"
          @size-change="perPage = $event"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { computed, defineComponent, reactive, toRefs } from 'vue'
import { Edit, Delete, View, Printer, Connection } from '@element-plus/icons'
import {
  LIST_ITEM_ACTION_DELETE, LIST_ITEM_ACTION_PRINT,
  LIST_ITEM_ACTION_UPDATE, LIST_ITEM_ACTION_UPDATE_STATUS,
  LIST_ITEM_ACTION_VIEW
} from "../../utils/constants";

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
      default: false,
    },

    showStatusUpdate: {
      type: Boolean,
      default: false
    },

    showPrint: {
      type: Boolean,
      default: false
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
    Edit, Delete, View, Printer, Connection
  },

  setup(props, { emit }) {

    const data = reactive({

      tableData: computed(() => props.data) || [],
      search: '',
      perPage: 10,
      paginationIndex: 1,
      pageCount: computed(() => Math.ceil((data.filteredData.length / data.perPage))),

      filteredData: computed(() => {

        return data.tableData.filter((obj) => {

          return obj instanceof Object
            ? Object.values(obj).some((item) => item
              ?.toString()
              ?.toLowerCase()
              ?.includes(data?.search?.toString()?.toLowerCase()))
            : data.tableData
            ;
        });
      }),

      renderedData: computed(() => {

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


    const handleAction = async (event, item) => {

      if (props.actionHandler instanceof Function) {
        await props.actionHandler(event, item)
        return;
      }

      fireEvent(event, item);
    }


    const handlePropFormatting = (column, row)=>{

      if(column.formatter && column.formatter instanceof Function){
        return column.formatter(row[column.field])
      }

      return row[column.field]

    }

    return {
      ...toRefs(data),
      handleAction,
      handlePropFormatting,
      LIST_ITEM_ACTION_VIEW,
      LIST_ITEM_ACTION_UPDATE,
      LIST_ITEM_ACTION_UPDATE_STATUS,
      LIST_ITEM_ACTION_DELETE,
      LIST_ITEM_ACTION_PRINT,
    }
  }
})
</script>
