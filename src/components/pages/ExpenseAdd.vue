<template>
  <div id="contacts" class="page-layout simple left-sidebar-floating">
    <div class="page-header bg-secondary text-auto row no-gutters align-items-center justify-content-between p-4 p-sm-6">
      <div class="col">
        <div class="row no-gutters align-items-center flex-nowrap">
          <div class="logo row no-gutters align-items-center flex-nowrap">
            <span class="logo-icon mr-4">
              <i class="icon icon-barcode-scan s-6"></i>
            </span>
            <span class="logo-text h4" v-show="!importMode">Add Expense</span>
            <span class="logo-text h4" v-show="importMode">Import Expenses</span>
          </div>
        </div>
      </div>

      <div class="col-auto">
        <button v-show="!importMode" type="button" class="btn btn-light" @click.prevent="importMode = true"><i class="icon icon-file-excel"></i> Import a list</button>
        <button v-show="importMode" type="button" class="btn btn-light" @click.prevent="importMode = false"><i class="icon icon-plus-box"></i> Add individual</button>
      </div>
    </div>

    <div class="page-content-wrapper p-6">
      <expense-form-component
        v-show="!importMode"
        :date="date"
        :category="category"
        :name="name"
        :price="price"
        :parcel="parcel"
        :type="type"
        :situation="situation"
        :observation="observation" />

      <expense-import-component
        v-show="importMode" />
    </div>
  </div>
</template>

<script>
import ExpenseFormComponent from '@/components/pages/ExpenseForm'
import ExpenseImportComponent from '@/components/pages/ExpenseImport'
import Moment from 'moment'

export default {
  name: 'ExpenseAdd',
  components: {
    ExpenseFormComponent,
    ExpenseImportComponent
  },
  data () {
    return {
      date: Moment().add(1, 'd').format('YYYY-MM-DD'),
      category: '',
      name: '',
      price: 0,
      parcel: 0,
      type: '',
      situation: '',
      observation: '',
      importMode: false
    }
  },
  mounted () {
    const container = document.querySelector('#wrapper-global')
    /* istanbul ignore next */
    if (container && container.scrollTop) {
      container.scrollTop = 0
    }
  }
}
</script>
