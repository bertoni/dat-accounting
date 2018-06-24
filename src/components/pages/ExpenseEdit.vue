<template>
  <div id="contacts" class="page-layout simple left-sidebar-floating">
    <div class="page-header bg-secondary text-auto row no-gutters align-items-center justify-content-between p-4 p-sm-6">
      <div class="col">
        <div class="row no-gutters align-items-center flex-nowrap">
          <div class="logo row no-gutters align-items-center flex-nowrap">
            <span class="logo-icon mr-4">
              <i class="icon icon-barcode-scan s-6"></i>
            </span>
            <span class="logo-text h4">Expense Edit</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content-wrapper p-6">
      <expense-form-component
        v-if="!loading"
        :id="expense.id"
        :date="expense.date"
        :category="expense.category"
        :name="expense.name"
        :price="expense.price"
        :parcel="expense.parcel"
        :type="expense.type"
        :situation="expense.situation"
        :observation="expense.observation" />
      <loader-component
        v-if="loading" />
    </div>
  </div>
</template>

<script>
import ExpenseFormComponent from '@/components/pages/ExpenseForm'
import LoaderComponent from '@/components/Loader'
import Moment from 'moment'

export default {
  name: 'ExpenseEdit',
  components: {
    ExpenseFormComponent,
    LoaderComponent
  },
  data () {
    return {
      loading: true,
      expense: {
        id: '',
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
  },
  mounted () {
    if (!this.$route.params.id || !this.$route.params.id.length) {
      this.$store.dispatch('notify', {type: 'error', text: 'Expense not found'})
      this.$router.push({name: 'expense-list'})
      return false
    }
    this.expense.id = this.$route.params.id
    this.$store.dispatch('getExpenseById', this.expense.id)
      .then(expense => {
        this.expense.date = Moment(expense.date).format('YYYY-MM-DD')
        this.expense.category = expense.category
        this.expense.name = expense.name
        this.expense.price = expense.price.toFixed(2)
        this.expense.parcel = expense.parcel
        this.expense.type = expense.type
        this.expense.situation = expense.situation
        this.expense.observation = expense.observation
        this.loading = false
      })
      .catch(error => {
        console.warn(error)
        this.$store.dispatch('notify', {type: 'error', text: 'Expense not found'})
        this.$router.push({name: 'expense-list'})
      })
  }
}
</script>
