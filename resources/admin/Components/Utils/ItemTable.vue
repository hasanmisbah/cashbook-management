<template>
  <div>
    <DataTable
      ref="dt"
      v-model:filters="state.filters"
      :dataKey="dataKey"
      :loading="loading"
      :paginator="pagination"
      :paginatorTemplate="paginationTemplate"
      :rows="perPage"
      :rowsPerPageOptions="perPageOption"
      :scrollable="true"
      :value="data"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      scrollDirection="horizontal"
    >
      <template v-if="showExport || showSearch" #header>
        <div
          :class=" showExport ? 'justify-content-between' : 'justify-content-end'"
          class="d-flex"
        >
          <Button v-if="showExport" icon="pi pi-external-link" label="Export" @click="exportCsv($event)"/>

          <div v-if="showSearch">
              <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="state.filters['global'].value" placeholder="Search"/>
              </span>
          </div>

        </div>
      </template>
      <Column
        v-for="(column, index) in columns"
        :key="`dataTable-${index}`"
        :field="column.field"
        :sortable="column['sortable']"
      >
        <template #header>
          {{ column.header }}
        </template>

        <template
          #body="{ data }"
        >

          <span
            @click="fireEvent(column['event'], data)"
          >
            <slot
              :item="data"
              :name="column.field"
              @click="fireEvent(column['event'], data)"
            >
              {{ data[column.field] }}
            </slot>
          </span>

        </template>
      </Column>

      <Column v-if="showActions" header="Action">

        <template #body="{data}">

          <slot name="action" v-bind:item="data">

            <span
              v-if="showView"
              class="order-action list-action"
              type="button"
              @click="fireEvent(LIST_ITEM_ACTION_VIEW, data)"
            >
            <i class="icon-archive"></i>
          </span>

            <span
              v-if="showEdit"
              class="order-action list-action"
              type="button"
              @click="fireEvent(LIST_ITEM_ACTION_UPDATE, data)"
            >
            <i class="icon-pencil"></i>
          </span>

            <span
              v-if="showDelete"
              class="order-action list-action"
              type="button"
              @click="fireEvent(LIST_ITEM_ACTION_DELETE, data)"
            >
            <i class="icon-delete_sweep"></i>
          </span>

            <span
              v-if="showPrint"
              class="order-action list-action"
              type="button"
              @click="fireEvent(LIST_ITEM_ACTION_PRINT, data)"
            >
            <i class="icon-print"></i>
          </span>

          </slot>

        </template>

      </Column>

      <template v-if="noDataMsg" #empty>
        {{ noDataMsg }}
      </template>

      <template #loading>
        Loading Data... please wait
      </template>

    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import {
  LIST_ITEM_ACTION_DELETE,
  LIST_ITEM_ACTION_UPDATE,
  LIST_ITEM_ACTION_PRINT,
  LIST_ITEM_ACTION_VIEW
} from '../../utils/constants';
import { FilterMatchMode } from 'primevue/api';
import { reactive, ref, defineComponent } from 'vue';

export default defineComponent({

  name: 'ItemTable',

  props: {

    columns: {
      type: [Array, Object],
    },

    data: {
      type: [Array, Object]
    },

    loading: {
      default: false,
      type: Boolean,
    },

    perPage: {
      type: Number,
      default: 10,
    },

    dataKey: {
      type: String,
      default: 'id'
    },

    perPageOption: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },

    pagination: {
      type: Boolean,
      default: true,
    },

    paginationTemplate: {
      type: String,
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
    },

    noDataMsg: {
      type: String,
      default: 'No Data Found'
    },

    showActions: {
      type: Boolean,
      default: true
    },

    showPrint: {
      type: Boolean,
      default: false,
    },

    showEdit: {
      type: Boolean,
      default: true,
    },

    showView: {
      type: Boolean,
      default: true
    },

    showDelete: {
      type: Boolean,
      default: true
    },

    showSearch: {
      type: Boolean,
      default: true
    },

    titleText: {
      type: String,
      required: false
    },

    showExport: {
      type: Boolean,
      default: false
    },

    bodyColumnPadding: {
      type: String,
      default: '10px 13px'
    },

  },
  components: { DataTable, Column, InputText, Button },

  setup(props, { emit }) {

    const state = reactive({
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    });

    const fireEvent = (event, data) => {
      if (!event) return;
      emit(event, data);
    };

    const dt = ref();

    const exportCsv = () => dt.value.exportCSV();

    return {
      LIST_ITEM_ACTION_DELETE,
      LIST_ITEM_ACTION_VIEW,
      LIST_ITEM_ACTION_UPDATE,
      LIST_ITEM_ACTION_PRINT,
      dt,
      fireEvent,
      state,
      exportCsv
    };
  },
});
</script>

<style lang="scss" scoped>
.p-column-title {
  display: none;
}

::v-deep(.p-datatable) {
  .p-sortable-column {
    .p-sortable-column-icon {
      color: #e2e2e2;
    }

    &:not(.p-highlight) {
      &:hover {
        background-color: darken(#007ae1, 5);
        color: #e2e2e2;

        .p-sortable-column-icon {
          color: #e2e2e2;
        }
      }
    }
  }

  .p-datatable-thead > tr > th {
    background-color: #007ae1;
    color: #ffffff;
  }
}

::v-deep(.p-datatable) {
  //.p-datatable-tbody {
  //  tr {
  //    td {
  //      padding: v-bind('bodyColumnPadding')
  //    }
  //  }
  //}

  .p-datatable-thead {
    tr {
      th {
        padding: 1rem;
      }
    }
  }
}

::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}
</style>
