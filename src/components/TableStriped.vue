<template>
  <table :class="['table', 'table-striped', {'loading': loading}, {'finish': finish}]">
    <thead>
      <tr>
        <th v-for="(column, columnkey) in columns" :key="'headertablestriped-' + columnkey">{{column}}</th>
        <th v-if="this.actions.length">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, itemkey) in data" :key="'linetablestriped-' + itemkey">
        <td v-for="(column, columnkey) in columns" :key="'celltablestriped-' + itemkey + '-' + columnkey" v-if="hasValue(item, column)" v-html="itemValue(item, column)"></td>
        <td v-if="actions.length">
          <a v-for="(action, actionkey) in actions" :key="'actiontablestriped-' + itemkey + '-' + actionkey" href="#" :title="action.title" class="action" @click="action.method(item, $event)"><i :class="action.buttonClass"></i></a>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr v-if="dataFooter.length" v-for="(item, itemkey) in dataFooter" :key="'linetblestripedfooter-' + itemkey" class="data-footer">
        <th v-for="(column, columnkey) in columns" :key="'celltablestripedfooter-' + itemkey + '-' + columnkey" v-if="hasValue(item, column)" v-html="itemValue(item, column)"></th>
        <th v-if="actions.length"></th>
      </tr>
      <tr>
        <td :colspan="columns.length + (actions.length ? 1 : 0)">
          <p id="loader"></p>
          <button id="more-data" type="button" class="btn btn-primary" @click="loadData">Mais Registros</button>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: 'TableStriped',
  props: {
    data: {
      type: Array,
      required: true
    },
    dataFooter: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      required: true
    },
    actions: {
      type: Array,
      default: function () {
        return []
      }
    },
    resultsPerPage: {
      type: Number,
      default: 10
    },
    hideButtonMoreRegisters: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      current_page: 1,
      loading: false,
      finish: this.hideButtonMoreRegisters
    }
  },
  methods: {
    hasValue (item, column) {
      return item[column.toLowerCase()] !== undefined
    },
    itemValue (item, column) {
      return item[column.toLowerCase()]
    },
    loadDataOk () {
      this.current_page++
      this.loading = false
    },
    loadDataError () {
      this.loading = false
      this.finish = true
    },
    loadData () {
      if (this.loading || this.finish) {
        return false
      }
      this.loading = true
      this.$emit('newData', (this.current_page + 1), this.loadDataOk, this.loadDataError)
    }
  }
}
</script>

<style scoped>
.table tfoot { text-align: center; }
.table tfoot td { padding-top: 30px; }
.table tfoot #loader {
  display: none;
  border: 7px solid #f3f3f3;
  border-top: 7px solid #EAD369;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
}
.table tfoot .data-footer th { text-align: left; }
.table tbody a.action { text-decoration: none; }
.loading tfoot #loader { display: block; }
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loading tfoot #more-data,
.finish tfoot #more-data { display: none; }
#more-data { background-color: #69B8EA; }
</style>
