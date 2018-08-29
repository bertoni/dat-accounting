<template>
  <div id="import-wrapper">
    <form v-on:submit.prevent :class="['expense-import', 'form-wrapper']">
      <p class="lead mt-4 mb-6">If you have a history of expenses, put it in a spreadsheet to import.</p>
      <p class="lead mt-4 mb-6">Load your spreadsheet below. It should to have a specific format, that you can <a href="#" @click.prevent="downloadExample">download here</a>. The extensions that will be accepted are "xls", "xlsx" and "ods". Remember that first line is header and must be exactly as in the example.</p>
      <p class="lead mt-4 mb-6">The date field should be in a format "YYYY-MM-DD". The price should be in cents, so "$39.90" must be "3990". The category should respect your registered categories. The only fields that can be empty are parcel and observation.</p>
      <input type="file" @change="importSpreadSheet" ref="inputFile">
      <button type="button" class="btn btn-dark ml-5" @click.prevent="importSpreadSheet">
        <span v-show="!importing">Import</span>
        <i v-show="importing" class="icospinner"></i>
      </button>
    </form>
    <div v-show="expenses.length">
      <p class="lead mt-8">Validate the below data found in the spreadsheet. Only will be imported the lines that are valid in the "validation" column.</p>
      <table class="table table-striped" id="table-expense-list">
        <thead>
          <tr><th>Date</th><th>Category</th><th>Name</th><th>Price</th><th>Parcel</th><th>Parcel Total</th><th>Type</th><th>Situation</th><th>Observation</th><th>Validation</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="(item, itemkey) in expenses" :key="'expenseimport-' + itemkey" v-if="!item.saved">
            <td>
              <datepicker :format="'yyyy-MM-dd'" placeholder="YYYY-MM-DD" v-model="item.date"></datepicker>
            </td>
            <td>
              <select v-model="item.category" id="categoryField" placeholder="Category" class="form-control">
                <option value="">Choose a valid category</option>
                <option v-for="(name, categoryKey) in categories" :value="name" :key="'optioncategory' + categoryKey">{{name}}</option>
              </select>
            </td>
            <td>
              <input type="text" v-model.trim="item.name" placeholder="A short name for expense" class="form-control">
            </td>
            <td>
              <input type="text" v-money="money" v-model="item.price" placeholder="99.99" class="form-control">
            </td>
            <td>
              <input type="number" min="0" v-model.number="item.parcel" placeholder="2" class="form-control">
            </td>
            <td>
              <input type="number" min="0" v-model.number="item.parcelTotal" placeholder="6" class="form-control">
            </td>
            <td>
              <select v-model="item.type" placeholder="Type" class="form-control">
                <option value="">Choose a valid type</option>
                <option v-for="(name, typeKey) in types" :value="name" :key="'optiontype' + typeKey">{{name}}</option>
              </select>
            </td>
            <td class="form-group">
              <div v-for="(name, idx) in situations" :key="'optionsituation' + idx" class="form-check">
                <label class="form-check-label">
                  <input class="form-check-input" :name="'situation-' + itemkey" :id="'situation-field-' + idx" type="radio" :value="name" v-model="item.situation">
                  <span class="radio-icon"></span>
                  <span class="form-check-description">{{name}}</span>
                </label>
              </div>
            </td>
            <td>
              <input type="text" v-model="item.observation" placeholder="Some observation about this expense, this will be help you in the future" class="form-control">
            </td>
            <td v-show="!item.validation || !Object.keys(item.validation).length"><small class="text-success"><i class="text-success icon icon-checkbox-marked s-4"></i> Valid Line</small></td>
            <td v-show="item.validation && Object.keys(item.validation).length">
              <small class="text-danger">
                <i class="text-danger icon icon-checkbox-marked s-4"></i> Invalid line because:<br>
                <span v-for="(validation, validationkey) in item.validation" :key="'validationimport-' + validationkey">{{'\u2022'}} {{validation}}</span>
              </small>
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger btn-remove-expense" title="Remove this expense" @click.prevent="remove(item)"><i class="icon icon-delete-forever s-5"></i></button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr><th colspan="11" class="text-right">Total expenses: {{totalExpense}} - <span class="text-success">Valid expenses: {{validExpense}}</span> - <span class="text-danger">Invalid expenses: {{invalidExpense}}</span></th></tr>
        </tfoot>
      </table>
      <div class="col-auto text-right mt-8">
        <button type="button" class="btn btn-outline-danger mr-3" @click.prevent="cancel" title="Cancel this importation">
          <i class="icon icon-cancel"></i> Cancel
        </button>
        <button type="button" class="btn btn-outline-warning mr-3" @click.prevent="validate" title="Validate again expenses data">
          <i class="icon icon-playlist-check"></i> Validate Data
        </button>
        <button type="button" class="btn btn-outline-success" @click.prevent="confirmImport" title="Import valid expenses">
          <span v-show="!saving"><i class="icon icon-content-save"></i> Import what is valid</span>
          <i v-show="saving" class="icospinner text-primary"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {validate} from '@/services/expense'
import Datepicker from 'vuejs-datepicker'
import {VMoney} from 'v-money'
import Moment from 'moment'
import XLSX from 'xlsx'

export default {
  name: 'ExpenseImport',
  components: {
    Datepicker
  },
  directives: {money: VMoney},
  data () {
    return {
      importing: false,
      saving: false,
      expenses: [],
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: '',
        precision: 2,
        masked: false,
        format: (value) => {
          return (this.money.prefix + ~~value + this.money.decimal + ((value % 1).toFixed(2).substring(2)))
        }
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    types () {
      return this.$store.state.types
    },
    situations () {
      return this.$store.state.situations
    },
    totalExpense () {
      return this.expenses.filter(element => !element.saved).length + ' - ' +
        this.money.format(this.expenses.reduce((sum, element) => sum + (!element.saved ? parseFloat(element.price.replace(/(\$|\s|,)/g, '')) : 0), 0))
    },
    validExpense () {
      return this.expenses.filter(element => !element.saved && !Object.keys(element.validation).length).length + ' - ' +
        this.money.format(this.expenses.reduce((sum, element) => sum + (!element.saved && !Object.keys(element.validation).length ? parseFloat(element.price.replace(/(\$|\s|,)/g, '')) : 0), 0))
    },
    invalidExpense () {
      return this.expenses.filter(element => !element.saved && Object.keys(element.validation).length).length + ' - ' +
        this.money.format(this.expenses.reduce((sum, element) => sum + (!element.saved && Object.keys(element.validation).length ? parseFloat(element.price.replace(/(\$|\s|,)/g, '')) : 0), 0))
    }
  },
  methods: {
    exists (item) {
      return this.expenses.map(elem => elem.key).indexOf(item.key) >= 0
    },
    remove (item) {
      if (!this.exists(item)) {
        this.$store.dispatch('notify', {text: 'Expense not found to remove'})
        return false
      }
      this.expenses = this.expenses.filter(elem => elem.key !== item.key)
      return true
    },
    toScroll (scrollSize = 0) {
      const container = document.querySelector('#wrapper-global')
      /* istanbul ignore next */
      if (container && container.scrollTop) {
        container.scrollTop = scrollSize
      }
    },
    cancel () {
      this.expenses = []
      this.saving = false
      this.importing = false
      this.$refs.inputFile.value = ''
      this.toScroll(0)
    },
    downloadExample () {
      let wb = XLSX.utils.book_new()
      wb.Props = {
        Title: 'Sample Spreadsheet DatAccounting',
        Subject: 'Spreadsheet to import expenses',
        Author: 'DatAccounting',
        CreatedDate: new Date()
      }
      wb.SheetNames.push('expenses')
      let wsData = [
        ['Date', 'Category', 'Name', 'Price', 'Parcel', 'ParcelTotal', 'Type', 'Situation', 'Observation'],
        [Moment().format('YYYY-MM-DD'), 'Food', 'Lunch with friends', 3990, 2, 5, 'Casual', 'Settled', 'A some observation']
      ]
      let ws = XLSX.utils.aoa_to_sheet(wsData)
      wb.Sheets['expenses'] = ws
      XLSX.writeFile(wb, 'dataccounting-sample.xlsx')
    },
    loadDataSpreadSheet (spreadSheet) {
      this.expenses = []
      for (let idx in spreadSheet[0]) {
        let expense = {
          'key': idx,
          'saved': false,
          'date': spreadSheet[0][idx].Date,
          'category': spreadSheet[0][idx].Category,
          'name': spreadSheet[0][idx].Name,
          'price': this.money.format(spreadSheet[0][idx].Price ? (spreadSheet[0][idx].Price / 100) : 0),
          'parcel': (spreadSheet[0][idx].Parcel || 0),
          'parcelTotal': (spreadSheet[0][idx].ParcelTotal || 0),
          'type': spreadSheet[0][idx].Type,
          'situation': spreadSheet[0][idx].Situation,
          'observation': spreadSheet[0][idx].Observation,
          'validation': {}
        }
        validate(expense, expense.validation, this.categories, this.types, this.situations)
        this.expenses.push(expense)
      }
      this.importing = false
    },
    validate () {
      for (let idx in this.expenses) {
        this.expenses[idx].validation = {}
        validate(this.expenses[idx], this.expenses[idx].validation, this.categories, this.types, this.situations)
      }
    },
    openFile (data) {
      let workbook = XLSX.read(data, {type: 'binary'})
      let sheetNameList = workbook.SheetNames
      let spreadSheet = []
      for (let idx in sheetNameList) {
        spreadSheet.push(XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[idx]]))
      }
      this.loadDataSpreadSheet(spreadSheet)
    },
    readFile () {
      if (!this.$refs.inputFile.files[0]) {
        this.$store.dispatch('notify', {text: 'File not loaded'})
        this.importing = false
        return false
      }
      /* istanbul ignore next */
      if (!/.*\.(xls|xlsx|ods)$/.test(this.$refs.inputFile.files[0].name)) {
        this.$store.dispatch('notify', {text: 'File isn\'t a spreadsheet'})
        this.importing = false
        return false
      }
      /* istanbul ignore next */
      let reader = new FileReader()
      /* istanbul ignore next */
      reader.onerror = (error) => {
        this.importing = false
        this.$store.dispatch('notify', {text: error.message})
      }
      /* istanbul ignore next */
      reader.onloadend = (e) => {
        if (!reader.error) {
          this.openFile(reader.result)
        }
      }
      /* istanbul ignore next */
      reader.readAsBinaryString(this.$refs.inputFile.files[0])
    },
    importSpreadSheet () {
      this.importing = true
      this.readFile()
    },
    confirmImport () {
      this.saving = true
      if (!this.expenses.filter(elem => (!Object.keys(elem.validation).length && !elem.saved)).length) {
        this.$store.dispatch('notify', {text: 'Not exists valid expenses to save'})
        this.saving = false
        return false
      }
      this.toScroll(0)
      let lastKey = 0
      for (let idx in this.expenses) {
        /* istanbul ignore else */
        if (!Object.keys(this.expenses[idx].validation).length && !this.expenses[idx].saved) {
          lastKey = this.expenses[idx].key
        }
      }
      for (let idx in this.expenses) {
        /* istanbul ignore else */
        if (!Object.keys(this.expenses[idx].validation).length && !this.expenses[idx].saved) {
          let expense = JSON.parse(JSON.stringify(this.expenses[idx]))
          delete expense.validation
          delete expense.saved
          delete expense.key
          this.$store.dispatch('createExpense', expense)
            .then(/* istanbul ignore next */() => { this.expenses[idx].saved = true })
            .catch(/* istanbul ignore next */error => {
              if (error.message === 'Timed out while writing file') {
                this.expenses[idx].saved = true
              }
            })
            .finally(/* istanbul ignore next */() => {
              if (lastKey === this.expenses[idx].key) {
                this.saveExpensesSuccess()
              }
            })
        }
      }
    },
    saveExpensesSuccess () {
      this.saving = false
      this.importing = false
      if (!this.expenses.filter(elem => elem.saved).length) {
        this.$store.dispatch('notify', {text: 'No was possible save the expenses, please try again'})
        setTimeout(/* istanbul ignore next */() => {
          this.toScroll(document.querySelector('#wrapper-global table tfoot').offsetTop)
        }, 500)
        return false
      }
      if (!this.expenses.filter(elem => !elem.saved).length) {
        this.$store.dispatch('notify', {type: 'success', text: 'Expenses saved'})
        this.cancel()
        return true
      }
      this.$store.dispatch('notify', {type: 'success', text: 'Some Expenses was saved, but those on the list still need saved'})
      setTimeout(/* istanbul ignore next */() => {
        this.toScroll(document.querySelector('#wrapper-global table tfoot').offsetTop)
      }, 500)
      return false
    }
  }
}
</script>

<style scoped>
#import-wrapper { width: 100%; }
#table-expense-list tbody td span { white-space: nowrap; }
.icospinner.text-primary { border-top-color: #3C4252 !important; }
.vdp-datepicker { max-width: 90px; min-width: 90px; }
.btn-remove-expense { padding-left: 1rem; padding-right: 1rem; min-width: 0; line-height: 1.5rem; }
</style>
<style>
#table-expense-list .vdp-datepicker input[type="text"] { width: 100%; }
</style>
