<template>
  <div id="import-wrapper">
    <form v-on:submit.prevent :class="['expense-import', 'form-wrapper']">
      <p class="lead mt-4 mb-6">Load your spreadsheet below. It should to have a specific format, that you can <a href="#" @click.prevent="downloadExample">download here</a>. The extensions that will be accepted are "xls", "xlsx" and "ods". Remember that first line is header and must be exactly as the example.</p>
      <p class="lead mt-4 mb-6">The date field should be in a format "YYYY-MM-DD". The price should be in a cents, so "$39.90" must be "3990". The category should respect your registered categories. The only fields that can be empty are parcel and observation.</p>
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
          <tr><th>Date</th><th>Category</th><th>Name</th><th>Price</th><th>Parcel</th><th>Type</th><th>Situation</th><th>Observation</th><th>Validation</th></tr>
        </thead>
        <tbody>
          <tr v-for="(item, itemkey) in expenses" :key="'expenseimport-' + itemkey">
            <td>{{item.date}}</td>
            <td>{{item.category}}</td>
            <td>{{item.name}}</td>
            <td>$ {{item.price}}</td>
            <td>{{item.parcel}}</td>
            <td>{{item.type}}</td>
            <td>{{item.situation}}</td>
            <td>{{item.observation}}</td>
            <td v-show="!item.validation || !Object.keys(item.validation).length"><small class="text-success"><i class="text-success icon icon-checkbox-marked s-4"></i> Valid Line</small></td>
            <td v-show="item.validation && Object.keys(item.validation).length">
              <small class="text-danger">
                <i class="text-danger icon icon-checkbox-marked s-4"></i> Invalid line because:<br>
                <span v-for="(validation, validationkey) in item.validation" :key="'validationimport-' + validationkey">{{validation}}</span>
              </small>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr><th colspan="9" class="text-right">Total expenses: {{totalExpense}} - <span class="text-success">Valid expenses: {{validExpense}}</span> - <span class="text-danger">Invalid expenses: {{invalidExpense}}</span></th></tr>
        </tfoot>
      </table>
      <div class="col-auto text-right mt-8">
        <button type="button" class="btn btn-outline-success" @click.prevent="confirmImport">
          <span v-show="!saving"><i class="icon icon-check"></i> Import what is valid</span>
          <i v-show="saving" class="icospinner text-primary"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {validate} from '@/services/expense'
import Moment from 'moment'
import XLSX from 'xlsx'

export default {
  name: 'ExpenseImport',
  props: {
    categories: {
      type: Array,
      required: true
    },
    types: {
      type: Array,
      required: true
    },
    situations: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      importing: false,
      saving: false,
      expenses: []
    }
  },
  computed: {
    totalExpense () {
      return this.expenses.length
    },
    validExpense () {
      return this.expenses.filter((element) => !Object.keys(element.validation).length).length
    },
    invalidExpense () {
      return this.expenses.filter((element) => Object.keys(element.validation).length).length
    }
  },
  methods: {
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
        ['Date', 'Category', 'Name', 'Price', 'Parcel', 'Type', 'Situation', 'Observation'],
        [Moment().format('YYYY-MM-DD'), 'Food', 'Lubch with friends', 3990, 0, 'Casual', 'Settled', 'A some observation']
      ]
      let ws = XLSX.utils.aoa_to_sheet(wsData)
      wb.Sheets['expenses'] = ws
      XLSX.writeFile(wb, 'dataccounting-sample.xlsx')
    },
    loadDataSpreadSheet (spreadSheet) {
      this.expenses = []
      for (let idx in spreadSheet[0]) {
        let expense = {
          'date': Moment(spreadSheet[0][idx].Date),
          'category': spreadSheet[0][idx].Category,
          'name': spreadSheet[0][idx].Name,
          'price': (spreadSheet[0][idx].Price / 100),
          'parcel': (spreadSheet[0][idx].Parcel || 0),
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
      if (!/.*\.(xls|xlsx|ods)$/.test(this.$refs.inputFile.files[0].name)) {
        this.$store.dispatch('notify', {text: 'File isn\'t a spreadsheet'})
        return false
      }
      let reader = new FileReader()
      reader.onerror = (error) => {
        this.importing = false
        this.$store.dispatch('notify', {text: error.message})
      }
      reader.onloadend = (e) => {
        if (!reader.error) {
          this.openFile(reader.result)
        }
      }
      reader.readAsBinaryString(this.$refs.inputFile.files[0])
    },
    importSpreadSheet () {
      this.importing = true
      this.readFile()
    },
    confirmImport () {
      this.saving = true
      let expenses = []
      for (let idx in this.expenses) {
        if (!Object.keys(this.expenses[idx].validation).length) {
          let expense = this.expenses[idx]
          delete expense.validation
          expenses.push(expense)
        }
      }
      if (!expenses.length) {
        this.$store.dispatch('notify', {text: 'Not exists valid expenses to save'})
        this.saving = false
        return false
      }
      this.saveExpenses(expenses)
    },
    saveExpenses (expenses) {
      let promises = []
      for (let idx in expenses) {
        promises.push(this.$store.dispatch('createExpense', expenses[idx]))
      }
      Promise.all(promises)
        .then(() => this.saveExpensesSuccess())
        .then(error => this.saveExpensesError(error))
    },
    saveExpensesSuccess () {
      this.$store.dispatch('notify', {type: 'success', text: 'Expenses saved'})
      this.expenses = []
      this.saving = false
      this.$refs.inputFile.value = ''
      const container = document.querySelector('#wrapper-global')
      container.scrollTop = 0
    },
    saveExpensesError (error) {
      this.$store.dispatch('notify', {text: error.message})
      this.saving = false
    }
  }
}
</script>

<style scoped>
#import-wrapper { width: 100%; }
#table-expense-list tbody td span { white-space: nowrap; }
.icospinner.text-primary { border-top-color: #3C4252 !important; }
</style>
