<template>
  <div id="contacts" class="page-layout simple left-sidebar-floating">
    <div class="page-header bg-secondary text-auto row no-gutters align-items-center justify-content-between p-4 p-sm-6">
      <div class="col">
        <div class="row no-gutters align-items-center flex-nowrap">
          <div class="logo row no-gutters align-items-center flex-nowrap">
            <span class="logo-icon mr-4">
              <i class="icon icon-barcode-scan s-6"></i>
            </span>
            <span class="logo-text h4">Add Expense</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content-wrapper p-6">
      <expense-form-component
        :date="date"
        :category="category"
        :name="name"
        :price="price"
        :parcel="parcel"
        :type="type"
        :situation="situation"
        :observation="observation" />
    </div>
  </div>
</template>

<script>
import ExpenseFormComponent from '@/components/pages/ExpenseForm'
import Moment from 'moment'

export default {
  name: 'ExpenseAdd',
  components: {
    ExpenseFormComponent
  },
  data () {
    return {
      date: Moment().format('YYYY-MM-DD'),
      category: '',
      name: '',
      price: 0,
      parcel: 0,
      type: '',
      situation: '',
      observation: ''
    }
  }
}
</script>
