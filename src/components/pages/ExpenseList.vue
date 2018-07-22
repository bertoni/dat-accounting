<template>
  <div id="contacts" class="page-layout simple left-sidebar-floating">
    <div class="page-header bg-secondary text-auto row no-gutters align-items-center justify-content-between p-4 p-sm-6">
      <div class="col">
        <div class="row no-gutters align-items-center flex-nowrap">
          <div class="logo row no-gutters align-items-center flex-nowrap">
            <span class="logo-icon mr-4">
              <i class="icon icon-barcode-scan s-6"></i>
            </span>
            <span class="logo-text h4">Expense List ({{expenseLenth}})</span>
          </div>
        </div>
      </div>

      <div class="col-auto">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-dark" @click.prevent="prevMonth">Prev Month</button>
          <button type="button" class="btn btn-secondary pl-10 pr-10" @click.prevent="openPicker">{{labelCurrentDate}}</button>
          <button type="button" class="btn btn-dark" @click.prevent="nextMonth">Next Month</button>
        </div>
        <div id="control-date-expense">
          <datepicker
            :minimumView="'month'"
            :maximumView="'month'"
            v-model="calendar"
            @input="changeCalendar"
            ref="programaticOpen">
          </datepicker>
        </div>
      </div>
    </div>

    <div class="page-content-wrapper">
      <table-striped
        v-show="!loading"
        :data="expenses"
        :dataFooter="footer"
        :columns="['Date', 'Category', 'Name', 'Price', 'Parcel', 'Type', 'Situation']"
        :actions="[
          {buttonClass: ['icon', 'icon-pencil-circle'], title: 'Edit', method: this.edit},
          {buttonClass: ['icon', 'icon-delete-circle'], title: 'Remove', method: this.remove}
        ]"
        :hideButtonMoreRegisters="true" />
      <loader-component
        v-show="loading" />
    </div>

    <router-link id="add-expense-fab" class="btn btn-secondary btn-fab" :to="{ name: 'expense-add'}" title="Add Expense"><i class="icon-plus"></i></router-link>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Moment from 'moment'
import Numeral from 'numeral'
import TableStriped from '@/components/TableStriped'
import LoaderComponent from '@/components/Loader'

export default {
  name: 'ExpenseList',
  components: {
    TableStriped,
    LoaderComponent,
    Datepicker
  },
  data () {
    return {
      loading: true,
      calendar: new Date(),
      currentDate: Moment(),
      dataRemove: '',
      expenses: [],
      footer: []
    }
  },
  computed: {
    expenseLenth () {
      return this.expenses.length
    },
    labelCurrentDate () {
      return this.currentDate.format('MMMM') + '/' + this.currentDate.format('YYYY')
    },
    totalPrice () {
      return (this.expenses.reduce((prevVal, elem) => prevVal + parseInt(elem.price.replace(/[^0-9]/g, '')), 0) / 100)
    },
    paidPrice () {
      return (this.expenses.reduce((prevVal, elem) => prevVal + (/Settled/.test(elem.situation) ? parseInt(elem.price.replace(/[^0-9]/g, '')) : 0), 0) / 100)
    },
    remainingPrice () {
      return (this.expenses.reduce((prevVal, elem) => prevVal + (/Pending/.test(elem.situation) ? parseInt(elem.price.replace(/[^0-9]/g, '')) : 0), 0) / 100)
    },
    fixedPercent () {
      return (this.totalPrice
        ? ((this.expenses.reduce((prevVal, elem) => prevVal + (elem.type === 'Fixed' ? parseInt(elem.price.replace(/[^0-9]/g, '')) : 0), 0) * 100) / this.totalPrice)
        : 0)
    },
    casualPercent () {
      return (this.totalPrice
        ? ((this.expenses.reduce((prevVal, elem) => prevVal + (elem.type === 'Casual' ? parseInt(elem.price.replace(/[^0-9]/g, '')) : 0), 0) * 100) / this.totalPrice)
        : 0)
    },
    superfluousPercent () {
      return (this.totalPrice
        ? ((this.expenses.reduce((prevVal, elem) => prevVal + (elem.type === 'Superfluous' ? parseInt(elem.price.replace(/[^0-9]/g, '')) : 0), 0) * 100) / this.totalPrice)
        : 0)
    }
  },
  methods: {
    getColorSituaton (situation) {
      switch (situation) {
        case 'Pending':
          return 'text-danger'
        case 'Settled':
          return 'text-success'
        default:
          return 'text-secondary'
      }
    },
    setFooter () {
      this.footer = []
      this.footer.push({
        id: '',
        date: '',
        category: '',
        parcel: '',
        name: '<span class="' + this.getColorSituaton('Total') + '">Total Price</span>',
        type: 'Fixed',
        price: Numeral(String(this.totalPrice)).format('$0,0.00'),
        situation: Numeral(String(this.fixedPercent / 10000)).format('00.0%')
      })
      this.footer.push({
        id: '',
        date: '',
        category: '',
        parcel: '',
        name: '<span class="' + this.getColorSituaton('Settled') + '">Paid Price</span>',
        type: 'Casual',
        price: Numeral(String(this.paidPrice)).format('$0,0.00'),
        situation: Numeral(String(this.casualPercent / 10000)).format('00.0%')
      })
      this.footer.push({
        id: '',
        date: '',
        category: '',
        parcel: '',
        name: '<span class="' + this.getColorSituaton('Pending') + '">Remaining Price</span>',
        type: 'Superfluous',
        price: Numeral(String(this.remainingPrice)).format('$0,0.00'),
        situation: Numeral(String(this.superfluousPercent / 10000)).format('00.0%')
      })
    },
    getExpense () {
      this.loading = true
      this.$store.dispatch('getExpense', {
        order: 'date',
        sort: 'DESC',
        month: this.currentDate.format('MM'),
        year: this.currentDate.format('YYYY')
      })
        .then(data => this.setExpenses(data))
        .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
    },
    setExpenses (data) {
      this.expenses = []
      for (let idx in data) {
        this.expenses.push(this.formatRow(data[idx]))
      }
      this.setFooter()
      this.loading = false
    },
    formatRow (data) {
      return {
        id: data.id,
        name: data.name,
        category: data.category,
        parcel: data.parcel + (data.parcelTotal ? ' of ' + data.parcelTotal : ''),
        type: data.type,
        situation: '<span class="' + this.getColorSituaton(data.situation) + '">' + data.situation + '</span>',
        date: Moment(String(data.date)).format('YYYY-MM-DD'),
        price: Numeral(String(data.price)).format('$0,0.00')
      }
    },
    remove (data, event) {
      /* istanbul ignore if  */
      if (event) {
        event.preventDefault()
      }
      this.dataRemove = data
      this.$store.dispatch('openModalConfirm', {
        title: 'Remove Expense ' + data.name,
        content: '<p>This operation is irreversible, are you sure?</p>',
        callbackOk: this.confirmRemove
      })
    },
    edit (data, event) {
      /* istanbul ignore if  */
      if (event) {
        event.preventDefault()
      }
      this.$router.push({name: 'expense-edit', params: { id: data.id }})
    },
    confirmRemove () {
      this.$store.dispatch('closeModalConfirm')
      this.$store.dispatch('removeExpense', this.dataRemove.id)
        .then(() => this.effectRemove())
        .catch(/* istanbul ignore next */error => this.$store.dispatch('notify', {text: error.message}))
    },
    effectRemove () {
      const expenseExists = (id, expenses) => {
        for (let x in expenses) {
          if (expenses.hasOwnProperty(x) && expenses[x].id === id) {
            return x
          }
        }
        return false
      }
      let idx = expenseExists(this.dataRemove.id, this.expenses)
      if (idx === false) {
        this.$store.dispatch('notify', {text: 'Expense not found to remove'})
        return false
      }
      this.expenses.splice(idx, 1)
      this.dataRemove = {}
      this.setFooter()
      this.$store.dispatch('notify', {type: 'success', text: 'Removed'})
    },
    prevMonth () {
      this.currentDate = Moment(this.currentDate).subtract(1, 'months')
      this.calendar = new Date(this.currentDate.toString())
      this.getExpense()
    },
    nextMonth () {
      this.currentDate = Moment(this.currentDate).add(1, 'months')
      this.calendar = new Date(this.currentDate.toString())
      this.getExpense()
    },
    changeCalendar () {
      this.currentDate = Moment(this.calendar)
      this.getExpense()
    },
    openPicker () {
      this.$refs.programaticOpen.showCalendar()
    }
  },
  mounted () {
    setTimeout(this.getExpense, 1000)
  }
}
</script>

<style scoped>
.btn.disabled, .btn:disabled {
  color: rgb(0, 0, 0) !important;
  background: rgba(0, 0, 0, 0) !important;
}
#add-expense-fab {
  position: fixed;
  right: 1%;
  bottom: 2%;
}
</style>
<style>
#contacts .table-striped tfoot tr.data-footer { background-color: rgba(230, 226, 101, 0.15); }
#contacts .table-striped tfoot tr.data-footer:nth-of-type(odd) { background-color: rgba(230, 226, 101, 0.25); }
#control-date-expense { margin-left: 73px; }
#control-date-expense .vdp-datepicker input[type="text"] { display: none; }
#control-date-expense .vdp-datepicker__calendar span { color: #000; }
</style>
